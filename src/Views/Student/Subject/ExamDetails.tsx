import { Button, Checkbox, Col, Radio, Row, Space, Statistic } from "antd";
import TextArea from "antd/lib/input/TextArea";
import lodash from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import {
  getBank,
  IBanks,
  updateBank,
} from "../../../redux/reducers/banks.reducer";
import { IQuestion } from "../../../redux/reducers/question.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
const { Countdown } = Statistic;

interface IAns {
  id: string;
  ans: any;
  correct: any;
}

export const ExamDetails = () => {
  const dispatch: AppDispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const [select, setSelect] = useState(0);
  const [data, setData] = useState<IBanks>();

  const [time, setTime] = useState<number>(0);
  const [releaseTime, setReleaseTime] = useState<any>();
  const navigate = useNavigate();
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");

  let arr: IAns[] = [];
  const [questions, setQuestions] = useState<IAns[]>(arr);
  console.debug(questions);

  useEffect(() => {
    if (params.id) {
      dispatch(getBank(params.id))
        .unwrap()
        .then((rs: IBanks) => {
          setData(rs);
          setSelect(0);
          setTime(rs.time * 1000 * 60);
          setReleaseTime(Date.parse(rs.releaseTime));
          if (!lodash.isEmpty(rs.submissions)) {
            rs.submissions.forEach((vl: any) => {
              if (vl.user === user.id) {
                console.debug(vl);

                setQuestions(vl.submit);
              }
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
  }, []);

  const handleSubmit = (id: any, e: any) => {
    setQuestions((value: IAns[]) =>
      value.map((item: IAns) => {
        if (item.id === id) {
          item.ans = e;
        }
        return item;
      })
    );
  };

  const takeDecimalNumber = (num: number) => {
    let base = 10 ** 3;
    let result = Math.round(num * base) / base;
    return result;
  };

  const onFinish = () => {
    let submission: any[] = [];
    let count: number = 0;
    questions.forEach((item: IAns) => {
      if (JSON.stringify(item.ans) === JSON.stringify(item.correct)) {
        count = count + 1;
      }
      submission.push(
        JSON.stringify(item.ans) === JSON.stringify(item.correct)
      );
    });
    let score = (10 / submission.length) * count;
    score = takeDecimalNumber(score);

    dispatch(
      updateBank({
        id: params.id,
        payload: {
          submissions: { user: user.id, score: score, submit: questions },
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
      <div style={{ textAlign: "right" }}>
        <Countdown value={releaseTime + time} onFinish={onFinish} />
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
                <TextArea
                  value={
                    !lodash.isEmpty(questions[select]) &&
                    !lodash.isEmpty(questions[select].ans)
                      ? questions[select].ans
                      : ""
                  }
                  rows={10}
                  onChange={(e: any) =>
                    handleSubmit(data?.question[select].id, e.target.value)
                  }
                />
              ) : (
                ""
              )
            ) : data?.questions[select]?.correctEssay ? (
              <TextArea
                value={
                  !lodash.isEmpty(questions[select]) &&
                  !lodash.isEmpty(questions[select].ans)
                    ? questions[select].ans
                    : ""
                }
                rows={10}
                onChange={(e: any) =>
                  handleSubmit(data?.questions[select]._id, e.target.value)
                }
              />
            ) : (
              ""
            )}

            {data?.questions[select]?.correct.length === 1 ||
            data?.question[select]?.correct.length === 1 ? (
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
                          <Radio
                            onChange={(e) =>
                              handleSubmit(data?.question[select].id, [
                                e.target.value,
                              ])
                            }
                            key={idx}
                            value={idx}
                          >
                            {vl}
                          </Radio>
                        )
                      )
                    : data?.questions[select]?.answers.map(
                        (vl: string, idx: number) => (
                          <Radio
                            onChange={(e) =>
                              handleSubmit(data?.questions[select]._id, [
                                e.target.value,
                              ])
                            }
                            key={idx}
                            value={idx}
                          >
                            {vl}
                          </Radio>
                        )
                      )}
                </Space>
              </Radio.Group>
            ) : (
              <Checkbox.Group
                value={
                  !lodash.isEmpty(questions[select]) &&
                  !lodash.isEmpty(questions[select].ans) &&
                  questions[select].ans
                }
                onChange={(e) =>
                  data?.question.length !== 0
                    ? handleSubmit(data?.question[select].id, e)
                    : handleSubmit(data?.questions[select]._id, e)
                }
              >
                {data?.question.length !== 0
                  ? data?.question[select]?.answers.map((vl: any, idx: any) => (
                      <>
                        <Checkbox
                          onChange={(e) =>
                            handleSubmit(data?.question[select].id, [
                              e.target.value,
                            ])
                          }
                          key={vl}
                          value={idx}
                        >
                          {vl}
                        </Checkbox>

                        <br />
                      </>
                    ))
                  : data?.questions[select]?.answers.map(
                      (vl: any, idx: any) => (
                        <>
                          <Checkbox
                            onChange={(e) =>
                              handleSubmit(data?.questions[select]._id, [
                                e.target.value,
                              ])
                            }
                            key={vl}
                            value={idx}
                          >
                            {vl}
                          </Checkbox>

                          <br />
                        </>
                      )
                    )}
              </Checkbox.Group>
            )}
          </Col>
          <div className="t-right m1 w-100">
            <Button onClick={onFinish} type="primary">
              Nộp bài
            </Button>
          </div>
        </Row>
      </div>
    </div>
  );
};
