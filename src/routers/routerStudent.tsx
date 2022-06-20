import { Suspense } from "react";
import { Route, Routes } from "react-router";
import { Loader } from "../Components/Loader";
import { MainLayout } from "../Layout/Layout";
import { Help } from "../Views/Help/Help";
import { Notification } from "../Views/Leadership/Notification/Notification";
import NotiSetting from "../Views/Leadership/Notification/NotiSetting";
import { Home } from "../Views/Student/Home/Home";
import { Subject } from "../Views/Student/Subject/Subject";
import { SubjectDetail } from "../Views/Student/Subject/SubjectDetail";
import { ViewSubject } from "../Views/Student/Subject/ViewSubject";
import { Exam } from "../Views/Teacher/Exam/Exam";

export const Student = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/student/home" element={<Home />} />

          <Route path="/student/subject" element={<Subject />} />

          <Route
            path="/student/subjects/subjectdetails/:idSub"
            element={<SubjectDetail />}
          />

          <Route
            path="/student/subjects/viewsubject/:idSub"
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
