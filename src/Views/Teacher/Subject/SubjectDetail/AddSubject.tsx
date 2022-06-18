import {
  LinkOutlined,
} from "@ant-design/icons";
import { Button, Input, Form, Upload, message, Select, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import SunEditor from "suneditor-react";
import { BreadcrumbComp } from "../../../../Components/Breadcrumb";
import { ReactComponent as ColoudUp } from "../../../../shared/img/icon/cloud_up.svg";

const { Dragger } = Upload;
const { Option } = Select;

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info: any) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e: any) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

export const AddSubject = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  return (
    <div className="subDetail teacher-subject">
      <BreadcrumbComp
        title="Thương mại điện tử"
        prevPageTitle="Danh sách môn giảng dạy"
        prevPage="teacher/subject"
      />
      <div className="box-cover">
        <div className="header-box">
          <div className="text-header">Thông tin chung</div>
        </div>
        <div className="add-subject-container">
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            layout="horizontal"
            className="modal-add-role"
            form={form}
          >
            <Form.Item name="subcode" label="Tiêu đề" required>
              <Input placeholder="Admin" />
            </Form.Item>
            <Form.Item name="codesuject" label="Ghi chú">
              <SunEditor
                setOptions={{
                  defaultTag: "div",
                  minHeight: "150px",
                  showPathLabel: false,
                  buttonList: [
                    ["undo", "redo"],
                    ["fontSize", "bold", "underline", "italic"],
                    ["align", "image"],
                    ["list", "outdent", "indent"],
                    ["fullScreen"],
                  ],
                }}
              />
            </Form.Item>
          </Form>
        </div>
        <div className="header-box">
          <div className="text-header">Nội dung bài giảng</div>
        </div>
        <div className="add-subject-container">
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            layout="horizontal"
            className="modal-add-role"
            form={form}
          >
            <Form.Item name="subcode" label="Bài giảng" required>
              <div className="download-file">
                <div className="file-name">
                  <LinkOutlined />
                  HTKL_KT4SP_10A1.doc
                </div>
                <Button>Tải lên</Button>
              </div>
              <span className="note-span">
                Kiểu file .pdf .jpeg .png .jpg với dung lượng tối đa là 100 MB.
              </span>
            </Form.Item>
            <Form.Item label="Upload">
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <ColoudUp />
                </p>
                <p className="ant-upload-text">
                  Có thể thêm tập tin bằng cách kéo thả
                </p>
                <p className="ant-upload-hint">
                  Hỗ trợ tải lên một lần hoặc hàng loạt.
                </p>
              </Dragger>
            </Form.Item>
          </Form>
        </div>
        <div className="header-box">
          <div className="text-header">Phân công bài giảng</div>
        </div>
        <div className="add-subject-container">
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            layout="horizontal"
            className="modal-add-role"
            form={form}
          >
            <Form.Item name="subcode" label="Lớp học" required>
              <div className="selectcomp">
                <Select defaultValue={0}>
                  <Option value={0}>
                    <Checkbox>Tất cả lớp học</Checkbox>
                  </Option>
                  <Option value={1}>
                    <Checkbox>Hệ thống thông tin kinh doanh 1</Checkbox>
                  </Option>
                  <Option value={2}>
                    <Checkbox>Ngân hàng 1</Checkbox>
                  </Option>
                  <Option value={3}>
                    <Checkbox>Thương mại điện tử 1</Checkbox>
                  </Option>
                </Select>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="action-btn-add">
        <Button className="cancel-btn">Huỷ</Button>
        <Button type="primary" style={{ marginLeft: "1rem" }}>
          Lưu
        </Button>
      </div>
    </div>
  );
};
