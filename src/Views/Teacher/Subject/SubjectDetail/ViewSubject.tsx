import { useParams } from "react-router-dom";
import { BreadcrumbComp } from "../../../../Components/Breadcrumb";
import ReactPlayer from "react-player";
import { Row, Col, Tabs, Collapse, Button, Avatar } from "antd";
import { useState } from "react";
import {
  DoubleRightOutlined,
  DownloadOutlined,
  FileFilled,
  HeartFilled,
  MessageOutlined,
  PlayCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { SelectComp } from "../../../../Components/Select";
import { InputLabel } from "../../../../Components/InputLabel";

const { Panel } = Collapse;
const { TabPane } = Tabs;

const subject = [
  {
    name: "Thương mại điện tử",
    value: "TMDT",
  },
  {
    name: "Nguyên lý kế toán",
    value: "NLKT",
  },
  {
    name: "Hệ thống thông tin",
    value: "HTTT",
  },
  {
    name: "Luật thương mại",
    value: "LTM",
  },
  {
    name: "Ngân hàng ",
    value: "NG",
  },
];

const sorta = [
  { name: "Sắp xếp theo mới nhất", value: "Newest" },
  { name: "Sắp xếp theo cũ nhất", value: "Oldest" },
  { name: "Nhiều tương tác nhất", value: "Interactive" },
];

const sortb = [
  { name: "Lọc những câu hỏi theo", value: "question" },
  { name: "Câu hỏi mới nhất", value: "NewestQues" },
  { name: "Câu hỏi cũ nhất", value: "OldestQues" },
  { name: "Câu hỏi được quan tâm nhất", value: "Carest" },
];

export const ViewSubject = () => {
  const params = useParams<{ idSub: string }>();
  const [viewMore, setViewMore] = useState(false);
  const [question, setQuestion] = useState(false);

  const Header = () => {
    return (
      <Row>
        <Col span={18}>Bài 1: Giới thiệu về thương mại điện tử</Col>
        <Col span={6} className="time">
          1/2|45 phút
        </Col>
      </Row>
    );
  };

  return (
    <div className="viewSub">
      <BreadcrumbComp
        title={params.idSub}
        prevPageTitle="Danh sách môn học"
        prevPage="teacher/subject"
      />
      <Row>
        <Col span={16}>
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
                <Col
                  span={21}
                  className={viewMore === true ? "scroll-box" : ""}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  et vestibulum ante, id malesuada libero. In hac habitasse
                  platea dictumst. Maecenas est erat, volutpat ut hendrerit
                  efficitur, pulvinar vitae nisi. Nam vulputate molestie erat,
                  non vehicula magna dapibus at. Nunc turpis eros, molestie ac
                  augue eu, euismod dignissim massa. Pellentesque purus lacus,
                  gravida eget magna at, fringilla elementum magna.
                  <div
                    hidden={viewMore}
                    className="view-more"
                    onClick={() => setViewMore(true)}
                  >
                    Xem thêm <DoubleRightOutlined />
                  </div>
                  {viewMore && (
                    <div>
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classical Latin
                      literature from 45 BC, making it over 2000 years old.
                      Richard McClintock, a Latin professor at Hampden-Sydney
                      College in Virginia, looked up one of the more obscure
                      Latin words, consectetur, from a Lorem Ipsum passage, and
                      going through the cites of the word in classical
                      literature, discovered the undoubtable source. Lorem Ipsum
                      comes from sections 1.10.32 and 1.10.33 of "de Finibus
                      Bonorum et Malorum" (The Extremes of Good and Evil) by
                      Cicero, written in 45 BC. This book is a treatise on the
                      theory of ethics, very popular during the Renaissance. The
                      first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                      comes from a line in section 1.10.32.
                    </div>
                  )}
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Hỏi đáp" key="2">
              {question ? (
                <div>
                  <InputLabel label="Tiêu đề câu hỏi" />
                  <br />
                  <InputLabel labelTextarea="Nội dung" />
                  <div className="footer-btn">
                    <Button
                      className="default-btn"
                      onClick={() => setQuestion(false)}
                    >
                      Huỷ
                    </Button>
                    <Button style={{ marginLeft: "1rem" }} type="primary">
                      Gửi
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Row>
                    <Col span={20} className="flex-col">
                      <SelectComp
                        defaultValue="Tất cả môn học"
                        dataString={subject}
                      />
                      <SelectComp
                        defaultValue="Sắp xếp theo mới nhất"
                        dataString={sorta}
                      />
                      <SelectComp
                        defaultValue="Lọc những câu hỏi theo"
                        dataString={sortb}
                      />
                    </Col>
                    <Col span={4}>
                      <Button onClick={() => setQuestion(true)}>
                        Đặt câu hỏi
                      </Button>
                    </Col>
                  </Row>
                  <div className="scroll-box question">
                    <div className="sub-content">
                      <Row>
                        <Col span={2}>
                          <Avatar icon={<UserOutlined />} />
                        </Col>
                        <Col span={21} offset={1}>
                          <div className="flex-row">
                            <h4>Lor</h4>
                            <span
                              style={{
                                marginLeft: "1rem",
                                color: "gray",
                                fontSize: "12px",
                              }}
                            >
                              Bài 5
                            </span>
                            <span
                              style={{
                                marginLeft: "auto",
                                color: "gray",
                                fontStyle: "italic",
                                fontSize: "12px",
                              }}
                            >
                              6 ngày trước
                            </span>
                          </div>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                          <div className="flex-row">
                            <HeartFilled style={{ color: "red" }} />{" "}
                            <span className="gray">10</span>
                            <MessageOutlined style={{ marginLeft: "2rem" }} />
                            <span className="gray">10</span>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </>
              )}
            </TabPane>
            <TabPane tab="Thông báo môn học" key="3">
              <div className="scroll-box sub-noti">
                <Row className="noti-detail">
                  <Col span={7}>
                    <Row>
                      <Col span={3}>
                        <Avatar icon={<UserOutlined />} />
                      </Col>
                      <Col
                        span={20}
                        offset={1}
                        style={{ lineHeight: "normal" }}
                      >
                        <h4 style={{ marginBottom: "0" }}>
                          Trần Nguyễn Phú Phong
                        </h4>
                        <div className="flex-row">
                          <span className="time">Giáo viên</span>
                          <span style={{ marginLeft: "2rem" }} className="time">
                            6 giờ trước
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={17}>
                    <h3>LỊCH KIỂM TRA 1 TIẾT</h3>
                    <div style={{ lineHeight: "2rem" }}>
                      <b>Thời gian: </b> Thứ 5 ngày 20 tháng 01 năm 2021
                      <span style={{ marginLeft: "1rem" }}>
                        <b>Hình thức: </b> Tự luận
                      </span>
                      <br />
                      <b>Nội dung: </b> Nội dung kiểm tra tổng hợp từ bài đầu
                      tiên đến bài ở tiết sau cùng
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
          </Tabs>
        </Col>
        <Col span={8}>
          <h1>Nội dung môn học</h1>
          <hr />
          <Collapse bordered={false} className="site-collapse-custom-collapse">
            <Panel
              header={<Header />}
              key="1"
              className="site-collapse-custom-panel scrollbar"
            >
              <Row className="sub-content">
                <Col span={4}>
                  <PlayCircleFilled />
                </Col>
                <Col span={19} offset={1}>
                  <h4>
                    1. Giới thiệu về thương mại điện tử trong những năm gần đây
                  </h4>
                  <span>30 phút</span>
                </Col>
              </Row>
              <br />
              <Row className="sub-content">
                <Col span={4}>
                  <FileFilled />
                </Col>
                <Col span={19} offset={1}>
                  <h4>
                    1. Thương Mại Điện tử đã thay đổi nền kinh tế của thế giới
                  </h4>
                </Col>
              </Row>
              <Button>
                <DownloadOutlined />
                Tải xuống
              </Button>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </div>
  );
};
