import { FormOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import './style.scss';

const { Option } = Select;

export const Information = () => {
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    form.setFieldsValue(user)
  },[])

  return (
    <div className="information-system-page">
      <BreadcrumbComp title="Thông tin người dùng" />
      <div className="tab-control">
        <Button type="primary" onClick={() => setDisable(!disable)}>
          <FormOutlined />
          Chỉnh sửa
        </Button>
      </div>
      <div className="tab-notilist">
        <div className="box-cover">
          <div className="header-box">
            <p className="text-header">Thông tin hệ thống thư viện</p>
          </div>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            name="profile-form"
            layout="horizontal"
            form={form}
          >
            <Row style={{ padding: "16px" }}>
              <Col span={6}></Col>
              <Col span={8} offset={1}>
                <Form.Item label="Mã trường học" name="schoolCode">
                  <Input disabled={disable} />
                </Form.Item>
                <Form.Item label="Tên trường học" name="schoolName">
                  <Input disabled={disable} />
                </Form.Item>
                <Form.Item label="Website" name="website">
                  <Input disabled={disable} />
                </Form.Item>
              </Col>
              <Col span={8} offset={1}>
                <Form.Item label="Loại trường" name="schoolType">
                  <Select disabled={disable}>
                    <Option value={0}>Dân lập</Option>
                    <Option value={1}>Công lập</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Hiệu trưởng" name="headmaster">
                  <Input disabled={disable} />
                </Form.Item>
              </Col>
            </Row>
            <hr className="line" />
            <Row style={{ padding: "16px" }}>
              <Col span={6}></Col>
              <Col span={8} offset={1}>
                <Form.Item label="Tên hệ thống thư viện" name="libraryName">
                  <Input disabled={disable} />
                </Form.Item>
                <Form.Item label="Địa chỉ truy cập" name="adressConect">
                  <Input disabled={disable} />
                </Form.Item>
              </Col>
              <Col span={8} offset={1}>
                <Form.Item label="Số điện thoại" name="phone">
                  <Input disabled={disable} />
                </Form.Item>
                <Form.Item label="Email" name="email">
                  <Input disabled={disable} />
                </Form.Item>
              </Col>
            </Row>
            <hr className="line" />
            <Row style={{ padding: "16px" }}>
              <Col span={6}></Col>
              <Col span={8} offset={1}>
                <Form.Item label="Ngôn ngữ xác định" name="language">
                  <Select disabled={disable}>
                    <Option value={0}>Tiếng Việt</Option>
                    <Option value={1}>Tiếng Anh</Option>
                    <Option value={2}>Tiếng Trung Quốc</Option>
                    <Option value={3}>Tiếng Pháp</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Niên khóa mặc định" name="schoolYear">
                  <Select disabled={disable}>
                    <Option value={0}>2019-2020</Option>
                    <Option value={1}>2020-2021</Option>
                    <Option value={2}>2021-2022</Option>
                    <Option value={3}>2022-2023</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} offset={1}></Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Information;


