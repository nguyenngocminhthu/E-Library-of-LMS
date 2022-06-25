import { Suspense } from "react";
import { Routes, Route } from "react-router";
import { Loader } from "./Components/Loader";
import { MainLayout } from "./Layout/Layout";
import { Leadership } from "./routers/routerLeadership";
import { Student } from "./routers/routerStudent";
import { Teacher } from "./routers/routerTeacher";
import Cover from "./Views/Cover/Cover";
import Login from "./Views/Login/Login";
import PageNotFound from "./Views/PageNotFound/PageNotFound";
import { Profile } from "./Views/Profile/Profile";
import "./App.scss";
import "antd/dist/antd.css";
import "./shared/styles/styles.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route>
            <Route path="/" element={<Cover />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
        <Loader />
      </Suspense>
      <Leadership />
      <Teacher />
      <Student />
    </div>
  );
};

export default App;
