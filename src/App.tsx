import "antd/dist/antd.css";
import "./App.scss";
import { UserState } from "./redux/reducers/user.reducer";
import { Leadership } from "./routers/routerLeadership";
import { Teacher } from "./routers/routerTeacher";
import "./shared/styles/styles.scss";

const App: React.FC = () => {
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="App">
      {user.role === "teacher" ? <Teacher /> : <Leadership />}
    </div>
  );
};

export default App;
