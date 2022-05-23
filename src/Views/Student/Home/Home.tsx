import { CaretRightFilled } from "@ant-design/icons";
import { Button, Card, Col, List, Progress, Row, Typography } from "antd";
import { useNavigate } from "react-router";
import { AnaCard } from "../../../Components/AnaCard";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { SelectComp } from "../../../Components/Select";
import { ISubject } from "../../../redux/reducers/subject.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import ppt from "../../../shared/img/ppt.png";
import WEB23 from "../../../shared/img/WEB23.png";
import "./style.scss"

const { Title } = Typography;

interface IFile {
  learn: string;
  subject: string;
  lesson: string;
  avt: string;
  progress: number;
}

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

export const Home = () => {
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  return (
    <div className="home">
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
        <Row>
          <Col span={12}>
            <div className="title">Thống kê học tập</div>
          </Col>
          <Col span={12}>
            <div className="title">Môn học nhiều nhất</div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
