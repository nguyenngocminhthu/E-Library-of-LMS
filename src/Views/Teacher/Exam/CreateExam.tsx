import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { MinusCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Radio, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { IQuestion } from "../../../redux/reducers/question.reducer";
import { getSubjects, ISubject } from "../../../redux/reducers/subject.reducer";
import {
  getSubjectGroup,
  getSubjectGroups,
  ISubjectGroup,
} from "../../../redux/reducers/subjectgroup.reducer";
import { AppDispatch } from "../../../redux/store";
import "./style.scss";
import { ISelect } from "../../../Components/Select";

const { Option } = Select;

export const CreateExam = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [select, setSelect] = useState(0);
  const [form] = Form.useForm();
  const [dataSubGroup, setDataSubGroup] = useState<ISelect[]>([]);

  const [answerNum, setAnswerNum] = useState<any[]>([]);
  const [question, setQuestion] = useState<any[]>([]);
  const [quesType, setQuesType] = useState<number>(0);
  const [examType, setExamType] = useState<number>(0);
  const [dataSub, setDataSub] = useState<ISelect[]>([]);

  useEffect(() => {
    dispatch(getSubjectGroups(999))
      .unwrap()
      .then((rs) => {
        let arr: ISelect[] = [];
        rs.results.forEach((vl: ISubjectGroup) => {
          arr.push({ name: vl.groupName, value: vl.id });
        });
        setDataSubGroup(arr);
      });
  }, []);

  const handleSelect = (e: any) => {
    dispatch(getSubjectGroup(e))
      .unwrap()
      .then((rs: ISubjectGroup) => {
        let arr: ISelect[] = [];
        rs.subject.forEach((vl: ISubject) => {
          arr.push({ name: vl.subName, value: vl.id });
        });
        setDataSub(arr);
      });
  };

  const questionFinish = (values: IQuestion) => {
    console.debug(values);
    setQuestion([...question, values]);
    form.resetFields(["quesName", "quesType", "answers", "correct"]);
  };

  return (
    <div className="sub-exam-bank">
      <BreadcrumbComp
        title="Tạo đề thi với câu hỏi mới"
        prevPageTitle="Ngân hàng đề thi"
        prevPage="teacher/exams"
      />
      <Form
        className="new-exam-form"
        form={form}
        onFinish={questionFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Row>
          <h3>
            <b>Phần thông tin:</b>
          </h3>
          <Col span={10}>
            <Form.Item name="examName" label="Tên">
              <Input />
            </Form.Item>
            <Form.Item name="subjectGroup" label="Tổ bộ môn">
              <Select onChange={(e: any) => handleSelect(e)}>
                {dataSubGroup.map((vl: ISelect) => (
                  <Option value={vl.value}>{vl.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="examType" label="Hình thức">
              <Radio.Group onChange={(e) => setExamType(e.target.value)}>
                <Radio value={0}>Trắc nghiệm</Radio>
                <Radio value={1}>Tự luận</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={10} offset={4}>
            <Form.Item name="time" label="Thời lượng">
              <Select style={{ width: "100px" }}>
                <Option value={15}>15</Option>
                <Option value={30}>30</Option>
                <Option value={45}>45</Option>
                <Option value={45}>60</Option>
              </Select>{" "}
              phút
            </Form.Item>
            <Form.Item name="subject" label="Môn học">
              <Select disabled={dataSub.length === 0}>
                {dataSub.map((vl: ISelect) => (
                  <Option value={vl.value}>{vl.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="body-bank">
        <Form
          className="new-exam-form"
          name="question-form"
          onFinish={questionFinish}
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Row>
            <Col span={6} className="question-number">
              <div style={{ marginBottom: "1rem" }}>Phần câu hỏi - đáp án:</div>
              <Form.List
                name="question"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 2) {
                        return Promise.reject(new Error("Ít nhất 2 câu hỏi"));
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item required={false} key={field.key}>
                        <div
                          className={
                            select === index ? "answer true" : "answer"
                          }
                          onClick={() => {
                            setSelect(index);
                            if (question[index] !== undefined) {
                              delete question[index].question;
                              form.setFieldsValue(question[index]);
                              switch (question[index].answers.length) {
                                case 1:
                                  return setAnswerNum([0]);
                                case 2:
                                  return setAnswerNum([0, 1]);
                                case 3:
                                  return setAnswerNum([0, 1, 2]);
                                case 4:
                                  return setAnswerNum([0, 1, 2, 3]);
                                default:
                                  return setAnswerNum([]);
                              }
                            } else
                              form.resetFields([
                                "quesName",
                                "quesType",
                                "answers",
                                "correct",
                              ]);
                            setAnswerNum([]);
                          }}
                        >
                          <Form.Item {...field}>Câu {index + 1}</Form.Item>
                          {fields.length > 1 ? (
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => {
                                remove(field.name);
                                setSelect(0);
                              }}
                            />
                          ) : null}
                        </div>
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        className="default-btn"
                        type="default"
                        onClick={() => {
                          add();
                          form.submit();
                          setSelect(fields.length);
                          setAnswerNum([]);
                        }}
                        style={{ width: "100%" }}
                      >
                        Thêm câu hỏi
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
            <Col span={18} className="question-detail">
              <Form.Item
                labelCol={{ span: 4 }}
                name="quesName"
                label={`Câu hỏi ${select + 1}:`}
              >
                <SunEditor
                  setOptions={{
                    defaultTag: "div",
                    minHeight: "100px",
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
              {examType === 0 ? (
                <>
                  <Form.Item
                    labelCol={{ span: 4 }}
                    name="quesType"
                    label="Câu trả lời"
                  >
                    <Radio.Group onChange={(e) => setQuesType(e.target.value)}>
                      <Radio value={0}>Một đáp án</Radio>
                      <Radio value={1}>Nhiều đáp án</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.List
                    name="answers"
                    rules={[
                      {
                        validator: async (_, names) => {
                          if (!names || names.length < 2) {
                            return Promise.reject(
                              new Error("Ít nhất 2 đáp án")
                            );
                          }
                        },
                      },
                    ]}
                  >
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field, index) => (
                          <Form.Item
                            labelCol={{ span: 4 }}
                            label={`Đáp án ${
                              index === 0
                                ? "A"
                                : index === 1
                                ? "B"
                                : index === 2
                                ? "C"
                                : "D"
                            }`}
                            required={false}
                            key={field.key}
                            className="answer-input"
                          >
                            <Form.Item
                              {...field}
                              validateTrigger={["onChange", "onBlur"]}
                            >
                              <Input />
                            </Form.Item>
                            {fields.length > 1 ? (
                              <CloseOutlined
                                className="dynamic-delete-button"
                                onClick={() => {
                                  let count = answerNum;
                                  count.pop();
                                  remove(field.name);
                                  setAnswerNum([...count]);
                                }}
                              />
                            ) : null}
                          </Form.Item>
                        ))}
                        <Form.Item
                          wrapperCol={{ span: 22 }}
                          className="answer-form"
                        >
                          <Button
                            className="default-btn"
                            type="default"
                            onClick={() => {
                              add();
                              setAnswerNum([...answerNum, fields.length]);
                            }}
                            disabled={fields.length === 4}
                          >
                            Thêm đáp án
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  <Form.Item
                    labelCol={{ span: 4 }}
                    name="correct"
                    label="Đáp án đúng"
                  >
                    {quesType === 0 ? (
                      <Radio.Group>
                        {answerNum.map((vl, idx) => (
                          <Radio key={vl} value={idx}>
                            {idx === 0
                              ? "A"
                              : idx === 1
                              ? "B"
                              : idx === 2
                              ? "C"
                              : "D"}
                          </Radio>
                        ))}
                      </Radio.Group>
                    ) : (
                      <Checkbox.Group>
                        {answerNum.map((vl, idx) => (
                          <Checkbox key={vl} value={idx}>
                            {idx === 0
                              ? "A"
                              : idx === 1
                              ? "B"
                              : idx === 2
                              ? "C"
                              : "D"}
                          </Checkbox>
                        ))}
                      </Checkbox.Group>
                    )}
                  </Form.Item>
                </>
              ) : (
                <div>
                  <Form.Item
                    labelCol={{ span: 4 }}
                    name="correctEssay"
                    label="Đáp án đúng"
                  >
                    <TextArea rows={16} />
                  </Form.Item>
                </div>
              )}
            </Col>
          </Row>
        </Form>
      </div>
      <div className="footer-btn" style={{ justifyContent: "center" }}>
        <Button
          onClick={() => navigate("/teacher/exams")}
          className="default-btn"
        >
          Huỷ
        </Button>
        <Button style={{ marginLeft: "1rem" }} type="primary">
          Lưu và gửi phê duyệt
        </Button>
      </div>
    </div>
  );
};
