import { Route, Routes } from "react-router";
import { StudentLayout } from "../Layout/StudentLayout";
import { Help } from "../Views/Help/Help";
import { Profile } from "../Views/Profile/Profile";
import { Home } from "../Views/Student/Home/Home";
import { Notification } from "../Views/Student/Notification/Notification";
import NotiSetting from "../Views/Student/Notification/NotiSetting";
import { Exam } from "../Views/Student/Subject/Exams";
import { Subject } from "../Views/Student/Subject/Subject";
import { SubjectDetail } from "../Views/Student/Subject/SubjectDetail";
import { ViewSubject } from "../Views/Student/Subject/ViewSubject";

export const Student = () => {
  return (
    <Routes>
      <Route element={<StudentLayout />}>
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

        <Route path="/student/subjects/exams/:id" element={<Exam />} />

        <Route path="/student/help" element={<Help />} />

        <Route path="/student/notification" element={<Notification />} />

        <Route path="/student/notification/setting" element={<NotiSetting />} />
        <Route path="/student/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};
