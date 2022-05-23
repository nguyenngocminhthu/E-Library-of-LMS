import { Route, Routes } from "react-router";
import { MainLayout } from "../Layout/Layout";
import { Help } from "../Views/Help/Help";
import { Home } from "../Views/Leadership/Home/Home";
import { ListFile } from "../Views/Leadership/Subject/ListFile";
import { Notification } from "../Views/Leadership/Noti/Noti";
import NotiSetting from "../Views/Leadership/Noti/NotiSetting";
import { Subject } from "../Views/Leadership/Subject/Subject";
import { SubjectDetail } from "../Views/Leadership/Subject/SubjectDetail";
import { ViewSubject } from "../Views/Leadership/Subject/ViewSubject";
import Information from "../Views/Leadership/SysSetting/Information";
import { System } from "../Views/Leadership/SysSetting/System";
import UserManage from "../Views/Leadership/SysSetting/UserManage";
import { PrivateFile } from "../Views/Leadership/PrivateFile/PrivateFile";
import { Suspense } from "react";
import { Loader } from "../Components/Loader";
import { RoleManage } from "../Views/Leadership/SysSetting/RoleManage";
import { SubjectManage } from "../Views/Leadership/Subject/SubjectManage";
import { ExamBank } from "../Views/Leadership/ExamBank/ExamBank";
import { ExamDetails } from "../Views/Leadership/ExamBank/ExamDetails";

export const Leadership = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />

          <Route path="/subjects" element={<Subject />} />

          <Route path="/subjects/listfile/:idSub" element={<ListFile />} />

          <Route path="/subjectManage" element={<SubjectManage />} />

          <Route
            path="/subjects/subjectdetails/:idSub"
            element={<SubjectDetail />}
          />

          <Route
            path="/subjects/viewsubject/:idSub"
            element={<ViewSubject />}
          />

          <Route path="/privatefile" element={<PrivateFile />} />

          <Route path="/exambank" element={<ExamBank />} />

          <Route path="/exambank/examdetails/:id" element={<ExamDetails />} />

          <Route path="/help" element={<Help />} />

          <Route path="/notification" element={<Notification />} />

          <Route path="/setting" element={<System />} />

          <Route path="/setting/information" element={<Information />} />

          <Route path="/setting/usermanage" element={<UserManage />} />

          <Route path="/setting/rolemanage" element={<RoleManage />} />

          <Route path="/notification/setting" element={<NotiSetting />} />
        </Route>
      </Routes>
      <Loader />
    </Suspense>
  );
};
