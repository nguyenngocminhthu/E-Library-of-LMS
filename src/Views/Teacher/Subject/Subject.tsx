import { EyeOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Form, Input, Menu, Row, Select, Space, Table, Tooltip } from "antd";
import modal from "antd/lib/modal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import { getSubjects, ISubject } from "../../../redux/reducers/subject.reducer";
import {
  getUser,
  updateProfile,
  UserState,
} from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import "./style.scss";

const { Option } = Select;

export const Subject = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();
  const [disable, setDisable] = useState(false);
  const [data, setData] = useState<ISubject[]>([]);
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");

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

  const handleClick = (id: string) => {
    navigate(`subjectdetail/${id}`);
    const subjectIds = user.recentSubjectId;
    if (subjectIds.length === 10) {
      subjectIds.pop();
    }
    if (subjectIds.includes(id)) {
      const newSubjectIds = subjectIds.filter(function (e: any) {
        return e !== id;
      });
      dispatch(
        updateProfile({
          id: user.id,
          payload: { recentSubjectId: [id, ...newSubjectIds] },
        })
      )
        .unwrap()
        .then(() => {
          dispatch(getUser(user.id))
            .unwrap()
            .then((rs: UserState) => {
              localStorage.setItem("user", JSON.stringify(rs));
            });
        });
    } else {
      dispatch(
        updateProfile({
          id: user.id,
          payload: { recentSubjectId: [id, ...subjectIds] },
        })
      )
        .unwrap()
        .then(() => {
          dispatch(getUser(user.id))
            .unwrap()
            .then((rs: UserState) => {
              localStorage.setItem("user", JSON.stringify(rs));
            });
        });
    }
  };

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
  const seeDetails = {
    title: "Tổng quan về Thương mại Điện tử ở Việt Nam",
    width: "90%",
    content: <div></div>,
  };

  const expandedRowRender = () => {
    const dataNested =[
      {
        key:"11",
        classCode: "DLK6102H2021",
        className: "Thương mại điện tử",
      },
      {
        key:"12",
        classCode: "DLK6102H2021",
        className: "Công nghệ phần mềm",
      },
      {
        key:"13",
        classCode: "DLK6102H2021",
        className: "Thương mại điện tử",
      }
    ]
    const columnsNested = [
      {
        title: "Mã lớp",
        dataIndex: "classCode",
        key: "classCode",
      },
      {
        title: "Tên lớp",
        dataIndex: "className",
        key: "className",
      },
      {
        title: "Xem chi tiết",
        dataIndex: "details",
        key: "details",
        render: () => (
          <Space size="middle">
            <Tooltip title="Detail">
              <Button
                onClick={() => modal.confirm(seeDetails)}
                // onClick={() => navigate(`/subjectManage/${record.subCode}`)}
                icon={<EyeOutlined />}
              />
            </Tooltip>
          </Space>
        ),
      },
    ]
    return <Table columns={columnsNested} dataSource={dataNested} pagination={false} className="table-nested"/>;
  };

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
        <div onClick={() => navigate(`subjectdetail/${record.id}`)}>
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
          overlay={
            <Menu>
              <Menu.Item key="1" onClick={() => handleClick(record.id)}>
                Chi tiết môn học
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                key="2"
                onClick={() => navigate(`listfile/${record.id}`)}
              >
                Danh sách tài liệu
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="3" onClick={() => modal.confirm(modalChangeName)}>
                Phân công tài liệu
              </Menu.Item>
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
      <BreadcrumbComp title="Danh sách môn giảng dạy" />
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
        expandable={{ expandedRowRender }}
      />
    </div>
  );
};
