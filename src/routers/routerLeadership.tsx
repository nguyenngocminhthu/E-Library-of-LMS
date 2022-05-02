import { Route, Routes } from "react-router";
import { MainLayout } from "../Layout/Layout";
import { Help } from "../Views/Leadership/Help/Help";
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

export const Leadership = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />

          <Route path="/subjects" element={<Subject />} />

          <Route path="/listfile/:idSub" element={<ListFile />} />

          <Route path="/subjects/:idSub" element={<SubjectDetail />} />

          <Route path="/viewsubject/:idSub" element={<ViewSubject />} />

          <Route path="/file" element={<PrivateFile />} />

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
