import { ReactComponent as Home } from "../../shared/img/icon/home.svg";
import { ReactComponent as Book } from "../../shared/img/icon/u_book-open.svg";
import { ReactComponent as File } from "../../shared/img/icon/u_file-edit-alt.svg";
import { ReactComponent as Bag } from "../../shared/img/icon/u_bag.svg";
import { ReactComponent as Bell } from "../../shared/img/icon/fi_bell.svg";
import { ReactComponent as Setting } from "../../shared/img/icon/fi_settings.svg";
import { ReactComponent as Question } from "../../shared/img/icon/u_comment-question.svg";
import { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import logosecond from "../../shared/img/icon/logo-second.svg";
import "../../shared/styles/layout-style/sidebar.scss";
const { Sider } = Layout;
const { SubMenu } = Menu;

export const Sidebar: React.FC = () => {
  const [collapsed, setcollapsed] = useState(true);
  const navigate = useNavigate();
  const [key, setKey] = useState(["home"]);

  const handleSelect = (key: any) => {
    navigate(`/${key[0]}`);
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
          <img src={logosecond} />
        </div>
        <Menu selectedKeys={key} defaultSelectedKeys={["home"]} mode="inline">
          <Menu.Item
            onClick={() => handleSelect(["home"])}
            key="home"
            icon={<Home />}
          ></Menu.Item>
          <Menu.Item
            onClick={() => handleSelect(["subjects", "subject"])}
            key="subject"
            icon={<Book />}
          ></Menu.Item>
          <Menu.Item
            onClick={() => handleSelect(["file"])}
            key="file"
            icon={<File />}
          ></Menu.Item>
          <Menu.Item
            onClick={() => handleSelect(["bank"])}
            key="bank"
            icon={<Bag />}
          ></Menu.Item>
          <Menu.Item
            onClick={() => handleSelect(["noti"])}
            key="noti"
            icon={<Bell />}
          ></Menu.Item>
          <Menu.Item
            onClick={() => handleSelect(["setting"])}
            key="setting"
            icon={<Setting />}
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
        <div className="logo">
          <img src={logosecond} />
        </div>
        <Menu selectedKeys={key} defaultSelectedKeys={["home"]} mode="inline">
          <Menu.Item onClick={() => handleSelect(["home"])} key="home">
            Trang chủ
          </Menu.Item>
          <SubMenu key="subject" title="Quản lý môn học">
            <Menu.Item
              onClick={() => handleSelect(["subjects", "subject"])}
              key="subjects"
            >
              Danh sách môn học
            </Menu.Item>
            <Menu.Item
              onClick={() => handleSelect(["subjectManage", "subject"])}
              key="subjectManage"
            >
              Phê duyệt tài liệu môn học
            </Menu.Item>
          </SubMenu>
          <Menu.Item onClick={() => handleSelect(["file"])} key="file">
            Tệp riêng tư
          </Menu.Item>
          <Menu.Item onClick={() => handleSelect(["bank"])} key="bank">
            Ngân hàng đề thi
          </Menu.Item>
          <Menu.Item onClick={() => handleSelect(["noti"])} key="noti">
            Thông báo
          </Menu.Item>
          <Menu.Item onClick={() => handleSelect(["setting"])} key="setting">
            Cài đặt hệ thống
          </Menu.Item>
          <Menu.Item onClick={() => handleSelect(["help"])} key="help">
            Trợ giúp
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};
