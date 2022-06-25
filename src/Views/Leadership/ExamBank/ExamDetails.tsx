import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Col, message, Radio, Row, Space } from "antd";
import modal from "antd/lib/modal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import {
  getBank,
  IBanks,
  updateBank,
} from "../../../redux/reducers/banks.reducer";
import { AppDispatch } from "../../../redux/store";
import "./style.scss";

export const ExamDetails = () => {
  const dispatch: AppDispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const [select, setSelect] = useState(0);
  const [data, setData] = useState<IBanks>();

  useEffect(() => {
    if (params.id) {
      dispatch(getBank(params.id))
        .unwrap()
        .then((rs: IBanks) => {
          setData(rs);
          setSelect(0);
        })
        .catch((e: any) => {
          console.debug("bank: ", e);
        });
    }
  }, []);

  const handleSelect = (idx: number) => {
    setSelect(idx);
  };

  const config = {
    title: "Phê duyệt",
    className: "file-modal",
    content:
      "Xác nhận muốn phê duyệt đề thi này và các thông tin bên trong? Sau khi phê duyệt sẽ không thể hoàn tác.",
    okText: "Xác nhận",
    cancelText: "Huỷ",
    onOk: () =>
      dispatch(updateBank({ id: params.id, payload: { status: 1 } }))
        .unwrap()
        .then(() => {
          if (params.id) {
            dispatch(getBank(params.id))
              .unwrap()
              .then((rs: IBanks) => {
                setData(rs);
                setSelect(0);
              });
          }
        }),
  };

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
              {/* <div>
                {data?.examType === 0 ? (
                  <div>Trắc nghiệm</div>
                ) : (
                  <div>Tự luận</div>
                )}
              </div> */}
            </div>
          </div>
          <div className="d-flex">
            <div className="label">
              <div>Giáo viên đào tạo: </div>
              <div>Ngày tạo: </div>
            </div>
            <div>
              <div>{data?.user?.userName || "null"}</div>
              <div>{data?.createdAt}</div>
            </div>
          </div>
        </div>

        <div className="d-flex">
          <Button
            disabled={data?.status !== 0}
            className="default-btn"
            style={{ marginLeft: "1rem" }}
          >
            Huỷ phê duyệt
          </Button>
          <Button
            disabled={data?.status !== 0}
            onClick={() => modal.confirm(config)}
            style={{ marginLeft: "1rem" }}
            type="primary"
          >
            Phê duyệt
          </Button>
        </div>
      </div>
      <div className="body-bank">
        <Row>
          <Col span={6}>
            <div>Phần câu hỏi - đáp án:</div>
            {data?.question.map((vl, idx) => (
              <div
                className={select === idx ? "answer true" : "answer"}
                key={vl.id}
                onClick={() => handleSelect(idx)}
              >
                Câu {idx + 1}.
                {vl.correct[0] === 0
                  ? "A"
                  : vl.correct[0] === 1
                  ? "B"
                  : vl.correct[0] === 2
                  ? "C"
                  : "D"}
                <div hidden={!(select === idx)} className="icon-true">
                  <CheckCircleOutlined />
                </div>
              </div>
            ))}
          </Col>
          <Col style={{ padding: "2rem" }} span={18}>
            <h3>
              Câu {select + 1}: {data?.question[select]?.quesName}
            </h3>
            <Radio.Group value={data?.question[select]?.correct[0]}>
              <Space direction="vertical">
                {data?.question[select]?.answers.map((vl, idx) => (
                  <Radio value={idx}>{vl}</Radio>
                ))}
              </Space>
            </Radio.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};
