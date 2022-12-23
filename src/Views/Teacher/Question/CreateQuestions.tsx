import { CloseOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Radio, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import lodash from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import "suneditor/dist/css/suneditor.min.css";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import {
  createQuestion,
  getQuestion,
  IQuestion,
  updateQuestion,
} from "../../../redux/reducers/question.reducer";
import { getSubjects, ISubject } from "../../../redux/reducers/subject.reducer";
import {
  getSubjectGroups,
  ISubjectGroup,
} from "../../../redux/reducers/subjectgroup.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import "./Question.style.scss";

export const CreateQuestions = () => {
  const { Option } = Select;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dataSubGroup = useSelector(
    (state: any) => state.subjectgroup.listSubjectGroup.results
  );
  const [answerNum, setAnswerNum] = useState<any[]>([]);
  const [quesType, setQuesType] = useState<number>(0);
  const [examType, setExamType] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [dataSub, setDataSub] = useState<ISubject[]>([]);
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const params: any = useParams();

  useEffect(() => {
    dispatch(getSubjectGroups(999));
    if (params.id) {
      dispatch(getSubjects({ limit: 999 }))
        .unwrap()
        .then((rs) => {
          setDataSub(rs.results);
        });
      dispatch(getQuestion(params.id))
        .unwrap()
        .then((rs: IQuestion) => {
          setExamType(rs.examType);
          setQuesType(rs.quesType);
          form.setFieldsValue(rs);
          setAnswerNum(rs.answers);
          if (rs.quesType === 0) {
            form.setFieldsValue({ correct: rs.correct[0] });
          } else {
            form.setFieldsValue({ correct: rs.correct });
          }
        });
    }
  }, [params.id]);

  const handleRefresh = () => {
    if (params.id) {
      dispatch(getSubjects({ limit: 999 }))
        .unwrap()
        .then((rs) => {
          setDataSub(rs.results);
        });
      dispatch(getQuestion(params.id))
        .unwrap()
        .then((rs: IQuestion) => {
          setExamType(rs.examType);
          setQuesType(rs.quesType);
          form.setFieldsValue(rs);
          setAnswerNum(rs.answers);
          if (rs.correct.length === 1) {
            form.setFieldsValue({ correct: rs.correct[0] });
          } else {
            form.setFieldsValue({ correct: rs.correct });
          }
        });
    }
  };

  const questionFinish = (values: any) => {
    values.correct = lodash.isArray(values.correct)
      ? values.correct
      : [values.correct];
    if (params.id) {
      dispatch(
        updateQuestion({ id: params.id, payload: { ...values, user: user.id } })
      )
        .unwrap()
        .then(() => {
          handleRefresh();
        });
    } else {
      dispatch(createQuestion({ ...values, user: user.id, examType, level }))
        .unwrap()
        .then(() => {
          setAnswerNum([]);
          form.resetFields();
        });
    }
  };

  const handleSelect = (e: any) => {
    dispatch(getSubjects({ limit: 999, subGroup: e }))
      .unwrap()
      .then((rs) => {
        setDataSub(rs.results);
      });
  };

  return (
    <div className="sub-exam-bank">
      <BreadcrumbComp
        title="Thêm câu hỏi"
        prevFirstPageTitle="Ngân hàng câu hỏi"
        prevFirstPage="teacher/questions"
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
            <b>Chọn tổ bộ môn - môn học:</b>
          </h3>
          <Col span={10}>
            <Form.Item
              name="subjectgroup"
              label="Tổ bộ môn"
              rules={[{ required: true, message: "Chọn tổ bộ môn" }]}
            >
              <Select
                // disabled={params.id}
                onChange={(e: any) => handleSelect(e)}
              >
                {dataSubGroup?.map((vl: ISubjectGroup) => (
                  <Option key={vl.id} value={vl.id}>
                    {vl.groupName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="examType" label="Hình thức">
              <Radio.Group
                defaultValue={0}
                onChange={(e) => setExamType(e.target.value)}
              >
                <Radio value={0}>Trắc nghiệm</Radio>
                <Radio value={1}>Tự luận</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={10} offset={4}>
            <Form.Item
              name="subject"
              label="Môn học"
              rules={[{ required: true, message: "Chọn môn học" }]}
            >
              <Select disabled={dataSub.length === 0 || params.id}>
                {dataSub?.map((vl: ISubject) => (
                  <Option key={vl.id} value={vl.id}>
                    {vl.subName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="level" label="Độ khó">
              <Radio.Group
                defaultValue={0}
                onChange={(e) => setLevel(e.target.value)}
              >
                <Radio value={0}>Dễ</Radio>
                <Radio value={1}>Trung bình</Radio>
                <Radio value={2}>Khó</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <div className="body-bank">
          <div className="question-detail">
            <Form.Item
              labelCol={{ span: 4 }}
              name="quesName"
              label="Câu hỏi :"
              rules={[{ required: true, message: "Điền câu hỏi" }]}
            >
              <TextArea rows={4} />
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
                          return Promise.reject(new Error("Ít nhất 2 đáp án"));
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
          </div>
        </div>
        <div className="footer-btn" style={{ justifyContent: "center" }}>
          <Button
            onClick={() => navigate("/teacher/questions")}
            className="default-btn"
          >
            Huỷ
          </Button>
          <Button
            style={{ marginLeft: "1rem" }}
            type="primary"
            onClick={() => form.submit()}
          >
            Lưu
          </Button>
        </div>
      </Form>
    </div>
  );
};
