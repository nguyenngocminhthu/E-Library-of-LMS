import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Radio, Row, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import modal from "antd/lib/modal";
import lodash from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { IQuestion } from "../../../redux/reducers/question.reducer";
import {
  getSubmission,
  ISubmissions,
  updateSubmission,
} from "../../../redux/reducers/submission.reducer";
import { AppDispatch } from "../../../redux/store";

interface IAns {
  id: string;
  ans: any;
  correct: any;
  _id?: string;
}

export const SubmitDetail = () => {
  const dispatch: AppDispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const [select, setSelect] = useState(0);
  const [data, setData] = useState<ISubmissions>();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  let arr: IAns[] = [];
  const [questions, setQuestions] = useState<IAns[]>(arr);

  useEffect(() => {
    if (params.id) {
      dispatch(getSubmission(params.id))
        .unwrap()
        .then((rs: ISubmissions) => {
          setData(rs);
          setSelect(0);
          if (rs.submit) {
            setQuestions(rs.submit);
          } else if (rs.bank.question?.length !== 0) {
            rs.bank.question.forEach((vl: IQuestion) => {
              if (vl.correctEssay !== undefined) {
                arr.push({
                  id: vl.id,
                  ans: undefined,
                  correct: vl.correctEssay,
                });
              } else {
                arr.push({ id: vl.id, ans: undefined, correct: vl.correct });
              }
            });
            setQuestions(arr);
          } else {
            rs.bank.questions.forEach((vl: any) => {
              if (vl.correctEssay !== undefined) {
                arr.push({
                  id: vl._id,
                  ans: undefined,
                  correct: vl.correctEssay,
                });
              } else {
                arr.push({ id: vl._id, ans: undefined, correct: vl.correct });
              }
            });
            setQuestions(arr);
          }
        });
    }
  }, [params.id]);

  const onFinish = (value: any) => {
    dispatch(updateSubmission({ id: params.id, payload: value }))
      .unwrap()
      .then(() => {
        navigate(`/teacher/exams/submissions/${data?.bank.id}`);
      });
  };

  const scoreAgain = {
    title: "Chỉnh sửa điểm bài nộp",
    width: "50%",
    content: (
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        name="cancel-form"
        layout="horizontal"
        form={form}
        style={{ textAlign: "left" }}
        onFinish={onFinish}
      >
        <Form.Item name="correctNum" label="Số câu đúng">
          <Input
            max={data?.submit.length}
            type="number"
            defaultValue={data?.correctNum}
          />
        </Form.Item>
        <Form.Item name="score" label="Điểm">
          <Input max={10} type="number" defaultValue={data?.score} />
        </Form.Item>
      </Form>
    ),
    okText: "Lưu",
    cancelText: "Huỷ",
    onOk: () => form.submit(),
  };

  const handleSelect = (idx: number) => {
    setSelect(idx);
  };

  const convertAnswer = (num: number | undefined) => {
    if (num === 0) {
      return "A";
    } else if (num === 1) {
      return "B";
    } else if (num === 2) {
      return "C";
    } else {
      return "D";
    }
  };

  const convertMultiAns = (ans: number[] | undefined) => {
    let arr: string[] = [];

    if (ans !== undefined) {
      ans.map((vl: number) => {
        if (vl === 0) {
          arr.push("A");
        } else if (vl === 1) {
          arr.push("B");
        } else if (vl === 2) {
          arr.push("C");
        } else if (vl === 3) {
          arr.push("D");
        }
      });
    }
    return arr;
  };

  return (
    <div className="sub-exam-bank">
      <BreadcrumbComp
        title="Chi tiết đề thi"
        prevFirstPageTitle="Ngân hàng đề thi"
        prevFirstPage="exambank"
        prevSecondPageTitle="Bài nộp"
        prevSecondPage={`teacher/exams/submissions/${data?.bank.id}`}
      />
      <div className="top-head">
        <div
          className="d-flex"
          style={{ width: "50vw", justifyContent: "space-between" }}
        >
          <div className="d-flex">
            <div className="label">
              <div>Môn học: </div>
              <div>Thời lượng: </div>
            </div>
            <div>
              <div>{data?.bank?.subject?.subName}</div>
              <div>{data?.bank?.time}</div>
            </div>
          </div>
          <div className="d-flex">
            <div className="label">
              <div>Tiêu đề thi: </div>
              <div>Hình thức: </div>
            </div>
            <div>
              <div>Kiểm tra {data?.bank?.time} phút</div>
              <div>Kiểm tra online</div>
            </div>
          </div>
          <div className="d-flex">
            <div className="label">
              <div>Giáo viên đào tạo: </div>
              <div>Thời gian kết thúc: </div>
            </div>
            <div>
              <div>{data?.user?.userName || "null"}</div>
              <div>
                {moment(data?.bank?.releaseTime)
                  .add(data?.bank?.time, "minutes")
                  .format("DD/MM/YYYY HH:mm:ss")}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="body-bank">
        <Row>
          <Col span={6}>
            <div>Phần câu hỏi - đáp án:</div>
            {data?.bank?.question?.length !== 0
              ? data?.bank?.question?.map((vl, idx) => (
                  <div
                    className={select === idx ? "answer true" : "answer"}
                    key={vl.id}
                    onClick={() => handleSelect(idx)}
                  >
                    Câu {idx + 1}
                  </div>
                ))
              : data?.bank?.questions?.map((vl, idx) => (
                  <div
                    className={select === idx ? "answer true" : "answer"}
                    key={vl.id}
                    onClick={() => handleSelect(idx)}
                  >
                    Câu {idx + 1}
                  </div>
                ))}
          </Col>
          <Col style={{ padding: "2rem" }} span={18}>
            <h3>
              Câu {select + 1}:{" "}
              {data?.bank?.question?.length !== 0
                ? data?.bank?.question[select]?.quesName
                : data?.bank?.questions[select]?.quesName}
            </h3>

            {data?.bank?.question?.length !== 0 ? (
              data?.bank?.question[select]?.correctEssay ? (
                <div>
                  <TextArea
                    value={
                      !lodash.isEmpty(questions[select]) &&
                      !lodash.isEmpty(questions[select].ans)
                        ? questions[select].ans
                        : ""
                    }
                    rows={10}
                  />
                  <div>
                    Đáp án đúng <b>{questions[select]?.correct[0]}</b>{" "}
                    {questions[select]?.correct[0] ===
                    questions[select]?.ans[0] ? (
                      <CheckOutlined style={{ color: "#52c41a" }} />
                    ) : (
                      <CloseOutlined style={{ color: "#f5222d" }} />
                    )}
                  </div>
                </div>
              ) : (
                ""
              )
            ) : data?.bank?.questions[select]?.correctEssay ? (
              <div>
                <TextArea
                  value={
                    !lodash.isEmpty(questions[select]) &&
                    !lodash.isEmpty(questions[select].ans)
                      ? questions[select].ans
                      : ""
                  }
                  rows={10}
                />
                <div>
                  Đáp án đúng <b>{questions[select]?.correct[0]}</b>{" "}
                  {questions[select]?.correct[0] ===
                  questions[select]?.ans[0] ? (
                    <CheckOutlined style={{ color: "#52c41a" }} />
                  ) : (
                    <CloseOutlined style={{ color: "#f5222d" }} />
                  )}
                </div>
              </div>
            ) : (
              ""
            )}

            {data?.bank?.questions[select]?.correct?.length === 1 ||
            data?.bank?.question[select]?.correct?.length === 1 ? (
              <div>
                <Radio.Group
                  value={
                    !lodash.isEmpty(questions[select]) &&
                    !lodash.isEmpty(questions[select].ans) &&
                    questions[select].ans[0]
                  }
                >
                  <Space direction="vertical">
                    {data?.bank?.question?.length !== 0
                      ? data?.bank?.question[select]?.answers?.map(
                          (vl: string, idx: number) => (
                            <Radio key={idx} value={idx}>
                              {vl}
                            </Radio>
                          )
                        )
                      : data?.bank?.questions[select]?.answers?.map(
                          (vl: string, idx: number) => (
                            <Radio key={idx} value={idx}>
                              {vl}
                            </Radio>
                          )
                        )}
                  </Space>
                </Radio.Group>
                <br />
                {(data?.bank?.questions[select]?.examType === 0 ||
                  data?.bank?.question[select]?.examType === 0) && (
                  <div>
                    Đáp án đúng{" "}
                    <b>{convertAnswer(questions[select]?.correct[0])}</b>{" "}
                    {questions[select]?.correct[0] ===
                    questions[select]?.ans[0] ? (
                      <CheckOutlined style={{ color: "#52c41a" }} />
                    ) : (
                      <CloseOutlined style={{ color: "#f5222d" }} />
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Checkbox.Group
                  value={
                    !lodash.isEmpty(questions[select]) &&
                    !lodash.isEmpty(questions[select].ans) &&
                    questions[select].ans
                  }
                >
                  {data?.bank?.question?.length !== 0
                    ? data?.bank?.question[select]?.answers?.map(
                        (vl: any, idx: any) => (
                          <>
                            <Checkbox key={vl} value={idx}>
                              {vl}
                            </Checkbox>

                            <br />
                          </>
                        )
                      )
                    : data?.bank?.questions[select]?.answers?.map(
                        (vl: any, idx: any) => (
                          <>
                            <Checkbox key={vl} value={idx}>
                              {vl}
                            </Checkbox>

                            <br />
                          </>
                        )
                      )}
                </Checkbox.Group>
                <br />
                Đáp án đúng <b>{convertMultiAns(questions[select]?.correct)}</b>
                {JSON.stringify(questions[select]?.correct) ===
                JSON.stringify(questions[select]?.ans) ? (
                  <CheckOutlined style={{ color: "#52c41a" }} />
                ) : (
                  <CloseOutlined style={{ color: "#f5222d" }} />
                )}
              </div>
            )}
          </Col>
          <div className="t-right m1 w-100">
            <Button onClick={() => modal.confirm(scoreAgain)} type="primary">
              Chấm lại
            </Button>
          </div>
        </Row>
      </div>
    </div>
  );
};
