import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Checkbox,
  Col,
  Radio,
  Row,
  Space,
  Statistic,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import lodash from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import {
  getBank,
  IBanks,
  updateBank,
} from "../../../redux/reducers/banks.reducer";
import { IQuestion } from "../../../redux/reducers/question.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import { ISubmit } from "./Submissions";

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
  const [data, setData] = useState<IBanks>();
  const navigate = useNavigate();
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");

  let arr: IAns[] = [];
  const [questions, setQuestions] = useState<IAns[]>(arr);
  const [submission, setSubmission] = useState<ISubmit[]>([]);
  const location = useLocation();
  const bankId = location.search.split("?")[1].split("id=")[1];
  const submitId = location.search.split("?")[2].split("submitId=")[1];

  useEffect(() => {
    if (bankId) {
      dispatch(getBank(bankId))
        .unwrap()
        .then((rs: IBanks) => {
          setData(rs);
          setSelect(0);

          if (!lodash.isEmpty(rs.submissions)) {
            setSubmission(rs.submissions);
            rs.submissions.forEach((vl: any) => {
              setQuestions(vl.submit);
            });
          } else if (rs.question.length !== 0) {
            rs.question.forEach((vl: IQuestion) => {
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
            rs.questions.forEach((vl: any) => {
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
  }, [bankId]);

  const takeDecimalNumber = (num: number) => {
    let base = 10 ** 3;
    let result = Math.round(num * base) / base;
    return result;
  };

  const handleSubmit = () => {
    let arr: ISubmit[] = [];
    submission.forEach((vl) => {
      arr.push(vl);
    });
    arr.forEach((item: ISubmit) => {
      if (item._id === submitId) {
        console.debug(item.correctNum);
        item.correctNum = 1;
        // let score = (10 / submission.length) * item.correctNum;
        // item.score = takeDecimalNumber(score);
      }
    });

    setSubmission(arr);
  };

  const handleReject = (id: any) => {
    setQuestions((value: IAns[]) =>
      value.map((item: IAns) => {
        if (item.id === id) {
          item.ans = id;
        }
        return item;
      })
    );
  };

  const onFinish = () => {
    dispatch(
      updateBank({
        id: params.id,
        payload: {
          submissions: submission,
        },
      })
    )
      .unwrap()
      .then(() => {
        navigate(`/student/subjects/exams/${data?.subject.id}`);
      });
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
              <div>{data?.subject?.subName}</div>
              <div>{data?.time}</div>
            </div>
          </div>
          <div className="d-flex">
            <div className="label">
              <div>Tiêu đề thi: </div>
              <div>Hình thức: </div>
            </div>
            <div>
              <div>Kiểm tra {data?.time} phút</div>
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
                {moment(data?.releaseTime)
                  .add(data?.time, "minutes")
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
            {data?.question.length !== 0
              ? data?.question.map((vl, idx) => (
                  <div
                    className={select === idx ? "answer true" : "answer"}
                    key={vl.id}
                    onClick={() => handleSelect(idx)}
                  >
                    Câu {idx + 1}
                  </div>
                ))
              : data?.questions.map((vl, idx) => (
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
              {data?.question.length !== 0
                ? data?.question[select]?.quesName
                : data?.questions[select]?.quesName}
            </h3>

            {data?.question.length !== 0 ? (
              data?.question[select]?.correctEssay ? (
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
                  <div className="mt">
                    <Button
                      // onClick={() => handleSubmit()}
                      type="primary"
                      shape="round"
                      icon={<CheckOutlined />}
                      size={"large"}
                      className="mr"
                    />
                    <Button
                      shape="round"
                      icon={<CloseOutlined />}
                      size={"large"}
                    />
                  </div>
                </div>
              ) : (
                ""
              )
            ) : data?.questions[select]?.correctEssay ? (
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
                <div className="mt">
                  <Button
                    // onClick={() => handleSubmit()}
                    type="primary"
                    shape="round"
                    icon={<CheckOutlined />}
                    size={"large"}
                    className="mr"
                  />
                  <Button
                    shape="round"
                    icon={<CloseOutlined />}
                    size={"large"}
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            {data?.questions[select]?.correct.length === 1 ||
            data?.question[select]?.correct.length === 1 ? (
              <div>
                <Radio.Group
                  value={
                    !lodash.isEmpty(questions[select]) &&
                    !lodash.isEmpty(questions[select].ans) &&
                    questions[select].ans[0]
                  }
                >
                  <Space direction="vertical">
                    {data?.question.length !== 0
                      ? data?.question[select]?.answers.map(
                          (vl: string, idx: number) => (
                            <Radio key={idx} value={idx}>
                              {vl}
                            </Radio>
                          )
                        )
                      : data?.questions[select]?.answers.map(
                          (vl: string, idx: number) => (
                            <Radio key={idx} value={idx}>
                              {vl}
                            </Radio>
                          )
                        )}
                  </Space>
                </Radio.Group>
                <br />
                {(data?.questions[select]?.examType === 0 ||
                  data?.question[select]?.examType === 0) && (
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
                  {data?.question.length !== 0
                    ? data?.question[select]?.answers.map(
                        (vl: any, idx: any) => (
                          <>
                            <Checkbox key={vl} value={idx}>
                              {vl}
                            </Checkbox>

                            <br />
                          </>
                        )
                      )
                    : data?.questions[select]?.answers.map(
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
            <Button onClick={onFinish} type="primary">
              Lưu
            </Button>
          </div>
        </Row>
      </div>
    </div>
  );
};
