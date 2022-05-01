import { Suspense } from "react";
import { Route, Routes } from "react-router";
import { Loader } from "../Components/Loader";
import { MainLayout } from "../Layout/Layout";
import Cover from "../Views/Cover/Cover";
import { Help } from "../Views/Leadership/Help/Help";
import { Home } from "../Views/Leadership/Home/Home";
import { Notification } from "../Views/Leadership/Noti/Noti";
import NotiSetting from "../Views/Leadership/Noti/NotiSetting";
import { Subject } from "../Views/Leadership/Subject/Subject";
import Login from "../Views/Login/Login";
import { Profile } from "../Views/Profile/Profile";
import { Exam } from "../Views/Teacher/Exam/Exam";
import { Resource } from "../Views/Teacher/Resource/Resource";

export const Teacher = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route>
          <Route path="/" element={<Cover />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="" element={<MainLayout />}>
          <Route path="/teacher/home" element={<Home />} />

          <Route path="/teacher/subject" element={<Subject />} />

          <Route path="/teacher/lessons" element={<Resource />} />

          <Route path="/teacher/exams" element={<Exam />} />

          <Route path="/teacher/help" element={<Help />} />

          <Route path="/teacher/notification" element={<Notification />} />

          <Route path="/profile" element={<Profile />} />

          <Route
            path="/teacher/notification/setting"
            element={<NotiSetting />}
          />
        </Route>
      </Routes>
      <Loader />
    </Suspense>
  );
};
