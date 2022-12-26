import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadFilesToFirebase } from "../../../Apis/Firebase";
import { ISelect, SelectComp } from "../../../Components/Select";
import { IBanks } from "../../../redux/reducers/banks.reducer";
import { createLesson } from "../../../redux/reducers/lesson.reducer";
import { setLoading } from "../../../redux/reducers/loading.reducer";
import {
  getSubject,
  getSubjects,
  ISubject,
} from "../../../redux/reducers/subject.reducer";
import { ITopic } from "../../../redux/reducers/topic.reducer";
import { AppDispatch } from "../../../redux/store";
import "./Resource.style.scss";

const { Option } = Select;

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
  const [bankSelect, setBankSelect] = useState<ISelect[]>();
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
    values.exams.forEach((vl: any) => {
      vl.time = parseFloat(vl.time);
    });
    if (url === "") {
      delete values.url;
      await dispatch(
        uploadFilesToFirebase(values.video.fileList, "Video")
      ).then((rs) => {
        values.video = rs;
        dispatch(setLoading(false));
      });
    } else {
      values.video = values.url;
      delete values.url;
      dispatch(setLoading(false));
    }
    dispatch(createLesson({ ...values, user: user.id }))
      .unwrap()
      .then((rs) => {
        props.handleRefresh();
        props.setVisible(false);
      });
  };

  const handleSelect = (e: any) => {
    dispatch(getSubject(e))
      .unwrap()
      .then((rs: ISubject) => {
        let option: any[] = [];

        rs.bank.forEach((vl: IBanks) => {
          option.push({ name: vl.examName, value: vl.id });
        });
        setBankSelect(option);

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
      className="modal-add-role lessons"
      width="40%"
      open={props.visible}
      onCancel={() => {
        props.setVisible(false);
        form.resetFields();
        setLinkVideo("");
        setBankSelect(undefined);
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
        <Form.Item name="url" label="hoặc Đường link">
          <Input
            onChange={(e: any) => setUrl(e.target.value)}
            disabled={linkVideo !== ""}
          />
        </Form.Item>
        <Form.List name="exams">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={`Đề thi thứ ${index + 1}`}
                  required={false}
                  key={field.key}
                  className="answer-input"
                  wrapperCol={{ span: 18 }}
                >
                  <Form.Item
                    {...field}
                    wrapperCol={{ span: 24 }}
                    name={[field.name, "exam"]}
                    rules={[{ required: true }]}
                  >
                    <Select
                      disabled={bankSelect === undefined}
                      style={{ width: "290px", marginRight: "5px" }}
                      placeholder="Chọn đề thi"
                    >
                      {bankSelect?.map((item) => (
                        <Option key={item.value} value={item.value}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...field}
                    wrapperCol={{ span: 24 }}
                    name={[field.name, "time"]}
                    validateTrigger={["onChange", "onBlur"]}
                  >
                    <Input type="number" placeholder="Phút thứ: 9.5 eg" />
                  </Form.Item>
                  <CloseOutlined onClick={() => remove(field.name)} />
                </Form.Item>
              ))}
              <Form.Item
                wrapperCol={{ span: 24 }}
                style={{ textAlign: "right" }}
              >
                <Button
                  className="add-btn"
                  onClick={() => {
                    add();
                  }}
                >
                  Thêm bài kiểm tra
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};
