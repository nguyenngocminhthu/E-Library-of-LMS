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

const App: React.FC = () => {
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    socket.on("RECEIVED_JOIN_REQUEST", (data: { listUser: [], statistical: {} }) => {
      setListUser(data.listUser);
      console.log("socket connected: ", data);
    });
    socket.on("RECEIVED_OUT_REQUEST", (data: { listUser: [], statistical: {} }) => {
      setListUser(data.listUser);
      console.log("socket disconnected: ", data);
    });
    return () => {
      socket.off("RECEIVED_JOIN_REQUEST");
      socket.off("RECEIVED_OUT_REQUEST");
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket, listUser }}>
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
