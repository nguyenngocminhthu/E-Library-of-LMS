import { ReactComponent as Home } from "../../shared/img/icon/home.svg";
import { ReactComponent as Book } from "../../shared/img/icon/u_book-open.svg";
import { ReactComponent as File } from "../../shared/img/icon/u_file-edit-alt.svg";
import { ReactComponent as Bag } from "../../shared/img/icon/u_bag.svg";
import { ReactComponent as Bell } from "../../shared/img/icon/fi_bell.svg";
import { ReactComponent as Question } from "../../shared/img/icon/u_comment-question.svg";
import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import logosecond from "../../shared/img/icon/logo-second.svg";
import "../../shared/styles/layout-style/sidebar.scss";
const { Sider } = Layout;
const { SubMenu } = Menu;

export const TeacherSidebar: React.FC = () => {
  const [collapsed, setcollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const fakeKey = location.pathname.split("/");
  const [key, setKey] = useState([`${fakeKey[2]}`]);

  useEffect(() => {
    if (fakeKey[2] === "lessons") {
      setKey(["lessons", "resource"]);
    } else if (fakeKey[2] === "exams") {
      setKey(["exams", "exam"]);
    }
  }, []);

  const handleSelect = (key: any) => {
    navigate(`/teacher/${key[0]}`);
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
            onClick={() => handleSelect(["lessons", "resource"])}
            key="resource"
            icon={<Bag />}
          ></Menu.Item>
          <Menu.Item
            onClick={() => handleSelect(["exams", "exam"])}
            key="exam"
            icon={<File />}
          ></Menu.Item>
          <Menu.Item
            onClick={() => handleSelect(["notification"])}
            key="notification"
            icon={<Bell />}
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
            Môn giảng dạy
          </Menu.Item>
          <SubMenu key="resource" title="Bài giảng, tài nguyên">
            <Menu.Item
              onClick={() => handleSelect(["lessons", "resource"])}
              key="lessons"
            >
              Tất cả bài giảng
            </Menu.Item>
            <Menu.Item
              onClick={() => handleSelect(["resources", "resource"])}
              key="resources"
            >
              Tất cả tài nguyên
            </Menu.Item>
          </SubMenu>
          <SubMenu key="exam" title="Đề thi, kiểm tra">
            <Menu.Item
              onClick={() => handleSelect(["exams", "exam"])}
              key="exams"
            >
              Danh sách đề thi và kiểm tra
            </Menu.Item>
            <Menu.Item
              onClick={() => handleSelect(["questions", "exam"])}
              key="questions"
            >
              Ngân hàng câu hỏi
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            onClick={() => handleSelect(["notification"])}
            key="notification"
          >
            Thông báo
          </Menu.Item>
          <Menu.Item onClick={() => handleSelect(["help"])} key="help">
            Trợ giúp
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};
