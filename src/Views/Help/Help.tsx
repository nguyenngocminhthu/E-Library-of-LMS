import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { useState } from "react";
import { ReactComponent as Location } from "../../shared/img/icon/location.svg";
import { ReactComponent as Phone } from "../../shared/img/icon/phone.svg";
import { ReactComponent as Email } from "../../shared/img/icon/mail.svg";
import { Button, notification, Input, Row, Col } from "antd";
import * as React from "react";
import CheckCircleFilled from "@ant-design/icons";
import "./style.scss";
import { BreadcrumbComp } from "../../Components/Breadcrumb";

const openNotification = () => {
  notification.open({
    message: "Chúng tôi sẽ phản hồi sớm nhất!.",
    icon: <CheckCircleFilled style={{ color: "#49C510" }} />,
  });
};
export const Help = () => {

  return (
    <div className="helping">
      <Row>
        <Col span={16} id="leftHelp">
          <BreadcrumbComp title="Bạn có thắc mắc?" />
          <h5 style={{ color: "grey", fontSize: "18px" }}>
            Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất có thể.
          </h5>
          <p style={{ color: "#ED2025", fontSize: "12px" }}>
            <i>
              Các thắc mắc sẽ được gửi vào mail của admin cụ thể là mail của đội
              phát triển hệ thống của trang LMS nhằm hỗ trợ và giải đáp kịp
              thời.
            </i>
          </p>
          <Input className="topic" placeholder="Chủ đề" allowClear />
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <SunEditor
              placeholder="Để lại lời nhắn của bạn tại đây..."
              setOptions={{
                buttonList: [
                  ["undo", "redo"],
                  ["font", "fontSize"],
                  [
                    "bold",
                    "underline",
                    "italic",
                    "strike",
                    "subscript",
                    "superscript",
                  ],
                  ["fontColor", "hiliteColor"],
                  ["align", "list", "lineHeight"],
                  ["outdent", "indent"],

                  ["table", "horizontalRule", "link", "image", "video"],
                  ["preview", "print"],
                  ["removeFormat"],
                ],
                defaultTag: "div",
                minHeight: "300px",
                showPathLabel: false,
              }}
            />
          </div>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Button type="primary" onClick={openNotification}>
              Gửi
            </Button>
          </div>
        </Col>
        <Col span={8} id="bgRight">
          <div className="in4">
            <h3 style={{ marginBottom: "20px" }}>
              <b style={{ fontSize: "26px", fontWeight: "bold" }}>Thông tin</b>
            </h3>
            <Row>
              <Col
                style={{ borderRight: "1px solid #373839", paddingLeft: "0px" }}
                span={2}
              >
                <Location />
              </Col>
              <Col span={22} style={{ paddingLeft: "10px" }}>
                <p style={{ marginBottom: "8px" }}>
                  <b>CN1:</b> 1 Đ. Võ Văn Ngân, Linh Chiểu, Thành Phố Thủ Đức,
                  Thành phố Hồ Chí Minh
                </p>
                <p style={{ marginBottom: "8px" }}>
                  <b>CN2:</b> 1 Đ. Võ Văn Ngân, Linh Chiểu, Thành Phố Thủ Đức,
                  Thành phố Hồ Chí Minh
                </p>
                <p style={{ marginBottom: "0px" }}>
                  <b>CN3:</b> 1 Đ. Võ Văn Ngân, Linh Chiểu, Thành Phố Thủ Đức,
                  Thành phố Hồ Chí Minh
                </p>
              </Col>
            </Row>
            <div style={{ marginTop: "20px", marginBottom: "20px" }}></div>
            <Row>
              <Col
                style={{ borderRight: "1px solid #373839", paddingLeft: "0px" }}
                span={2}
              >
                <Phone />
              </Col>
              <Col span={22} style={{ paddingLeft: "10px" }}>
                <p style={{ marginBottom: "8px" }}>(028) 1234 5678</p>
                <p style={{ marginBottom: "0px" }}>(028) 1234 5678</p>
              </Col>
            </Row>
            <div style={{ marginTop: "20px", marginBottom: "20px" }}></div>
            <Row>
              <Col
                style={{ borderRight: "1px solid #373839", paddingLeft: "0px" }}
                span={2}
              >
                <Email />
              </Col>
              <Col span={22} style={{ paddingLeft: "10px" }}>
                <p style={{ marginBottom: "0px" }}>
                  example_ute@student.hcmute.edu.vn
                </p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      {/* <div className="row" id="helping">
        <div className="col-sm-8" id="leftHelp">
         
        </div>
        <div className="col-sm-4" id="bgRight">
          
        </div>
      </div> */}
    </div>
  );
};
