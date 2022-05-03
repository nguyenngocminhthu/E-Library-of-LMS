import { DownloadOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Input, Menu, Row, Space, Table, Tooltip } from "antd";
import modal from "antd/lib/modal";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import "./style.scss";

const subject = [
  {
    name: "Thể loại",
    value: "default",
  },
  {
    name: "Mp4",
    value: "mp4",
  },
  {
    name: "Mp3",
    value: "mp3",
  },
  {
    name: "Doc",
    value: "doc",
  },
  {
    name: "Pptx",
    value: "pptx",
  },
  {
    name: "Xlsx",
    value: "xlsx",
  },
];
const modalChangeName = {
  title: "Đổi tên tệp",
  width: "50%",
  className: "modal-change-name",  
  content: (
    <div className="input-layout">
      <Input />
      .file
    </div>
  ),
  okText: "Lưu",
  cancelText: "Huỷ",
};

const removeRow = {
  title: "Xác nhận xóa",
  className: "modal-change-name",
  content:
    "Bạn có chắc chắn muốn xóa tệp này khỏi thư viện không?",
  okText: "Xoá",
  cancelText: "Huỷ",
};

const downloadFile = {
  title: "Tải xuống tệp",
  className: "modal-change-name",
  content:
    "Xác nhận muốn tải xuống 25 tệp đã chọn. Các file đã chọn sẽ được lưu dưới dạng .rar.",
  okText: "Xác nhận",
  cancelText: "Huỷ",
};

export const PrivateFile = () => {
  const navigate = useNavigate();
  const userMenu = (
    <Menu>
      <Menu.Item key="1">Xem trước</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2"  onClick = {() => modal.confirm(modalChangeName)}>Đổi tên</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick = {() => modal.confirm(downloadFile)}>Tải xuống</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4" onClick = {() => modal.confirm(removeRow)}>Xóa</Menu.Item>
    </Menu>
  );
  const columns = [
    {
      title: "Thể loại",
      dataIndex: "category",
      key: "category",
      sorter: true,
    },
    {
      title: "Tên",
      dataIndex: "nameFile",
      key: "nameFile",
      sorter: true,
      // sorter: (a: any, b: any) => a.subName.length - b.subName.length,
      // render: (subName: string, record: any) => (
      //   <div onClick={() => navigate(`/subjects/${record.subCode}`)}>
      //     {subName}
      //   </div>
      // ),
    },
    {
      title: "Người chỉnh sửa",
      dataIndex: "editor",
      key: "editor",
      sorter: true,
    },
    {
      title: "Ngày sửa lần cuối",
      dataIndex: "dayEdit",
      key: "dayEdit",
      sorter: true,
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      key: "size",
      sorter: true,
    },
    {
      title: "",
      key: "action",
      render: (text: any, record: any) => (
        <Dropdown.Button
        className="dropdown-btn"
        overlay={userMenu}
        icon={
          <MoreOutlined
            style={{
              fontSize: '24px',
            }}
           
          />
        }
      ></Dropdown.Button>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      subCode: "2020-6B",
      subName: "Thương mại điện tử",
      teacher: "Nguyễn Văn A",
      file: "15/20",
      status: 0,
      createdAt: "12/02/2021",
    },
    {
      key: "2",
      subCode: "2020-6C",
      subName: "Nguyên lý kế toán",
      teacher: "Nguyễn Văn A",
      file: "15/20",
      status: 1,
      createdAt: "12/02/2021",
    },
    {
      key: "3",
      subCode: "2020-6A",
      subName: "Hệ thống thông tin",
      teacher: "Nguyễn Văn A",
      file: "15/20",
      status: 0,
      createdAt: "12/02/2021",
    },
  ];

  return (
    <div className="privateFile-page">
      <BreadcrumbComp title="Tất cả các tệp" />
      <div className="header-control">
        <Space className="" size="middle">
          <Tooltip title="Download">
            <Button
              type="link"
              icon={<DownloadOutlined onClick = {() => modal.confirm(downloadFile)} style={{ fontSize: "36px" }} />}
            />
          </Tooltip>
        </Space>
        <div className="line"></div>
        <Button type="primary">Đăng tải</Button>
      </div>
      <Row>
        <Col className="table-header" span={16}>
          <SelectComp
            style={{ display: "block" }}
            defaultValue="Thể loại"
            dataString={subject}
          />
        </Col>
        <Col className="table-header" span={8}>
          <SearchComponent />
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
