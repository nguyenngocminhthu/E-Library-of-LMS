import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Table, Tooltip } from "antd";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import "./style.scss";

const subject = [
  {
    name: "Thương mại điện tử",
    value: "TMDT",
  },
  {
    name: "Nguyên lý kế toán",
    value: "NLKT",
  },
  {
    name: "Hệ thống thông tin",
    value: "HTTT",
  },
  {
    name: "Luật thương mại",
    value: "LTM",
  },
  {
    name: "Ngân hàng ",
    value: "NG",
  },
];
const teacher = [
  {
    name: "Nguyễn Văn A",
    value: "NVA",
  },
];
const status = [
  {
    name: "Đã phê duyệt",
    value: "DPD",
  },
  {
    name: "Chờ phê duyệt",
    value: "CPD",
  },
];

export const Subject = () => {
  const navigate = useNavigate();
  const columns = [
    {
      title: "Mã môn học",
      dataIndex: "subCode",
      key: "subCode",
    },
    {
      title: "Tên môn học",
      dataIndex: "subName",
      key: "subName",
      sorter: (a: any, b: any) => a.subName.length - b.subName.length,
      render: (subName: string, record: any) => (
        <div onClick={() => navigate(`/subjects/${record.subCode}`)}>
          {subName}
        </div>
      ),
    },
    {
      title: "Giảng viên",
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: "Số tài liệu chờ duyệt",
      dataIndex: "file",
      key: "file",
    },
    {
      title: "Tình trạng tài liệu môn học",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (
        <div className={status === 0 ? "gray" : "green"}>
          {status === 0 ? "Chờ phê duyệt" : "Đã phê duyệt"}
        </div>
      ),
    },
    {
      title: "Ngày gửi phê duyệt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Detail">
            <Button
              onClick={() => navigate(`/listfile/${record.subCode}`)}
              icon={<UnorderedListOutlined />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      subCode: "2020-6B",
      subName: "Thương mại điện tử",
      teacher: "Nguyễn Văn A",
      file: "15/20",
      status: 0,
      createdAt: "12/02/2021",
    },
    {
      key: "2",
      subCode: "2020-6C",
      subName: "Nguyên lý kế toán",
      teacher: "Nguyễn Văn A",
      file: "15/20",
      status: 1,
      createdAt: "12/02/2021",
    },
    {
      key: "3",
      subCode: "2020-6A",
      subName: "Hệ thống thông tin",
      teacher: "Nguyễn Văn A",
      file: "15/20",
      status: 0,
      createdAt: "12/02/2021",
    },
  ];

  return (
    <div className="subject">
      <BreadcrumbComp title="Danh sách môn học" />
      <Row>
        <Col className="table-header" span={16}>
          <SelectComp
            style={{ display: "block" }}
            textLabel="Môn học"
            defaultValue="Tất cả môn học"
            dataString={subject}
          />
          <SelectComp
            style={{ display: "block" }}
            textLabel="Giảng viên"
            defaultValue="Tất cả giảng viên"
            dataString={teacher}
          />
          <SelectComp
            style={{ display: "block" }}
            textLabel="Tình trạng tài liệu"
            defaultValue="Tất cả tình trạng"
            dataString={status}
          />
        </Col>
        <Col className="table-header" span={8}>
          <SearchComponent />
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
