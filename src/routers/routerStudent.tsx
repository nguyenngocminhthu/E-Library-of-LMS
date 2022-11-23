import { Route, Routes } from "react-router";
import { Help } from "../Components/Help/Help";
import { Profile } from "../Components/Profile/Profile";
import { StudentLayout } from "../Layout/StudentLayout";
import DebtReport from "../Views/Student/FeeManage/DebtReport";
import GeneralReceipts from "../Views/Student/FeeManage/GeneralReceipts";
import CreditDebit from "../Views/Student/FeeManage/PaymentMethod/CreditDebit";
import ATM from "../Views/Student/FeeManage/PaymentMethod/CreditDebit/ATM";
import Visa from "../Views/Student/FeeManage/PaymentMethod/CreditDebit/Visa";
import VNPAY from "../Views/Student/FeeManage/PaymentMethod/VNPAY";
import PaySchoolFees from "../Views/Student/FeeManage/PaySchoolFees";
import { Home } from "../Views/Student/Home/Home";
import { Notification } from "../Views/Student/Notification/Notification";
import NotificationSetting from "../Views/Student/Notification/NotificationSetting";
import { ExamDetails } from "../Views/Student/Subject/ExamDetails";
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

        <Route
          path="/student/subjects/exams/detail/:id"
          element={<ExamDetails />}
        />

        <Route path="/student/help" element={<Help />} />

        <Route path="/student/notification" element={<Notification />} />

        <Route
          path="/student/notification/setting"
          element={<NotificationSetting />}
        />

        <Route path="/student/payschoolfees" element={<PaySchoolFees />} />

        <Route
          path="/student/payschoolfees/creditdebit"
          element={<CreditDebit />}
        />

        <Route
          path="/student/payschoolfees/creditdebit/visa"
          element={<Visa />}
        />

        <Route
          path="/student/payschoolfees/creditdebit/atm"
          element={<ATM />}
        />

        <Route path="/student/payschoolfees/vnpay" element={<VNPAY />} />

        <Route path="/student/debtreport" element={<DebtReport />} />

        <Route path="/student/generalreceipts" element={<GeneralReceipts />} />

        <Route path="/student/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};
