import {
  Button,
} from "antd";
import { useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import "./style.scss";
export const ExamDetails = () => {
  const params = useParams<{ fileExam: string }>();

  return (
    <div className="sub-exam-bank">
      <BreadcrumbComp
        title="Chi tiết đề thi"
        prevPageTitle="Ngân hàng đề thi"
        prevPage="exambank"
      />
      <div className="top-head">
        <div>s</div>
        <div style={{ display: "flex" }}>
          <Button
            className="default-btn"
            style={{ marginLeft: "1rem" }}
          >
            Huỷ phê duyệt
          </Button>
          <Button
            style={{ marginLeft: "1rem" }}
            type="primary"
          >
            Phê duyệt
          </Button>
        </div>
      </div>
      <div>asdsad</div>
    </div>
  );
};
