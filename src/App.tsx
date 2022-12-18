import "antd/dist/antd.min.css";
import { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import "./App.scss";
import { Loader } from "./Components/Loader";
import { Leadership } from "./routers/routerLeadership";
import { Student } from "./routers/routerStudent";
import { Teacher } from "./routers/routerTeacher";
import "./shared/styles/styles.scss";
import Cover from "./Components/Cover/Cover";

import { SocketContext, socket } from "./context/socket.context";
import { UserState } from "./redux/reducers/user.reducer";
import Login from "./Components/Login/Login";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import socketIOClient from "socket.io-client";
import { AppDispatch, RootState } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "./redux/reducers/socket.reducer";
const ENDPOINT = process.env.REACT_APP_BASE_URL || "http://localhost:4000";

const App: React.FC = () => {
  const [listUser, setListUser] = useState([]);
  const [statistical, setStatistical] = useState({});
  const handleEventSocket = (listUser: [], statistical: any) => {
    setListUser(listUser);
    setStatistical(statistical);
  };
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const dispatch: AppDispatch = useDispatch();
  // const [socket, setSocket] = useState<any>(null);
  const isConnected = useSelector(
    (state: RootState) => state.socket.isConnected
  );
  // useEffect(() => {
  //   if (!isConnected) {
  //     dispatch(getSocket(""))
  //       .unwrap()
  //       .then((rs: any) => {
  //         setSocket(socketIOClient(ENDPOINT));
  //       });
  //   }
  // });

  useEffect(() => {
    // if (socket && isConnected) {
    if (user.id) {
      socket.emit("SEND_JOIN_REQUEST", user.id);
    }
    socket.on(
      "RECEIVED_JOIN_REQUEST",
      (data: { listUser: []; statistical: {} }) => {
        handleEventSocket(data.listUser, data.statistical);
        console.log("socket connected: ", data);
      }
    );
    socket.on(
      "RECEIVED_OUT_REQUEST",
      (data: { listUser: []; statistical: {} }) => {
        handleEventSocket(data.listUser, data.statistical);
        console.log("socket disconnected: ", data);
      }
    );
    // }

    return () => {
      // if (socket) {
      socket.off("RECEIVED_JOIN_REQUEST");
      socket.off("RECEIVED_OUT_REQUEST");
      // }
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
