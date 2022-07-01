import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { MinusCircleOutlined, CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
} from "antd";
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
import { ISelect } from "../../../Components/Select";
import { CheckCircleOutlined } from "@ant-design/icons";
import { createBank } from "../../../redux/reducers/banks.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import "./style.scss";
import lodash from "lodash";
interface IQues {
  quesName: string;
  answers: string[];
  correct: number[];
  level: number;
  key: number;
  quesType: number;
  examType: number;
  correctEssay?: string;
}

export const CreateExam = () => {
  const { Option } = Select;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [select, setSelect] = useState(0);
  const [form] = Form.useForm();
  const [formQues] = Form.useForm();
  const [formQuesNum] = Form.useForm();
  const [dataSubGroup, setDataSubGroup] = useState<ISelect[]>([]);

  const [answerNum, setAnswerNum] = useState<any[]>([]);
  const [quesType, setQuesType] = useState<number>(0);
  const [examType, setExamType] = useState<number>(0);
  const [dataSub, setDataSub] = useState<ISelect[]>([]);
  const [quesNum, setQuesNum] = useState<number>(1);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  let arr: IQues[] = [];
  const [questions, setQuestions] = useState<IQues[]>(arr);

  useEffect(() => {
    for (let i = 0; i < quesNum; i++) {
      arr.push({
        quesName: "",
        answers: [],
        correct: [],
        level: 0,
        key: i,
        quesType: 0,
        examType: 0,
        correctEssay: "",
      });
    }
    setQuestions(arr);
  }, [quesNum]);

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

  useEffect(() => {
    formQues.setFieldsValue(questions[select]);
    setQuesType(questions[select].quesType);
    setExamType(questions[select].examType);
    if (questions[select].correct.length === 1) {
      formQues.setFieldsValue({ correct: questions[select].correct[0] });
    } else {
      formQues.setFieldsValue({ correct: questions[select].correct });
    }

    let arr: any[] = [];
    if (questions[select].answers !== undefined) {
      questions[select].answers.forEach((vl) => {
        arr.push(vl);
      });
      setAnswerNum(arr);
    }
  }, [select]);

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

  const quesNumFinish = (value: any) => {
    setQuesNum(value.quesNum);
    setIsModalVisible(false);
  };

  const questionFinish = (values: {
    quesName: string;
    answers: string[];
    correct: number;
    level: number;
    key: number;
    quesType: number;
    examType: number;
    correctEssay?: string;
  }) => {
    setQuestions((item) =>
      item.map((vl) => {
        if (vl.key === select) {
          vl.quesName = values.quesName;
          vl.correct = lodash.isArray(values.correct)
            ? values.correct
            : [values.correct];
          vl.answers = values.answers;
          vl.level = values.level;
          vl.quesType = values.quesType;
          vl.examType = values.examType;
          vl.correctEssay = values.correctEssay;
        }
        return vl;
      })
    );
  };

  const onFinish = (values: any) => {
    dispatch(
      createBank({
        ...values,
        questions: questions,
        user: user.id,
        fileType: 0,
      })
    ).then(() => {
      navigate("/teacher/exams");
    });
  };

  return (
    <div className="sub-exam-bank">
      <BreadcrumbComp
        title="Tạo đề thi với câu hỏi mới"
        prevFirstPageTitle="Ngân hàng đề thi"
        prevFirstPage="teacher/exams"
      />
      <Form
        className="new-exam-form"
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Row>
          <h3>
            <b>Phần thông tin:</b>
          </h3>
          <Col span={10}>
            <Form.Item name="examName" label="Tên" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="subjectGroup"
              label="Tổ bộ môn"
              rules={[{ required: true }]}
            >
              <Select onChange={(e: any) => handleSelect(e)}>
                {dataSubGroup.map((vl: ISelect) => (
                  <Option value={vl.value}>{vl.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={10} offset={4}>
            <Form.Item
              name="time"
              label="Thời lượng"
              rules={[{ required: true }]}
            >
              <Select style={{ width: "100px" }}>
                <Option value={15}>15</Option>
                <Option value={30}>30</Option>
                <Option value={45}>45</Option>
                <Option value={60}>60</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="subject"
              label="Môn học"
              rules={[{ required: true }]}
            >
              <Select disabled={dataSub.length === 0}>
                {dataSub.map((vl: ISelect) => (
                  <Option value={vl.value}>{vl.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="t-right mt w-100">
        <Button
          onClick={() => {
            formQues.submit();
          }}
          type="primary"
        >
          Lưu câu hỏi
        </Button>
      </div>

      <div className="body-bank">
        <Form
          className="new-exam-form"
          name="question-form"
          onFinish={questionFinish}
          form={formQues}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Row>
            <Col span={6} className="question-number">
              <div style={{ marginBottom: "1rem" }}>Phần câu hỏi - đáp án:</div>
              {questions.map((vl, idx) => (
                <div
                  className={select === idx ? "answer true" : "answer"}
                  key={vl.key}
                  onClick={() => {
                    setSelect(idx);
                  }}
                >
                  Câu {idx + 1}
                  <div hidden={!(select === idx)} className="icon-true">
                    <CheckCircleOutlined />
                  </div>
                </div>
              ))}
            </Col>
            <Col span={18} className="question-detail">
              <Form.Item
                labelCol={{ span: 4 }}
                name="quesName"
                label={`Câu hỏi ${select + 1}:`}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 4 }}
                name="examType"
                label="Hình thức"
                rules={[{ required: true }]}
              >
                <Radio.Group onChange={(e) => setExamType(e.target.value)}>
                  <Radio value={0}>Trắc nghiệm</Radio>
                  <Radio value={1}>Tự luận</Radio>
                </Radio.Group>
              </Form.Item>
              {examType === 0 ? (
                <div>
                  <Row>
                    <Col style={{ paddingLeft: "1.8rem" }} span={12}>
                      <Form.Item
                        name="quesType"
                        labelCol={{ span: 4 }}
                        label="Câu trả lời"
                      >
                        <Radio.Group
                          onChange={(e) => setQuesType(e.target.value)}
                        >
                          <Radio value={0}>Một đáp án</Radio>
                          <Radio value={1}>Nhiều đáp án</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        labelCol={{ span: 4 }}
                        name="level"
                        label="Độ khó"
                      >
                        <Radio.Group>
                          <Radio value={0}>Dễ</Radio>
                          <Radio value={1}>Trung bình</Radio>
                          <Radio value={2}>Khó</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>

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
                </div>
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
        <Button
          onClick={() => {
            form.submit();
          }}
          style={{ marginLeft: "1rem" }}
          type="primary"
        >
          Lưu và gửi phê duyệt
        </Button>
      </div>
      <Modal
        title="Nhập số câu hỏi"
        visible={isModalVisible}
        onOk={() => formQuesNum.submit()}
        closable={false}
        footer={[
          <Button onClick={() => formQuesNum.submit()} type="primary">
            Gửi
          </Button>,
        ]}
      >
        <Form onFinish={quesNumFinish} form={formQuesNum}>
          <Form.Item name="quesNum" label="Số câu">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
