import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
import { ReactComponent as Location } from "../../../shared/img/icon/location.svg";
import { ReactComponent as Phone } from "../../../shared/img/icon/phone.svg";
import { ReactComponent as Email } from "../../../shared/img/icon/mail.svg";
import { Button, notification, Input, Row, Col } from 'antd';
import * as React from "react";
import CheckCircleFilled from '@ant-design/icons';
import "./style.scss"

const openNotification = () => {
    notification.open({
      message: 'Chúng tôi sẽ phản hồi sớm nhất!.',
      icon: <CheckCircleFilled style={{ color: '#49C510' }} />,
    });
  };
export const Help = () => {
  const [editorState, setEditorState] = useState();
    

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

  return (
    <div className="helping">
        <Row>
        <Col span={16} id="leftHelp">
            <h1>
            <b style={{ fontSize: '42px', fontWeight: 'bold'}}>Bạn có thắc mắc?</b>
          </h1>
          <h5 style={{ color: "grey", fontSize: '18px' }}>
            Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất có thể.
          </h5>
          <p style={{ color: "#ED2025", fontSize: "12px" }}>
            <i>
              Các thắc mắc sẽ được gửi vào mail của admin cụ thể là mail của đội
              phát triển hệ thống của trang LMS nhằm hỗ trợ và giải đáp kịp
              thời.
            </i>
          </p>
          <Input className="topic" placeholder="Chủ đề" allowClear/>
          <div
            style={{
              border: "1px solid grey",
              marginTop: "20px",
              borderRadius: "8px",
            }}
          >
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
              placeholder="Để lại lời nhắn của bạn tại đây..."
              editorStyle={{ height: "200px" }}
              wrapperStyle={{ borderRadius: "8px" }}
            />
          </div>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Button type="primary" onClick={openNotification}>Gửi</Button>
            </div>
        </Col>
        <Col span={8} id="bgRight">
        <div className="in4">
            <h3 style={{ marginBottom: "20px" }}>
              <b style={{ fontSize: '26px', fontWeight: 'bold'}}>Thông tin</b>
            </h3>
            <Row>
                <Col style={{ borderRight: "1px solid #373839", paddingLeft: "0px" }} span={2}>
                    <Location/>
                </Col>
                <Col span={22} style={{ paddingLeft:'10px' }}>
                    <p style={{ marginBottom: "8px" }}>
                    <b>CN1:</b> 1 Đ. Võ Văn Ngân, Linh Chiểu, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh
                    </p>
                    <p style={{ marginBottom: "8px" }}>
                    <b>CN2:</b> 1 Đ. Võ Văn Ngân, Linh Chiểu, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                    <b>CN3:</b> 1 Đ. Võ Văn Ngân, Linh Chiểu, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh
                    </p>
                </Col>
            </Row>
            <div style={{ marginTop: "20px", marginBottom: "20px" }}></div>
            <Row>
                <Col style={{ borderRight: "1px solid #373839", paddingLeft: "0px" }} span={2}>
                    <Phone/>
                </Col>
                <Col span={22} style={{ paddingLeft:'10px' }}>
                    <p style={{ marginBottom: "8px" }}>(028) 1234 5678</p>
                    <p style={{ marginBottom: "0px" }}>(028) 1234 5678</p>
                </Col>
            </Row>
            <div style={{ marginTop: "20px", marginBottom: "20px" }}></div>
            <Row>
                <Col style={{ borderRight: "1px solid #373839", paddingLeft: "0px" }} span={2}>
                    <Email/>
                </Col>
                <Col span={22} style={{ paddingLeft:'10px' }}>
                    <p style={{ marginBottom: "0px" }}>example_ute@student.hcmute.edu.vn</p>
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
