import { EyeOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, List, Row, Tag, Tooltip, Typography } from "antd";
import moment from "moment";
import VirtualList from "rc-virtual-list";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { getSubject, ISubject } from "../../../redux/reducers/subject.reducer";
import {
  getSubmissions,
  ISubmissions,
} from "../../../redux/reducers/submission.reducer";
import { AppDispatch } from "../../../redux/store";
import "./Exam.style.scss";

export const Submissions = () => {
  const { Title } = Typography;
  const [data, setData] = useState<ISubmissions[]>([]);
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      dispatch(getSubmissions({ bank: params.id }))
        .unwrap()
        .then((rs) => {
          setData(rs.results);
        });
    }
  }, [params.id]);

  return (
    <div className="submissions-style">
      <BreadcrumbComp
        title="Bài nộp"
        prevFirstPageTitle="Ngân hàng đề thi"
        prevFirstPage="teacher/exams"
      />
      <Title ellipsis level={5}>
        {data[0]?.bank.examName}
      </Title>
      <p>
        Thời gian:
        <span style={{ color: "blue" }}>
          {moment(data[0]?.bank?.releaseTime).format("DD/MM/YYYY HH:mm:ss")} -{" "}
          {moment(data[0]?.bank?.releaseTime)
            .add(data[0]?.bank?.time, "minutes")
            .format("DD/MM/YYYY HH:mm:ss")}
        </span>
      </p>
      <List>
        <VirtualList data={data} height={400} itemHeight={47} itemKey="id">
          {(item: ISubmissions) => (
            <List.Item style={{ width: "30%" }} key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src={item.user.avt} />}
                title={<a>{item.user.userName}</a>}
                description={
                  <>
                    Điểm:
                    <Tag color="#cd201f">{item.score}</Tag>
                    Số câu đúng:
                    <Tag color="#87d068">
                      {item.correctNum}/{item.submit.length}
                    </Tag>
                  </>
                }
              />
              <Tooltip title="Xem chi tiết">
                <Button
                  onClick={() =>
                    navigate(`/teacher/exams/submissions/detail/${item.id}`)
                  }
                  icon={<EyeOutlined />}
                />
              </Tooltip>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </div>
  );
};
