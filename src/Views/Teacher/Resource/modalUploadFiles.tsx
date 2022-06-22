import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFilesToFirebase } from "../../../Apis/Firebase";
import { SelectComp } from "../../../Components/Select";
import {
  getClass,
  getClasses,
  IClass,
} from "../../../redux/reducers/classes.reducer";
import { createFile } from "../../../redux/reducers/file.reducer";
import {
  createLesson,
  ILesson,
  updateLesson,
} from "../../../redux/reducers/lesson.reducer";
import {
  getSubject,
  getSubjects,
  ISubject,
} from "../../../redux/reducers/subject.reducer";
import { getTopic, ITopic } from "../../../redux/reducers/topic.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import { ISubjectSelect } from "../../Leadership/Subject/Subject";

const { Option } = Select;

export const ModalUploadFiles: React.FC<{
  visible: boolean;
  setVisible: any;
  data: any;
  handleRefresh: any;
}> = (props) => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const dataSub = useSelector(
    (state: any) => state.subject.listSubject.results
  );
  const [subjectSelect, setSubjectSelect] = useState<ISubjectSelect[]>([]);
  const [classSelect, setClassSelect] = useState<ISubjectSelect[]>();
  const [topicSelect, setTopicSelect] = useState<ISubjectSelect[]>();
  const [lessonSelect, setLessonSelect] = useState<ISubjectSelect[]>();

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

  const onFinish = async (values: any) => {
    console.debug(values);
    delete values.topic;

    await dispatch(uploadFilesToFirebase(values.url.fileList, "File")).then(
      (rs) => {
        console.debug(rs);
        values.url = rs;
        props.setVisible(false);
      }
    );
    dispatch(createFile({ ...values, user: user.id }))
      .unwrap()
      .then((rs) => {
        console.debug(rs);
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
      title="Thêm bài giảng"
      className="modal-add-role"
      width="40%"
      visible={props.visible}
      onCancel={() => {
        props.setVisible(false);
        form.resetFields();
        setClassSelect(undefined);
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
        <Form.Item label="Chọn môn học" name="subject" rules={[{ required: true }]}>
          <SelectComp
            onChange={(e: any) => handleSelect(e)}
            style={{ display: "block" }}
            dataString={subjectSelect}
          />
        </Form.Item>
        <Form.Item label="Chọn lớp học" name="classes" rules={[{ required: true }]}>
          <SelectComp
            mode="multiple"
            allowClear={true}
            disabled={classSelect === undefined}
            style={{ display: "block" }}
            dataString={classSelect}
          />
        </Form.Item>
        <Form.Item label="Chọn chủ đề" name="topic" rules={[{ required: true }]}>
          <SelectComp
            disabled={topicSelect === undefined}
            style={{ display: "block" }}
            dataString={topicSelect}
            onChange={(e: any) => handleSelectLesson(e)}
          />
        </Form.Item>
        <Form.Item label="Chọn bài giảng" name="lesson" rules={[{ required: true }]}>
          <SelectComp
            disabled={lessonSelect === undefined}
            style={{ display: "block" }}
            dataString={lessonSelect}
          />
        </Form.Item>
        <Form.Item name="url" label="File" className="upload-file" rules={[{ required: true }]}>
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
