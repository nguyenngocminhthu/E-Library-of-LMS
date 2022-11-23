import { Button, Col, Form, Input, Row, Space, Typography } from "antd";
import modal from "antd/lib/modal";
import React, { useEffect, useState } from "react";
import { BreadcrumbComp } from "../../../../../Components/Breadcrumb";
import "../../FeeManage.style.scss";

function ATM() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const modalOTP = {
    width: "40%",
    title: "Nhập mã OTP",
    content: (
      <Form
        name="cancel-form"
        layout="horizontal"
        form={form}
        style={{ textAlign: "left" }}
        className="subject modalOTP"
      >
        <p>
          Vui lòng nhập mã OTP được gửi về tin nhắn SMS trên thiết bị di động
        </p>
        <p>
          (Mã OTP gồm 6 chữ số. Hiệu lực trong vòng{" "}
          <span>
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}s
          </span>
          )
        </p>
        <Input />
      </Form>
    ),
    okText: "Xác nhận",
  };

  return (
    <div className="subDetail creditdebit-style">
      <BreadcrumbComp
        title="Nhập thông tin Visa"
        prevFirstPageTitle="Thanh toán trực tuyến"
        prevSecondPageTitle="Credit/Debit"
        prevFirstPage="student/payschoolfees"
        prevSecondPage="student/payschoolfees/creditdebit"
      />
      <div className="overview">
        <Row>
          <Col span={3}>Đơn vị thụ hưởng:</Col>
          <Col span={21}>CLOUD CAMPUS</Col>
          <Col span={3}>Nội dung thanh toán:</Col>
          <Col span={21}>Thanh toán tiền học phí học kỳ I</Col>
          <Col span={3}>Số tiền:</Col>
          <Col span={21}>8.650.000 VNĐ</Col>
        </Row>
      </div>
      <Title
        ellipsis
        level={5}
        style={{ color: "#ED2025", textAlign: "center" }}
      >
        Quý khách vui lòng không tắt trình duyệt cho đến khi nhận được kết quả
        giao dịch trên website. Xin cảm ơn!
      </Title>
      <Title ellipsis level={5} style={{ color: "#CC5C00" }}>
        Vui lòng nhập các thông tin dưới đây:
      </Title>
      <Space className="space-custom">
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          name="profile-form"
          layout="horizontal"
          form={form}
        >
          <Row style={{ padding: "16px" }}>
            <Col span={12}>
              <Form.Item label="Tên ngân hàng" name="1">
                <Input />
              </Form.Item>
              <Form.Item label="Chi nhánh" name="2">
                <Input />
              </Form.Item>
              <Form.Item label="Số thẻ" name="3">
                <Input />
              </Form.Item>
              <Form.Item label="Tên in trên thẻ" name="4">
                <Input />
              </Form.Item>
            </Col>
            <Col span={11} offset={1}>
              <Form.Item label="Số điện thoại chủ thẻ" name="5">
                <Input />
              </Form.Item>
              <Form.Item label="Số CCCD" name="6">
                <Input />
              </Form.Item>
              <Form.Item label="Ngày phát hành" name="7">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Space>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button
          style={{ marginLeft: "1rem" }}
          type="primary"
          onClick={() => modal.confirm(modalOTP)}
        >
          Thanh toán
        </Button>
      </div>
    </div>
  );
}

export default ATM;
