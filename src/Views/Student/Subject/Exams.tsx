import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, Row, Skeleton } from "antd";
import Meta from "antd/lib/card/Meta";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { IBanks } from "../../../redux/reducers/banks.reducer";
import { getSubject } from "../../../redux/reducers/subject.reducer";
import { AppDispatch } from "../../../redux/store";

export const Exam = () => {
  const params: any = useParams();
  const dispatch: AppDispatch = useDispatch();
  const [banks, setBanks] = useState<IBanks[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      dispatch(getSubject(params.id))
        .unwrap()
        .then((rs) => {
          console.debug(rs);
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
        {banks.map((value: IBanks) => (
          <Card
            style={{ marginTop: 16, width: "30%" }}
            actions={[
              <PlayCircleOutlined
                onClick={() =>
                  navigate(`/student/subjects/exams/detail/${value.id}`)
                }
                key="play"
              />,
            ]}
          >
            <Meta
              title={value.examName}
              description={
                <div>
                  <div className="d-flex a-baseline">
                    <h3 className="mr">Thời gian bắt đầu: </h3>
                    {moment(value.releaseTime).format("DD/MM/YYYY HH:mm:ss")}
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
        ))}
      </div>
    </div>
  );
};
