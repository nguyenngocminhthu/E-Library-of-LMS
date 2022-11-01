import { EyeOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import lodash from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { IBanks } from "../../../redux/reducers/banks.reducer";
import { getSubject } from "../../../redux/reducers/subject.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";

export const Exam = () => {
  const params: any = useParams();
  const dispatch: AppDispatch = useDispatch();
  const [banks, setBanks] = useState<IBanks[]>([]);
  const navigate = useNavigate();
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (params.id) {
      dispatch(getSubject(params.id))
        .unwrap()
        .then((rs) => {
          setBanks(rs.bank);
        });
    }
  }, [params.id]);

  return (
    <div className="student-exams">
      <BreadcrumbComp
        title="Đề thi & kiểm tra"
        prevFirstPageTitle="Danh sách môn học"
        prevFirstPage="student/subject"
      />
      <div className="d-flex j-space-between">
        {banks.map((value: IBanks) => {
          let check: boolean = false;
          let submissionId: string = '';
          if (value.releaseTime !== undefined) {
            if (!lodash.isEmpty(value.submissions)) {
              value.submissions.forEach((vl: any) => {
                if (vl.user === user.id) {
                  check = true;
                  submissionId = vl.id
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
                              `/student/subjects/exams/detail/${submissionId}`
                            )
                          }
                          key="detail"
                        />,
                      ]
                    : check === false
                    ? [
                        <EyeOutlined
                          onClick={() =>
                            navigate(
                              `/student/subjects/exams/detail/${submissionId}`
                            )
                          }
                          key="detail"
                        />,
                        <PlayCircleOutlined
                          disabled={
                            moment() >=
                            moment(value.releaseTime).add(value.time, "minutes")
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
                    </div>
                  }
                />
              </Card>
            );
          }
        })}
      </div>
    </div>
  );
};
