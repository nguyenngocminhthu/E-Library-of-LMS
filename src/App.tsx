import "antd/dist/antd.css";
import { Suspense } from "react";
import { Routes, Route } from "react-router";
import "./App.scss";
import { Loader } from "./Components/Loader";
import { UserState } from "./redux/reducers/user.reducer";
import { Leadership } from "./routers/routerLeadership";
import { Teacher } from "./routers/routerTeacher";
import "./shared/styles/styles.scss";
import Cover from "./Views/Cover/Cover";
import Login from "./Views/Login/Login";

const App: React.FC = () => {
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route>
            <Route path="/" element={<Cover />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
        <Loader />
      </Suspense>
      <Leadership />
      <Teacher />
      {/* {user.role === "teacher" ? <Teacher /> : <Leadership />} */}
    </div>
  );
};

export default App;
