import { useParams } from "react-router-dom";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import ReactPlayer from "react-player";
import { Row, Col, Tabs } from "antd";

const { TabPane } = Tabs;

export const ViewSubject = () => {
  const params = useParams<{ idSub: string }>();

  return (
    <div className="viewSub">
      <BreadcrumbComp
        title={params.idSub}
        prevPageTitle="Danh sách môn học"
        prevPage="subjects"
      />
      <Row>
        <Col span={15}>
          <ReactPlayer
            width="100%"
            url="https://www.youtube.com/watch?v=QWgKKoq_r_0"
          />
          <Tabs defaultActiveKey="1">
            <TabPane tab="Tổng quan" key="1">
              <Row>
                <Col span={3}>Giảng viên:</Col>
                <Col span={21}>Hoa Hoa</Col>
                <Col span={3}>Mô tả:</Col>
                <Col span={21}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  et vestibulum ante, id malesuada libero. In hac habitasse
                  platea dictumst. Maecenas est erat, volutpat ut hendrerit
                  efficitur, pulvinar vitae nisi. Nam vulputate molestie erat,
                  non vehicula magna dapibus at. Nunc turpis eros, molestie ac
                  augue eu, euismod dignissim massa. Pellentesque purus lacus,
                  gravida eget magna at, fringilla elementum magna.
                  <br /> <br />
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the
                  word in classical literature, discovered the undoubtable
                  source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
                  "de Finibus Bonorum et Malorum" (The Extremes of Good and
                  Evil) by Cicero, written in 45 BC. This book is a treatise on
                  the theory of ethics, very popular during the Renaissance. The
                  first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                  comes from a line in section 1.10.32.
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Hỏi đáp" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Thông báo môn học" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Col>
        <Col span={8} offset={1}></Col>
      </Row>
    </div>
  );
};
