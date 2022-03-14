import { Card, Col, List, Row } from "antd";
import { useEffect } from "react";
import { AnaCard } from "../../../Components/AnaCard";
import { SelectComp } from "../../../Components/Select";
import { TitleComp } from "../../../Components/Title";
import "./style.scss";

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
    title: `ant design part ${i}`,
  });
}

export const Home = () => {
  return (
    <div className="home">
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
      <div style={{ marginTop: "1rem" }}>
        <TitleComp content="Tài liệu môn học đã xem gần đây" />
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
          renderItem={(item) => (
            <List.Item key={item.title}>
              <Card title={item.title}>Card content</Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
