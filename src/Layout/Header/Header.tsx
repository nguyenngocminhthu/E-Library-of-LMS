import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../redux/reducers/auth.reducer";
import { AppDispatch } from "../../redux/store";
import "../../shared/styles/layout-style/header.scss";
const { Header } = Layout;

export const HeaderComp = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Header
      style={{
        padding: 0,
        justifyContent: "right",
        display: "flex",
        alignItems: "center",
        paddingRight: "1rem",
      }}
    >
      <Button
        onClick={() => navigate("/profile")}
        style={{ background: "transparent", boxShadow: "none" }}
        className="btn-header"
      >
        <UserOutlined />
        Admin
      </Button>
      <Button
        onClick={() => {
          dispatch(logout());
          navigate("/login");
        }}
        type="primary"
        className="btn-header"
      >
        <LogoutOutlined />
      </Button>
    </Header>
  );
};
