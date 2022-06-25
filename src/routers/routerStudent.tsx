import { Suspense } from "react";
import { Route, Routes } from "react-router";
import { Loader } from "../Components/Loader";
import { MainLayout } from "../Layout/Layout";
import { Help } from "../Views/Help/Help";
import { Home } from "../Views/Student/Home/Home";
import NotiSetting from "../Views/Student/Notification/NotiSetting";
import { Subject } from "../Views/Student/Subject/Subject";
import { SubjectDetail } from "../Views/Student/Subject/SubjectDetail";
import { ViewSubject } from "../Views/Student/Subject/ViewSubject";
import { Notification } from "../Views/Student/Notification/Notification";
import { ExamDetails } from "../Views/Student/Exam/ExamDetails";
import { Exam } from "../Views/Student/Exam/Exam";

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

          <Route
            path="student/exams/examdetail/:id"
            element={<ExamDetails />}
          />

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
