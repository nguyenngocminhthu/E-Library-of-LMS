import { EyeOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Space, Table, Tooltip } from "antd";
import modal from "antd/lib/modal";
import React from "react";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";

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

interface DataTypeDetailsTable {
  codeNumber: string;
  billCodeSubject: number;
  feeContent: string;
  session: string;
  money: number;
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
    },
    {
      title: "Đơn vị thu",
      dataIndex: "cashier",
      key: "cashier",
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
              onClick={() => modal.confirm(modalCourseManage)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      codeNumber: "1",
      numberCode: "123974",
      billCode: 5600,
      dateCollectMoney: "20/06/2020 - 08:46 AM",
      feeContent: "Học phí kỳ II 2019-2020",
      money: 5900000,
      cashier: "Nguyễn Thị Phương Trâm",
      action: "any",
    },
    {
      codeNumber: "2",
      numberCode: "273462",
      billCode: 8927,
      dateCollectMoney: "20/06/2020 - 08:46 AM",
      feeContent: "Học phí kỳ II 2019-2020",
      money: 4696000,
      cashier: "Nguyễn Thị Phương Trâm",
      action: "any",
    },
    {
      codeNumber: "3",
      numberCode: "325236",
      billCode: 8223,
      dateCollectMoney: "10/12/2019 - 08:40 AM",
      feeContent: "Học phí kỳ II 2019-2020",
      money: 120000,
      cashier: "Ngân hàng VietinBank(On)",
      action: "any",
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

  const modalCourseManage = {
    width: "50%",
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
        <Form.Item name="fileName" label="Số phiếu">
          <div>121235</div>
        </Form.Item>
        <Form.Item name="fileName" label="Mã hóa đơn: " />
        <Table
          columns={columnsDetailsTable}
          dataSource={dataDetailsTable}
          className="ant-table-wrapper"
        />
        <Row>
          <Col span={20}>Tổng thanh toán:</Col>
          <Col span={4}>8.650.000 VNĐ</Col>
        </Row>
      </Form>
    ),
    okText: "Xem phiếu thu",
    cancelText: "Hủy",
  };

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
