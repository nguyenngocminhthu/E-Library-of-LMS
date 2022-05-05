import { CaretRightFilled } from "@ant-design/icons";
import { Button, Card, Col, List, Row, Typography } from "antd";
import { AnaCard } from "../../../Components/AnaCard";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { SelectComp } from "../../../Components/Select";
import ppt from "../../../shared/img/ppt.png";
import WEB23 from "../../../shared/img/WEB23.png";
import "./style.scss"; // Alt Shift O

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
              <AnaCard number={12} content="Môn học" classname="anacard" />
            </Col>
            <Col span={5} offset={1}>
              <AnaCard
                number={12}
                content="Giảng viên"
                classname="anacard-blue"
              />
            </Col>
            <Col span={5} offset={1}>
              <AnaCard number={12} content="Tệp riêng tư" classname="anacard" />
            </Col>
            <Col span={5} offset={1}>
              <AnaCard number={12} content="Đề thi" classname="anacard-blue" />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="wrapper-list">
        <div className="title">Tài liệu môn học đã xem gần đây</div>
        <List
          grid={{ gutter: 30, column: 4 }}
          dataSource={listData}
          pagination={{
            position: "top",
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 8,
          }}
          renderItem={(item: IData) => (
            <List.Item key={item.fileCode}>
              <Card>
                <Row>
                  <Col span={8} className="btn-img">
                    <div className="img-play">
                      <img src={item.avt} alt="avt" />
                    </div>
                    <div className="btn-play">
                      <Button shape="circle" icon={<CaretRightFilled />} />
                    </div>
                  </Col>
                  <Col span={15} offset={1}>
                    <h5>{item.fileName}</h5>
                    <p>{item.subject}</p>
                    <h6>{item.fileCode}</h6>
                    <span>Giảng viên: {item.teacher}</span>
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
            <Card className="inside">
              <Row>
                <Col span={15} offset={1}>
                  <p>Đang truy cập:</p>
                  <p>Lượt truy cập hôm nay:</p>
                  <p>Lượt truy cập tuần này:</p>
                  <p>Lượt truy cập tháng này:</p>
                  <p>Tổng lượt truy cập:</p>
                </Col>
                <Col span={6} offset={2}>
                  <h4>31</h4>
                  <h4>31</h4>
                  <h4>31</h4>
                  <h4>31</h4>
                  <h4>31</h4>
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
      </Row>
    </div>
  );
};
