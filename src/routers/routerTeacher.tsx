import { Suspense } from "react";
import { Route, Routes } from "react-router";
import { Loader } from "../Components/Loader";
import { MainLayout } from "../Layout/Layout";
import { Help } from "../Views/Help/Help";
import { CreateExam } from "../Views/Teacher/Exam/CreateExam";
import { Exam } from "../Views/Teacher/Exam/Exam";
import { ExamDetails } from "../Views/Teacher/Exam/ExamDetails";
import { Home } from "../Views/Teacher/Home/Home";
import { CreateQuestions } from "../Views/Teacher/Question/CreateQuestions";
import { Question } from "../Views/Teacher/Question/Question";
import { Lessons } from "../Views/Teacher/Resource/Lessons";
import { Resources } from "../Views/Teacher/Resource/Resources";
import { Subject } from "../Views/Teacher/Subject/Subject";
import { AddSubject } from "../Views/Teacher/Subject/SubjectDetail/AddSubject";
import { EditSubject } from "../Views/Teacher/Subject/SubjectDetail/EditSubject";
import { SubjectDetail } from "../Views/Teacher/Subject/SubjectDetail/SubjectDetail";
import { ViewSubject } from "../Views/Teacher/Subject/SubjectDetail/ViewSubject";
import { ListFile } from "../Views/Teacher/Subject/SubjectList/ListFile";
import { Notification } from "../Views/Teacher/Notification/Notification";
import NotiSetting from "../Views/Teacher/Notification/NotiSetting";

export const Teacher = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/teacher/home" element={<Home />} />

          <Route path="/teacher/subject" element={<Subject />} />

          <Route
            path="/teacher/subject/subjectdetail/:id"
            element={<SubjectDetail />}
          />

          <Route
            path="/teacher/subject/editsubject/:id"
            element={<EditSubject />}
          />

          <Route
            path="/teacher/subject/addsubject/:id"
            element={<AddSubject />}
          />

          <Route
            path="/teacher/subject/viewsubject/:id"
            element={<ViewSubject />}
          />

          <Route path="/teacher/subject/listfile/:id" element={<ListFile />} />

          <Route path="/teacher/lessons" element={<Lessons />} />

          <Route path="/teacher/resources" element={<Resources />} />

          <Route path="/teacher/exams" element={<Exam />} />

          <Route path="/teacher/exams/createExam" element={<CreateExam />} />

          <Route path="teacher/questions/createQuestions" element={<CreateQuestions />} />

          <Route path="teacher/exams/examdetail/:id" element={<ExamDetails />} />

          <Route path="/teacher/questions" element={<Question />} />

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
