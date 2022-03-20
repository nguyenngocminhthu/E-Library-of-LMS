import SearchComponent from "../../../Components/SearchComponent";
import { Row, Col } from 'antd';
import { SelectComp } from "../../../Components/Select";
import { Table, Tag, Space } from 'antd';
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import "./style.scss"

const subject = [
  {
    name: "hương mại điện tử",
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

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text:any) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags:any) => (
      <>
        {tags.map((tag:any) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text:any, record:any) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export const Subject = () => {
  return <div className="subject">
    <BreadcrumbComp title="Danh sách môn học" />
    <Row>
      <Col className="table-header" span={16}>
          <SelectComp
              style={{ display: 'block'}}
              textLabel="Môn học"
              defaultValue="Tất cả môn học"
              dataString={subject}  
            />  
            <SelectComp
            style={{ display: 'block'}}
            textLabel="Giảng viên"
            defaultValue="Tất cả giảng viên"
            dataString={teacher}
          />
          <SelectComp
              style={{ display: 'block'}}
              textLabel="Tình trạng tài liệu"
              defaultValue="Tất cả tình trạng"
              dataString={status}
            />
        </Col>
      <Col className="table-header" span={8}><SearchComponent/></Col>
    </Row>
    <Table columns={columns} dataSource={data} />
  </div>;
};
