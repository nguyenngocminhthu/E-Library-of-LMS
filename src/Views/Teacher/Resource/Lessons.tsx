import {
  DownloadOutlined,
  MoreOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Popover,
  Row,
  Space,
  Table,
  Tooltip,
} from "antd";
import modal from "antd/lib/modal";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import { ReactComponent as Word } from "../../../shared/img/icon/word.svg";
import { ReactComponent as Powerpoint } from "../../../shared/img/icon/pptw_file.svg";
import { ReactComponent as Excel } from "../../../shared/img/icon/excel_file.svg";
import { ReactComponent as Mp4 } from "../../../shared/img/icon/mp4_file.svg";
import { ReactComponent as Delete } from "../../../shared/img/icon/fi_delete.svg";

export const Lessons = () => {
  const navigate = useNavigate();
  const params = useParams<{ idSub: string }>();
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const subjectSelect = [
    {
      name: "Công nghệ thông tin",
      value: "CNTT",
    },
    {
      name: "Tài chính kế toán",
      value: "TCKT",
    },
    {
      name: "Xã hội học",
      value: "XHH",
    },
  ];

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

  const data = [
    {
      key: "1",
      fileType: 3,
      fileName: "GTTTMDT01.mp4",
      subject: "Văn học",
      editor: "Nguyễn Văn A",
      lastEdit: "12/02/2020 - 14:08",
      size: "20.5 MB",
    },
    {
      key: "2",
      fileType: 1,
      fileName: "GTTTMDT01.doc",
      subject: "Toán đại số",
      editor: "Phạm Thị C",
      lastEdit: "12/02/2020 - 14:08",
      size: "20.5 MB",
    },
    {
      key: "3",
      fileType: 0,
      fileName: "GTTTMDT01.pptx",
      subject: "Toán hình họcc",
      editor: "Nguyễn Văn A",
      lastEdit: "12/02/2020 - 14:08",
      size: "20.5 MB",
    },
  ];
  const columnsTable = [
    {
      title: "Tên file",
      dataIndex: "nameType",
      key: "nameType",
    },
    {
      title: "Thể loại",
      dataIndex: "fileType",
      key: "fileType",
      render: (fileType: number) => {
        return (
          <>
            {fileType === 0
              ? "Powerpoint"
              : fileType === 1
              ? "Word"
              : fileType === 2
              ? "Excel"
              : "Mp4"}
          </>
        );
      },
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      key: "size",
    },
    { 
      title: "",
      key: "action",
      render: (text: any, record: any) => (
        <Delete
        style={{
          fontSize: "24px",
        }}
      />
      ),
    },
  ];

  const dataTable = [
    {
      key: "11",
      fileType: 2,
      nameType: "Tiềm năng của thương mại điện tử.doc",
      size: "2 MB",
    },
    {
      key: "12",
      fileType: 2,
      nameType: "Tiềm năng của thương mại điện tử.doc",
      size: "2 MB",
    },
    {
      key: "13",
      fileType: 1,
      nameType: "Tiềm năng của thương mại điện tử.doc",
      size: "2 MB",
    },
  ];

  const seeDetails = {
    title: "Tổng quan về Thương mại Điện tử ở Việt Nam",
    width: "90%",
    content: <div></div>,
  };

  const modalChangeName = {
    title: "Đổi tên tệp",
    width: "40%",
    className: "modal-common-style",
    content: (
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        name="profile-form"
        layout="horizontal"
        form={form}
      >
        <Form.Item label="Tên mới" name="userName">
          <div className="input-layout">
            <Input />
            .file
          </div>
        </Form.Item>
      </Form>
    ),
    okText: "Lưu",
    cancelText: "Huỷ",
  };

  const removeRow = {
    title: "Xác nhận xóa",
    className: "modal-common-style",
    content: "Bạn có chắc chắn muốn xóa tệp này khỏi thư viện không?",
    okText: "Xoá",
    cancelText: "Huỷ",
  };
  const downloadFile = {
    title: "Tải xuống tệp",
    className: "modal-common-style",
    content:
      "Xác nhận muốn tải xuống 25 tệp đã chọn. Các file đã chọn sẽ được lưu dưới dạng .rar.",
    okText: "Xác nhận",
    cancelText: "Huỷ",
  };

  const modalUpload = {
    title: "Thêm bài giảng",
    width: "40%",
    className: "modal-add-role",
    content: (
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        name="profile-form"
        layout="horizontal"
        form={form}
      >
        <Form.Item label="Chọn môn học" name="userName">
          <SelectComp
            style={{ display: "block" }}
            defaultValue="Tùy chọn môn học"
            dataString={subjectSelect}
          />
          <div className="upload-file">
            <Button
              icon={<UploadOutlined style={{ color: "#f17f21" }} />}
              style={{ float: "left" }}
            >
              Tải lên
            </Button>
          </div>
        </Form.Item>
        <div className="subject">
          <Table
            columns={columnsTable}
            dataSource={dataTable}
            pagination={false}
          />
        </div>
      </Form>
    ),
    okText: "Lưu",
    cancelText: "Huỷ",
    onOk: () => form.submit(),
  };

  const modalAddSubject = {
    title: "Thêm bài giảng vào môn học",
    width: "40%",
    className: "modal-add-role",
    content: (
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        name="profile-form"
        layout="horizontal"
        form={form}
      >
        <div style={{ marginBottom: "16px" }} className="subject">
          <Table
            columns={columnsTable}
            dataSource={dataTable}
            pagination={false}
          />
        </div>
        <Form.Item label="Chọn môn học">
          <SelectComp
            style={{ display: "block" }}
            defaultValue="Tùy chọn môn học"
            dataString={subjectSelect}
          />
        </Form.Item>
        <Form.Item label="Chọn lớp học">
          <SelectComp
            style={{ display: "block" }}
            defaultValue="Tùy chọn môn học"
            dataString={classSelect}
          />
        </Form.Item>
        <Form.Item label="Chọn chủ đề">
          <SelectComp
            style={{ display: "block" }}
            defaultValue="Tùy chọn môn học"
            dataString={topicSelect}
          />
        </Form.Item>
        <Form.Item label="Tiêu đề bài giảng">
          <Input />
        </Form.Item>
      </Form>
    ),
    okText: "Lưu",
    cancelText: "Huỷ",
    onOk: () => form.submit(),
  };

  const columns = [
    {
      title: "Thể loại",
      dataIndex: "fileType",
      key: "fileType",
      render: (fileType: number) => {
        return (
          <>
            {fileType === 0 ? (
              <Powerpoint />
            ) : fileType === 1 ? (
              <Word />
            ) : fileType === 2 ? (
              <Excel />
            ) : (
              <Mp4 />
            )}
          </>
        );
      },
    },
    {
      title: "Tên",
      dataIndex: "fileName",
      key: "fileName",
    },
    {
      title: "Môn học",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Người chỉnh sửa",
      dataIndex: "editor",
      key: "editor",
    },
    {
      title: "Ngày sửa lần cuối",
      dataIndex: "lastEdit",
      key: "lastEdit",
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Tooltip title="More">
            <Popover
              content={
                <div className="popover">
                  <p onClick={() => modal.confirm(seeDetails)}>Xem chi tiết</p>
                  <p onClick={() => modal.confirm(modalChangeName)}>Đổi tên</p>
                  <p onClick={() => modal.confirm(downloadFile)}>Tải xuống</p>
                  <p onClick={() => modal.confirm(modalAddSubject)}>
                    Thêm vào môn học
                  </p>
                  <p onClick={() => modal.confirm(removeRow)}>Xoá file</p>
                </div>
              }
              trigger="click"
            >
              <Button
                // onClick={() => navigate(`/subjectManage/${record.subCode}`)}
                icon={
                  <MoreOutlined
                    style={{
                      fontSize: "24px",
                    }}
                  />
                }
              />
            </Popover>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="subject sub-manage teacher-subject">
      <BreadcrumbComp
        title="Tất cả bài giảng"
        prevPageTitle="Danh sách môn giảng dạy"
        prevPage="teacher/subject"
      />
      <div className="top-head">
        <h1>Danh sách tài nguyên</h1>
        <div style={{ display: "flex" }}>
          <Space className="" size="middle">
            <Tooltip title="Download">
              <Button
                type="link"
                icon={
                  <DownloadOutlined
                    onClick={() => modal.confirm(downloadFile)}
                  />
                }
              />
            </Tooltip>
          </Space>
          <div className="line"></div>
          <Button
            icon={<UploadOutlined />}
            onClick={() => modal.confirm(modalUpload)}
            className="default-btn icon-custom"
          >
            Tải lên
          </Button>
        </div>
      </div>
      <Row>
        <Col className="table-header" span={16}>
          <SelectComp
            style={{ display: "block" }}
            defaultValue="Tùy chọn môn học"
            dataString={subjectSelect}
          />
        </Col>
        <Col className="table-header" span={8}>
          <SearchComponent placeholder="Tìm kết quả theo tên, lớp, môn học,..." />
        </Col>
      </Row>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};
