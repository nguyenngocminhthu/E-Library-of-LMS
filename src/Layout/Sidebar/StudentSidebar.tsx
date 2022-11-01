import { Layout, Menu } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Bell } from "../../shared/img/icon/fi_bell.svg";
import { ReactComponent as Home } from "../../shared/img/icon/home.svg";
import logosecond from "../../shared/img/icon/logo-second.svg";
import { ReactComponent as Book } from "../../shared/img/icon/u_book-open.svg";
import { ReactComponent as Question } from "../../shared/img/icon/u_comment-question.svg";
import { ReactComponent as FeeManage } from "../../shared/img/icon/fi_search money.svg";
import "../../shared/styles/layout-style/sidebar.scss";
import SubMenu from "antd/lib/menu/SubMenu";
const { Sider } = Layout;

export const StudentSidebar: React.FC = () => {
  const [collapsed, setcollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const fakeKey = location.pathname.split("/");
  const [key, setKey] = useState([`${fakeKey[2]}`]);

  const handleSelect = (key: any) => {
    navigate(`/student/${key[0]}`);
    setKey(key);
  };
  return (
    <>
      <Sider
        onMouseMove={() => setcollapsed(false)}
        className="sidebar"
        collapsed={true}
      >
        <div className="logo">
          <img src={logosecond} alt="logo" />
        </div>
        <Menu selectedKeys={key} defaultSelectedKeys={["home"]} mode="inline">
          <Menu.Item
            onClick={() => handleSelect(["home"])}
            key="home"
            icon={<Home />}
          ></Menu.Item>
          <Menu.Item
            onClick={() => handleSelect(["subject"])}
            key="subject"
            icon={<Book />}
          ></Menu.Item>
          <Menu.Item
            onClick={() => handleSelect(["notification"])}
            key="notification"
            icon={<Bell />}
          ></Menu.Item>
          <Menu.Item
            onClick={() => handleSelect(["payschoolfees", "feemanage"])}
            key="feemanage"
            icon={<FeeManage />}
          ></Menu.Item>

          <Menu.Item
            onClick={() => handleSelect(["help"])}
            key="help"
            icon={<Question />}
          ></Menu.Item>
        </Menu>
      </Sider>
      <Sider
        className="sidebar-expand"
        onMouseLeave={() => setcollapsed(true)}
        hidden={collapsed}
      >
        <div className="logo"></div>
        <Menu selectedKeys={key} defaultSelectedKeys={["home"]} mode="inline">
          <Menu.Item onClick={() => handleSelect(["home"])} key="home">
            Trang chủ
          </Menu.Item>
          <Menu.Item onClick={() => handleSelect(["subject"])} key="subject">
            Môn học
          </Menu.Item>

          <Menu.Item
            onClick={() => handleSelect(["notification"])}
            key="notification"
          >
            Thông báo
          </Menu.Item>
          <SubMenu key="feemanage" title="Quản lý học phí">
            <Menu.Item
              onClick={() => handleSelect(["payschoolfees", "feemanage"])}
              key="payschoolfees"
            >
              Thanh toán trực tuyến
            </Menu.Item>
            <Menu.Item
              onClick={() => handleSelect(["debtreport", "feemanage"])}
              key="debtreport"
            >
              Tra cứu công nợ
            </Menu.Item>
            <Menu.Item
              onClick={() => handleSelect(["generalreceipts", "feemanage"])}
              key="generalreceipts"
            >
              Phiếu thu tổng hợp
            </Menu.Item>
          </SubMenu>
          <Menu.Item onClick={() => handleSelect(["help"])} key="help">
            Trợ giúp
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};
