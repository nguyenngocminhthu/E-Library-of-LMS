import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Table, Tooltip, Typography } from "antd";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import {ReactComponent as Edit} from '../../../shared/img/icon/edit.svg'
import {ReactComponent as Trash} from '../../../shared/img/icon/trash.svg'

import "./style.scss";

const { Title } = Typography;

export const UserManage = () => {
  const navigate = useNavigate();

  const roleMenu = [
    {
      name: "Quản trị viên",
      value: "admin",
    },
    {
      name: "Học sinh",
      value: "student",
    },
    {
      name: "Giáo viên",
      value: "teacher",
    },
  ];
  
  const columns = [
    {
      title: "Tên nhóm",
      dataIndex: "groupName",
      key: "groupName",
      sorter: true,
    },
    {
      title: "Mô tả",
      dataIndex: "describe",
      key: "describe",
      // sorter: (a: any, b: any) => a.subName.length - b.subName.length,
    },
    {
      title: "Lần cập nhật cuối",
      dataIndex: "lastUpdate",
      key: "lastUpdate",
      sorter: true,
    },
    {
      title: "",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button icon={<Edit />} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button icon={<Trash />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      groupName: "Quản trị viên",
      describe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.",
      lastUpdate: "12/12/2021",
    },
    {
      key: "2",
      groupName: "Quản trị viên",
      describe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.",
      lastUpdate: "12/12/2021",
    },
    {
      key: "3",
      groupName: "Quản trị viên",
      describe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada posuere justo.",
      lastUpdate: "12/12/2021",
    },
  ];

  return (
    <div className="rule-manager-page">
      <BreadcrumbComp title="Tất cả các tệp" />
      <div className="title-page">
        <Title ellipsis level={5}>
          Danh sách người dùng trên hệ thống
        </Title>
          <Button className="btn-location" type="primary" icon={<PlusOutlined />}>
            Thêm mới
          </Button>
      </div>
      <Row>
        <Col className="table-header" span={16}>
          <SelectComp
            style={{ display: "block" }}
            defaultValue="Chọn vai trò"
            dataString={roleMenu}
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

export default UserManage
