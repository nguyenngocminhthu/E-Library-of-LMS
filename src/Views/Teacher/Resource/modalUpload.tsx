import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFilesToFirebase } from "../../../Apis/Firebase";
import { SelectComp } from "../../../Components/Select";
import { IClass } from "../../../redux/reducers/classes.reducer";
import { createLesson } from "../../../redux/reducers/lesson.reducer";
import {
  getSubject,
  getSubjects,
  ISubject,
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
  const dataSub = useSelector(
    (state: any) => state.subject.listSubject.results
  );
  const [subjectSelect, setSubjectSelect] = useState<ISubjectSelect[]>([]);
  const [classSelect, setClassSelect] = useState<ISubjectSelect[]>();
  const [topicSelect, setTopicSelect] = useState<ISubjectSelect[]>();

  useEffect(() => {
    dispatch(getSubjects({ limit: 999, user: user.id }));
  }, []);

  useEffect(() => {
    if (dataSub) {
      let option: any[] = [];
      dataSub.forEach((value: ISubject) => {
        option.push({ name: value.subName, value: value.id });
      });
      setSubjectSelect(option);
    }
  }, [dataSub]);

  const handleChange = (fileList: any) => {
    setLinkVideo(URL.createObjectURL(fileList.file));
  };

  const onFinish = async (values: any) => {
    console.debug(values);
    await dispatch(uploadFilesToFirebase(values.video.fileList, "Video")).then(
      (rs) => {
        values.video = rs;
        props.setVisible(false);
      }
    );
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
        <Form.Item label="Chọn môn học" name="subject">
          <SelectComp
            onChange={(e: any) => handleSelect(e)}
            style={{ display: "block" }}
            dataString={subjectSelect}
          />
        </Form.Item>
        <Form.Item label="Chọn lớp học" name="classes">
          <SelectComp
            mode="multiple"
            allowClear={true}
            disabled={classSelect === undefined}
            style={{ display: "block" }}
            dataString={classSelect}
          />
        </Form.Item>
        <Form.Item label="Chọn chủ đề" name="topic">
          <SelectComp
            disabled={topicSelect === undefined}
            style={{ display: "block" }}
            dataString={topicSelect}
          />
        </Form.Item>
        <Form.Item label="Tiêu đề bài giảng" name="title">
          <Input />
        </Form.Item>
        <Form.Item name="video" label="Video" className="upload-file">
          <Upload
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleChange}
            accept="video/*"
          >
            <Button icon={<UploadOutlined style={{ color: "#f17f21" }} />}>
              Tải lên
            </Button>
          </Upload>
        </Form.Item>
        {linkVideo !== "" && (
          <video src={linkVideo} width={300} height={200} controls />
        )}
      </Form>
    </Modal>
  );
};
