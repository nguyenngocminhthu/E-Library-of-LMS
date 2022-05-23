import { AppstoreOutlined, FilterOutlined, MoreOutlined, StarOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Dropdown,
  Form,
  Menu,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import { getSubjects, ISubject } from "../../../redux/reducers/subject.reducer";
import { AppDispatch } from "../../../redux/store";

const { Title } = Typography;
const { Option } = Select;

export const Subject = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();
  const [disable, setDisable] = useState(false);
  const [data, setData] = useState<ISubject[]>([]);

  const userMenu = (
    <Menu>
      <Menu.Item key="1">Tất cả</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">Được gắn dấu sao</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">Không được gắn sao</Menu.Item>
    </Menu>
  );
  
  useEffect(() => {
    dispatch(getSubjects(999))
      .unwrap()
      .then((rs: any) => {
        let list: ISubject[] = [];
        rs.results.forEach((vl: ISubject, idx: number) => {
          list.push({ key: idx, ...vl });
        });
        setData(list);
      })
      .catch((e: any) => {});
  }, []);

  const mySubjec = [
    {
      value: "Thương mại điện tử",
      key: "TMDT",
    },
    {
      value: "Kế toán",
      key: "KT",
    },
    {
      value: "Luật kinh doanh",
      key: "LKD",
    },
  ];
  const columns = [
    {
      title: "",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Chú ý">
            <Button
              icon={<StarOutlined className="icon-start" />}
              size="large"
            />
          </Tooltip>
        </Space>
      ),
    },
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
    },
    {
      title: "Giảng viên",
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: "",
      key: "action",
      render: (text: any, record: any) => (
        <Dropdown.Button
          className="dropdown-btn"
          overlay={
            <Menu>
              <Menu.Item
                key="1"
                onClick={() =>
                  navigate(`/student/subjects/viewsubject`)
                }
              >
                Chi tiết
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="2">Tải xuống tài nguyên</Menu.Item>
            </Menu>
          }
          icon={
            <MoreOutlined
              style={{
                fontSize: "24px",
              }}
            />
          }
        ></Dropdown.Button>
      ),
    },
  ];

  return (
    <div className="subject">
      <BreadcrumbComp title="Môn học của tôi" />
      <div className="top-head">
        <Title ellipsis level={5}>
          Danh sách môn học
        </Title>
        <div style={{ display: "flex" }}>
        <Dropdown.Button
            placement="bottomLeft" 
            overlay={userMenu}
            icon={
              <FilterOutlined/>
            }
          ></Dropdown.Button>
          <Space style={{ marginLeft: "24px" }} size="middle">
            <Tooltip title="All subject">
              <Button icon={<AppstoreOutlined />} />
            </Tooltip>
          </Space>

        </div>
      </div>
      <Row>
        <Col className="table-header" span={16}>
          <SelectComp
            style={{ display: "block" }}
            defaultValue="Tên môn học"
            dataString={mySubjec}
          />
        </Col>
        <Col className="table-header" span={8}>
          <SearchComponent placeholder="Tìm kiếm" />
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
