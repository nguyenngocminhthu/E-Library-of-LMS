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
  key: React.Key;
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
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [money, setMoney] = useState<number[]>([]);
  const navigate = useNavigate();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (
      record: DataType,
      selected: boolean,
      selectedRows: DataType[]
    ) => {
      setMoney(
        selectedRows.map((selectedRow: DataType) => {
          return selectedRow.money;
        })
      );
    },
    onSelectAll: (
      selected: boolean,
      selectedRows: DataType[],
      changeRows: DataType[]
    ) => {
      setMoney(
        selectedRows.map((selectedRow: DataType) => {
          return selectedRow.money;
        })
      );
    },
  };

  const hasSelected = selectedRowKeys.length > 0;

  const columns = [
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
      render: (money: number) => {
        return money.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        });
      },
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      codeNumber: "1",
      billCodeSubject: 123974,
      feeContent: "Kế toán đại cương",
      session: "2020 - 2021",
      money: 1160000,
    },
    {
      key: "2",
      codeNumber: "2",
      billCodeSubject: 123975,
      feeContent: "Xác xuất thống kê",
      session: "2020 - 2021",
      money: 2330000,
    },
    {
      key: "3",
      codeNumber: "3",
      billCodeSubject: 123976,
      feeContent: "Lập trình hướng đối tượng",
      session: "2020 - 2021",
      money: 2330000,
    },
  ];

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
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
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
