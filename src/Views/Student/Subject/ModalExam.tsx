import { Button, Checkbox, Col, Modal, Radio, Row, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Countdown from "antd/lib/statistic/Countdown";
import lodash, { cloneDeep } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getBank, IBanks } from "../../../redux/reducers/banks.reducer";
import { IQuestion } from "../../../redux/reducers/question.reducer";
import {
  createSubmission,
  getSubmissions,
  ISubmissions,
  updateSubmission,
} from "../../../redux/reducers/submission.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import { IAns } from "./ExamDetails";

export const ModalExam: React.FC<{
  examList: Array<{ exam: string; time: number; pass: boolean }>;
  setExamList: any;
  visible: boolean;
  setVisible: any;
  data: any;
  handleRefresh: any;
  setCurrentExam: any;
}> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const [data, setData] = useState<IBanks>();
  const [select, setSelect] = useState(0);
  const [time, setTime] = useState<number>(0);
  const [releaseTime, setReleaseTime] = useState<any>();
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  let arr: IAns[] = [];
  const [questions, setQuestions] = useState<IAns[]>([]);

  useEffect(() => {
    if (props.data) {
      dispatch(getBank(props.data))
        .unwrap()
        .then((rs: IBanks) => {
          setData(rs);
          setSelect(0);
          setTime(rs.time * 1000 * 60);
          setReleaseTime(Date.now());
          if (!lodash.isEmpty(rs.submissions)) {
            rs.submissions.forEach((vl: ISubmissions) => {
              if (vl.user.id === user.id) {
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
  }, [props.data, props.visible]);

  const handleSubmit = (id: any, e: any) => {
    let ques = cloneDeep(questions);
    ques.map((item: IAns) => {
      if (item.id === id) {
        item.ans = e;
      }
      return item;
    });
    setQuestions(ques);
  };

  const takeDecimalNumber = (num: number) => {
    let base = 10 ** 3;
    let result = Math.round(num * base) / base;
    return result;
  };

  const onFinish = () => {
    if (props.visible) {
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
      let examList = cloneDeep(props.examList).map((ex: any) => {
        if (ex.exam === props.data && score >= 5) {
          ex.pass = true;
        }
        return ex;
      });
      props.setExamList(examList);
      dispatch(getSubmissions({ user: user.id, bank: props.data }))
        .unwrap()
        .then((rs) => {
          if (rs.totalResults > 0) {
            dispatch(
              updateSubmission({
                id: rs.results[0].id,
                payload: {
                  score: score,
                  submit: questions,
                  correctNum: count,
                  bank: props.data,
                },
              })
            )
              .unwrap()
              .then(() => {
                props.setVisible(false);
              });
          } else {
            dispatch(
              createSubmission({
                user: user.id,
                score: score,
                submit: questions,
                correctNum: count,
                bank: props.data,
              })
            )
              .unwrap()
              .then(() => {
                props.setVisible(false);
              });
          }
        });
    }
  };

  const handleSelect = (idx: number) => {
    setSelect(idx);
  };

  return (
    <Modal
      title=""
      className="modal-add-role sub-exam-bank"
      width="40%"
      open={props.visible}
      onCancel={() => {
        props.setCurrentExam({});
        props.setVisible(false);
      }}
      footer={() => false}
    >
      {moment() < moment(releaseTime).add(data?.time, "minutes") && (
        <div style={{ textAlign: "right" }}>
          <Countdown value={releaseTime + time} onFinish={onFinish} />
        </div>
      )}
      <div className="body-bank">
        <Row>
          <Col span={6}>
            <div>Phần câu hỏi - đáp án:</div>
            {data?.question.length !== 0
              ? data?.question.map((vl, idx) => (
                  <div
                    className={select === idx ? "answer true" : "answer"}
                    key={`${idx}-${vl.id}`}
                    onClick={() => handleSelect(idx)}
                  >
                    Câu {idx + 1}
                  </div>
                ))
              : data?.questions.map((vl, idx) => (
                  <div
                    className={select === idx ? "answer true" : "answer"}
                    key={`${idx}-${vl.id}`}
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
                          key={idx}
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
                            key={idx}
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
    </Modal>
  );
};
