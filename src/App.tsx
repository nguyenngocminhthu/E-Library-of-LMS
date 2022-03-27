import { Layout } from "antd";
import "antd/dist/antd.css";
import { useLocation } from "react-router";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { FooterComp } from "./Layout/Footer/Footer";
import { HeaderComp } from "./Layout/Header/Header";
import { Sidebar } from "./Layout/Sidebar/Sidebar";
import "./shared/styles/styles.scss";
import Cover from "./Views/Cover/Cover";
import { Help } from "./Views/Leadership/Help/Help";
import { Home } from "./Views/Leadership/Home/Home";
import { Notification } from "./Views/Leadership/Noti/Noti";
import { Subject } from "./Views/Leadership/Subject/Subject";
import Information from "./Views/Leadership/SysSetting/Information";
import { System } from "./Views/Leadership/SysSetting/System";
import Login from "./Views/Login/Login";
import { Profile } from "./Views/Profile/Profile";

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
                    <Content style={{ margin: "16px 16px" }}>
                      <div
                        className="site-layout-background"
                        style={{
                          padding: "10px 24px 24px 24px",
                          minHeight: 360,
                        }}
                      >
                        <Routes>
                          <Route>
                            <Route path="/home" element={<Home />} />
                          </Route>
                          <Route>
                            <Route path="/subjects" element={<Subject />} />
                          </Route>
                          <Route>
                            <Route path="/help" element={<Help />} />
                          </Route>
                          <Route>
                            <Route path="/noti" element={<Notification />} />
                          </Route>
                          <Route>
                            <Route path="/setting" element={<System />} />
                          </Route>
                          <Route>
                            <Route path="/profile" element={<Profile />} />
                          </Route>
                          <Route>
                            <Route
                              path="/setting/information"
                              element={<Information />}
                            />
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
