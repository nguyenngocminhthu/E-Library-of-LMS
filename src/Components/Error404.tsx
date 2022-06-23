import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "../shared/styles/main_styles/error404.scss";

const Error404 = () => {
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

export default Error404;
