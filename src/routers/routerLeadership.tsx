import React from "react";
import { Route, Routes } from "react-router";
import { LeadershipLayout } from "../Layout/LeadershipLayout";
import { Help } from "../Views/Help/Help";
import { ExamBank } from "../Views/Leadership/ExamBank/ExamBank";
import { ExamDetails } from "../Views/Leadership/ExamBank/ExamDetails";
import { Home } from "../Views/Leadership/Home/Home";
import { Notification } from "../Views/Leadership/Notification/Notification";
import NotiSetting from "../Views/Leadership/Notification/NotiSetting";
import { PrivateFile } from "../Views/Leadership/PrivateFile/PrivateFile";
import { ListFile } from "../Views/Leadership/Subject/ListFile";
import { Subject } from "../Views/Leadership/Subject/Subject";
import { SubjectDetail } from "../Views/Leadership/Subject/SubjectDetail";
import { SubjectManage } from "../Views/Leadership/Subject/SubjectManage";
import { ViewSubject } from "../Views/Leadership/Subject/ViewSubject";
import { ClassManage } from "../Views/Leadership/SysSetting/ClassManage";
import Information from "../Views/Leadership/SysSetting/Information";
import { System } from "../Views/Leadership/SysSetting/System";
import UserManage from "../Views/Leadership/SysSetting/UserManage";
import { Profile } from "../Views/Profile/Profile";

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

        <Route path="/privatefile" element={<PrivateFile />} />

        <Route path="/exambank" element={<ExamBank />} />

        <Route path="/exambank/examdetails/:id" element={<ExamDetails />} />

        <Route path="/help" element={<Help />} />

        <Route path="/notification" element={<Notification />} />

        <Route path="/setting" element={<System />} />

        <Route path="/setting/information" element={<Information />} />

        <Route path="/setting/usermanage" element={<UserManage />} />

        <Route path="/setting/classmanage" element={<ClassManage />} />

        <Route path="/notification/setting" element={<NotiSetting />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};
