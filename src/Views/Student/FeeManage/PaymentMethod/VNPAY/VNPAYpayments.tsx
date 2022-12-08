import { Button, Col, Form, Input, Row, Space, Typography } from "antd";
import modal from "antd/lib/modal";
import React, { useEffect, useState } from "react";
import { BreadcrumbComp } from "../../../../../Components/Breadcrumb";
import "../../FeeManage.style.scss";

function VNPAYpayments() {
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
        title="..."
        prevFirstPageTitle="Thanh toán trực tuyến"
        prevSecondPageTitle="Thanh toán VNPAY"
        prevFirstPage="student/payschoolfees"
        prevSecondPage="student/payschoolfees/vnpay"
      />
      <Row>
        <Col span={4}>
          <img
            alt="example"
            style={{ width: "100%" }}
            src={require("../../../../../shared/img/bank-img/VNPAY.png")}
          />
        </Col>
        <Col span={20}>
          <Title
            ellipsis
            level={5}
            style={{ color: "#CC5C00", textAlign: "center" }}
          >
            Quý khách vui lòng không tắt trình duyệt cho đến khi nhận được kết
            quả giao dịch trên website. Xin cảm ơn!
          </Title>
        </Col>
      </Row>
      <Space className="space-custom">Form ở đây</Space>
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

export default VNPAYpayments;
