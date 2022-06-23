import { Card, Col, List, Progress, Row, Typography } from "antd";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { UserState } from "../../../redux/reducers/user.reducer";
import ppt from "../../../shared/img/ppt.png";
import math from "../../../shared/img/math.png";
import { Column } from "@ant-design/plots";
import "./style.scss";

interface IFile {
  learn: string;
  subject: string;
  lesson: string;
  avt: string;
  progress: number;
}

interface ILearnTime {
  subject: string;
  time: string;
  progress: number;
}

export const Home = () => {
  const { Title } = Typography;
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");

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

  const listLearnTime: any[] | undefined = [];
  for (let i = 0; i < 10; i++) {
    listLearnTime.push({
      subject: "Toán đại số",
      time: "3 giờ",
      progress: 40,
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
          <Col span={12} offset={1}>
            <div className="title">Môn học nhiều nhất</div>
            <List
              style={{ marginBottom: "24px" }}
              itemLayout="vertical"
              grid={{ gutter: 20, column: 2 }}
              dataSource={listLearnTime}
              renderItem={(item: ILearnTime) => (
                <List.Item key={item.subject}>
                  <Card>
                    <Row>
                      <Col span={6}>
                        <img src={math} alt="file" />
                      </Col>
                      <Col span={17} offset={1}>
                        <div style={{ display: "flex", placeContent: "space-between", height: "20px" }}>
                          <Title ellipsis level={5}>
                            {item.subject}
                          </Title>
                          <p style={{ float: "right"}}>{item.time}</p>
                        </div>
                        <Progress percent={item.progress} showInfo={false} />
                      </Col>
                    </Row>
                  </Card>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
