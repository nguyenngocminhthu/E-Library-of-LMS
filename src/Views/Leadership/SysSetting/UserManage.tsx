import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Space, Table, Tooltip, Typography } from "antd";
import modal from "antd/lib/modal";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import {ReactComponent as Edit} from '../../../shared/img/icon/edit.svg'
import {ReactComponent as Trash} from '../../../shared/img/icon/trash.svg'

import "./style.scss";

const { Option } = Select;
const { Title } = Typography;

export const UserManage = () => {

  const roleMenu = [
    {
      name: "Quản trị viên",
      value: "admin",
    },
    {
      name: "Học sinh",
      value: "student",
    },
    {
      name: "Giáo viên",
      value: "teacher",
    },
  ];
  
  const columns = [
    {
      title: "Tên nhóm",
      dataIndex: "groupName",
      key: "groupName",
      sorter: true,
    },
    {
      title: "Mô tả",
      dataIndex: "describe",
      key: "describe",
      // sorter: (a: any, b: any) => a.subName.length - b.subName.length,
    },
    {
      title: "Lần cập nhật cuối",
      dataIndex: "lastUpdate",
      key: "lastUpdate",
      sorter: true,
    },
    {
      title: "",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button icon={<Edit />} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button icon={<Trash onClick={() => modal.confirm(deleteRow)}/>} />
          </Tooltip>
        </Space>
      ),
    },
  ];
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

  const deleteRow = {
    title: "Xóa vai trò",
    className: "modal-delete",
    content:
      "Xác nhận muốn phê duyệt đề thi này và các thông tin bên trong? Sau khi phê duyệt sẽ không thể hoàn tác.",
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
      >
        <Form.Item label="Mã người dùng" name="1">
          <Input />
        </Form.Item>
        <Form.Item label="Tên" name="2">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="3">
          <Input />
        </Form.Item>
        <Form.Item label="Tên vai trò" name="4">
          <Select defaultValue={"Nhân viên"}>
            <Option value={0}>Nhân viên</Option>
            <Option value={1}>Quản lý</Option>
            <Option value={2}>Học viên</Option>
            <Option value={2}>Admin</Option>
          </Select>
        </Form.Item>
      </Form>
    ),
    okText: "Lưu",
    cancelText: "Huỷ",
  };

  const data = [
    {
      key: "1",
      groupName: "Quản trị viên",
      describe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.",
      lastUpdate: "12/12/2021",
    },
    {
      key: "2",
      groupName: "Quản trị viên",
      describe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.",
      lastUpdate: "12/12/2021",
    },
    {
      key: "3",
      groupName: "Quản trị viên",
      describe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.",
      lastUpdate: "12/12/2021",
    },
  ];

  return (
    <div className="role-manage-page">
      <BreadcrumbComp title="Tất cả các tệp" />
      <div className="title-page">
        <Title ellipsis level={5}>
          Danh sách người dùng trên hệ thống
        </Title>
        <Button
          className="btn-location"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => modal.confirm(modalAdd)}
        >
          Thêm mới
        </Button>
      </div>
      <Row>
        <Col className="table-header" span={16}>
          <SelectComp
            style={{ display: "block" }}
            defaultValue="Chọn vai trò"
            dataString={roleMenu}
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

export default UserManage
