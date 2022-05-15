import {
  CaretRightOutlined,
  DownloadOutlined,
  LinkOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Row,
  Col,
  Collapse,
  Tooltip,
  Button,
  Tabs,
  Select,
  Input,
  Form,
} from "antd";
import modal from "antd/lib/modal";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import { BreadcrumbComp } from "../../../../Components/Breadcrumb";
import SearchComponent from "../../../../Components/SearchComponent";
import { SelectComp } from "../../../../Components/Select";
import {
  getSubject,
  ISubject,
} from "../../../../redux/reducers/subject.reducer";
import { AppDispatch } from "../../../../redux/store";

const { TabPane } = Tabs;
const { Panel } = Collapse;

const classTeach = [
  {
    name: "Tất cả các lớp",
    value: "all",
  },
  {
    name: "Lớp nâng cao",
    value: "advancedClass",
  },
  {
    name: "Lớp cơ bản",
    value: "basicClass",
  },
];

export const EditSubject = () => {
  const params = useParams<{ idSub: string }>();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [data, setData] = useState<ISubject>();
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dataNotification, setDataNotification] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editorState, setEditorState] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    if (params.idSub) {
      dispatch(getSubject(params.idSub))
        .unwrap()
        .then((rs: ISubject) => {
          setData(rs);
          console.debug("teacher: ", rs);
        })
        .catch((e: any) => {
          console.debug("e: ", e);
        });
    }
  }, []);

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

  return (
    <div className="subDetail teacher-subject">
      <BreadcrumbComp
        title="Thương mại điện tử"
        prevPageTitle="Danh sách môn giảng dạy"
        prevPage="teacher/subject"
      />
      <div className="Noti-Page">
        <div className="tab-notilist">
          <Tabs defaultActiveKey="1" type="card" size={"small"}>
            <TabPane tab="Tổng quan môn học" key="1">
              <div style={{ marginLeft: "60px" }}>
                <Form
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  layout="horizontal"
                  form={form}
                  style={{ width: "85%" }}
                >
                  <Form.Item name="subcode" label="Mã môn học">
                    <div>#DLK6</div>
                  </Form.Item>
                  <Form.Item name="codesuject" label="Môn học">
                    <div>Thương mại điện tử</div>
                  </Form.Item>
                  <Form.Item name="teacher" label="Giảng viên">
                    <div>Hoa Hoa</div>
                  </Form.Item>
                  <Form.Item name="description" label="Mô tả">
                    <TextArea rows={3} />
                  </Form.Item>
                </Form>
                <Form>
                  <Form.List name="names">
                    {(fields, { add, remove }, { errors }) => (
                      <>
                        {fields.map((field, index) => (
                          <Form.Item required={false} key={field.key}>
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
                              noStyle
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
                                    htmlType="submit"
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
              </div>
            </TabPane>
            <TabPane tab="Danh sách chủ đề" key="2">
              <div
                id="scrollableDiv"
                style={{
                  height: 400,
                  overflow: "auto",
                  padding: "0 16px",
                }}
              >
                <div>
                  <div className="sub-title">
                    Chủ đề:{" "}
                    <span>
                      Thương mại điện tử đã thay đổi sự phát triển của nền kinh
                      tế thế giới
                    </span>
                  </div>
                  <Collapse
                    bordered={false}
                    className="site-collapse-custom-collapse"
                  >
                    <Panel
                      header="Giới thiệu chung về Thương mại Điện tử"
                      key="1"
                      className="site-collapse-custom-panel"
                    >
                      <div className="accor-video">
                        <Tooltip title="Play">
                          <Button
                            size="large"
                            shape="circle"
                            icon={<CaretRightOutlined />}
                            onClick={() => navigate(`/subjects/viewsubject`)}
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </p>
                      <hr />
                      <Collapse
                        bordered={false}
                        className="site-collapse-custom-collapse"
                      >
                        <Panel
                          header="Giới thiệu về thương mại điện tử trong những năm gần đây"
                          key="1"
                          className="site-collapse-custom-panel scrollbar"
                        >
                          <h3>1. Quá trình</h3>
                          Contrary to popular belief, Lorem Ipsum is not simply
                          random text. It has roots in a piece of classical
                          Latin literature from 45 BC, making it over 2000 years
                          old. Richard McClintock, a Latin professor at
                          Hampden-Sydney College in Virginia, looked up one of
                          the more obscure Latin words, consectetur, from a
                          Lorem Ipsum passage, and going through the cites of
                          the word in classical literature, discovered the
                          undoubtable source. Lorem Ipsum comes from sections
                          1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                          (The Extremes of Good and Evil) by Cicero, written in
                          45 BC. This book is a treatise on the theory of
                          ethics, very popular during the Renaissance. The first
                          line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                          comes from a line in section 1.10.32. <br />
                          <br />
                          The standard chunk of Lorem Ipsum used since the 1500s
                          is reproduced below for those interested. Sections
                          1.10.32 and 1.10.33 from "de Finibus Bonorum et
                          Malorum" by Cicero are also reproduced in their exact
                          original form, accompanied by English versions from
                          the 1914 translation by H. Rackham. <br />
                          <br />
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page when
                          looking at its layout. The point of using Lorem Ipsum
                          is that it has a more-or-less normal distribution of
                          letters, as opposed to using 'Content here, content
                          here', making it look like readable English. Many
                          desktop publishing packages and web page editors now
                          use Lorem Ipsum as their default model text, and a
                          search for 'lorem ipsum' will uncover many web sites
                          still in their infancy. Various versions have evolved
                          over the years, sometimes by accident, sometimes on
                          purpose (injected humour and the like). There are many
                          variations of passages of Lorem Ipsum available, but
                          the majority have suffered alteration in some form, by
                          injected humour, or randomised words which don't look
                          even slightly believable. If you are going to use a
                          passage of Lorem Ipsum, you need to be sure there
                          isn't anything embarrassing hidden in the middle of
                          text. All the Lorem Ipsum generators on the Internet
                          tend to repeat predefined chunks as necessary, making
                          this the first true generator on the Internet. It uses
                          a dictionary of over 200 Latin words, combined with a
                          handful of model sentence structures, to generate
                          Lorem Ipsum which looks reasonable. The generated
                          Lorem Ipsum is therefore always free from repetition,
                          injected humour, or non-characteristic words etc.
                        </Panel>
                      </Collapse>
                    </Panel>
                    <Panel
                      header="Thương mại điện tử"
                      key="2"
                      className="site-collapse-custom-panel"
                    >
                      <Collapse
                        bordered={false}
                        className="site-collapse-custom-collapse"
                      >
                        <Panel
                          header="Giới thiệu về thương mại điện tử trong những năm gần đây"
                          key="1"
                          className="site-collapse-custom-panel scrollbar"
                        >
                          <h3>1. Quá trình</h3>
                          Contrary to popular belief, Lorem Ipsum is not simply
                          random text. It has roots in a piece of classical
                          Latin literature from 45 BC, making it over 2000 years
                          old. Richard McClintock, a Latin professor at
                          Hampden-Sydney College in Virginia, looked up one of
                          the more obscure Latin words, consectetur, from a
                          Lorem Ipsum passage, and going through the cites of
                          the word in classical literature, discovered the
                          undoubtable source. Lorem Ipsum comes from sections
                          1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                          (The Extremes of Good and Evil) by Cicero, written in
                          45 BC. This book is a treatise on the theory of
                          ethics, very popular during the Renaissance. The first
                          line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                          comes from a line in section 1.10.32. <br />
                          <br />
                          The standard chunk of Lorem Ipsum used since the 1500s
                          is reproduced below for those interested. Sections
                          1.10.32 and 1.10.33 from "de Finibus Bonorum et
                          Malorum" by Cicero are also reproduced in their exact
                          original form, accompanied by English versions from
                          the 1914 translation by H. Rackham. <br />
                          <br />
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page when
                          looking at its layout. The point of using Lorem Ipsum
                          is that it has a more-or-less normal distribution of
                          letters, as opposed to using 'Content here, content
                          here', making it look like readable English. Many
                          desktop publishing packages and web page editors now
                          use Lorem Ipsum as their default model text, and a
                          search for 'lorem ipsum' will uncover many web sites
                          still in their infancy. Various versions have evolved
                          over the years, sometimes by accident, sometimes on
                          purpose (injected humour and the like). There are many
                          variations of passages of Lorem Ipsum available, but
                          the majority have suffered alteration in some form, by
                          injected humour, or randomised words which don't look
                          even slightly believable. If you are going to use a
                          passage of Lorem Ipsum, you need to be sure there
                          isn't anything embarrassing hidden in the middle of
                          text. All the Lorem Ipsum generators on the Internet
                          tend to repeat predefined chunks as necessary, making
                          this the first true generator on the Internet. It uses
                          a dictionary of over 200 Latin words, combined with a
                          handful of model sentence structures, to generate
                          Lorem Ipsum which looks reasonable. The generated
                          Lorem Ipsum is therefore always free from repetition,
                          injected humour, or non-characteristic words etc.
                        </Panel>
                      </Collapse>
                      <Collapse
                        bordered={false}
                        className="site-collapse-custom-collapse"
                      >
                        <Panel
                          header="Thương mại điện tử đã thay đổi sự phát triển của nền kinh tế thế giới"
                          key="2"
                          className="site-collapse-custom-panel scrollbar"
                        >
                          <h3>1. Quá trình</h3>
                          Contrary to popular belief, Lorem Ipsum is not simply
                          random text. It has roots in a piece of classical
                          Latin literature from 45 BC, making it over 2000 years
                          old. Richard McClintock, a Latin professor at
                          Hampden-Sydney College in Virginia, looked up one of
                          the more obscure Latin words, consectetur, from a
                          Lorem Ipsum passage, and going through the cites of
                          the word in classical literature, discovered the
                          undoubtable source. Lorem Ipsum comes from sections
                          1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                          (The Extremes of Good and Evil) by Cicero, written in
                          45 BC. This book is a treatise on the theory of
                          ethics, very popular during the Renaissance. The first
                          line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                          comes from a line in section 1.10.32. <br />
                          <br />
                          The standard chunk of Lorem Ipsum used since the 1500s
                          is reproduced below for those interested. Sections
                          1.10.32 and 1.10.33 from "de Finibus Bonorum et
                          Malorum" by Cicero are also reproduced in their exact
                          original form, accompanied by English versions from
                          the 1914 translation by H. Rackham. <br />
                          <br />
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page when
                          looking at its layout. The point of using Lorem Ipsum
                          is that it has a more-or-less normal distribution of
                          letters, as opposed to using 'Content here, content
                          here', making it look like readable English. Many
                          desktop publishing packages and web page editors now
                          use Lorem Ipsum as their default model text, and a
                          search for 'lorem ipsum' will uncover many web sites
                          still in their infancy. Various versions have evolved
                          over the years, sometimes by accident, sometimes on
                          purpose (injected humour and the like). There are many
                          variations of passages of Lorem Ipsum available, but
                          the majority have suffered alteration in some form, by
                          injected humour, or randomised words which don't look
                          even slightly believable. If you are going to use a
                          passage of Lorem Ipsum, you need to be sure there
                          isn't anything embarrassing hidden in the middle of
                          text. All the Lorem Ipsum generators on the Internet
                          tend to repeat predefined chunks as necessary, making
                          this the first true generator on the Internet. It uses
                          a dictionary of over 200 Latin words, combined with a
                          handful of model sentence structures, to generate
                          Lorem Ipsum which looks reasonable. The generated
                          Lorem Ipsum is therefore always free from repetition,
                          injected humour, or non-characteristic words etc.
                        </Panel>
                      </Collapse>
                    </Panel>
                    <Panel
                      header="Thương mại điện tử"
                      key="3"
                      className="site-collapse-custom-panel"
                    >
                      hehe
                    </Panel>
                  </Collapse>
                  <Button
                    type="primary"
                    className="add-description"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      navigate(`/subjects/addsubject`);
                    }}
                  >
                    Thêm bài giảng
                  </Button>
                </div>
              </div>
            </TabPane>
          </Tabs>
          <div className="tab-control">
            <Button className="cancel-btn">Huỷ</Button>
            <Button type="primary" style={{ marginLeft: "1rem" }}>
              Lưu và gửi phê duyệt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
