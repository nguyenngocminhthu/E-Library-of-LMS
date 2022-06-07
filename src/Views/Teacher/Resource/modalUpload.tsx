import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadFilesToFirebase } from "../../../Apis/Firebase";
import { SelectComp } from "../../../Components/Select";
import { AppDispatch } from "../../../redux/store";

const { Option } = Select;

export const ModalUpload: React.FC<{
  visible: boolean;
  setVisible: any;
  data: any;
}> = (props) => {
  const [form] = Form.useForm();
  const [linkVideo, setLinkVideo] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();

  const handleChange = (fileList: any) => {
    console.debug(fileList);
    console.debug(URL.createObjectURL(fileList.file));
    setLinkVideo(URL.createObjectURL(fileList.file));
  };

  const classSelect = [
    {
      name: "Lớp học nâng cao",
      value: "hightClass",
    },
    {
      name: "Lớp học cơ bản",
      value: "basicClass",
    },
    {
      name: "Lớp học bổ túc văn hóa",
      value: "subClass",
    },
  ];

  const topicSelect = [
    {
      name: "Chủ đề tự chọn",
      value: "CDTC",
    },
    {
      name: "Chủ đề nâng cao",
      value: "CDNC",
    },
    {
      name: "Chủ đề bổ túc nâng cao",
      value: "CDBCNC",
    },
  ];

  const onFinish = async (values: any) => {
    console.debug(values);
    await dispatch(uploadFilesToFirebase(values.video.fileList, "Video")).then(
      (rs) => {
        console.debug(rs);
        values.video = rs;
      }
    );
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
          <SelectComp style={{ display: "block" }} dataString={props.data} />
        </Form.Item>
        <Form.Item label="Chọn lớp học" name="classes">
          <SelectComp style={{ display: "block" }} dataString={classSelect} />
        </Form.Item>
        <Form.Item label="Chọn chủ đề" name="topic">
          <SelectComp style={{ display: "block" }} dataString={topicSelect} />
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
