import { Card, Col, Row, Space, Typography } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { BreadcrumbComp } from "../../../../Components/Breadcrumb";
import "../FeeManage.style.scss";

function VNPAY() {
  const { Title } = Typography;
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div className="subDetail creditdebit-style vnpay-style">
      <BreadcrumbComp
        title="Thanh toán VNPAY"
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
            <Col span={1}></Col>
            <Col span={3}>
              <Card
                hoverable
                onClick={() => navigate("confirm")}
                cover={
                  <img
                    alt="example"
                    src={require("../../../../shared/img/bank-img/aribank.png")}
                  />
                }
              ></Card>
            </Col>
            <Col span={3}>
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src={require("../../../../shared/img/bank-img/bidv.png")}
                  />
                }
              ></Card>
            </Col>
            <Col span={3}>
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src={require("../../../../shared/img/bank-img/scb.png")}
                  />
                }
              ></Card>
            </Col>
            <Col span={3}>
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src={require("../../../../shared/img/bank-img/tech.png")}
                  />
                }
              ></Card>
            </Col>
            <Col span={3}>
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src={require("../../../../shared/img/bank-img/vcb.png")}
                  />
                }
              ></Card>
            </Col>
            <Col span={3}>
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src={require("../../../../shared/img/bank-img/vib.png")}
                  />
                }
              ></Card>
            </Col>
            <Col span={3}>
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src={require("../../../../shared/img/bank-img/vietinbank.png")}
                  />
                }
              ></Card>
            </Col>
          </Row>
        </Space>
      </div>
    </div>
  );
}

export default VNPAY;
