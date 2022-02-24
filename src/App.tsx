import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import "antd/dist/antd.css";
import { Home } from "./Views/Home/Home";
import { Subject } from "./Views/Subject/Subject";
import { Sidebar } from "./Components/Sidebar/Sidebar";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <div className="App">
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar />
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <Routes>
                  <Route>
                    <Route path="/" element={<Home />} />
                  </Route>
                  <Route>
                    <Route path="/subject" element={<Subject />} />
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
    </div>
  );
};

export default App;
