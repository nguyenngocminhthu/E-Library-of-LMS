import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Layout, Breadcrumb, Button } from "antd";
import "antd/dist/antd.css";
import { Sidebar } from "./Layout/Sidebar/Sidebar";
import Cover from "./Views/Cover/Cover";
import Login from "./Views/Login/Login";
import { useLocation } from "react-router";
import { Home } from "./Views/Leadership/Home/Home";
import { Subject } from "./Views/Leadership/Subject/Subject";
import { HeaderComp } from "./Components/Header";
import { FooterComp } from "./Components/Footer";
import "./shared/styles/styles.scss";
const { Content } = Layout;

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
                    <HeaderComp />
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
                    <FooterComp />
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
