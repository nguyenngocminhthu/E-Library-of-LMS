import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Button } from "antd";
import "../../shared/styles/layout-style/header.scss";
const { Header } = Layout;

export const HeaderComp = () => {
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
      <Button style={{background: "transparent", boxShadow: "none"}} className="btn-header">
        <UserOutlined />
        Admin
      </Button>
      <Button type="primary" className="btn-header">
        <LogoutOutlined />
      </Button>
    </Header>
  );
};
