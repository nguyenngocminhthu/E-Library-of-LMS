import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

export const Sidebar: React.FC = () => {
  const [collapsed, setcollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Sider collapsible collapsed={collapsed} onCollapse={setcollapsed}>
        <div className="logo" />
        <Menu defaultSelectedKeys={[""]} mode="inline">
          <Menu.Item
            onClick={() => navigate("/")}
            key=""
            icon={<PieChartOutlined />}
          >
            Option 1
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/subject")}
            key="subject"
            icon={<DesktopOutlined />}
          >
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="4">Tom</Menu.Item>
            <Menu.Item key="5">Bill</Menu.Item>
            <Menu.Item key="6">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="8">Team 1</Menu.Item>
            <Menu.Item key="9">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="10" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};
