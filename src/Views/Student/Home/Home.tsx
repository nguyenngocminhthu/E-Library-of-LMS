import { Card, Col, List, Progress, Row, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { UserState } from "../../../redux/reducers/user.reducer";
import ppt from "../../../shared/img/ppt.png";
import { Column } from "@ant-design/plots";
import "./style.scss";

const { Title } = Typography;

interface IFile {
  learn: string;
  subject: string;
  lesson: string;
  avt: string;
  progress: number;
}

export const Home = () => {
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  const listFile: any[] | undefined = [];
  for (let i = 0; i < 10; i++) {
    listFile.push({
      subject: "Toán đại số",
      learn: "2. Nguyên tắc thiết kế",
      lesson: "Bài 1: Lorem Ipsum Dolem",
      progress: 50,
      avt: `${ppt}`,
    });
  }

  const data = [
    {
      day: "Thứ 2",
      time: 15,
    },
    {
      day: "Thứ 3",
      time: 9,
    },
    {
      day: "Thứ 4",
      time: 21,
    },
    {
      day: "Thứ 5",
      time: 6,
    },
    {
      day: "Thứ 6",
      time: 9,
    },
    {
      day: "Thứ 7",
      time: 21,
    },
    {
      day: "CN",
      time: 21,
    },
  ];
  const config = {
    data,
    xField: "day",
    yField: "time",
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      day: {
        alias: "Thứ",
      },
      time: {
        alias: "Thời gian",
      },
    },
    minColumnWidth: 20,
    maxColumnWidth: 20,
    color: "#FFA75E",
    columnStyle: {
      radius: [20, 20, 20, 20],
    },
    yAxis: {
      maxLimit: 24,
      title: {
        text: "Giờ",
      },
    },
  };

  return (
    <div className="home student">
      <BreadcrumbComp title="Trang chủ" />
      <div className="wrapper-list">
        <div className="title">Môn đang học</div>
        <List
          style={{ marginBottom: "24px" }}
          grid={{ gutter: 30, column: 4 }}
          dataSource={listFile}
          pagination={{
            position: "top",
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 4,
          }}
          renderItem={(item: IFile) => (
            <List.Item key={item.subject}>
              <Card>
                <Row>
                  <Col span={6}>
                    <img src={ppt} alt="file" />
                  </Col>
                  <Col span={17} offset={1}>
                    <p>{item.subject}</p>
                    <Title ellipsis level={5}>
                      {item.learn}
                    </Title>
                    <span className="lesson-style">{item.lesson}</span>
                  </Col>
                  <Progress percent={item.progress} showInfo={false} />
                </Row>
              </Card>
            </List.Item>
          )}
        />
        <Row className="chart">
          <Col span={11}>
            <div className="title">Thống kê học tập</div>
            <Column {...config} />
          </Col>
          <Col span={11} offset={2}>
            <div className="title">Môn học nhiều nhất</div>
          </Col>
        </Row>
      </div>
      {/* 
import { useDispatch } from "react-redux";
import { uploadFilesToFirebase } from "../../../Apis/Firebase";
import { AppDispatch } from "../../../redux/store";

export const Home = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleFileUpload = async (e: any) => {
    await dispatch(uploadFilesToFirebase([e.target.files[0]], "File")).then(
      (rs: any) => {
        console.debug(rs);
      }
    );
  };
  return (
    <div>
      <input
        type="file"
        name="file"
        placeholder="hehe"
        onChange={(e) => handleFileUpload(e)}
      /> */}
    </div>
  );
};
