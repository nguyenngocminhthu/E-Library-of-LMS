import { EyeOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Card, Empty } from "antd";
import Meta from "antd/lib/card/Meta";
import lodash from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { IBanks } from "../../../redux/reducers/banks.reducer";
import { getSubject } from "../../../redux/reducers/subject.reducer";
import { getSubmissions } from "../../../redux/reducers/submission.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";

export const Exam = () => {
  const params: any = useParams();
  const dispatch: AppDispatch = useDispatch();
  const [banks, setBanks] = useState<IBanks[]>([]);
  const [avg, setAvg] = useState<string>("");
  const [avgMid, setAvgMid] = useState<string>("");
  const navigate = useNavigate();
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (params.id) {
      dispatch(getSubject(params.id))
        .unwrap()
        .then((rs) => {
          const bankList = rs.bank.filter((item: any) => {
            return item.isFinal;
          });
          setBanks(bankList);
          dispatch(getSubmissions({ limit: 9999, user: user.id }))
            .unwrap()
            .then((res) => {
              if (res.totalResults) {
                const stuSubmit = res.results.filter((item: any) => {
                  return (
                    item.user.userCode === user.userCode && !item.bank?.isFinal
                  );
                });

                const bank = rs.bank.length;
                const midScore = bank
                  ? stuSubmit.reduce((score: number, ele: any) => {
                      return ele.score + score;
                    }, 0) / bank
                  : "";

                const finalSubmit = res.results.find((item: any) => {
                  return (
                    item.user.userCode === user.userCode && item.bank?.isFinal
                  );
                });

                const mid = midScore ? midScore.toFixed(2) : "";
                const final = finalSubmit ? finalSubmit.score : "";
                const avgMark =
                  final !== "" && mid !== ""
                    ? ((parseFloat(final) + parseFloat(mid)) / 2).toString()
                    : "";
                setAvgMid(mid);
                setAvg(avgMark);
              }
            });
        });
    }
  }, [params.id]);

  return (
    <div className="student-exams">
      <BreadcrumbComp
        title="Đề thi & kiểm tra "
        prevFirstPageTitle="Danh sách môn học"
        prevFirstPage="student/subject"
      />
      <div style={{ fontWeight: "600" }}>
        Điểm giữa kỳ: {avgMid !== "" ? avgMid : "Chưa có"}
      </div>
      <div style={{ fontWeight: "600" }}>
        Điểm trung bình: {avg !== "" ? avg : "Chưa có"}
      </div>
      <div className="d-flex j-space-between">
        {banks && banks.length > 0 ? (
          banks.map((value: IBanks) => {
            let check: boolean = false;
            let submissionId: string = "";
            let score = 0;
            if (value.releaseTime !== undefined) {
              if (!lodash.isEmpty(value.submissions)) {
                value.submissions.forEach((vl: any) => {
                  if (vl.user === user.id) {
                    check = true;
                    submissionId = vl.id;
                    score = vl.score;
                  } else {
                    check = false;
                  }
                });
              }
              return (
                <Card
                  style={{
                    marginTop: 16,
                    width: "30%",
                    background: check ? "lightgray" : "",
                  }}
                  actions={
                    moment() >=
                    moment(value.releaseTime).add(value.time, "minutes")
                      ? [
                          <EyeOutlined
                            onClick={() =>
                              navigate(
                                `/student/subjects/exams/detail/${value.id}`
                              )
                            }
                            key="detail"
                          />,
                        ]
                      : check === false
                      ? [
                          <EyeOutlined
                            disabled={
                              moment() <
                              moment(value.releaseTime).add(
                                value.time,
                                "minutes"
                              )
                            }
                            onClick={() =>
                              navigate(
                                `/student/subjects/exams/detail/${value.id}`
                              )
                            }
                            key="detail"
                          />,
                          <PlayCircleOutlined
                            disabled={
                              moment() >=
                                moment(value.releaseTime).add(
                                  value.time,
                                  "minutes"
                                ) || moment() < moment(value.releaseTime)
                            }
                            onClick={() =>
                              navigate(
                                `/student/subjects/exams/detail/${value.id}`
                              )
                            }
                            key="play"
                          />,
                        ]
                      : []
                  }
                >
                  <Meta
                    title={value.examName}
                    description={
                      <div>
                        <div className="d-flex a-baseline">
                          <h3 className="mr">Thời gian bắt đầu: </h3>
                          {moment(value.releaseTime).format(
                            "DD/MM/YYYY HH:mm:ss"
                          )}
                        </div>
                        <div className="d-flex a-baseline">
                          <h3 className="mr">Thời gian kết thúc: </h3>
                          {moment(value.releaseTime)
                            .add(value.time, "minutes")
                            .format("DD/MM/YYYY HH:mm:ss")}
                        </div>
                        {moment() >=
                          moment(value.releaseTime).add(
                            value.time + 10080,
                            "minutes"
                          ) && (
                          <div className="d-flex a-baseline">
                            <h3 className="mr">Điểm: </h3>
                            {score}
                          </div>
                        )}
                      </div>
                    }
                  />
                </Card>
              );
            }
          })
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};
