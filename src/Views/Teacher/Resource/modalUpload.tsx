import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Upload } from "antd";
import lodash from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFilesToFirebase } from "../../../Apis/Firebase";
import { ISelect, SelectComp } from "../../../Components/Select";
import { IClass } from "../../../redux/reducers/classes.reducer";
import { createLesson } from "../../../redux/reducers/lesson.reducer";
import { setLoading } from "../../../redux/reducers/loading.reducer";
import {
  getSubject,
  getSubjects,
  ISubject,
  listSubject,
} from "../../../redux/reducers/subject.reducer";
import { ITopic } from "../../../redux/reducers/topic.reducer";
import { AppDispatch } from "../../../redux/store";
import { ISubjectSelect } from "../../Leadership/Subject/Subject";

export const ModalUpload: React.FC<{
  visible: boolean;
  setVisible: any;
  data: any;
  handleRefresh: any;
}> = (props) => {
  const [form] = Form.useForm();
  const [linkVideo, setLinkVideo] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [subjectSelect, setSubjectSelect] = useState<ISelect[]>([]);
  const [classSelect, setClassSelect] = useState<ISelect[]>();
  const [topicSelect, setTopicSelect] = useState<ISelect[]>();
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    dispatch(getSubjects({ limit: 999, teacher: user.id }))
      .unwrap()
      .then((rs: any) => {
        let option: any[] = [];

        rs.results.forEach((value: ISubject) => {
          option.push({ name: value.subName, value: value.id });
        });
        setSubjectSelect(option);
      });
  }, []);

  const handleChange = (fileList: any) => {
    setLinkVideo(URL.createObjectURL(fileList.file));
  };

  const onFinish = async (values: any) => {
    dispatch(setLoading(true));

    if (url === "") {
      delete values.url;
      await dispatch(
        uploadFilesToFirebase(values.video.fileList, "Video")
      ).then((rs) => {
        values.video = rs;
        dispatch(setLoading(false));
      });
    } else {
      delete values.video;

      dispatch(setLoading(false));
    }
    dispatch(createLesson({ ...values, user: user.id }))
      .unwrap()
      .then((rs) => {
        props.handleRefresh();
      });
  };

  const handleSelect = (e: any) => {
    dispatch(getSubject(e))
      .unwrap()
      .then((rs: ISubject) => {
        let option: any[] = [];

        rs.classes.forEach((vl: IClass) => {
          option.push({ name: vl.classCode, value: vl.id });
        });
        setClassSelect(option);

        let topic: any[] = [];
        rs.topic.forEach((vl: ITopic) => {
          topic.push({ name: vl.title, value: vl.id });
        });
        setTopicSelect(topic);
      });
  };

  return (
    <Modal
      title="Thêm bài giảng"
      className="modal-add-role"
      width="40%"
      visible={props.visible}
      onCancel={() => {
        props.setVisible(false);
        form.resetFields();
        setLinkVideo("");
        setClassSelect(undefined);
        setTopicSelect(undefined);
      }}
      okText="Lưu"
      cancelText="Huỷ"
      onOk={() => form.submit()}
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        name="profile-form"
        layout="horizontal"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          rules={[{ required: true }]}
          label="Chọn môn học"
          name="subject"
        >
          <SelectComp
            onChange={(e: any) => handleSelect(e)}
            style={{ display: "block" }}
            dataString={subjectSelect}
          />
        </Form.Item>
        <Form.Item
          label="Chọn lớp học"
          name="classes"
          rules={[{ required: true }]}
        >
          <SelectComp
            mode="multiple"
            allowClear={true}
            disabled={classSelect === undefined}
            style={{ display: "block" }}
            dataString={classSelect}
          />
        </Form.Item>
        <Form.Item
          label="Chọn chủ đề"
          name="topic"
          rules={[{ required: true }]}
        >
          <SelectComp
            disabled={topicSelect === undefined}
            style={{ display: "block" }}
            dataString={topicSelect}
          />
        </Form.Item>
        <Form.Item
          label="Tiêu đề bài giảng"
          name="title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="video"
          label="Video"
          className="upload-file"
          rules={[{ required: url === "" }]}
        >
          <Upload
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleChange}
            accept="video/*"
            onRemove={() => setLinkVideo("")}
          >
            <Button
              disabled={url !== ""}
              icon={<UploadOutlined style={{ color: "#f17f21" }} />}
            >
              Tải lên
            </Button>
          </Upload>
        </Form.Item>
        {linkVideo !== "" && (
          <video src={linkVideo} width={300} height={200} controls />
        )}
        <Form.Item name="url" label="hoặc Đường link" className="download-file">
          <Input
            onChange={(e: any) => setUrl(e.target.value)}
            disabled={linkVideo !== ""}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
