import { MoreOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Popover,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import modal from "antd/lib/modal";
import { useEffect, useRef, useState } from "react";
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
import { semester, year } from "../../Leadership/Subject/Subject";
import "./Subject.style.scss";

export const Subject = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();
  const [disable, setDisable] = useState(false);
  const [data, setData] = useState<ISubject[]>([]);
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const [filter, setFilter] = useState<any>({ limit: 999, teacher: user.id });

  useEffect(() => {
    dispatch(getSubjects(filter))
      .unwrap()
      .then((rs: any) => {
        let list: ISubject[] = [];
        rs.results.forEach((vl: ISubject, idx: number) => {
          list.push({ key: idx, ...vl });
        });
        setData(list);
      });
  }, [filter]);

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

  const handleFilterSubject = (query: string, e: any) => {
    if (e !== "") {
      setFilter({ ...filter, [`${query}`]: e });
    } else {
      delete filter[query];
      setFilter({ ...filter });
    }
  };

  const modalCourseManage = {
    title: "Phân công tài liệu môn học",
    width: "50%",
    content: (
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        name="cancel-form"
        layout="horizontal"
        form={form}
        style={{ textAlign: "left" }}
      >
        <Form.Item name="fileName" label="Mã môn học">
          <div>#DLK6</div>
        </Form.Item>
        <Form.Item name="fileName" label="Môn học">
          <div>Thương mại điện tử</div>
        </Form.Item>
        <Form.Item name="fileName" label="Giảng viên">
          <div>Hoa Hoa</div>
        </Form.Item>
        <p style={{ fontWeight: "700", marginBottom: "16px" }}>
          Phân công vào các lớp giảng dạy
        </p>
        <Form.Item
          name="chooseTopic"
          label="Tất cả lớp học"
          rules={[{ required: true }]}
        >
          <Select disabled={disable} defaultValue="Tùy chọn lớp học">
            <Option value={0}>Văn hóa xã hội</Option>
            <Option value={1}>Sample</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="chooseTopic"
          label="Chọn chủ đề"
          rules={[{ required: true }]}
        >
          <Select disabled={disable} defaultValue="Chọn chủ đề">
            <Option value={0}>Văn hóa xã hội</Option>
            <Option value={1}>Sample</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="fileNameTitle"
          label="Chọn bài giảng"
          rules={[{ required: true }]}
        >
          <Select disabled={disable} defaultValue="Chọn bài giảng">
            <Option value={0}>Văn hóa xã hội</Option>
            <Option value={1}>Sample</Option>
          </Select>
        </Form.Item>
      </Form>
    ),
    okText: "Lưu",
    cancelText: "Huỷ",
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
      sorter: (a: any, b: any) => {
        if (a.subName < b.subName) {
          return -1;
        }
        if (a.subName > b.subName) {
          return 1;
        }
        return 0;
      },
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
      title: "Niên khoá",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Học kỳ",
      dataIndex: "semester",
      key: "semester",
    },
    {
      title: "",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Popover
            content={
              <div className="popover">
                <p onClick={() => handleClick(record.id)}>Chi tiết môn học</p>
                <p onClick={() => navigate(`listfile/${record.id}`)}>
                  Danh sách tài liệu
                </p>
                <p onClick={() => modal.confirm(modalCourseManage)}>
                  Phân công tài liệu
                </p>
              </div>
            }
            trigger="click"
          >
            <Button
              // onClick={() => navigate(`/subjectManage/${record.subCode}`)}
              icon={
                <MoreOutlined
                  style={{
                    fontSize: "24px",
                  }}
                />
              }
            />
          </Popover>
        </Space>
      ),
    },
  ];

  const typingTimeoutRef = useRef<any>();
  const onChangeSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const name = e.target.value;
      handleFilterSubject("subName", name);
    }, 300);
  };

  return (
    <div className="subject">
      <BreadcrumbComp title="Danh sách môn giảng dạy" />
      <Row>
        <Col className="table-header" span={16}>
          <SelectComp
            style={{ display: "block" }}
            textLabel="Niên khoá"
            defaultValue=""
            dataString={year}
            onChange={(e: any) => handleFilterSubject("year", e)}
          />
          <SelectComp
            style={{ display: "block" }}
            textLabel="Học kỳ"
            defaultValue=""
            dataString={semester}
            onChange={(e: any) => handleFilterSubject("semester", e)}
          />
        </Col>
        <Col className="table-header" span={8}>
          <SearchComponent
            placeholder="Tìm kết quả theo tên, lớp, môn học,..."
            onChange={(e) => onChangeSearchTerm(e)}
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        // expandable={{ // remove class
        //   expandedRowRender: (record) => expandedRowRender(record),
        // }}
      />
    </div>
  );
};
