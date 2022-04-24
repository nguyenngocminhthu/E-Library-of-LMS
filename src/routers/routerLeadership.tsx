import { Route, Routes } from "react-router";
import { MainLayout } from "../Layout/Layout";
import Cover from "../Views/Cover/Cover";
import { Help } from "../Views/Leadership/Help/Help";
import { Home } from "../Views/Leadership/Home/Home";
import { ListFile } from "../Views/Leadership/ListFile/ListFile";
import { Notification } from "../Views/Leadership/Noti/Noti";
import NotiSetting from "../Views/Leadership/Noti/NotiSetting";
import { Subject } from "../Views/Leadership/Subject/Subject";
import { SubjectDetail } from "../Views/Leadership/Subject/SubjectDetail";
import { ViewSubject } from "../Views/Leadership/Subject/ViewSubject";
import Information from "../Views/Leadership/SysSetting/Information";
import { System } from "../Views/Leadership/SysSetting/System";
import UserManage from "../Views/Leadership/SysSetting/UserManage";
import Login from "../Views/Login/Login";
import { Profile } from "../Views/Profile/Profile";
import { PrivateFile } from "../Views/Leadership/PrivateFile/Subject";

export const Leadership = () => {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Cover />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="" element={<MainLayout />}>
        <Route path="/home" element={<Home />} />

        <Route path="/subjects" element={<Subject />} />

        <Route path="/listfile/:idSub" element={<ListFile />} />

        <Route path="/subjects/:idSub" element={<SubjectDetail />} />

        <Route path="/viewsubject/:idSub" element={<ViewSubject />} />

        <Route path="/file" element={<PrivateFile />} />

        <Route path="/help" element={<Help />} />

        <Route path="/notification" element={<Notification />} />

        <Route path="/setting" element={<System />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/setting/information" element={<Information />} />

        <Route path="/setting/usermanage" element={<UserManage />} />

        <Route path="/notification/setting" element={<NotiSetting />} />
      </Route>
    </Routes>
  );
};
