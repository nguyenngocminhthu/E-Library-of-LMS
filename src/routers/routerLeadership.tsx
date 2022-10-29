import React from "react";
import { Route, Routes } from "react-router";
import { Help } from "../Components/Help/Help";
import { Profile } from "../Components/Profile/Profile";
import { LeadershipLayout } from "../Layout/LeadershipLayout";
import { ExamBank } from "../Views/Leadership/ExamBank/ExamBank";
import { ExamDetails } from "../Views/Leadership/ExamBank/ExamDetails";
import { Home } from "../Views/Leadership/Home/Home";
import { Notification } from "../Views/Leadership/Notification/Notification";
import NotificationSetting from "../Views/Leadership/Notification/NotificationSetting";
import { ListFile } from "../Views/Leadership/Subject/ListFile";
import { Subject } from "../Views/Leadership/Subject/Subject";
import { SubjectDetail } from "../Views/Leadership/Subject/SubjectDetail";
import { SubjectManage } from "../Views/Leadership/Subject/SubjectManage";
import { ViewSubject } from "../Views/Leadership/Subject/ViewSubject";
import Information from "../Views/Leadership/SystemSetting/Information";
import { SystemContainer } from "../Views/Leadership/SystemSetting/SystemContainer";
import UserManage from "../Views/Leadership/SystemSetting/UserManage";

export const Leadership = () => {
  return (
    <Routes>
      <Route element={<LeadershipLayout />}>
        <Route path="/home" element={<Home />} />

        <Route path="/subjects" element={<Subject />} />

        <Route path="/subjects/listfile/:idSub" element={<ListFile />} />

        <Route path="/subjectManage" element={<SubjectManage />} />

        <Route
          path="/subjects/subjectdetails/:idSub"
          element={<SubjectDetail />}
        />

        <Route path="/subjects/viewsubject/:idSub" element={<ViewSubject />} />

        <Route path="/exambank" element={<ExamBank />} />

        <Route path="/exambank/examdetails/:id" element={<ExamDetails />} />

        <Route path="/help" element={<Help />} />

        <Route path="/notification" element={<Notification />} />

        <Route path="/setting" element={<SystemContainer />} />

        <Route path="/setting/information" element={<Information />} />

        <Route path="/setting/usermanage" element={<UserManage />} />

        <Route path="/notification/setting" element={<NotificationSetting />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};
