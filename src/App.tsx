import "antd/dist/antd.min.css";
import Pusher from "pusher-js";
import { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import "./App.scss";
import Cover from "./Components/Cover/Cover";
import { Loader } from "./Components/Loader";
import Login from "./Components/Login/Login";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import { join, out } from "./redux/reducers/realtime.reducer";
import { UserState } from "./redux/reducers/user.reducer";
import { AppDispatch } from "./redux/store";
import { Leadership } from "./routers/routerLeadership";
import { Student } from "./routers/routerStudent";
import { Teacher } from "./routers/routerTeacher";
import "./shared/styles/styles.scss";

const App: React.FC = () => {
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const dispatch: AppDispatch = useDispatch();
  const [channel, setChannel] = useState<any>();
  const [pusher, setPusher] = useState<any>();
  const [statistical, setStatistical] = useState({
    statistical: {},
    listUser: 0,
  });

  const handleEventSocket = (len: number, sta: any) => {
    setStatistical({
      statistical: sta,
      listUser: len,
    });
  };

  useEffect(() => {
    Pusher.logToConsole = true;
    setPusher(
      new Pusher("6bd53f4e653611a72067", {
        cluster: "ap1",
      })
    );

    if (user.id) {
      dispatch(join(user.id));
    }
  }, []);

  useEffect(() => {
    if (pusher) {
      setChannel(pusher.subscribe("my-channel"));
    }
    return () => {
      if (pusher) {
        pusher.unsubscribe("my-channel");
      }
    };
  }, [pusher]);

  useEffect(() => {
    if (channel) {
      channel.bind("RECEIVED_JOIN_REQUEST", (data: any) => {
        handleEventSocket(data.listUser, data.statistical);
        console.log("app channel connected: ", data);
      });
      channel.bind("RECEIVED_OUT_REQUEST", (data: any) => {
        handleEventSocket(data.listUser, data.statistical);
        console.log("app channel disconnected: ", data);
      });
    }
    return () => {
      if (channel) {
        channel.unbind();
      }
    };
  }, [channel]);

  return (
    // <RealtimeContext.Provider value={{ channel }}>
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route>
            <Route path="/" element={<Cover />} />
            <Route path="/login" element={<Login />} />
            <Route path="/404" element={<PageNotFound />} />
          </Route>
        </Routes>
        <Leadership statistical={statistical} setStatistical={setStatistical} />
        <Teacher statistical={statistical} setStatistical={setStatistical} />
        <Student statistical={statistical} setStatistical={setStatistical} />
        <Loader />
      </Suspense>
    </div>
    // </RealtimeContext.Provider>
  );
};

export default App;
