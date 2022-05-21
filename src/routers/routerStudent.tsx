import { Suspense } from "react";
import { Route, Routes } from "react-router";
import { Loader } from "../Components/Loader";
import { MainLayout } from "../Layout/Layout";
import { Help } from "../Views/Leadership/Help/Help";
import { Notification } from "../Views/Leadership/Noti/Noti";
import NotiSetting from "../Views/Leadership/Noti/NotiSetting";
import { Home } from "../Views/Student/Home/Home";
import { Exam } from "../Views/Teacher/Exam/Exam";
import { Subject } from "../Views/Teacher/Subject/Subject";
import { SubjectDetail } from "../Views/Teacher/Subject/SubjectDetail/SubjectDetail";
import { ViewSubject } from "../Views/Teacher/Subject/SubjectDetail/ViewSubject";

export const Student = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/student/home" element={<Home />} />

          <Route path="/student/subject" element={<Subject />} />

          <Route
            path="/student/subjects/subjectdetail"
            element={<SubjectDetail />}
          />

          <Route
            path="/student/subjects/viewsubject"
            element={<ViewSubject />}
          />

          <Route path="/student/exams" element={<Exam />} />

          <Route path="/student/help" element={<Help />} />

          <Route path="/student/notification" element={<Notification />} />

          <Route
            path="/student/notification/setting"
            element={<NotiSetting />}
          />
        </Route>
      </Routes>
      <Loader />
    </Suspense>
  );
};
