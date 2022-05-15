import { MoreOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  Menu,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import modal from "antd/lib/modal";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import { getSubjects, ISubject } from "../../../redux/reducers/subject.reducer";
import { AppDispatch } from "../../../redux/store";
import "./style.scss";

const { Option } = Select;

export const Subject = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();
  const [disable, setDisable] = useState(false);
  const [data, setData] = useState<ISubject[]>([]);

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
      .catch((e: any) => {
        console.debug("e: ", e);
      });
  }, []);

  const modalChangeName = {
    title: "Phân công tài liệu môn học",
    width: "50%",
    className: "modal-change-name",
    content: (
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        name="cancel-form"
        layout="horizontal"
        form={form}
      >
        <Form.Item name="fileName" label="Tên bài giảng">
          <div>Thương mại điện tử</div>
        </Form.Item>
        <Form.Item name="chooseTopic" label="Chọn chủ đề">
          <Select disabled={disable} defaultValue="Chọn chủ đề">
            <Option value={0}>Văn hóa xã hội</Option>
            <Option value={1}>Sample</Option>
          </Select>
        </Form.Item>
        <Form.Item name="fileNameTitle" label="Tiêu đề bài giảng">
          <Input />
        </Form.Item>
      </Form>
    ),
    okText: "Lưu",
    cancelText: "Huỷ",
  };
  const userMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => navigate(`/subjects/subjectdetail`)}>
        Chi tiết môn học
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={() => navigate(`/subjects/listfile`)}>
        Danh sách tài liệu
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={() => modal.confirm(modalChangeName)}>
        Phân công tài liệu
      </Menu.Item>
    </Menu>
  );
  const subjectSelect = [
    {
      value: "Xếp theo tên môn học",
      key: "XSTMH",
    },
    {
      value: "Lần truy cập gần nhất",
      key: "LTCGN",
    },
  ];
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
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (
        <div className={status === 0 ? "gray" : "green"}>
          {status === 0 ? "Chờ phê duyệt" : "Đã phê duyệt"}
        </div>
      ),
    },
    {
      title: "Số tài liệu chờ duyệt",
      dataIndex: "file",
      key: "file",
    },
    {
      title: "",
      key: "action",
      render: (text: any, record: any) => (
        <Dropdown.Button
          className="dropdown-btn"
          overlay={userMenu}
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
      <BreadcrumbComp title="Danh sách môn học" />
      <Row>
        <Col className="table-header" span={16}>
          <SelectComp
            style={{ display: "block" }}
            defaultValue="Xếp theo tên môn học"
            dataString={subjectSelect}
          />
        </Col>
        <Col className="table-header" span={8}>
          <SearchComponent placeholder="Tìm kết quả theo tên, lớp, môn học,..." />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.id}</p>
          ),
        }}
      />
    </div>
  );
};
