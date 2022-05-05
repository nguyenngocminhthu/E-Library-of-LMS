import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Col, Radio, Row, Space } from "antd";
import { useState } from "react";
import { useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import "./style.scss";
export const ExamDetails = () => {
  const params = useParams<{ fileExam: string }>();
  const [select, setSelect] = useState(1);

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
              <div>Lịch sử</div>
              <div>45 phút</div>
            </div>
          </div>
          <div className="d-flex">
            <div className="label">
              <div>Tiêu đề thi: </div>
              <div>Hình thức: </div>
            </div>
            <div>
              <div>Kiểm tra 45 phút</div>
              <div>Trắc nghiệm</div>
            </div>
          </div>
          <div className="d-flex">
            <div className="label">
              <div>Giáo viên đào tạo: </div>
              <div>Ngày tạo: </div>
            </div>
            <div>
              <div>Nguyễn Văn A</div>
              <div>24/02/2021</div>
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
