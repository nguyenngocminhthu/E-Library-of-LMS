import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./style.scss";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <h1 className="text-label">
        Xin lỗi!!! Chúng tôi không tìm thấy trang bạn yêu cầu.
        <Button
          className="coverButton"
          onClick={() => navigate("/")}
        >
          GO TO HOMEPAGE →
        </Button>
      </h1>
    </div>
  );
};

export default PageNotFound;
