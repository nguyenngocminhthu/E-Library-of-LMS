import React from "react";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import "./style.scss";

export const System = () => {
  const navigate = useNavigate();
  return (
    <div className="sys-page">
      <BreadcrumbComp title="Cài đặt hệ thống" />
      <Row style={{ marginTop: "2rem" }}>
        <Col span={8}>
          <div className="card-content">
            <h2 className="title-card">Thông tin hệ thống</h2>
            <p>Các thông tin cơ bản của hệ thống thư viện trực tuyến.</p>
            <div
              className="img-style"
              onClick={() => navigate("/setting/information")}
            >
              <img
                style={{ width: "99%" }}
                alt="example"
                src={require("../../../shared/img/sys-infor.png")}
              />
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="card-content">
            <h2 className="title-card">Quản lý người dùng</h2>
            <p>Thông tin của người dùng trong hệ thống.</p>
            <div
              className="img-style"
              onClick={() => navigate("/setting/usermanage")}
            >
              <img
                style={{ width: "90%" }}
                alt="example"
                src={require("../../../shared/img/sys-user.png")}
              />
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="card-content">
            <h2 className="title-card">Quản lý lớp học</h2>
            <p>
              Tạo, phân bố và quản lý các lớp học cho từng môn học của thư viện.
            </p>
            <div
              className="img-style"
              onClick={() => navigate("/setting/classmanage")}
            >
              <img
                style={{ width: "85%" }}
                alt="example"
                src={require("../../../shared/img/sys-access.png")}
              />
            </div>
          </div>
          x
        </Col>
      </Row>
    </div>
  );
};
