import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row, Space, Table, Tooltip, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import modal from "antd/lib/modal";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import {ReactComponent as Edit} from '../../../shared/img/icon/edit.svg'
import {ReactComponent as Trash} from '../../../shared/img/icon/trash.svg'

import "./style.scss";

const { Title } = Typography;

export const RoleManage = () => {
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

  const deleteRow = {
    title: "Xóa vai trò",
    content:
      "Xác nhận muốn phê duyệt đề thi này và các thông tin bên trong? Sau khi phê duyệt sẽ không thể hoàn tác.",
    okText: "Xác nhận",
    cancelText: "Huỷ",
  };

  const modalAddRole = {
    title: "Thiết lập vai trò",
    width: "50%",
    className: "modal-add-role",
    content: (
      <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          name="profile-form"
          layout="horizontal"
        >
          <Form.Item label="Tên vai trò" name="1">
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả" name="2">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Môn học" name="id">
            <Row>
              <Col span={6}>
                <Checkbox value="A">Xem</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="B">Chỉnh sửa</Checkbox>
              </Col>
              <Col span={6}></Col>
              <Col span={6}></Col>
            </Row>
          </Form.Item>
          <Form.Item label="Tệp riêng tư" name="id">
            <Row>
              <Col span={6}>
                <Checkbox value="A">Xem</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="B">Chỉnh sửa</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="C">Xóa</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="D">Thêm mới</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="E">Tải xuống</Checkbox>
              </Col>
            </Row>
          </Form.Item>
          <hr className="line" />
          <Form.Item label="Bài giảng/tài nguyên" name="id">
            <Row>
              <Col span={6}>
                <Checkbox value="A">Xem</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="B">Chỉnh sửa</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="C">Xóa</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="D">Thêm mới</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="E">Tải xuống</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="F">Thêm vào môn học</Checkbox>
              </Col>
            </Row>
          </Form.Item>
          <hr className="line" />
          <Form.Item label="Đề thi & bài kiểm tra:" name="id">
            <Row>
              <Col span={6}>
                <Checkbox value="A">Xem</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="B">Chỉnh sửa</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="C">Xóa</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="D">Thêm mới</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="E">Tải xuống</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="F">Phê duyệt</Checkbox>
              </Col>
            </Row>
          </Form.Item>
          <hr className="line" />
          <Form.Item label="Thông báo" name="id">
            <Row>
              <Col span={6}>
                <Checkbox value="A">Xem</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="B">Chỉnh sửa</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="C">Xóa</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="D">Thêm mới</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="E">Cài đặt</Checkbox>
              </Col>
            </Row>
          </Form.Item>
          <hr className="line" />
          <Form.Item label="Phân quyền" name="id">
            <Row>
              <Col span={6}>
                <Checkbox value="A">Xem</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="B">Chỉnh sửa</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="C">Xóa</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="D">Thêm mới</Checkbox>
              </Col>
            </Row>
          </Form.Item>
          <hr className="line" />
          <Form.Item label="Tài khoản người dùng" name="id">
            <Row>
              <Col span={6}>
                <Checkbox value="A">Xem</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="B">Chỉnh sửa</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="C">Xóa</Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox value="D">Thêm mới</Checkbox>
              </Col>
            </Row>
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
      <BreadcrumbComp title="Quản lý vai trò" />
      <div className="title-page">
        <Title ellipsis level={5}>
          Danh sách các nhóm người dùng
        </Title>

        <Button
          className="btn-location"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => modal.confirm(modalAddRole)}
        >
          Thêm vai trò
        </Button>
      </div>
      <Row>
        <Col className="table-header" span={16}></Col>
        <Col className="table-header" span={8}>
          <SearchComponent placeholder="Tìm kết quả theo tên nhóm"/>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
