import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Table, Tag, Tooltip } from "antd";
import modal from "antd/lib/modal";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BreadcrumbComp } from "../../../../Components/Breadcrumb";
import SearchComponent from "../../../../Components/SearchComponent";
import { SelectComp } from "../../../../Components/Select";
import "../style.scss";
import { ModalAdd } from "./ModalAdd";

const status = [
  {
    name: "Đã phê duyệt",
    value: "DPD",
  },
  {
    name: "Chờ phê duyệt",
    value: "CPD",
  },
];

export const ListFile = () => {
  const navigate = useNavigate();
  const params = useParams<{ idSub: string }>();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      title: "Tên tài liệu",
      dataIndex: "fileName",
      key: "fileName",
      sorter: (a: any, b: any) => a.fileName.length - b.fileName.length,
    },
    {
      title: "Phân loại",
      dataIndex: "fileType",
      key: "fileType",
    },
    {
      title: "Ngày gửi phê duyệt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Người phê duyệt",
      dataIndex: "approver",
      key: "approver",
    },
    {
      title: "Tình trạng phê duyệt",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (
        <Tag
          color={status === 0 ? "green" : status === 1 ? "blue" : "red"}
          key={status}
        >
          {status === 0
            ? "Chờ phê duyệt"
            : status === 1
            ? "Đã phê duyệt"
            : "Đã huỷ"}
        </Tag>
      ),
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      render: (note: string) => {
        return <div style={{ color: "#ED2025" }}>{note}</div>;
      },
    },
    {
      title: "",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Detail">
            <Button
              onClick={() => modal.confirm(seeDetails)}
              // onClick={() => navigate(`/subjectManage/${record.subCode}`)}
              icon={<EyeOutlined />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      fileName: "Thương mại điện tử.mp4",
      fileType: "Bài giảng",
      createdAt: "12/02/2021",
      approver: "Admin",
      status: 0,
      note: "Không phù hợp giáo trình",
    },
    {
      key: "2",
      fileName: "Nguyên lý kế toán.docx",
      fileType: "Bài giảng",
      createdAt: "12/02/2021",
      approver: "Admin",
      status: 0,
      note: "",
    },
    {
      key: "3",
      fileName: "Hệ thống thông tin.xlsx",
      fileType: "Bài giảng",
      createdAt: "12/02/2021",
      approver: "Admin",
      status: 0,
      note: "",
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

  const seeDetails = {
    title: "Tổng quan về Thương mại Điện tử ở Việt Nam",
    className: "modal-delete",
    width: "90%",
    content: <div></div>,
  };

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="subject sub-manage teacher-subject">
      <BreadcrumbComp
        title="Danh sách tài liệu"
        prevPageTitle="Danh sách môn giảng dạy"
        prevPage="teacher/subject"
      />
      <div className="top-head">
        <h1>Thương mại điện tử</h1>
        <div style={{ display: "flex" }}>
          <Space className="" size="middle">
            <Tooltip title="Delete">
              <Button
                type="link"
                disabled={selectedRowKeys.length === 0 ? true : false}
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Space>
          <div className="line"></div>
          <Button className="default-btn" style={{ marginLeft: "1rem" }}>
            Tải xuống
          </Button>
          <Button
            style={{ marginLeft: "1rem" }}
            type="primary"
            onClick={() => setIsModalVisible(true)}
          >
            Thêm mới
          </Button>
        </div>
      </div>
      <Row>
        <Col className="table-header" span={16}>
          <SelectComp
            style={{ display: "block" }}
            textLabel="Tình trạng tài liệu"
            defaultValue="Tất cả tình trạng"
            dataString={status}
          />
        </Col>
        <Col className="table-header" span={8}>
          <SearchComponent placeholder="Tìm kết quả theo tên, lớp, môn học,..." />
        </Col>
      </Row>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      <ModalAdd visible={isModalVisible} setVisible={setIsModalVisible} />
    </div>
  );
};
