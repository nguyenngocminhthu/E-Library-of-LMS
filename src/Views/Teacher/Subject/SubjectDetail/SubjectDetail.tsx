import {
  CaretRightOutlined,
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Collapse, 
  Comment, 
  Divider,
  Form,
  Input,
  List,
  Modal,
  Row,
  Select,
  Skeleton,
  Tabs,
  Tooltip
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import modal from "antd/lib/modal";
import moment from "moment";
import React, { createElement, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import { BreadcrumbComp } from "../../../../Components/Breadcrumb";
import SearchComponent from "../../../../Components/SearchComponent";
import { ISelect, SelectComp } from "../../../../Components/Select";
import {
  createNoti,
  getNotis,
  INoti,
} from "../../../../redux/reducers/noti.reducer";
import { getQAs, IQA } from "../../../../redux/reducers/QA.reducer";
import {
  getSubject,
  getSubjects,
  ISubject,
} from "../../../../redux/reducers/subject.reducer";
import { ITopic } from "../../../../redux/reducers/topic.reducer";
import { UserState } from "../../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../../redux/store";

export const SubjectDetail = () => {
  const { Option } = Select;
  const { TabPane } = Tabs;
  const { Panel } = Collapse;
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [data, setData] = useState<ISubject>();
  const [loading, setLoading] = useState(false);
  const [dataNotification, setDataNotification] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<string | null>(null);
  const [qa, setQa] = useState<IQA[]>([]);
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const [dataClass, setDataClass] = useState<ISelect[]>([]);
  const [topic, setTopic] = useState<ISelect[]>([]);
  const [notify, setNotify] = useState<INoti[]>([]);

  useEffect(() => {
    if (params.id) {
      dispatch(getSubject(params.id))
        .unwrap()
        .then((rs: ISubject) => {
          setData(rs);
        });
      dispatch(getNotis({ limit: 9999, subject: params.id }))
        .unwrap()
        .then((rs) => {
          setNotify(rs.results);
        });
    }
  }, [params.id]);

  const handleRefresh = () => {
    if (params.id) {
      dispatch(getSubject(params.id))
        .unwrap()
        .then((rs: ISubject) => {
          setData(rs);
        });
    }
  };

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
        setDataNotification([...dataNotification, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
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

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
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

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const modalAddQuestion = {
    title: "Tạo câu hỏi cho học viên",
    width: "50%",
    className: "modal-add-role",
    content: (
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        name="cancel-form"
        layout="horizontal"
        form={form}
      >
        <Form.Item
          name="fileName"
          label="Tiêu đề (tóm tắt)"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="chooseTopic"
          label="Chi tiết (tuỳ chọn)"
          rules={[{ required: true }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="fileNameTitle"
          label="Lớp giảng dạy"
          rules={[{ required: true }]}
        >
          <div className="selectcomp">
            <Select className="select" defaultValue={0}>
              <Option value={0}>Tất cả các lớp</Option>
              <Option value={1}>Lớp nâng cao</Option>
              <Option value={2}>Lớp căn bản</Option>
            </Select>
          </div>
        </Form.Item>
        <Form.Item
          name="fileNameTitle"
          label="Chủ đề"
          rules={[{ required: true }]}
        >
          <div className="selectcomp">
            <Select className="select" defaultValue="Tuỳ chọn chủ đề">
              <Option value={0}>Giới thiệu chung về Thương mại Điện tử</Option>
              <Option value={1}>Thương mại điện tử</Option>
            </Select>
          </div>
        </Form.Item>
        <Form.Item
          name="fileNameTitle"
          label="Bài giảng"
          rules={[{ required: true }]}
        >
          <div className="selectcomp">
            <Select className="select" defaultValue="Tuỳ chọn bài giảng">
              <Option value={0}>
                Giới thiệu về thương mại điện tử trong những năm gần đây
              </Option>
              <Option value={1}>
                Thương mại điện tử đã thay đổi sự phát triển của nền kinh tế thế
                giới
              </Option>
            </Select>
          </div>
        </Form.Item>
      </Form>
    ),
    okText: "Lưu",
    cancelText: "Huỷ",
  };

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
                    {data?.topic.map((vl: ITopic, idx: number) => (
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
                    ))}
                  </Collapse>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Hỏi & đáp" key="3">
              <div
                id="scrollableDiv"
                style={{
                  height: 400,
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
                    onClick={() => modal.confirm(modalAddQuestion)}
                    style={{ margin: "10px" }}
                  >
                    Thêm câu hỏi mới
                  </Button>
                </div>
                <div className="question-and-answer-container">
                  <Comment
                    actions={actions}
                    author={<a>Han Solo</a>}
                    avatar={
                      <Avatar
                        src="https://joeschmoe.io/api/v1/random"
                        alt="Han Solo"
                      />
                    }
                    content={
                      <p>
                        We supply a series of design principles, practical
                        patterns and high quality design resources (Sketch and
                        Axure), to help people create their product prototypes
                        beautifully and efficiently.
                      </p>
                    }
                    datetime={
                      <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                        <span>{moment().fromNow()}</span>
                      </Tooltip>
                    }
                  />
                </div>
                <div className="question-and-answer-container">
                  <Comment
                    actions={actions}
                    author={<a>Han Solo</a>}
                    avatar={
                      <Avatar
                        src="https://joeschmoe.io/api/v1/random"
                        alt="Han Solo"
                      />
                    }
                    content={
                      <p>
                        We supply a series of design principles, practical
                        patterns and high quality design resources (Sketch and
                        Axure), to help people create their product prototypes
                        beautifully and efficiently.
                      </p>
                    }
                    datetime={
                      <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                        <span>{moment().fromNow()}</span>
                      </Tooltip>
                    }
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="Thông báo môn học" key="4">
              <div className="t-right mb">
                <Button
                  className="btn-create-min"
                  type="primary"
                  onClick={showModal}
                >
                  Tạo thông báo mới
                </Button>
              </div>

              <div className="scroll-box sub-noti w-100">
                {notify.map((value: INoti) => {
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
    </div>
  );
};
