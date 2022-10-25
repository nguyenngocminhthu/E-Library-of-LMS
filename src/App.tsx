import "antd/dist/antd.min.css";
import { Suspense, useEffect, useState } from "react";
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
import { SocketContext, socket } from './context/socket.context';
import { UserState } from "./redux/reducers/user.reducer";

const App: React.FC = () => {
  const [listUser, setListUser] = useState([]);
  const [statistical, setStatistical] = useState({});
  const handleEventSocket = (listUser: [], statistical: any ) => {
    setListUser(listUser);
    setStatistical(statistical);
  }
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (user.id) {
      socket.emit("SEND_JOIN_REQUEST", user.id);
    }
    socket.on("RECEIVED_JOIN_REQUEST", (data: { listUser: [], statistical: {} }) => {
      handleEventSocket(data.listUser, data.statistical);
      // console.log("socket connected: ", data);
    });
    socket.on("RECEIVED_OUT_REQUEST", (data: { listUser: [], statistical: {} }) => {
      handleEventSocket(data.listUser, data.statistical);
      // console.log("socket disconnected: ", data);
    });
    return () => {
      socket.off("RECEIVED_JOIN_REQUEST");
      socket.off("RECEIVED_OUT_REQUEST");
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket, listUser, statistical }}>
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
    </SocketContext.Provider>
  );
};

export default App;
