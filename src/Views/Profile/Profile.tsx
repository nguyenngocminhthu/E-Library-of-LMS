import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Tabs } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { BreadcrumbComp } from "../../Components/Breadcrumb";
import { InputLabel } from "../../Components/InputLabel";
import './style.scss';

const { Option } = Select;

const { TabPane } = Tabs;
export const Profile = () => {
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    form.setFieldsValue(user)
  },[])

  return (
    <div className="profile-page">
      <BreadcrumbComp title="Thông tin người dùng" />
      <div className="tab-notilist">
        <Tabs defaultActiveKey="1" type="card" size={"small"}>
          <TabPane tab="Thông tin cá nhân" key="1">
            <div className="tab-control">
              <Button type="primary" onClick={() => setDisable(!disable)}>
                Chỉnh sửa
              </Button>
            </div>
            <div className="box-cover">
              <div className="header-box">
                <p className="text-header">Thông tin chung</p>
              </div>
              <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                name="profile-form"
                layout="horizontal"
                form={form}
              >
                <Row style={{ padding: "16px" }}>
                  <Col span={6}></Col>
                  <Col span={8} offset={1}>
                    <Form.Item label="Mã người dùng" name="userCode">
                      <Input disabled={disable} />
                    </Form.Item>
                    <Form.Item label="Giới tính" name="gender">
                      <Select disabled={disable} style={{ width: 120 }}>
                        <Option value={0}>Nam</Option>
                        <Option value={1}>Nữ</Option>
                        <Option value={2}>Other</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Vai trò" name="role">
                      <Input disabled={disable} />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                      <Input disabled={disable} />
                    </Form.Item>
                  </Col>
                  <Col span={8} offset={1}>
                    <Form.Item label="Tên người dùng" name="userName">
                      <Input disabled={disable} />
                    </Form.Item>
                    <Form.Item label="Số điện thoại" name="phone">
                      <Input disabled={disable} />
                    </Form.Item>
                    <Form.Item label="Địa chỉ" name="address">
                      <TextArea disabled={disable} rows={4} />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </TabPane>
          <TabPane tab="Thay đổi mật khẩu" key="2">
            <div className="box-cover">
              <div className="header-box">
                <p className="text-header">Thay đổi mật khẩu</p>
              </div>
              <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                name="profile-form"
                layout="horizontal"
                form={form}
              >
                <Row style={{ padding: "16px" }}>
                  <Col span={15} offset={1}>
                    <Form.Item
                      label="Mật khẩu hiện tại"
                      name="passwordCurrent"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password disabled={disable} />
                    </Form.Item>
                    <Form.Item
                      label="Mật khẩu mới"
                      name="newPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please input your new password!",
                        },
                      ]}
                    >
                      <Input.Password disabled={disable} />
                    </Form.Item>
                    <Form.Item
                      label="Nhập lại mật khẩu mới"
                      name="renewPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please input your new password again!",
                        },
                      ]}
                    >
                      <Input.Password disabled={disable} />
                    </Form.Item>
                  </Col>
                  <Col span={6} offset={2}>
                    <Row>
                      <Col span={2}>
                        <InfoCircleOutlined className="waring-passwod" />
                      </Col>
                      <Col span={21} offset={1}>
                        Mật khẩu phải có ít nhất 8 ký tự bao gồm:
                        <li>- Chữ cái</li>
                        <li>- Số</li>
                        <li>- Chữ cái viết hoa </li>
                        <li>- Chữ cái viết thường</li>
                        <li>- Các ký tự đặc biệt như ! ~ / ) * ^ $ &...</li>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <div className="btn-center">
                  <Button className="default-btn">Hủy</Button>
                  <Button type="primary">Lưu</Button>
                </div>
              </Form>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
