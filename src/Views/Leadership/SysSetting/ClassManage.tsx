import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import modal from "antd/lib/modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import {
  createClass,
  getClasses,
} from "../../../redux/reducers/classes.reducer";
import { getSubjects, ISubject } from "../../../redux/reducers/subject.reducer";
import { getUsers, UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import { ReactComponent as Edit } from "../../../shared/img/icon/edit.svg";
import { ReactComponent as Trash } from "../../../shared/img/icon/trash.svg";
import { ISubjectSelect } from "../Subject/Subject";
import "./style.scss";

const { Title } = Typography;
const { Option } = Select;

export const ClassManage = () => {
  const data = useSelector((state: any) => state.subject.listSubject.results);
  const [subjectSelect, setSubjectSelect] = useState<ISubjectSelect[]>([
    { name: "Tất cả bộ môn", value: "" },
  ]);
  const [teacherSelect, setTeacherSelect] = useState<ISubjectSelect[]>([
    { name: "Tất cả giảng viên", value: "" },
  ]);
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();
  const dataSub = useSelector(
    (state: any) => state.subject.listSubject.results
  );
  const [filter, setFilter] = useState<any>({ limit: 999 });
  const [student, setStudent] = useState<UserState[]>([]);
  const [teacher, setTeacher] = useState<UserState[]>([]);

  // const teacher = useSelector((state: any) => state.user.listUser.results);
  const classes = useSelector((state: any) => state.classes.listClass.results);

  useEffect(() => {
    dispatch(getClasses({ limit: 999 }));
    dispatch(getSubjects({ limit: 999 }));
    dispatch(getUsers({ limit: 999, role: "teacher" }))
      .unwrap()
      .then((rs) => {
        setTeacher(rs.results);
      });
    dispatch(getUsers({ limit: 999, role: "student" }))
      .unwrap()
      .then((rs: any) => {
        setStudent(rs.results);
      });
  }, []);

  useEffect(() => {
    const option: ISubjectSelect[] = [{ name: "Tất cả bộ môn", value: "" }];
    if (data) {
      data.forEach((it: ISubject) => {
        option.push({ name: it.subName, value: it.id });
      });
    }

    setSubjectSelect(option);
  }, [data]);

  useEffect(() => {
    const option: ISubjectSelect[] = [{ name: "Tất cả giảng viên", value: "" }];
    if (teacher) {
      teacher.forEach((it: UserState) => {
        option.push({ name: it.userName, value: it.id });
      });
    }

    setTeacherSelect(option);
  }, [teacher]);

  const handleRefresh = () => {
    dispatch(getClasses({ limit: 999 }));
  };

  const onFinish = (values: any) => {
    console.debug(values);
    dispatch(createClass(values)).then(() => {
      handleRefresh();
      message.success("Tạo mới lớp học thành công.");
    });
  };

  const deleteRow = {
    title: "Xóa Lớp học",
    content:
      "Xác nhận muốn xóa lớp học này và các thông tin bên trong? Sau khi xóa sẽ không thể hoàn tác.",
    okText: "Xác nhận",
    cancelText: "Huỷ",
  };

  const modalAddRole = {
    title: "Thiết lập lớp học",
    width: "50%",
    className: "modal-add-role",
    content: (
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        name="profile-form"
        layout="horizontal"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item label="Mã lớp học" name="classCode">
          <Input />
        </Form.Item>
        <Form.Item label="Tên lớp học" name="className">
          <Input />
        </Form.Item>
        <Form.Item name="subject" label="Môn học">
          <Select>
            {dataSub?.map((vl: ISubject) => (
              <Option value={vl.id}>{vl.subName}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="teacher" label="Giảng viên">
          <Select>
            <Option value="">Tất cả</Option>
            {teacher?.map((vl: UserState) => (
              <Option value={vl.id}>{vl.userName}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="student" label="Sinh viên">
          <Select mode="multiple" allowClear placeholder="Nhập hoặc select">
            {student?.map((vl: UserState) => (
              <Option key={vl.userCode || vl.id}>{vl.userCode}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    ),
    okText: "Lưu",
    cancelText: "Huỷ",
    onOk: () => form.submit(),
  };

  const columns = [
    {
      title: "Mã lớp",
      dataIndex: "classCode",
      key: "classCode",
      sorter: true,
    },
    {
      title: "Tên lớp",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Giảng viên",
      dataIndex: "teacher",
      key: "teacher",
      render: (teacher: UserState) => {
        return teacher.userName;
      },
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
            <Button icon={<Trash onClick={() => modal.confirm(deleteRow)} />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="role-manage-page">
      <BreadcrumbComp title="Quản lý lớp học" />
      <div className="title-page">
        <Title ellipsis level={5}>
          Danh sách các lớp học
        </Title>

        <Button
          className="btn-location"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => modal.confirm(modalAddRole)}
        >
          Thêm lớp học
        </Button>
      </div>
      <Row>
        <Col className="table-header" span={16}></Col>
        <Col className="table-header" span={8}>
          <SearchComponent placeholder="Tìm kết quả theo tên nhóm" />
        </Col>
      </Row>
      <Table columns={columns} dataSource={classes} />
    </div>
  );
};
