import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../redux/reducers/auth.reducer";
import { UserState } from "../../redux/reducers/user.reducer";
import { AppDispatch } from "../../redux/store";
import "../../shared/styles/layout-style/header.scss";
import { SocketContext } from "../../context/socket.context";
import { useContext } from "react";
const { Header } = Layout;

export const HeaderComp = () => {
  const dispatch: AppDispatch = useDispatch();
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const client = useContext(SocketContext);
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
        onClick={() =>
          user.role === "leadership"
            ? navigate("/profile")
            : user.role === "teacher"
            ? navigate("/teacher/profile")
            : navigate("/student/profile")
        }
        style={{ background: "transparent", boxShadow: "none" }}
        className="btn-header"
      >
        <UserOutlined />
        {user.userName}
      </Button>
      <Button
        onClick={() => {
          dispatch(logout());
          // if (client.socket) {
          client.socket.disconnect();
          // }
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
