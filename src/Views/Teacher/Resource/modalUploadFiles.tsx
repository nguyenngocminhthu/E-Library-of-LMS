import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadFilesToFirebase } from "../../../Apis/Firebase";
import { ISelect, SelectComp } from "../../../Components/Select";
import { createFile } from "../../../redux/reducers/file.reducer";
import { ILesson } from "../../../redux/reducers/lesson.reducer";
import { setLoading } from "../../../redux/reducers/loading.reducer";
import {
  getSubject,
  getSubjects,
  ISubject,
} from "../../../redux/reducers/subject.reducer";
import { getTopic, ITopic } from "../../../redux/reducers/topic.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";

export const ModalUploadFiles: React.FC<{
  visible: boolean;
  setVisible: any;
  data: any;
  handleRefresh: any;
}> = (props) => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");

  const [subjectSelect, setSubjectSelect] = useState<ISelect[]>([]);
  const [topicSelect, setTopicSelect] = useState<ISelect[]>();
  const [lessonSelect, setLessonSelect] = useState<ISelect[]>();

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

  const onFinish = async (values: any) => {
    delete values.topic;
    dispatch(setLoading(true));

    await dispatch(uploadFilesToFirebase(values.url.fileList, "File")).then(
      (rs) => {
        dispatch(setLoading(false));

        values.url = rs;
      }
    );
    dispatch(createFile({ ...values, user: user.id }))
      .unwrap()
      .then((rs) => {
        props.handleRefresh();
        form.resetFields();
        props.setVisible(false);
      });
  };

  const handleSelect = (e: any) => {
    dispatch(getSubject(e))
      .unwrap()
      .then((rs: ISubject) => {
        let topic: any[] = [];
        rs.topic.forEach((vl: ITopic) => {
          topic.push({ name: vl.title, value: vl.id });
        });
        setTopicSelect(topic);
      });
  };

  const handleSelectLesson = (e: any) => {
    dispatch(getTopic(e))
      .unwrap()
      .then((rs: ITopic) => {
        let option: any[] = [];
        rs.lesson.forEach((vl: ILesson) => {
          option.push({ name: vl.title, value: vl.id });
        });
        setLessonSelect(option);
      });
  };

  return (
    <Modal
      title="Thêm tài liệu"
      className="modal-add-role"
      width="40%"
      visible={props.visible}
      onCancel={() => {
        props.setVisible(false);
        form.resetFields();
        setTopicSelect(undefined);
        setLessonSelect(undefined);
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
          label="Chọn môn học"
          name="subject"
          rules={[{ required: true }]}
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
            onChange={(e: any) => handleSelectLesson(e)}
          />
        </Form.Item>
        <Form.Item
          label="Chọn bài giảng"
          name="lesson"
          rules={[{ required: true }]}
        >
          <SelectComp
            disabled={lessonSelect === undefined}
            style={{ display: "block" }}
            dataString={lessonSelect}
          />
        </Form.Item>
        <Form.Item
          name="url"
          label="File"
          className="upload-file"
          rules={[{ required: true }]}
        >
          <Upload beforeUpload={() => false}>
            <Button icon={<UploadOutlined style={{ color: "#f17f21" }} />}>
              Tải lên
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};
