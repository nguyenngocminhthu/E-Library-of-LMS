import { Button, Col, Radio, Row, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { getPayments, IPayment } from "../../../redux/reducers/payment.reducer";
import { ISubject } from "../../../redux/reducers/subject.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import "./FeeManage.style.scss";

export const PaySchoolFees = () => {
  const { Title } = Typography;
  const [paymentMethod, setPaymentMethod] = useState<number>(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [money, setMoney] = useState<number[]>([]);
  const [payments, setPayments] = useState<IPayment[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPayments({ limit: 999, user: user.id }))
      .unwrap()
      .then((rs) => {
        const payments = rs.results.map((vl: IPayment, idx: number) => {
          return { ...vl, key: idx };
        });
        setPayments(payments);
      });
  }, []);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (
      record: IPayment,
      selected: boolean,
      selectedRows: IPayment[]
    ) => {
      setMoney(
        selectedRows.map((selectedRow: IPayment) => {
          return selectedRow.cost;
        })
      );
    },
    onSelectAll: (
      selected: boolean,
      selectedRows: IPayment[],
      changeRows: IPayment[]
    ) => {
      setMoney(
        selectedRows.map((selectedRow: IPayment) => {
          return selectedRow.cost;
        })
      );
    },
  };

  const hasSelected = selectedRowKeys.length > 0;

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
    // {
    //   title: "Học kỳ",
    //   dataIndex: "session",
    //   key: "session",
    // },
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

  const handleClick = () => {
    if (paymentMethod === 0) {
      navigate(
        `/student/payschoolfees/creditdebit/${money.reduce((a, b) => a + b, 0)}`
      );
    } else {
      navigate(
        `/student/payschoolfees/vnpay/${money.reduce((a, b) => a + b, 0)}`
      );
    }
  };

  return (
    <div>
      <div className="subject">
        <BreadcrumbComp title="Thanh toán trực tuyến" />
        <div className="top-head">
          <Title ellipsis level={5} style={{ color: "#CC5C00" }}>
            Thanh toán trực tuyến
          </Title>
        </div>
        <Title ellipsis level={4}>
          Chọn hình thức thanh toán:
        </Title>
        <Radio.Group
          defaultValue={0}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <Radio value={0}>Credit / Debit</Radio>
          <Radio value={1}>VNPAY</Radio>
        </Radio.Group>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={payments}
        />
        <Row className="totalFee">
          <Col span={18} style={{ color: "#CC5C00" }}>
            Tổng thu:
          </Col>
          <Col span={6}>
            {hasSelected
              ? `${money
                  .reduce((a, b) => a + b, 0)
                  .toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}`
              : ""}
          </Col>
        </Row>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Button
            onClick={handleClick}
            disabled={!hasSelected}
            style={{ marginLeft: "1rem" }}
            type="primary"
          >
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaySchoolFees;
