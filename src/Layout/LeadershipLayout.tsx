import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { FooterComp } from "../Layout/Footer/Footer";
import { HeaderComp } from "../Layout/Header/Header";
import { Sidebar } from "../Layout/Sidebar/Sidebar";
import { getBanks } from "../redux/reducers/banks.reducer";
import { getSubjects } from "../redux/reducers/subject.reducer";
import { getUsers } from "../redux/reducers/user.reducer";
import { AppDispatch } from "../redux/store";

export const LeadershipLayout = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    Promise.all([
      dispatch(getUsers({ limit: 999, role: "teacher" })),
      dispatch(getBanks({ limit: 999 })),
      dispatch(getSubjects({ limit: 999 })),
    ]);
  }, []);

  return (
    <div>
      {user.role === "leadership" ? (
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
        <Navigate to="/404" />
      )}
    </div>
  );
};
