import { Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { getPayments, IPayment } from "../../../redux/reducers/payment.reducer";
import { ISubject } from "../../../redux/reducers/subject.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";

export const Payment = () => {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      dispatch(getPayments({ limit: 999, subject: params.id }))
        .unwrap()
        .then((rs) => {
          const payments = rs.results.map((vl: IPayment, idx: number) => {
            return { ...vl, key: idx };
          });
          setPayments(payments);
        });
    }
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Mã phí",
      dataIndex: "feeCode",
      key: "feeCode",
    },
    {
      title: "Nội dung khoản thu",
      dataIndex: "subject",
      key: "subject",
      render: (subject: ISubject) => {
        return subject.subName;
      },
    },
    {
      title: "Mã sinh viên",
      dataIndex: "user",
      key: "user",
      render: (user: UserState) => {
        return user.userCode;
      },
    },
    {
      title: "Sinh viên",
      dataIndex: "user",
      key: "user",
      render: (user: UserState) => {
        return user.userName;
      },
    },
    {
      title: "Số tiền (VNĐ)",
      dataIndex: "cost",
      key: "cost",
      render: (cost: number) => {
        return cost.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        });
      },
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        return status === 0 ? "Chưa thanh toán" : " Đã thanh toán";
      },
    },
  ];

  return (
    <div>
      <div className="subject">
        <BreadcrumbComp title="Danh sách học phí môn học" />
        <Table columns={columns} dataSource={payments} />
      </div>
    </div>
  );
};

export default Payment;
