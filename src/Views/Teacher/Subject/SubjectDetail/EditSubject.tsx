import {
  CaretRightOutlined,
  DownloadOutlined,
  LinkOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  Dropdown,
  Form,
  Menu,
  message,
  Row,
  Tabs,
  Tooltip,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbComp } from "../../../../Components/Breadcrumb";
import {
  getSubject,
  ISubject,
} from "../../../../redux/reducers/subject.reducer";
import { createTopic, ITopic } from "../../../../redux/reducers/topic.reducer";
import { AppDispatch } from "../../../../redux/store";
import { EditTopic } from "./EditTopic";

const { TabPane } = Tabs;
const { Panel } = Collapse;

export const EditSubject = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [data, setData] = useState<ISubject>();
  const [loading, setLoading] = useState(false);
  const [dataNotification, setDataNotification] = useState<any>([]);
  const [form] = Form.useForm();
  const [formTopic] = Form.useForm();
  const [editTopic, setEditTopic] = useState<boolean>(false);
  const [idx, setIdx] = useState<number>(0);
  const [newIdx, setNewIdx] = useState<number>(0);

  useEffect(() => {
    if (params.id) {
      dispatch(getSubject(params.id))
        .unwrap()
        .then((rs: ISubject) => {
          setData(rs);
        });
    }
  }, []);

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
  }, []);

  const genExtra = (index: number) => (
    <Dropdown.Button
      overlay={
        <Menu>
          <Menu.Item
            key=""
            onClick={() => {
              setEditTopic(true);
              setIdx(index);
            }}
          >
            Thêm bài giảng
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="1">Chỉnh sửa</Menu.Item>
          <Menu.Divider />
          <Menu.Item key="2">Sao chép</Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3">Xóa</Menu.Item>
        </Menu>
      }
      icon={
        <SettingOutlined
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      }
    ></Dropdown.Button>
  );

  const onFinish = (values: any) => {
    console.debug(values.title[newIdx]);
    dispatch(createTopic({ subjectId: params.id, title: values.title[newIdx] }))
      .unwrap()
      .then((rs) => {
        handleRefresh();
        message.success("Thêm chủ đề mới thành công.");
        formTopic.resetFields();
      });
  };

  return (
    <div className="subDetail teacher-subject">
      <BreadcrumbComp
        title={data?.subName}
        prevPageTitle="Danh sách môn giảng dạy"
        prevPage="teacher/subject"
      />
      <div className="Noti-Page">
        <div className="tab-notilist">
          <Tabs defaultActiveKey="1" type="card" size={"small"}>
            <TabPane tab="Tổng quan môn học" key="1">
              <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
                form={form}
                style={{ width: "85%", marginLeft: "60px" }}
              >
                <Form.Item name="subcode" label="Mã môn học">
                  <div>{data?.subCode}</div>
                </Form.Item>
                <Form.Item name="codesuject" label="Môn học">
                  <div>{data?.subName}</div>
                </Form.Item>
                <Form.Item name="teacher" label="Giảng viên">
                  <div>{data?.teacher.userName}</div>
                </Form.Item>
                <Form.Item name="description" label="Mô tả">
                  <TextArea rows={3} />
                </Form.Item>
                <Form.List name="names">
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <Form.Item wrapperCol={{ span: 24 }} key={field.key}>
                          <Form.Item
                            {...field}
                            validateTrigger={["onChange", "onBlur"]}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message:
                                  "Vui lòng nhập đầy đủ mô tả hoặc xóa trường này.",
                              },
                            ]}
                          >
                            <div className="add-description-input">
                              <Row>
                                <Col span={6}>
                                  <TextArea placeholder="Tiêu đề" rows={3} />
                                </Col>
                                <Col span={17} offset={1}>
                                  <TextArea
                                    placeholder="Nội dung chi tiết "
                                    rows={3}
                                  />
                                </Col>
                              </Row>
                              <div className="group-btn-add">
                                <Button
                                  className="cancel-btn"
                                  onClick={() => remove(field.name)}
                                >
                                  Hủy
                                </Button>
                                <Button
                                  type="primary"
                                  style={{ marginLeft: "1rem" }}
                                >
                                  Lưu
                                </Button>
                              </div>
                            </div>
                          </Form.Item>
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Button
                          type="primary"
                          onClick={() => add()}
                          className="add-description"
                          icon={<PlusOutlined />}
                        >
                          Thêm mô tả
                        </Button>
                        <Form.ErrorList errors={errors} />
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form>
            </TabPane>
            <TabPane tab="Danh sách chủ đề" key="2">
              {editTopic ? (
                <EditTopic topic={data?.topic[idx]} />
              ) : (
                <div
                  id="scrollableDiv"
                  style={{
                    height: 600,
                    overflow: "auto",
                    padding: "0 16px",
                  }}
                >
                  <Collapse
                    bordered={false}
                    className="site-collapse-custom-collapse"
                  >
                    {data?.topic.map((vl: ITopic, index: number) => (
                      <Panel
                        header={vl.title}
                        key={index}
                        className="site-collapse-custom-panel"
                        extra={genExtra(index)}
                      >
                        <div className="accor-video">
                          <Tooltip title="Play">
                            <Button
                              size="large"
                              shape="circle"
                              icon={<CaretRightOutlined />}
                              onClick={() =>
                                navigate(
                                  `/teacher/subject/viewsubject/${params.id}`
                                )
                              }
                            />
                          </Tooltip>
                        </div>
                        <h4>Tài nguyên</h4>
                        <hr />
                        <div className="download-file">
                          <div className="file-name">
                            <LinkOutlined />
                            HTKL_KT4SP_10A1.doc
                          </div>
                          <Button>
                            <DownloadOutlined />
                            Tải xuống
                          </Button>
                        </div>
                        <div className="download-file">
                          <div className="file-name">
                            <LinkOutlined />
                            HTKL_KT4SP_10A1.doc
                          </div>
                          <Button>
                            <DownloadOutlined />
                            Tải xuống
                          </Button>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit
                        </p>
                        <hr />
                        <Collapse
                          bordered={false}
                          className="site-collapse-custom-collapse"
                        >
                          <Panel
                            header="hehe"
                            key={1}
                            className="site-collapse-custom-panel"
                          >
                            <div className="accor-video">
                              <Tooltip title="Play">
                                <Button
                                  size="large"
                                  shape="circle"
                                  icon={<CaretRightOutlined />}
                                  onClick={() =>
                                    navigate(
                                      `/teacher/subject/viewsubject/${params.id}`
                                    )
                                  }
                                />
                              </Tooltip>
                            </div>
                            <h4>Tài nguyên</h4>
                            <hr />
                            <div className="download-file">
                              <div className="file-name">
                                <LinkOutlined />
                                HTKL_KT4SP_10A1.doc
                              </div>
                              <Button>
                                <DownloadOutlined />
                                Tải xuống
                              </Button>
                            </div>
                            <div className="download-file">
                              <div className="file-name">
                                <LinkOutlined />
                                HTKL_KT4SP_10A1.doc
                              </div>
                              <Button>
                                <DownloadOutlined />
                                Tải xuống
                              </Button>
                            </div>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit
                            </p>
                            <hr />
                            <Collapse
                              bordered={false}
                              className="site-collapse-custom-collapse"
                            >
                              <Panel
                                header="Thương mại điện tử đã thay đổi sự phát triển của nền kinh tế thế giới"
                                key="1"
                                className="site-collapse-custom-panel scrollbar"
                              >
                                <h3>1. Quá trình</h3>
                                Contrary to popular belief, Lorem Ipsum is not
                                simply random text. It has roots in a piece of
                                classical Latin literature from 45 BC, making it
                                over 2000 years old. Richard McClintock, a Latin
                                professor at Hampden-Sydney College in Virginia,
                                looked up one of the more obscure Latin words,
                                consectetur, from a Lorem Ipsum passage, and
                                going through the cites of the word in classical
                                literature, discovered the undoubtable source.
                                Lorem Ipsum comes from sections 1.10.32 and
                                1.10.33 of "de Finibus Bonorum et Malorum" (The
                                Extremes of Good and Evil) by Cicero, written in
                                45 BC. This book is a treatise on the theory of
                                ethics, very popular during the Renaissance. The
                                first line of Lorem Ipsum, "Lorem ipsum dolor
                                sit amet..", comes from a line in section
                                1.10.32. <br />
                                <br />
                                The standard chunk of Lorem Ipsum used since the
                                1500s is reproduced below for those interested.
                                Sections 1.10.32 and 1.10.33 from "de Finibus
                                Bonorum et Malorum" by Cicero are also
                                reproduced in their exact original form,
                                accompanied by English versions from the 1914
                                translation by H. Rackham. <br />
                                <br />
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout. The point of using
                                Lorem Ipsum is that it has a more-or-less normal
                                distribution of letters, as opposed to using
                                'Content here, content here', making it look
                                like readable English. Many desktop publishing
                                packages and web page editors now use Lorem
                                Ipsum as their default model text, and a search
                                for 'lorem ipsum' will uncover many web sites
                                still in their infancy. Various versions have
                                evolved over the years, sometimes by accident,
                                sometimes on purpose (injected humour and the
                                like). There are many variations of passages of
                                Lorem Ipsum available, but the majority have
                                suffered alteration in some form, by injected
                                humour, or randomised words which don't look
                                even slightly believable. If you are going to
                                use a passage of Lorem Ipsum, you need to be
                                sure there isn't anything embarrassing hidden in
                                the middle of text. All the Lorem Ipsum
                                generators on the Internet tend to repeat
                                predefined chunks as necessary, making this the
                                first true generator on the Internet. It uses a
                                dictionary of over 200 Latin words, combined
                                with a handful of model sentence structures, to
                                generate Lorem Ipsum which looks reasonable. The
                                generated Lorem Ipsum is therefore always free
                                from repetition, injected humour, or
                                non-characteristic words etc.
                              </Panel>
                            </Collapse>
                          </Panel>
                        </Collapse>
                      </Panel>
                    ))}
                  </Collapse>
                  <Form form={formTopic} onFinish={onFinish}>
                    <Form.List name="title">
                      {(fields, { add, remove }, { errors }) => (
                        <>
                          {fields.map((field, index) => (
                            <Form.Item
                              className="add-description-input"
                              key={field.key}
                            >
                              <Form.Item
                                {...field}
                                validateTrigger={["onChange", "onBlur"]}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message:
                                      "Vui lòng nhập đầy đủ mô tả hoặc xóa trường này.",
                                  },
                                ]}
                              >
                                <TextArea
                                  placeholder="Nhập tiêu đề của chủ đề mới"
                                  rows={3}
                                />
                              </Form.Item>
                              <div className="group-btn-add">
                                <Button
                                  className="cancel-btn"
                                  onClick={() => remove(field.name)}
                                >
                                  Hủy
                                </Button>
                                <Button
                                  type="primary"
                                  style={{ marginLeft: "1rem" }}
                                  onClick={() => {
                                    formTopic.submit();
                                    setNewIdx(index);
                                  }}
                                >
                                  Lưu
                                </Button>
                              </div>
                            </Form.Item>
                          ))}
                          <Form.Item>
                            <Button
                              type="primary"
                              onClick={() => add()}
                              className="add-description"
                              icon={<PlusOutlined />}
                            >
                              Thêm chủ đề
                            </Button>
                            <Form.ErrorList errors={errors} />
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Form>
                </div>
              )}
            </TabPane>
          </Tabs>
          <div className="tab-control">
            <Button
              onClick={() =>
                editTopic
                  ? setEditTopic(false)
                  : navigate(`/teacher/subject/subjectdetail/${params.id}`)
              }
              className="cancel-btn"
            >
              Huỷ
            </Button>
            <Button type="primary" style={{ marginLeft: "1rem" }}>
              Lưu và gửi phê duyệt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
