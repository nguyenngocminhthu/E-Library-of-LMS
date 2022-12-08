import { EyeOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Space, Table, Tooltip } from "antd";
import modal from "antd/lib/modal";
import React, { useEffect, useState } from "react";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import "./FeeManage.style.scss";

interface DataType {
  codeNumber: string;
  numberCode: string;
  billCode: number;
  dateCollectMoney: string;
  feeContent: string;
  money: number;
  cashier: string;
  action: any;
}

export const GeneralReceipts = () => {
  const [form] = Form.useForm();

  const columns = [
    {
      title: "STT",
      dataIndex: "codeNumber",
      key: "codeNumber",
    },
    {
      title: "Số phiếu",
      dataIndex: "numberCode",
      key: "numberCode",
    },
    {
      title: "Mã hóa đơn",
      dataIndex: "billCode",
      key: "billCode",
    },
    {
      title: "Ngày thu",
      dataIndex: "dateCollectMoney",
      key: "dateCollectMoney",
    },
    {
      title: "Nội dung thu",
      dataIndex: "feeContent",
      key: "feeContent",
    },
    {
      title: "Số tiền (VNĐ)",
      dataIndex: "money",
      key: "money",
      render: (money: number) => {
        return money.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        });
      },
    },
    {
      title: "Đơn vị thu",
      dataIndex: "cashier",
      key: "cashier",
    },
  ];

  const data: DataType[] = [
    {
      codeNumber: "1",
      numberCode: "123974",
      billCode: 5600,
      dateCollectMoney: "20/06/2020 - 08:46 AM",
      feeContent: "Kế toán đại cương",
      money: 2900000,
      cashier: "Nguyễn Thị Phương Trâm",
      action: "any",
    },
    {
      codeNumber: "2",
      numberCode: "273462",
      billCode: 8927,
      dateCollectMoney: "20/06/2020 - 08:46 AM",
      feeContent: "Xác xuất thống kê",
      money: 2696000,
      cashier: "Nguyễn Thị Phương Trâm",
      action: "any",
    },
    {
      codeNumber: "3",
      numberCode: "325236",
      billCode: 8223,
      dateCollectMoney: "10/12/2019 - 08:40 AM",
      feeContent: "Bảo hiểm y tế",
      money: 120000,
      cashier: "Ngân hàng VietinBank(On)",
      action: "any",
    },
  ];

  return (
    <div>
      <div className="subject">
        <BreadcrumbComp title="Phiếu thu tổng hợp" />
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default GeneralReceipts;
