import { CaretRightFilled } from "@ant-design/icons";
import { Button, Card, Col, List, Row, Typography } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AnaCard } from "../../../Components/AnaCard";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { SelectComp } from "../../../Components/Select";
import { totalBank } from "../../../redux/reducers/banks.reducer";
import {
  ISubject,
  totalSubject,
} from "../../../redux/reducers/subject.reducer";
import { getUsers, UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import ppt from "../../../shared/img/ppt.png";
import "./Home.style.scss"; // Alt Shift O
import Pusher from "pusher-js";

interface IFile {
  fileName: string;
  createdAt: string;
  subject: string;
  teacher: string;
  avt: string;
}

export const Home = () => {
  const { Title } = Typography;
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const subjects: any = useSelector(totalSubject);
  const teachers = useSelector(
    (state: any) => state.user.listUser.totalResults
  );
  const exams = useSelector(totalBank);
  const [statistical, setStatistical] = useState<any>({});
  const [listUser, setListUser] = useState(0);
  const handleEventSocket = (listUser: number, statistical: any) => {
    setListUser(listUser);
    setStatistical(statistical);
  };
  useEffect(() => {
    dispatch(getUsers({ limit: 999, role: "teacher" }));
  }, [subjects, exams]);

  useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher("6bd53f4e653611a72067", {
      cluster: "ap1",
    });
    const channel = pusher.subscribe("my-channel");

    channel.bind("RECEIVED_JOIN_REQUEST", (data: any) => {
      handleEventSocket(data.listUser, data.statistical);
      console.log("home channel connected: ", data);
    });

    channel.bind("RECEIVED_OUT_REQUEST", (data: any) => {
      handleEventSocket(data.listUser, data.statistical);
      console.log("home channel disconnected: ", data);
    });
    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, []);

  const year = [
    {
      value: "2020-2021",
      name: "2020-2021",
    },
    {
      value: "2021-2022",
      name: "2021-2022",
    },
  ];

  const listFile: any[] | undefined = [];
  for (let i = 0; i < 10; i++) {
    listFile.push({
      fileName: "Thương mại điện tử là gì.docx",
      createdAt: "12:01 12/12/2020",
      subject: "Thương mại điện tử",
      teacher: "Hoa Hoa",
      avt: `${ppt}`,
    });
  }

  return (
    <div className="home">
      <BreadcrumbComp title="Trang chủ" />
      <Row>
        <Col span={4} style={{ display: "flex", alignItems: "center" }}>
          <SelectComp
            textLabel="Niên khoá"
            defaultValue={year[0].value}
            dataString={year}
          />
        </Col>
        <Col span={20}>
          <Row>
            <Col span={5} offset={1}>
              <AnaCard
                number={subjects}
                content="Môn học"
                classname="anacard"
              />
            </Col>
            <Col span={5} offset={1}>
              <AnaCard
                number={teachers}
                content="Giảng viên"
                classname="anacard-blue"
              />
            </Col>
            <Col span={5} offset={1}>
              <AnaCard number={0} content="Tệp riêng tư" classname="anacard" />
            </Col>
            <Col span={5} offset={1}>
              <AnaCard
                number={exams}
                content="Đề thi"
                classname="anacard-blue"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="wrapper-list">
        <div className="title">Tài liệu môn học đã xem gần đây</div>
        <List
          grid={{ gutter: 30, column: 4 }}
          dataSource={user.recentSubject}
          pagination={{
            position: "top",
            pageSize: 8,
          }}
          renderItem={(item: ISubject) => (
            <List.Item key={item.subCode}>
              <Card
                onClick={() => navigate(`/subjects/subjectdetails/${item.id}`)}
              >
                <Row>
                  <Col span={8} className="btn-img">
                    <div className="img-play">
                      <img src={item.image} alt="avt" />
                    </div>
                    <div className="btn-play">
                      <Button shape="circle" icon={<CaretRightFilled />} />
                    </div>
                  </Col>
                  <Col span={15} offset={1}>
                    <h5>{item.subName}</h5>
                    <p>{item.subCode}</p>
                    <h6>{item.subCode}</h6>
                    <span>Giảng viên: {item.teacher.userName}</span>
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
      </div>
      <Row>
        <Col span={6}>
          <Card className="wrapper">
            <h5>Thống kê truy cập</h5>
            <Card
              className="inside"
              style={{
                height: 180,
                overflow: "auto",
              }}
            >
              <Row>
                <Col span={15} offset={1}>
                  <p>Đang truy cập:</p>
                  <p>Lượt truy cập hôm nay:</p>
                  <p>Lượt truy cập tuần này:</p>
                  <p>Lượt truy cập tháng này:</p>
                  <p>Tổng lượt truy cập:</p>
                </Col>
                <Col span={6} offset={2}>
                  <h4>{listUser}</h4>
                  <h4>{statistical?.today?.total || 0}</h4>
                  <h4>{statistical?.week || 0}</h4>
                  <h4>{statistical?.month || 0}</h4>
                  <h4>{statistical?.total || 0}</h4>
                </Col>
              </Row>
            </Card>
          </Card>
        </Col>
        <Col span={17} offset={1}>
          <div className="wrapper-list">
            <div className="title">Tệp riêng tư tải lên gần đây</div>
            <List
              grid={{ gutter: 30, column: 3 }}
              dataSource={listFile}
              pagination={{
                position: "top",
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              renderItem={(item: IFile) => (
                <List.Item key={item.fileName}>
                  <Card>
                    <Row>
                      <Col span={6}>
                        <img src={ppt} alt="file" />
                      </Col>
                      <Col span={17} offset={1}>
                        <Title ellipsis level={5}>
                          {item.fileName}
                        </Title>
                        <p>{moment(item.createdAt).format("DD/MM/YYYY")}</p>
                        <h6>{item.subject}</h6>
                        <span>Giảng viên: {item.teacher}</span>
                      </Col>
                    </Row>
                  </Card>
                </List.Item>
              )}
            />
            <span style={{ color: "grey" }}>
              <i>Hiển thị 10 tệp tài liệu đã xem gần đây nhất</i>
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
};
