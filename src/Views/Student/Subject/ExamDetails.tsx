import { CheckCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Radio,
  Row,
  Space,
  Statistic,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { getBank, IBanks } from "../../../redux/reducers/banks.reducer";
import { IQuestion } from "../../../redux/reducers/question.reducer";
import { AppDispatch } from "../../../redux/store";
const { Countdown } = Statistic;

interface IAns {
  id: string;
  ans: any;
  correct: number[];
}

export const ExamDetails = () => {
  const dispatch: AppDispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const [select, setSelect] = useState(0);
  const [data, setData] = useState<IBanks>();

  const [time, setTime] = useState<number>(0);
  const [releaseTime, setReleaseTime] = useState<any>();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  let arr: IAns[] = [{ id: "", ans: [], correct: [] }];
  const [questions, setQuestions] = useState<IAns[]>([
    { id: "", ans: [], correct: [] },
  ]);
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
          if (rs.question.length !== 0) {
            rs.question.forEach((vl: IQuestion) => {
              arr.push({ id: vl.id, ans: undefined, correct: vl.correct });
            });
            setQuestions(arr);
          } else {
            rs.questions.forEach((vl: any) => {
              arr.push({ id: vl._id, ans: undefined, correct: vl.correct });
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

  const onFinish = () => {};

  const handleSelect = (idx: number) => {
    setSelect(idx);
  };

  return (
    <div className="sub-exam-bank">
      <BreadcrumbComp
        title="Chi tiết đề thi"
        prevPageTitle="Ngân hàng đề thi"
        prevPage="exambank"
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
        <Countdown
          value={releaseTime + time}
          onFinish={() => navigate("/student/subjects")}
        />
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
            <Form form={form}>
              <h3>
                Câu {select + 1}:{" "}
                {data?.question.length !== 0
                  ? data?.question[select]?.quesName
                  : data?.questions[select]?.quesName}
              </h3>

              {data?.question.length !== 0 ? (
                data?.question[select]?.correctEssay ? (
                  <TextArea rows={10} />
                ) : (
                  ""
                )
              ) : data?.questions[select]?.correctEssay ? (
                <TextArea rows={10} />
              ) : (
                ""
              )}

              {data?.questions[select]?.correct.length === 1 ||
              data?.question[select]?.correct.length === 1 ? (
                <Radio.Group
                // value={
                //   questions[select].ans.length !== 0 &&
                //   questions[select].ans[0]
                // }
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
                  // value={
                  //   questions[select].ans.length !== 0 && questions[select].ans
                  // }
                  onChange={(e) =>
                    data?.question.length !== 0
                      ? handleSubmit(data?.question[select].id, e)
                      : handleSubmit(data?.questions[select]._id, e)
                  }
                >
                  {data?.question.length !== 0
                    ? data?.question[select]?.answers.map(
                        (vl: any, idx: any) => (
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
                        )
                      )
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
            </Form>
          </Col>
          <Button type="primary">Nộp bài</Button>
        </Row>
      </div>
    </div>
  );
};
