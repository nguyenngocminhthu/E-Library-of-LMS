import { CaretRightOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Empty, Row, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { getSubject, ISubject } from "../../../redux/reducers/subject.reducer";
import { ITopic } from "../../../redux/reducers/topic.reducer";
import { AppDispatch } from "../../../redux/store";

export const SubjectDetail = () => {
  const { Panel } = Collapse;
  const params = useParams<{ idSub: string }>();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [data, setData] = useState<ISubject>();

  useEffect(() => {
    if (params.idSub) {
      dispatch(getSubject(params.idSub))
        .unwrap()
        .then((rs: ISubject) => {
          setData(rs);
        });
    }
  }, []);

  return (
    <div className="subDetail">
      <BreadcrumbComp
        title={data?.subName}
        prevFirstPageTitle="Danh sách môn học"
        prevFirstPage="student/subject"
      />
      <div className="overview">
        <h1>Tổng quan</h1>
        <Row>
          <Col span={6}>
            <Row>
              <Col span={8}>Mã môn học:</Col>
              <Col span={16}>{data?.subCode}</Col>
              <Col span={8}>Môn học:</Col>
              <Col span={16}>{data?.subName}</Col>
            </Row>
          </Col>
          <Col span={17} offset={1}>
            <Row>
              <Col span={3}>Giảng viên:</Col>
              <Col span={21}>{data?.teacher?.userName}</Col>
              <Col span={3}>Mô tả:</Col>
              <Col span={21}>{data?.description}</Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div>
        <h1>Danh sách chủ đề</h1>
        <Collapse bordered={false} className="site-collapse-custom-collapse">
          {data?.topic && data?.topic.length > 0 ? (
            data?.topic.map((vl: ITopic, index: number) => (
              <Panel
                header={vl.title}
                key={index}
                className="site-collapse-custom-panel"
              >
                {vl.lesson.length !== 0 && (
                  <div className="accor-video">
                    <Tooltip title="Play">
                      <Button
                        size="large"
                        shape="circle"
                        icon={<CaretRightOutlined />}
                        onClick={() =>
                          navigate(`/student/subjects/viewsubject/${vl.id}`)
                        }
                      />
                    </Tooltip>
                  </div>
                )}
              </Panel>
            ))
          ) : (
            <Empty />
          )}
        </Collapse>
      </div>
    </div>
  );
};
