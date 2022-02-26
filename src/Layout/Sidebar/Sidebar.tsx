import {ReactComponent as Home} from '../../shared/img/icon/home.svg';
import {ReactComponent as Book} from '../../shared/img/icon/u_book-open.svg';
import {ReactComponent as File} from '../../shared/img/icon/u_file-edit-alt.svg';
import {ReactComponent as Bag} from '../../shared/img/icon/u_bag.svg';
import {ReactComponent as Bell} from '../../shared/img/icon/fi_bell.svg';
import {ReactComponent as Setting} from '../../shared/img/icon/fi_settings.svg';
import {ReactComponent as Question} from '../../shared/img/icon/u_comment-question.svg';
import { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import logosecond from "../../shared/img/icon/logo-second.svg";
import '../../shared/styles/layout-style/sidebar.scss'
const { Sider } = Layout;
const { SubMenu } = Menu;

export const Sidebar: React.FC = () => {
  const [collapsed, setcollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Sider collapsible collapsed={collapsed} onCollapse={setcollapsed}>
        <div className="logo">
          <img src={logosecond} /> 
        </div>
        <Menu defaultSelectedKeys={[""]} mode="inline">
          <Menu.Item
            onClick={() => navigate("/")}
            key=""
            icon={<Home />}
          >
            Trang chủ
          </Menu.Item>
          <Menu.Item  
            onClick={() => navigate("/subject")}
            key="subject" 
            icon={<Book />}>
            Môn giảng dạy
          </Menu.Item>
          <SubMenu key="sub1" icon={<Bag />} title="Bài giảng, tài nguyên">
            <Menu.Item key="4">Tất cả bài giảng</Menu.Item>
            <Menu.Item key="5">Tất cả tài nguyên</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<File />} title="Đề thi, kiểm tra">
            <Menu.Item key="6">Danh sách đề thi & kiểm tra</Menu.Item>
            <Menu.Item key="7">Ngân hàng câu hỏi</Menu.Item>
          </SubMenu>      
          <Menu.Item key="8" icon={<Bell />}>
            Thông báo
          </Menu.Item>
          <Menu.Item key="9" icon={<Question />}>
            Trợ giúp
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};
