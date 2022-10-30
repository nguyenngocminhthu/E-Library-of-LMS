import { EyeOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  List,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import VirtualList from "rc-virtual-list";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { getBank } from "../../../redux/reducers/banks.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import "./Exam.style.scss";

export interface ISubmit {
  user: UserState;
  score: number;
  submit: { ans: number[]; correct: number[]; id: string; _id: string };
  _id: string;
  correctNum: number;
}

export const Submissions = () => {
  const { Title } = Typography;
  const [data, setData] = useState<ISubmit[]>([]);
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      dispatch(getBank(params.id))
        .unwrap()
        .then((rs) => {
          console.debug(rs);
          setData(rs.submissions);
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
        Bài kiểm tra môn Cơ sở dữ liệu
      </Title>
      <p>
        Thời gian:
        <span style={{ color: "blue" }}>
          10:00 29/09/2022 - 10:15 29/09/2022
        </span>
      </p>
      <Row justify="space-between">
        <Col span={4}>
          <div className="box-img-style">
            <img
              className="img-style"
              alt="example"
              src={require("../../../shared/img/user-location.png")}
            />
          </div>
          <div className="text-style">
            <h2>1/30</h2>
            <span>người trả lời</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="box-img-style">
            <img
              className="img-style"
              alt="example"
              src={require("../../../shared/img/writing-down.png")}
            />
          </div>
          <div className="text-style">
            <h2>1</h2>
            <span>lượt trả lời</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="box-img-style">
            <img
              className="img-style"
              alt="example"
              src={require("../../../shared/img/checkmark.png")}
            />
          </div>
          <div className="text-style">
            <h2>60%</h2>
            <span>trả lời dúng</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="box-img-style">
            <img
              className="img-style"
              alt="example"
              src={require("../../../shared/img/prize.png")}
            />
          </div>
          <div className="text-style">
            <h2>9.7</h2>
            <span>điểm trung bình</span>
          </div>
        </Col>
      </Row>
      <List>
        <VirtualList data={data} height={400} itemHeight={47} itemKey="id">
          {(item: ISubmit) => (
            <List.Item key={item._id}>
              <List.Item.Meta
                avatar={<Avatar src={item.user.avt} />}
                title={<a>{item.user.userName}</a>}
                description={
                  <>
                    Điểm:
                    <Tag color="#cd201f">{item.score}</Tag>
                    Số câu đúng:
                    <Tag color="#87d068">
                      {item.correctNum}/{data.length}
                    </Tag>
                  </>
                }
              />
              <Tooltip title="Xem chi tiết">
                <Button
                  onClick={() =>
                    navigate({
                      pathname: "/teacher/exams/submissions/detail",
                      search: `id=${params.id}?submitId=${item._id}`,
                    })
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
