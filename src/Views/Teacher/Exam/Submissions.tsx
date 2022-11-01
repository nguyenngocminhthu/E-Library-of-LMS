import { EyeOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  List,
  Row,
  Tag,
  Tooltip,
  Typography
} from "antd";
import moment from "moment";
import VirtualList from "rc-virtual-list";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { getSubject, ISubject } from "../../../redux/reducers/subject.reducer";
import { getSubmissions, ISubmissions } from "../../../redux/reducers/submission.reducer";
import { AppDispatch } from "../../../redux/store";
import "./Exam.style.scss";

export const Submissions = () => {
  const { Title } = Typography;
  const [data, setData] = useState<ISubmissions[]>([]);
  const [subject, setSubject] = useState<ISubject>();
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      dispatch(getSubmissions({bank: params.id}))
        .unwrap()
        .then((rs) => {
            setData(rs.results);
          dispatch(getSubject(rs.results[0]?.bank?.subject)).unwrap().then((sj) => {
            setSubject(sj)
          })
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
        Bài kiểm tra môn {subject?.subName}
      </Title>
      <p>
        Thời gian:
        <span style={{ color: "blue" }}>
        {moment(data[0]?.bank?.releaseTime).format(
                          "DD/MM/YYYY HH:mm:ss"
                        )} - {moment(data[0]?.bank?.releaseTime)
                          .add(data[0]?.bank?.time, "minutes")
                          .format("DD/MM/YYYY HH:mm:ss")}
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
            <h2>{data.length}/{subject?.student?.length}</h2>
            <span>người trả lời</span>
          </div>
        </Col>
        {/* <Col span={4}>
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
        </Col> */}
      </Row>
      <List>
        <VirtualList data={data} height={400} itemHeight={47} itemKey="id">
          {(item: ISubmissions) => (
            <List.Item key={item.id}>
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
