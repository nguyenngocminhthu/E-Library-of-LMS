import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Button } from "antd";
const { Header } = Layout;

export const HeaderComp = () => {
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: 0,
        justifyContent: "right",
        display: "flex",
        alignItems: "center",
        paddingRight: "1rem",
      }}
    >
      <Button className="btn-header">
        <UserOutlined />
        Admin
      </Button>
      <Button type="primary" className="btn-header">
        <LogoutOutlined />
      </Button>
    </Header>
  );
};
