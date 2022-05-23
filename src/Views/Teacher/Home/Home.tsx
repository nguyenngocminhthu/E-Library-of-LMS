import { CaretRightFilled, DoubleRightOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, List, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { AnaCard } from "../../../Components/AnaCard";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { SelectComp } from "../../../Components/Select";
import { ISubject } from "../../../redux/reducers/subject.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import ppt from "../../../shared/img/ppt.png";
import WEB23 from "../../../shared/img/WEB23.png";

const { Title } = Typography;

interface IData {
  fileName: string;
  subject: string;
  fileCode: string;
  teacher: string;
  avt: string;
}

interface IFile {
  fileName: string;
  createdAt: string;
  subject: string;
  teacher: string;
  avt: string;
}

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

const listData: any[] | undefined = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    fileName: "Phát triển website",
    subject: "Web Design",
    fileCode: `WEB${i}`,
    teacher: "Hoa Hoa",
    avt: `${WEB23}`,
  });
}

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

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);
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
                number={12}
                content="Môn giảng dạy"
                classname="anacard"
              />
            </Col>
            <Col span={5} offset={1}>
              <AnaCard
                number={12}
                content="Bài giảng"
                classname="anacard-blue"
              />
            </Col>
            <Col span={5} offset={1}>
              <AnaCard number={12} content="Tài nguyên" classname="anacard" />
            </Col>
            <Col span={5} offset={1}>
              <AnaCard
                number={12}
                content="Đề thi và kiểm tra"
                classname="anacard-blue"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="wrapper-list">
        <div className="title">Môn giảng dạy</div>
        <List
          grid={{ gutter: 30, column: 4 }}
          dataSource={user.recentSubject}
          pagination={{
            position: "top",
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 8,
          }}
          renderItem={(item: ISubject) => (
            <List.Item key={item.subCode}>
              <Card>
                <Row>
                  <Col span={8} className="btn-img">
                    <img src={item.image} alt="avt" />
                  </Col>
                  <Col span={15} offset={1}>
                    <h5>{item.subName}</h5>
                    <h6>{item.subCode}</h6>

                    <span style={{ position: "absolute", bottom: 0 }}>
                      Đang dạy 5 lớp
                    </span>
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
      </div>
      <Row>
        <Col span={12}>
          <div className="wrapper-list">
            <div className="title">Tệp riêng tư tải lên gần đây</div>
            <List
              grid={{ gutter: 30, column: 2 }}
              dataSource={listFile}
              pagination={{
                position: "top",
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 2,
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
                        <p>{item.createdAt}</p>
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
        <Col span={11} offset={1}>
          <Card className="wrapper">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h5>Thông báo chưa đọc</h5>
              <span style={{ marginTop: "0.5rem", fontStyle: "italic" }}>
                Xem tất cả thông báo <DoubleRightOutlined />
              </span>
            </div>

            <Card className="inside">
              <List
                dataSource={data}
                renderItem={(item: any) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.picture.large} />}
                      title={<a href="https://ant.design">{item.name.last}</a>}
                      description={item.email}
                    />
                    <div>5 phút trước</div>
                  </List.Item>
                )}
              />
            </Card>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
