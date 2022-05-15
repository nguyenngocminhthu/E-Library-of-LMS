import { Suspense } from "react";
import { Route, Routes } from "react-router";
import { Loader } from "../Components/Loader";
import { MainLayout } from "../Layout/Layout";
import { Help } from "../Views/Leadership/Help/Help";
import { Notification } from "../Views/Leadership/Noti/Noti";
import NotiSetting from "../Views/Leadership/Noti/NotiSetting";
import { Exam } from "../Views/Teacher/Exam/Exam";
import { Home } from "../Views/Teacher/Home/Home";
import { Resource } from "../Views/Teacher/Resource/Resource";
import { ListFile } from "../Views/Teacher/Subject/SubjectList/ListFile";
import { Subject } from "../Views/Teacher/Subject/Subject";
import { SubjectDetail } from "../Views/Teacher/Subject/SubjectDetail/SubjectDetail";
import { ViewSubject } from "../Views/Teacher/Subject/SubjectDetail/ViewSubject";

export const Teacher = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/teacher/home" element={<Home />} />

          <Route path="/teacher/subject" element={<Subject />} />

          <Route path="/subjects/subjectdetail" element={<SubjectDetail />} />

          <Route path="/subjects/viewsubject" element={<ViewSubject />} />

          <Route path="/subjects/listfile" element={<ListFile />} />

          <Route path="/teacher/lessons" element={<Resource />} />

          <Route path="/teacher/exams" element={<Exam />} />

          <Route path="/teacher/help" element={<Help />} />

          <Route path="/teacher/notification" element={<Notification />} />

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
