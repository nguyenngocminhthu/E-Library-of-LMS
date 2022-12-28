import {
  CaretRightOutlined,
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Collapse,
  Empty,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Tabs,
  Tooltip,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { cloneDeep } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import { BreadcrumbComp } from "../../../../Components/Breadcrumb";
import SearchComponent from "../../../../Components/SearchComponent";
import { ISelect, SelectComp } from "../../../../Components/Select";
import { ILesson } from "../../../../redux/reducers/lesson.reducer";
import {
  createNoti,
  getNotis,
  INoti,
} from "../../../../redux/reducers/noti.reducer";
import {
  createQA,
  getQAs,
  IQA,
  updateQA,
} from "../../../../redux/reducers/QA.reducer";
import {
  getSubject,
  getSubjects,
  ISubject,
} from "../../../../redux/reducers/subject.reducer";
import { getSubmissions } from "../../../../redux/reducers/submission.reducer";
import { getTopic, ITopic } from "../../../../redux/reducers/topic.reducer";
import { UserState } from "../../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../../redux/store";
import { ModalReply } from "../../../Student/Subject/ModalReply";

export const SubjectDetail = () => {
  const { Option } = Select;
  const { TabPane } = Tabs;
  const { Panel } = Collapse;
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [data, setData] = useState<ISubject>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [QAform] = Form.useForm();

  const [qa, setQa] = useState<IQA[]>([]);
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const [dataClass, setDataClass] = useState<ISelect[]>([]);
  const [topic, setTopic] = useState<ISelect[]>([]);
  const [notify, setNotify] = useState<INoti[]>([]);
  const [idQA, setIdQA] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [lesson, setLesson] = useState<ILesson[]>([]);
  const [QAvisible, setQAVisible] = useState<boolean>(false);
  const [studentList, setStudentList] = useState<any[]>([]);

  useEffect(() => {
    handleRefresh();
  }, [params.id]);

  const handleRefresh = () => {
    if (params.id) {
      dispatch(getSubject(params.id))
        .unwrap()
        .then((rs: ISubject) => {
          setData(rs);

          dispatch(getSubmissions({ limit: 9999 }))
            .unwrap()
            .then((res: any) => {
              console.debug("subm: ", res.results);
              const listSubmission = res.results.filter(
                (submit: any) =>
                  submit.bank.user === user.id &&
                  submit.bank.subject === params.id
              );
              const studentData = cloneDeep(rs.students).map((stu: any) => {
                const stuSubmit = listSubmission.filter((item: any) => {
                  return (
                    item.user.userCode === stu.userCode && !item.bank.isFinal
                  );
                });
                const midScore =
                  stuSubmit.reduce((score: number, ele: any) => {
                    return ele.score + score;
                  }, 0) / stuSubmit.length;

                const finalSubmit = listSubmission.find((item: any) => {
                  return (
                    item.user.userCode === stu.userCode && item.bank.isFinal
                  );
                });

                const mid = midScore ? midScore.toFixed(2) : "";
                const final = finalSubmit ? finalSubmit.score : "";
                const avg =
                  final && mid ? (parseFloat(final) + parseFloat(mid)) / 2 : "";

                return {
                  userCode: stu.userCode,
                  userName: stu.userName,
                  mid,
                  final,
                  avg,
                };
              });
              setStudentList(studentData);
              console.debug("listSubmission: ", listSubmission);
            });
        });
      dispatch(getNotis({ limit: 9999, subject: params.id }))
        .unwrap()
        .then((rs) => {
          setNotify(rs.results);
        });
      dispatch(getQAs({ limit: 9999, subject: params.id }))
        .unwrap()
        .then((rs) => {
          setQa(rs.results);
        });
    }
  };

  useEffect(() => {
    dispatch(getSubjects({ limit: 999, teacher: user.id }))
      .unwrap()
      .then((rs: any) => {
        let arr: ISelect[] = [];
        rs.results.forEach((vl: ISubject) => {
          arr.push({ name: vl.subName, value: vl.id });
        });
        setDataClass(arr);
      });
  }, []);

  const handleSelect = (e: any) => {
    dispatch(getSubject(e))
      .unwrap()
      .then((rs: ISubject) => {
        let arr: ISelect[] = [];
        rs.topic.forEach((vl: ITopic) => {
          arr.push({ name: vl.title, value: vl.id });
        });
        setTopic(arr);
      });
  };

  const handleTopic = (e: any) => {
    dispatch(getTopic(e))
      .unwrap()
      .then((rs: ITopic) => {
        setLesson(rs.lesson);
      });
  };

  const onFinish = (values: any) => {
    dispatch(
      createNoti({
        ...values,
        from: user.id,
      })
    )
      .unwrap()
      .then(() => {
        handleRefresh();
        handleCancel();
      });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinishQA = (values: any) => {
    dispatch(
      createQA({
        ...values,
        user: user.id,
        subject: params.id,
      })
    )
      .unwrap()
      .then(() => {
        handleRefresh();
        QAform.resetFields();
        setQAVisible(false);
      });
  };

  const columns = [
    {
      title: "MSSV",
      dataIndex: "userCode",
      key: "userCode",
    },
    {
      title: "Tên",
      dataIndex: "userName",
      key: "userName",
      sorter: (a: any, b: any) => {
        if (a.userName < b.userName) {
          return -1;
        }
        if (a.userName > b.userName) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "Giữa kỳ",
      dataIndex: "mid",
      key: "mid",
    },
    {
      title: "Cuối kỳ",
      dataIndex: "final",
      key: "final",
    },
    {
      title: "TBC",
      dataIndex: "avg",
      key: "avg",
    },
  ];

  return (
    <div className="subDetail teacher-subject">
      <BreadcrumbComp
        title={data?.subName}
        prevFirstPageTitle="Danh sách môn giảng dạy"
        prevFirstPage="teacher/subject"
      />
      <div className="Noti-Page">
        <div className="tab-notilist">
          <Tabs defaultActiveKey="1" type="card" size={"small"}>
            <TabPane tab="Tổng quan môn học" key="1">
              <div
                id="scrollableDiv"
                style={{
                  height: 400,
                  overflow: "auto",
                  padding: "0 16px",
                }}
              >
                <div className="overview">
                  <h1>Tổng quan</h1>
                  <Row>
                    <Col span={6}>
                      <Row>
                        <Col span={8}>Mã môn học:</Col>
                        <Col span={16}>{data?.subCode}</Col>
                        <Col span={8}>Môn học:</Col>
                        <Col span={16}>{data?.subName}</Col>
                      </Row>
                    </Col>
                    <Col span={17} offset={1}>
                      <Row>
                        <Col span={3}>Giảng viên:</Col>
                        <Col span={21}>{data?.teacher.userName}</Col>
                        <Col span={3}>Mô tả:</Col>
                        <Col span={21}>{data?.description}</Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Danh sách chủ đề" key="2">
              <div
                id="scrollableDiv"
                style={{
                  height: 600,
                  overflow: "auto",
                  padding: "0 16px",
                }}
              >
                <div>
                  <h1>Danh sách chủ đề</h1>
                  <Collapse
                    bordered={false}
                    className="site-collapse-custom-collapse"
                  >
                    {data?.topic && data?.topic.length > 0 ? (
                      data?.topic.map((vl: ITopic, idx: number) => (
                        <Panel
                          header={vl.title}
                          key={idx}
                          className="site-collapse-custom-panel"
                        >
                          {vl.lesson.length !== 0 && (
                            <div className="accor-video">
                              <Tooltip title="Play">
                                <Button
                                  size="large"
                                  shape="circle"
                                  icon={<CaretRightOutlined />}
                                  onClick={() =>
                                    navigate(
                                      `/teacher/subject/viewsubject/${vl.id}`
                                    )
                                  }
                                />
                              </Tooltip>
                            </div>
                          )}
                        </Panel>
                      ))
                    ) : (
                      <Empty />
                    )}
                  </Collapse>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Hỏi & đáp" key="3">
              <div
                id="scrollableDiv"
                style={{
                  height: 500,
                  overflow: "auto",
                  padding: "0 16px",
                }}
              >
                <div className="selectcomp">
                  <Select className="select" defaultValue={0}>
                    <Option value={0}>Tất cả bài giảng</Option>
                    <Option value={1}>Giới thiệu chung về T...</Option>
                    <Option value={2}>Thương mại điện tử</Option>
                    <Option value={3}>Thương mại điện tử</Option>
                  </Select>
                  <Select className="select" defaultValue={0}>
                    <Option value={0}>Câu hỏi gần nhất</Option>
                    <Option value={1}>Câu hỏi đã trả lời</Option>
                    <Option value={2}>Câu hỏi chưa trả lời</Option>
                  </Select>
                  <Select className="select" defaultValue="Lọc câu hỏi">
                    <Option value={0}>Câu hỏi tôi hỏi</Option>
                    <Option value={1}>Câu hỏi tôi thích</Option>
                  </Select>
                </div>
                <div className="question-and-answer-container">
                  <div className="subject" style={{ width: "450px" }}>
                    <SearchComponent placeholder="Tìm kiếm" />
                  </div>

                  <Button
                    className="btn-create-min"
                    type="primary"
                    onClick={() => setQAVisible(true)}
                    style={{ margin: "10px" }}
                  >
                    Thêm câu hỏi mới
                  </Button>
                </div>
                <div
                  className="scroll-box question"
                  style={{ height: "310px" }}
                >
                  {qa?.map((value: IQA) => (
                    <Row className="sub-content">
                      <Col span={2}>
                        <Avatar
                          src={
                            value.user.avt ||
                            "https://banner2.cleanpng.com/20180603/jx/kisspng-user-interface-design-computer-icons-default-stephen-salazar-photography-5b1462e1b19d70.1261504615280626897275.jpg"
                          }
                        />
                      </Col>
                      <Col span={21} offset={1} className="row-style">
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
                                  .then(() => handleRefresh())
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
                                  .then(() => handleRefresh())
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
              </div>
            </TabPane>
            <TabPane tab="Thông báo môn học" key="4">
              <div className="t-right mb p1">
                <Button
                  className="btn-create-min"
                  type="primary"
                  onClick={showModal}
                >
                  Tạo thông báo mới
                </Button>
              </div>
              <div
                id="scrollableDiv"
                style={{
                  height: 500,
                  overflow: "auto",
                  padding: "0 16px",
                }}
              >
                <Collapse
                  bordered={false}
                  className="site-collapse-custom-collapse"
                >
                  {notify && notify.length > 0 ? (
                    notify.map((value: INoti) => {
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
                              dangerouslySetInnerHTML={{
                                __html: value.content,
                              }}
                            />
                          </Col>
                        </Row>
                      );
                    })
                  ) : (
                    <Empty />
                  )}
                </Collapse>
              </div>
            </TabPane>
            <TabPane tab="Đề kiểm tra" key="5">
              <div
                id="scrollableDiv"
                style={{
                  height: 500,
                  overflow: "auto",
                  padding: "0 16px",
                }}
              >
                <h1>Đề kiểm tra</h1>
                <Collapse className="site-collapse-custom-collapse">
                  <div
                    className="site-card-wrapper"
                    style={{ padding: "36px" }}
                  >
                    <Row gutter={16}>
                      {data?.bank && data?.bank.length > 0 ? (
                        data?.bank.map((item) => (
                          <div
                            className="exam-card"
                            onClick={() =>
                              navigate(`/teacher/exams/examdetail/${item.id}`)
                            }
                          >
                            <Card title={item.examName} bordered={false}>
                              <div>Thời lượng: {item.time} phút</div>
                              <div>
                                Ngày bắt đầu:{" "}
                                {moment(data?.createdAt).format("DD/MM/YYYY")}
                              </div>
                            </Card>
                          </div>
                        ))
                      ) : (
                        <Empty />
                      )}
                    </Row>
                  </div>
                </Collapse>
              </div>
            </TabPane>
            <TabPane tab="Danh sách sinh viên" key="6">
              <div
                id="scrollableDiv"
                style={{
                  height: 600,
                  // overflow: "auto",
                  padding: "0 16px",
                }}
              >
                <h1>Danh sách sinh viên</h1>
                <Table columns={columns} dataSource={studentList} />
              </div>
            </TabPane>
          </Tabs>
          <div className="tab-control">
            <Button
              type="primary"
              onClick={() => {
                navigate(`/teacher/subject/editsubject/${params.id}`);
              }}
            >
              Chỉnh sửa
            </Button>
          </div>
        </div>
      </div>
      <Modal
        title="Gửi thông báo mới"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          handleCancel();
        }}
        footer={[
          <Button onClick={() => form.submit()} type="primary">
            Gửi
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          className="header-notification"
        >
          <Form.Item name="subject">
            <SelectComp
              textLabel="Chọn môn giảng dạy"
              className="label-style-item"
              dataString={dataClass}
              onChange={(e: any) => handleSelect(e)}
            />
          </Form.Item>
          <Form.Item name="topic">
            <SelectComp
              textLabel="Chọn chủ đề"
              className="label-style-item"
              dataString={topic}
              disabled={topic.length === 0}
            />
          </Form.Item>
          <Form.Item
            name="title"
            className="label-style-item"
            label="Tiêu đề"
            rules={[{ required: true }]}
          >
            <Input placeholder="Tiêu đề" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Nội dung"
            className="label-style-item"
            rules={[{ required: true }]}
          >
            <SunEditor
              placeholder="Nội dung"
              setOptions={{
                defaultTag: "div",
                minHeight: "250px",
                showPathLabel: false,
                buttonList: [
                  ["undo", "redo"],
                  ["fontSize", "bold", "underline", "italic"],
                  ["align", "image"],
                  ["list", "outdent", "indent"],
                  ["fullScreen"],
                ],
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
      <ModalReply
        visible={visible}
        setVisible={setVisible}
        data={idQA}
        handleRefresh={handleRefresh}
      />
      <Modal
        title="Tạo câu hỏi cho học viên"
        className="modal-add-role"
        width="50%"
        visible={QAvisible}
        onCancel={() => {
          setQAVisible(false);
          QAform.resetFields();
        }}
        onOk={() => QAform.submit()}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          name="cancel-form"
          layout="horizontal"
          form={QAform}
          onFinish={onFinishQA}
        >
          <Form.Item
            name="title"
            label="Tiêu đề (tóm tắt)"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Nội dung"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item name="topic" label="Chủ đề" rules={[{ required: true }]}>
            <Select
              onChange={(e: any) => handleTopic(e)}
              className="select"
              defaultValue="Tuỳ chọn chủ đề"
            >
              {data?.topic.map((vl: ITopic) => (
                <Option key={vl.id} value={vl.id}>
                  {vl.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="lesson"
            label="Bài giảng"
            rules={[{ required: true }]}
          >
            <Select className="select" defaultValue="Tuỳ chọn bài giảng">
              {lesson.map((vl: ILesson) => (
                <Option key={vl.id} value={vl.id}>
                  {vl.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
