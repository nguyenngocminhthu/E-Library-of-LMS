import {
  FileFilled,
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
  PlayCircleFilled,
} from "@ant-design/icons";
import { Avatar, Button, Col, Collapse, Form, Input, Row, Tabs } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { SelectComp } from "../../../Components/Select";
import { getLesson, ILesson } from "../../../redux/reducers/lesson.reducer";
import { INoti } from "../../../redux/reducers/noti.reducer";
import { createQA, IQA, updateQA } from "../../../redux/reducers/QA.reducer";
import {
  getSubmissions,
  updateSubmission,
} from "../../../redux/reducers/submission.reducer";
import { updateTimeLearningByStudentAndSubject } from "../../../redux/reducers/timeLearning.reducer";
import { getTopic, ITopic } from "../../../redux/reducers/topic.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch, RootState } from "../../../redux/store";
import { ModalExam } from "./ModalExam";
import { ModalReply } from "./ModalReply";
import "./Subject.style.scss";

export const ViewSubject = () => {
  const { Panel } = Collapse;
  const { TabPane } = Tabs;
  const params = useParams<{ idSub: string }>();
  const [question, setQuestion] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [data, setData] = useState<ITopic>();
  const [video, setVideo] = useState<any>();
  const [form] = Form.useForm();
  const [lesson, setLesson] = useState<ILesson>();
  const [qa, setQa] = useState<IQA[]>([]);
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const [idQA, setIdQA] = useState<string>("");
  const [idExam, setIdExam] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleExam, setVisibleExam] = useState<boolean>(false);
  const [idx, setIdx] = useState<number>(0);
  const [time, setTime] = useState(Date.now());
  const currentSubject = useSelector(
    (state: RootState) => state.subject.current
  );
  const [playing, setPlaying] = useState<boolean>(true);
  const [playedTime, setPlayedTime] = useState<number>(0);
  const [flag, setFlag] = useState(false);
  const videoRef = useRef<any>();

  useEffect(() => {
    if (params.idSub) {
      dispatch(getTopic(params.idSub))
        .unwrap()
        .then((rs: ITopic) => {
          setData(rs);
          setVideo(rs.lesson[0].video);
          dispatch(getLesson(rs.lesson[0].id))
            .unwrap()
            .then((rs) => {
              setLesson(rs);
              setQa(rs.QA);
            });
          setLesson(rs.lesson[0]);
        });
    }
  }, [params.idSub]);

  useEffect(() => {
    setTime(Date.now());
  }, []);

  useEffect(() => {
    return () => {
      const timeLearning = Date.now() - time;
      dispatch(
        updateTimeLearningByStudentAndSubject({
          param: { student: user.id, subject: currentSubject?.id },
          payload: { time: (timeLearning / 1000 / 60 / 60).toFixed(5) },
        })
      );
    };
  }, []);

  const handleRefresh = () => {
    if (params.idSub) {
      dispatch(getTopic(params?.idSub))
        .unwrap()
        .then((rs: ITopic) => {
          setData(rs);
          setVideo(rs.lesson[idx].video);
          dispatch(getLesson(rs.lesson[idx].id))
            .unwrap()
            .then((rs) => {
              setLesson(rs);
              setQa(rs.QA);
            });
          setLesson(rs.lesson[idx]);
        });
    }
  };

  const handlePause = (props: any) => {
    console.debug(props.playedSeconds);
    let exam: any = lesson?.exams.find(
      (element: any) =>
        element.time <= parseFloat((props.playedSeconds / 60).toFixed(1))
    );
    if (exam) {
      setIdExam(exam.exam);
      if (!flag) {
        dispatch(getSubmissions({ user: user.id, bank: exam.exam }))
          .unwrap()
          .then((rs) => {
            setFlag(true);
            if (
              rs.totalResults === 0 ||
              (rs.totalResults > 0 && rs.results[0].score < 5)
            ) {
              setPlaying(false);
              setVisibleExam(true);
            }
          });
      }
    }
  };

  const handleBuffer = () => {
    console.debug(videoRef.current.getCurrentTime());
    handlePause({ playedSeconds: videoRef.current.getCurrentTime() });
  };

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

  const onFinish = (values: any) => {
    dispatch(
      createQA({
        ...values,
        lesson: lesson?.id,
        user: user.id,
        subject: data?.subjectId.id,
      })
    )
      .unwrap()
      .then(() => {
        setQuestion(false);
        handleRefresh();
      });
  };

  return (
    <div className="viewSub viewSub-student">
      <BreadcrumbComp
        title="Xem bài giảng"
        prevFirstPageTitle="Danh sách môn học"
        prevSecondPageTitle="Chủ đề"
        prevFirstPage="student/subject"
        prevSecondPage="student/subject"
      />
      <Row>
        <Col span={16}>
          <ReactPlayer
            width={"inherit"}
            url={video}
            volume={1}
            controls={true}
            ref={videoRef}
            onProgress={(props) => handlePause(props)}
            playing={playing}
            onPlay={() => {
              setPlaying(true);
              setFlag(false);
              handleBuffer();
            }}
            onBuffer={() => handleBuffer()}
          />
          <Tabs defaultActiveKey="1">
            <TabPane tab="Tổng quan" key="1">
              <Row>
                <Col span={3}>Giảng viên:</Col>
                <Col span={21}>{data?.subjectId.teacher.userName}</Col>
                <Col span={3}>Mô tả:</Col>
                <Col
                  span={21}
                  className={
                    data?.subjectId.description !== "" ? "scroll-box" : ""
                  }
                >
                  {data?.subjectId.description}
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Hỏi đáp" key="2">
              {question ? (
                <Form
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                  form={form}
                  onFinish={onFinish}
                >
                  <Form.Item
                    label="Tiêu đề câu hỏi"
                    name="title"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Nội dung"
                    name="content"
                    rules={[{ required: true }]}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                  <div className="footer-btn">
                    <Button
                      className="default-btn"
                      onClick={() => setQuestion(false)}
                    >
                      Huỷ
                    </Button>
                    <Button
                      onClick={() => form.submit()}
                      style={{ marginLeft: "1rem" }}
                      type="primary"
                    >
                      Gửi
                    </Button>
                  </div>
                </Form>
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
                    {qa.map((value: IQA) => (
                      <Row className="sub-content">
                        <Col span={2}>
                          <Avatar
                            src={
                              value.user.avt ||
                              "https://banner2.cleanpng.com/20180603/jx/kisspng-user-interface-design-computer-icons-default-stephen-salazar-photography-5b1462e1b19d70.1261504615280626897275.jpg"
                            }
                          />
                        </Col>
                        <Col span={21} offset={1}>
                          <div className="flex-row">
                            <h4>{value.user.userName}</h4>
                            <span
                              style={{
                                marginLeft: "1rem",
                                color: "gray",
                                fontSize: "12px",
                              }}
                            >
                              {value.title}
                            </span>
                            <span
                              style={{
                                marginLeft: "auto",
                                color: "gray",
                                fontStyle: "italic",
                                fontSize: "12px",
                              }}
                            >
                              {moment(value.createdAt).fromNow()}
                            </span>
                          </div>
                          {value.content}
                          <div className="flex-row">
                            {value.likes.includes(user.id) ? (
                              <HeartFilled
                                onClick={() =>
                                  dispatch(
                                    updateQA({
                                      id: value.id,
                                      payload: { likes: [user.id] },
                                    })
                                  )
                                    .unwrap()
                                    .then((rs) => handleRefresh())
                                }
                                style={{ color: "red" }}
                              />
                            ) : (
                              <HeartOutlined
                                onClick={() =>
                                  dispatch(
                                    updateQA({
                                      id: value.id,
                                      payload: { likes: [user.id] },
                                    })
                                  )
                                    .unwrap()
                                    .then((rs) => handleRefresh())
                                }
                              />
                            )}

                            <span className="gray">{value.likes.length}</span>
                            <MessageOutlined
                              onClick={() => {
                                setIdQA(value.id);
                                setVisible(true);
                              }}
                              style={{ marginLeft: "2rem" }}
                            />
                            <span className="gray">{value.answers.length}</span>
                          </div>
                        </Col>
                      </Row>
                    ))}
                  </div>
                </>
              )}
            </TabPane>
            <TabPane tab="Thông báo môn học" key="3">
              <div className="scroll-box sub-noti">
                {data?.noti.map((value: INoti) => {
                  return (
                    <Row className="noti-detail">
                      <Col span={7}>
                        <Row>
                          <Col span={3}>
                            <Avatar
                              src={
                                value.from.avt ||
                                "https://banner2.cleanpng.com/20180603/jx/kisspng-user-interface-design-computer-icons-default-stephen-salazar-photography-5b1462e1b19d70.1261504615280626897275.jpg"
                              }
                            />
                          </Col>
                          <Col
                            span={20}
                            offset={1}
                            style={{ lineHeight: "normal" }}
                          >
                            <h4 style={{ marginBottom: "0" }}>
                              {value.from.userName}
                            </h4>
                            <div className="flex-row">
                              <span className="time">Giáo viên</span>
                              <span
                                style={{ marginLeft: "2rem" }}
                                className="time"
                              >
                                {moment(value.createdAt).fromNow()}
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={17}>
                        <h3>{value.title}</h3>
                        <div
                          dangerouslySetInnerHTML={{ __html: value.content }}
                        />
                      </Col>
                    </Row>
                  );
                })}
              </div>
            </TabPane>
          </Tabs>
        </Col>
        <Col span={8}>
          <h1>Nội dung môn học</h1>
          <hr />
          {data?.lesson.map((value: ILesson, index: number) => (
            <Collapse
              bordered={false}
              className="site-collapse-custom-collapse"
              key={value.id}
            >
              <Panel
                header={
                  <Row>
                    <Col span={18}>
                      Bài {index + 1}: {value.title}
                    </Col>
                    <Col span={6} className="time">
                      1/2|45 phút
                    </Col>
                  </Row>
                }
                key={value.id}
                className="site-collapse-custom-panel scrollbar"
              >
                <Row
                  className="sub-content"
                  onClick={() => {
                    setVideo(value.video);
                    setIdx(index);
                    dispatch(getLesson(value.id))
                      .unwrap()
                      .then((rs) => {
                        setLesson(rs);
                        setQa(rs.QA);
                      });
                  }}
                >
                  <Col span={4}>
                    <PlayCircleFilled />
                  </Col>
                  <Col span={19} offset={1}>
                    <h4>{value.title}</h4>
                    <span>30 phút</span>
                  </Col>
                </Row>
                <br />
                {value.file.map((item: string, index: number) => {
                  const vid = item.split("/");
                  const fileType = vid[vid.length - 1].split("?")[0];
                  const fileName = fileType.split("%2F")[1];

                  return (
                    <a href={item} target="_blank">
                      <Row className="sub-content">
                        <Col span={4}>
                          <FileFilled />
                        </Col>
                        <Col span={19} offset={1}>
                          <h4 className="ellipsis">
                            {index + 1}. {fileName}
                          </h4>
                        </Col>
                      </Row>
                      <br />
                    </a>
                  );
                })}
              </Panel>
            </Collapse>
          ))}
        </Col>
      </Row>
      <ModalReply
        visible={visible}
        setVisible={setVisible}
        data={idQA}
        handleRefresh={handleRefresh}
      />
      <ModalExam
        visible={visibleExam}
        setVisible={setVisibleExam}
        data={idExam}
        handleRefresh={handleRefresh}
      />
    </div>
  );
};
