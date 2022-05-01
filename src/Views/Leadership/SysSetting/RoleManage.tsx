import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Table, Tooltip } from "antd";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import {ReactComponent as Edit} from '../../../shared/img/icon/edit.svg'
import {ReactComponent as Trash} from '../../../shared/img/icon/trash.svg'

import "./style.scss";


export const RoleManage = () => {
  const navigate = useNavigate();
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
      sorter: true,
      // sorter: (a: any, b: any) => a.subName.length - b.subName.length,
      // render: (subName: string, record: any) => (
      //   <div onClick={() => navigate(`/subjects/${record.subCode}`)}>
      //     {subName}
      //   </div>
      // ),
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
      <Row>
        <Col className="table-header" span={16}>
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm vai trò
          </Button>
        </Col>
        <Col className="table-header" span={8}>
          <SearchComponent />
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
