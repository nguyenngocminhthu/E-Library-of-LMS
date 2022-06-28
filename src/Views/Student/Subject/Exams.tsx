import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Skeleton } from "antd";
import Meta from "antd/lib/card/Meta";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { IBanks } from "../../../redux/reducers/banks.reducer";
import { getSubject } from "../../../redux/reducers/subject.reducer";
import { AppDispatch } from "../../../redux/store";

export const Exam = () => {
  const params: any = useParams();
  const dispatch: AppDispatch = useDispatch();
  const [banks, setBanks] = useState<IBanks[]>([]);

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
    <div>
      <BreadcrumbComp
        title="Đề thi & kiểm tra"
        prevPageTitle="Danh sách môn học"
        prevPage="student/subject"
      />
      {banks.map((value: IBanks) => (
        <Card
          style={{ width: 300, marginTop: 16 }}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            title={value.examName}
            description={moment(value.releaseTime).format(
              "DD/MM/YYYY HH:mm:ss"
            )}
          />
        </Card>
      ))}
    </div>
  );
};
