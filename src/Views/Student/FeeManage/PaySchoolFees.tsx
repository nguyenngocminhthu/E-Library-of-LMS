import { EyeOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Radio,
  Row,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import React, { useState } from "react";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";

interface DataType {
  codeNumber: number;
  feeCode: string;
  feeContent: string;
  money: number;
  action: any;
}

export const PaySchoolFees = () => {
  const { Title } = Typography;
  const [paymentMethod, setPaymentMethod] = useState<number>(0);

  const columns = [
    {
      title: "STT",
      dataIndex: "codeNumber",
      key: "codeNumber",
    },
    {
      title: "Mã khoản thu",
      dataIndex: "feeCode",
      key: "feeCode",
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
    },
    {
      title: "",
      key: "action",
      width: 100,
      render: (text: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Chi tiết">
            <Button
              icon={<EyeOutlined className="icon-start" />}
              size="large"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      codeNumber: 1,
      feeCode: "001",
      feeContent: "Thu học phí học kỳ 1",
      money: 8120000,
      action: "",
    },
    {
      codeNumber: 2,
      feeCode: "002",
      feeContent: "Thu học phí học kỳ 2",
      money: 1080000,
      action: "",
    },
    {
      codeNumber: 3,
      feeCode: "003",
      feeContent: "Bảo hiểm y tế bắt buộc (12 tháng) NH 2020-2021",
      money: 530000,
      action: "",
    },
  ];

  return (
    <div>
      <div className="subject">
        <BreadcrumbComp title="Thanh toán trực tuyến" />
        <div className="top-head">
          <Title ellipsis level={5}>
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
        <Table columns={columns} dataSource={data} />
        <Row>
          <Col span={18}>Tổng thu:</Col>
          <Col span={6}>8.650.000 VNĐ</Col>
        </Row>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Button style={{ marginLeft: "1rem" }} type="primary">
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaySchoolFees;
