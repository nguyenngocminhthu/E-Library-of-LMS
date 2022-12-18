import { Column } from "@ant-design/plots";
import { Card, Col, List, Progress, Row, Typography } from "antd";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { join } from "../../../redux/reducers/realtime.reducer";
import { ISubject } from "../../../redux/reducers/subject.reducer";
import {
  getByStudentInCurrentWeek,
  getTimeLearnings,
} from "../../../redux/reducers/timeLearning.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import { day } from "../../../shared/const/en";
import math from "../../../shared/img/math.png";
import ppt from "../../../shared/img/ppt.png";
import "./Home.style.scss";

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
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [listLearnTime, setListLearnTime] = useState<ILearnTime[]>([]);

  useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher("6bd53f4e653611a72067", {
      cluster: "ap1",
    });
    const channel = pusher.subscribe("my-channel");
    channel.bind("my-event", function (data: any) {
      console.log(JSON.stringify(data));
    });
    channel.bind("RECEIVED_JOIN_REQUEST", (data: any) => {
      console.log("student channel connected: ", data);
    });
    channel.bind("RECEIVED_OUT_REQUEST", (data: any) => {
      console.log("student channel disconnected: ", data);
    });
    if (user.id) {
      dispatch(join(user.id));
    }
    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    dispatch(
      getTimeLearnings({
        student: user.id,
        limit: 10,
        sortBy: "total",
        sort: "desc",
      })
    )
      .unwrap()
      .then((rs: any) => {
        const temp: ILearnTime[] = [];
        rs.results.forEach((item: any) => {
          temp.push({
            subject: item.subject.subName,
            time: item.total.toFixed(1),
            progress: 40,
          });
        });
        setListLearnTime(temp);
      });
    dispatch(
      getByStudentInCurrentWeek({
        student: user.id,
      })
    )
      .unwrap()
      .then((rs: any) => {
        const times = rs.map((item: any) => {
          return {
            day: day[item.day],
            time: item.time,
          };
        });
        setTimeLearningInWeek(times);
      });
  }, []);

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
      time: 0,
    },
    {
      day: "Thứ 3",
      time: 0,
    },
    {
      day: "Thứ 4",
      time: 0,
    },
    {
      day: "Thứ 5",
      time: 0,
    },
    {
      day: "Thứ 6",
      time: 0,
    },
    {
      day: "Thứ 7",
      time: 0,
    },
    {
      day: "CN",
      time: 0,
    },
  ];

  const [timeLearningInWeek, setTimeLearningInWeek] = useState(data);

  const config = {
    data: timeLearningInWeek,
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
          dataSource={user.recentSubject}
          pagination={{
            position: "top",
            pageSize: 4,
          }}
          renderItem={(item: ISubject) => (
            <List.Item key={item.subCode}>
              <Card
                className="c-pointer"
                onClick={() =>
                  navigate(`/student/subjects/subjectdetails/${item.id}`)
                }
              >
                <Row>
                  <Col
                    span={6}
                    style={{ display: "flex", verticalAlign: "middle" }}
                  >
                    <img src={item.image} alt="file" />
                  </Col>
                  <Col span={17} offset={1}>
                    <p>{item.subCode}</p>
                    <Title ellipsis level={5}>
                      {item.teacher.userName}
                    </Title>
                    <span className="lesson-style">{item.subName}</span>
                  </Col>
                  <Progress percent={60} showInfo={false} />
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
                        <div
                          style={{
                            display: "flex",
                            placeContent: "space-between",
                            height: "20px",
                          }}
                        >
                          <h5>{item.subject}</h5>

                          <p style={{ float: "right" }}>{item.time}</p>
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
