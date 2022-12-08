import { Card, Col, Row, Space, Typography } from "antd";
import React from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../../Components/Breadcrumb";
import "../FeeManage.style.scss";

function CreditDebit() {
  const { Title } = Typography;
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div className="subDetail creditdebit-style">
      <BreadcrumbComp
        title="Credit/Debit"
        prevFirstPageTitle="Thanh toán trực tuyến"
        prevFirstPage="student/payschoolfees"
      />
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: "auto",
          padding: "0 16px",
        }}
      >
        <div className="overview">
          <Row>
            <Col span={3}>Đơn vị thụ hưởng:</Col>
            <Col span={21}>CLOUD CAMPUS</Col>
            <Col span={3}>Nội dung thanh toán:</Col>
            <Col span={21}>Thanh toán tiền học phí</Col>
            <Col span={3}>Số tiền:</Col>
            <Col span={21}>{params.cost} VNĐ</Col>
          </Row>
        </div>
        <Title ellipsis level={5} style={{ color: "#CC5C00" }}>
          Vui lòng chọn loại thẻ:
        </Title>
        <Space className="box-paymentmethod">
          <Row>
            <Col span={6}>
              <Card
                hoverable
                onClick={() => navigate("visa")}
                cover={
                  <img
                    alt="example"
                    src={require("../../../../shared/img/visapayment.png")}
                  />
                }
              />
            </Col>
            <Col span={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src={require("../../../../shared/img/mastercard.png")}
                  />
                }
              />
            </Col>
            <Col span={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src={require("../../../../shared/img/jcb.png")}
                  />
                }
              />
            </Col>
            <Col span={6}>
              <Card
                hoverable
                onClick={() => navigate("atm")}
                cover={
                  <img
                    alt="example"
                    src={require("../../../../shared/img/atm.png")}
                  />
                }
              />
            </Col>
          </Row>
        </Space>
      </div>
    </div>
  );
}

export default CreditDebit;
