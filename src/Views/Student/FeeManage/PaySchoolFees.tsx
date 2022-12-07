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
  Form,
} from "antd";
import modal from "antd/lib/modal";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import "./FeeManage.style.scss";

interface DataType {
  codeNumber: number;
  feeCode: string;
  feeContent: string;
  money: number;
  action: any;
}

interface DataTypeDetailsTable {
  codeNumber: string;
  billCodeSubject: number;
  feeContent: string;
  session: string;
  money: number;
}

export const PaySchoolFees = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState<number>(0);
  const navigate = useNavigate();

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
              onClick={() => modal.confirm(modalPaySchoolFees)}
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

  const columnsDetailsTable = [
    {
      title: "STT",
      dataIndex: "codeNumber",
      key: "codeNumber",
    },
    {
      title: "Mã",
      dataIndex: "billCodeSubject",
      key: "billCodeSubject",
    },
    {
      title: "Nội dung khoản thu",
      dataIndex: "feeContent",
      key: "feeContent",
    },
    {
      title: "Học kỳ",
      dataIndex: "session",
      key: "session",
    },
    {
      title: "Số tiền (VNĐ)",
      dataIndex: "money",
      key: "money",
    },
  ];

  const dataDetailsTable: DataTypeDetailsTable[] = [
    {
      codeNumber: "1",
      billCodeSubject: 123974,
      feeContent: "Kế toán đại cương",
      session: "2020 - 2021",
      money: 1160000,
    },
    {
      codeNumber: "2",
      billCodeSubject: 123974,
      feeContent: "Kế toán đại cương",
      session: "2020 - 2021",
      money: 1160000,
    },
    {
      codeNumber: "3",
      billCodeSubject: 123974,
      feeContent: "Kế toán đại cương",
      session: "2020 - 2021",
      money: 1160000,
    },
  ];

  const modalPaySchoolFees = {
    width: "50%",
    title: "Các học phần đã đăng ký",
    content: (
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        name="cancel-form"
        layout="horizontal"
        form={form}
        style={{ textAlign: "left" }}
        className="subject"
      >
        <Table
          columns={columnsDetailsTable}
          dataSource={dataDetailsTable}
          className="ant-table-wrapper"
        />
      </Form>
    ),
    cancelText: "Hủy",
  };

  const handleClick = () => {
    if (paymentMethod === 0) {
      navigate("/student/payschoolfees/creditdebit");
    } else {
      navigate("/student/payschoolfees/vnpay");
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
        <Table columns={columns} dataSource={data} />
        <Row className="totalFee">
          <Col span={18} style={{ color: "#CC5C00" }}>
            Tổng thu:
          </Col>
          <Col span={6}>8.650.000 VNĐ</Col>
        </Row>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Button
            onClick={handleClick}
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
