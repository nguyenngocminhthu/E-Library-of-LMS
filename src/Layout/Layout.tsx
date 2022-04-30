import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import { Navigate, Outlet } from "react-router";
import { FooterComp } from "../Layout/Footer/Footer";
import { HeaderComp } from "../Layout/Header/Header";
import { Sidebar } from "../Layout/Sidebar/Sidebar";

export const MainLayout = () => {
  const acception = ["admin", "leadership"];

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div>
      {acception.includes(user.role) ? (
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
                <Outlet />
              </div>
            </Content>
            <FooterComp />
          </Layout>
        </Layout>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};
