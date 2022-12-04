import { EyeOutlined } from "@ant-design/icons";
import { Col, Row, Table, Tag, Typography } from "antd";
import React from "react";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";

interface DataType {
  feeCode: string;
  feeName: string;
  courseLoad: string;
  statusRegister: number;
  money: number;
  alreadyPaid: number;
  deduct: string;
  debt: string;
  statusFee: number;
}

export const DebtReport = () => {
  const { Title } = Typography;
  const columns = [
    {
      title: "Mã khoản thu",
      dataIndex: "feeCode",
      key: "feeCode",
    },
    {
      title: "Tên khoản thu",
      dataIndex: "feeName",
      key: "feeName",
    },
    {
      title: "Số tín chỉ",
      dataIndex: "courseLoad",
      key: "courseLoad",
    },
    {
      title: "Trạng thái đang ký",
      dataIndex: "statusRegister",
      key: "statusRegister",
      render: (statusRegister: number) => (
        <div>
          {statusRegister === 0 ? (
            <span className="gray" style={{ color: "#0B80EC" }}>
              Đăng ký mới
            </span>
          ) : (
            <span className="gray">Học lại</span>
          )}
        </div>
      ),
    },
    {
      title: "Số tiền (VNĐ)",
      dataIndex: "money",
      key: "money",
    },
    {
      title: "Đã nộp (VNĐ)",
      dataIndex: "alreadyPaid",
      key: "alreadyPaid",
    },
    {
      title: "Khấu trừ",
      dataIndex: "deduct",
      key: "deduct",
    },
    {
      title: "Công nợ (VNĐ)",
      dataIndex: "debt",
      key: "debt",
    },
    {
      title: "Trạng thái nộp",
      dataIndex: "statusFee",
      key: "statusFee",
      render: (statusFee: number) => (
        <Tag
          color={statusFee === 0 ? "green" : statusFee === 1 ? "blue" : "red"}
          key={statusFee}
        >
          {statusFee === 0
            ? "Đã khấu trừ"
            : statusFee === 1
            ? "Đã nộp"
            : "Chưa nộ"}
        </Tag>
      ),
    },
  ];

  const data: DataType[] = [
    {
      feeCode: "0021500",
      feeName: "Kế toán đại cương",
      courseLoad: "4",
      statusRegister: 0,
      money: 1600000,
      alreadyPaid: 1600000,
      deduct: "--",
      debt: "--",
      statusFee: 0,
    },
    {
      feeCode: "0021600",
      feeName: "Nguyên lý kế toán",
      courseLoad: "6",
      statusRegister: 0,
      money: 2000000,
      alreadyPaid: 2000000,
      deduct: "--",
      debt: "--",
      statusFee: 1,
    },
    {
      feeCode: "0021700",
      feeName: "Kế toán tài chính doanh nghiệp 1",
      courseLoad: "6",
      statusRegister: 1,
      money: 2000000,
      alreadyPaid: 2000000,
      deduct: "--",
      debt: "--",
      statusFee: 2,
    },
  ];

  return (
    <div>
      <div className="subject">
        <BreadcrumbComp title="Tra cứu công nợ" />
        <Title ellipsis level={4}>
          Công nợ của bạn
        </Title>
        <Row>
          <Col className="table-header" span={16}>
            <Title ellipsis level={5} style={{ color: "#49C510" }}>
              Nguyễn Văn A - MSSV: 18110114
            </Title>
          </Col>
          <Col className="table-header" span={8}>
            <SearchComponent placeholder="Nhập tên hoặc mã khoản thu" />
          </Col>
        </Row>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default DebtReport;
