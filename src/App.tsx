import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Layout, Breadcrumb, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Sidebar } from "./Layout/Sidebar/Sidebar";
import Cover from "./Views/Cover/Cover";
import Login from "./Views/Login/Login";
import { useLocation } from "react-router";
import { Home } from "./Views/Leadership/Home/Home";
import { Subject } from "./Views/Leadership/Subject/Subject";
const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="App">
      {(() => {
        switch (path) {
          case "/":
            return (
              <Routes>
                <Route>
                  <Route path="/" element={<Cover />} />
                </Route>
              </Routes>
            );

          case "/login":
            return (
              <Routes>
                <Route>
                  <Route path="/login" element={<Login />} />
                </Route>
              </Routes>
            );

          default:
            return (
              <div>
                <Layout style={{ minHeight: "100vh" }}>
                  <Sidebar />
                  <Layout className="site-layout">
                    <Header
                      className="site-layout-background"
                      style={{
                        padding: 0,
                        justifyContent: "right",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Button className="btn-header">
                        <UserOutlined />
                        Admin
                      </Button>
                      <Button className="btn-header">Đăng xuất</Button>
                    </Header>
                    <Content style={{ margin: "0 16px" }}>
                      <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>
                          <h1 style={{ fontSize: "1.6rem", fontWeight: "700" }}>
                            Trang chủ
                          </h1>
                        </Breadcrumb.Item>
                      </Breadcrumb>
                      <div
                        className="site-layout-background"
                        style={{ padding: 24, minHeight: 360 }}
                      >
                        <Routes>
                          <Route>
                            <Route path="/home" element={<Home />} />
                          </Route>
                          <Route>
                            <Route path="/subjects" element={<Subject />} />
                          </Route>
                        </Routes>
                      </div>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                      Ant Design ©2018 Created by Ant UED
                    </Footer>
                  </Layout>
                </Layout>
              </div>
            );
        }
      })()}
    </div>
  );
};

export default App;
