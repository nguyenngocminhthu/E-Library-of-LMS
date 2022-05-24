import { DownloadOutlined, MoreOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Space, Table, Tooltip } from "antd";
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

const status = [
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

export const Resource = () => {
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
            <Button
              // onClick={() => navigate(`/subjectManage/${record.subCode}`)}
              icon={<MoreOutlined />}
            />
          </Tooltip>
        </Space>
      ),
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
            {fileType === 0 ? (
              "Powerpoint"
            ) : fileType === 1 ? (
              "Word"
            ) : fileType === 2 ? (
              "Excel"
            ) : (
              "Mp4"
            )}
          </>
        );
      },
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      key: "size",
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

  const downloadFile = {
    title: "Tải xuống tệp",
    className: "modal-change-name",
    content:
      "Xác nhận muốn tải xuống 25 tệp đã chọn. Các file đã chọn sẽ được lưu dưới dạng .rar.",
    okText: "Xác nhận",
    cancelText: "Huỷ",
  };

  const modalAdd = {
    title: "Thêm người dùng mới",
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
            defaultValue="Chọn tổ bộ môn"
            dataString={status}
          />
          <Button
            icon={<UploadOutlined />}
            className="default-btn icon-custom"
            style={{ float: "left"}}
          >
            Tải lên
          </Button>
        </Form.Item>
        <div>
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
          <Button icon={<UploadOutlined /> } onClick={() => modal.confirm(modalAdd)} className="default-btn icon-custom">
            Tải lên
          </Button>
        </div>
      </div>
      <Row>
        <Col className="table-header" span={16}>
          <SelectComp
            style={{ display: "block" }}
            defaultValue="Tùy chọn môn học"
            dataString={status}
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
