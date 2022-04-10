import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import { Route, Routes, useLocation } from "react-router";
import { FooterComp } from "../Layout/Footer/Footer";
import { HeaderComp } from "../Layout/Header/Header";
import { Sidebar } from "../Layout/Sidebar/Sidebar";
import Cover from "../Views/Cover/Cover";
import { Help } from "../Views/Leadership/Help/Help";
import { Home } from "../Views/Leadership/Home/Home";
import { Subject } from "../Views/Leadership/Subject/Subject";
import { SubjectDetail } from "../Views/Leadership/Subject/SubjectDetail";
import Information from "../Views/Leadership/SysSetting/Information";
import NotiSetting from "../Views/Leadership/Noti/NotiSetting";
import { System } from "../Views/Leadership/SysSetting/System";
import Login from "../Views/Login/Login";
import { Profile } from "../Views/Profile/Profile";
import { Notification } from "../Views/Leadership/Noti/Noti";

export const Leadership = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <>
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
                            <Route
                              path="/subjects/:idSub"
                              element={<SubjectDetail />}
                            />
                          </Route>
                          <Route>
                            <Route path="/help" element={<Help />} />
                          </Route>
                          <Route>
                            <Route path="/notification" element={<Notification />}/>
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
                          <Route>
                            <Route
                              path="/notification/setting"
                              element={<NotiSetting />}
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
    </>
  );
};
