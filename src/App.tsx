import "antd/dist/antd.css";
import { Suspense } from "react";
import { Route, Routes } from "react-router";
import "./App.scss";
import { Loader } from "./Components/Loader";
import { Leadership } from "./routers/routerLeadership";
import { Student } from "./routers/routerStudent";
import { Teacher } from "./routers/routerTeacher";
import "./shared/styles/styles.scss";
import Cover from "./Views/Cover/Cover";
import Login from "./Views/Login/Login";
import PageNotFound from "./Views/PageNotFound/PageNotFound";

const App: React.FC = () => {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route>
            <Route path="/" element={<Cover />} />
            <Route path="/login" element={<Login />} />
            <Route path="/404" element={<PageNotFound />} />
          </Route>
        </Routes>
        <Leadership />
        <Teacher />
        <Student />
        <Loader />
      </Suspense>
    </div>
  );
};

export default App;
