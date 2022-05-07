import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Col, Radio, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { getBank, IBanks } from "../../../redux/reducers/banks.reducer";
import { AppDispatch } from "../../../redux/store";
import "./style.scss";
export const ExamDetails = () => {
  const dispatch: AppDispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const [select, setSelect] = useState(1);
  const [data, setData] = useState<IBanks>();

  useEffect(() => {
    if (params.id) {
      dispatch(getBank(params.id))
        .unwrap()
        .then((rs: IBanks) => {
          setData(rs);
        })
        .catch((e: any) => {
          console.debug("bank: ", e);
        });
    }
  }, []);

  

  let question: any[] = [];
  let i;
  for (i = 1; i <= 20; i++) {
    question.push({ quesNum: i, answer: "B" });
  }

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
              <div>{data?.examType === 0 ? <div>Trắc nghiệm</div> : <div>Tự luận</div> }</div>
            </div>
          </div>
          <div className="d-flex">
            <div className="label">
              <div>Giáo viên đào tạo: </div>
              <div>Ngày tạo: </div>
            </div>
            <div>
              <div>{data?.user?.userName || 'null'}</div>
              <div>{data?.createdAt}</div>
            </div>
          </div>
        </div>

        <div className="d-flex">
          <Button className="default-btn" style={{ marginLeft: "1rem" }}>
            Huỷ phê duyệt
          </Button>
          <Button style={{ marginLeft: "1rem" }} type="primary">
            Phê duyệt
          </Button>
        </div>
      </div>
      <div className="body-bank">
        <Row>
          <Col span={6}>
            <div>Phần câu hỏi - đáp án:</div>
            {question.map((vl) => (
              <div
                className={select === vl.quesNum ? "answer true" : "answer"}
                key={vl.quesNum}
                onClick={() => setSelect(vl.quesNum)}
              >
                Câu {vl.quesNum}.{vl.answer}
                <div hidden={!(select === vl.quesNum)} className="icon-true">
                  <CheckCircleOutlined />
                </div>
              </div>
            ))}
          </Col>
          <Col span={18}>
            <h3>
              Câu 1: Lý do hình thành nhờ nước Cộng hòa Liên bang Đức là gì?
            </h3>
            <Radio.Group value={1}>
              <Space direction="vertical">
                <Radio value={1}>
                  A. Kết quả của cuộc đấu tranh vì độc lập, tự do của người dân
                  Đức.
                </Radio>
                <Radio value={2}>
                  B. Sự thoả thuận của Anh, Mĩ, Liên Xô tại Hội nghị I-an-ta.
                </Radio>
                <Radio value={3}>
                  C. Âm mưu của các nước Anh, Pháp, Mĩ hòng chia cắtt lâu dài
                  nước Đức; xây dựng một tiền đồn chống chủ nghĩa xã hội ở châu
                  Âu.
                </Radio>
                <Radio value={4}>
                  D. Hậu quả của những chính sách phản động mà Chủ nghĩa phát
                  xít đã thi hành ờ đất nước này.
                </Radio>
              </Space>
            </Radio.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};
