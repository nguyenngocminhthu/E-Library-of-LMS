import { EditOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space, Table, Tooltip } from "antd";
import modal from "antd/lib/modal";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import { getSubjects, ISubject } from "../../../redux/reducers/subject.reducer";
import {
  createSubjectGroup,
  getSubjectGroups,
  ISubjectGroup,
} from "../../../redux/reducers/subjectgroup.reducer";
import {
  getUser,
  getUsers,
  updateProfile,
  UserState,
} from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import { ModalSubject } from "./ModalSubject";
import "./Subject.style.scss";

export interface ISubjectSelect {
  name: string;
  value: string;
}

export const Subject = () => {
  const navigate = useNavigate();
  const data = useSelector((state: any) => state.subject.listSubject.results);
  const [student, setStudent] = useState<UserState[]>([]);
  const [teacher, setTeacher] = useState<UserState[]>([]);
  const [currentRecord, setCurrentRecord] = useState<ISubject>();
  const [modeSubject, setModeSubject] = useState("create");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectGroupSelect, setSubjectGroupSelect] = useState<
    ISubjectSelect[]
  >([{ name: "Tất cả bộ môn", value: "" }]);
  const [teacherSelect, setTeacherSelect] = useState<ISubjectSelect[]>([
    { name: "Tất cả giảng viên", value: "" },
  ]);
  const dispatch: AppDispatch = useDispatch();
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const [formGroup] = Form.useForm();
  const [filter, setFilter] = useState<any>({ limit: 999 });

  useEffect(() => {
    const option: ISubjectSelect[] = [{ name: "Tất cả bộ môn", value: "" }];
    dispatch(getSubjectGroups(999))
      .unwrap()
      .then((rs) => {
        rs.results.forEach((it: ISubjectGroup) => {
          option.push({ name: it.groupName, value: it.id });
        });
      });
    setSubjectGroupSelect(option);
    dispatch(getSubjects(filter));
    dispatch(getUsers({ limit: 999, role: "student" }))
      .unwrap()
      .then((rs: any) => {
        setStudent(rs.results);
      });
    dispatch(getUsers({ limit: 999, role: "teacher" }))
      .unwrap()
      .then((rs) => {
        setTeacher(rs.results);
      });
  }, [filter]);

  useEffect(() => {
    const option: ISubjectSelect[] = [{ name: "Tất cả giảng viên", value: "" }];
    if (teacher) {
      teacher.forEach((it: UserState) => {
        option.push({ name: it.userName, value: it.id });
      });
    }

    setTeacherSelect(option);
  }, [teacher]);

  const handleFilterSubject = (query: string, e: any) => {
    if (e !== "") {
      setFilter({ ...filter, [`${query}`]: e });
    } else {
      delete filter[query];
      setFilter({ ...filter });
    }
  };

  const handleRefresh = () => {
    dispatch(getSubjectGroups(999));
    dispatch(getUsers({ limit: 999, role: "teacher" }));
    const option: ISubjectSelect[] = [{ name: "Tất cả bộ môn", value: "" }];
    dispatch(getSubjects(filter))
      .unwrap()
      .then((rs) => {
        rs.results.forEach((it: ISubject) => {
          option.push({ name: it.subName, value: it.id });
        });
      });

    setSubjectGroupSelect(option);
  };

  const handleClick = (id: string) => {
    navigate(`/subjects/subjectdetails/${id}`);
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

  const onFinishGroup = async (values: any) => {
    dispatch(createSubjectGroup(values)).then((rs) => {
      handleRefresh();
      formGroup.resetFields();
    });
  };

  const handleModal = (mode: string, record?: ISubject) => {
    if (record) {
      setCurrentRecord(record);
    }
    setIsModalOpen(true);
    setModeSubject(mode);
  };

  const handleSubGroup = () => {
    const config = {
      title: "Tạo tổ bộ môn mới",
      width: "40%",
      className: "cancel-form",
      content: (
        <Form
          form={formGroup}
          onFinish={onFinishGroup}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            name="groupCode"
            label="Mã tổ bộ môn"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="groupName"
            label="Tên tổ bộ môn"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      ),
      okText: "Tạo",
      cancelText: "Huỷ",
      onOk: () => formGroup.submit(),
      onCancel: () => formGroup.resetFields(),
    };
    modal.confirm(config);
  };

  const status = [
    {
      name: "Tất cả tình trạng",
      value: "",
    },
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
        <div onClick={() => handleClick(record.id)}>{subName}</div>
      ),
    },
    {
      title: "Giảng viên",
      dataIndex: "teacher",
      key: "teacher",
      render: (teacher: UserState) => {
        return teacher?.userName;
      },
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
      render: (createdAt: any) => {
        return moment(createdAt).format("DD/MM/YYYY");
      },
    },
    {
      title: "",
      key: "action",
      width: 100,
      render: (text: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Chi tiết">
            <Button
              onClick={() => navigate(`/subjects/listfile/${record.id}`)}
              icon={<UnorderedListOutlined />}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button
              onClick={() => handleModal("edit", record)}
              icon={<EditOutlined />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="subject">
      <BreadcrumbComp title="Danh sách môn học" />
      <Row>
        <Col className="table-header" span={11}>
          <SelectComp
            style={{ display: "block" }}
            textLabel="Bộ môn"
            defaultValue=""
            dataString={subjectGroupSelect}
            onChange={(e: any) => handleFilterSubject("subGroup", e)}
          />
          <SelectComp
            style={{ display: "block" }}
            defaultValue=""
            textLabel="Giảng viên"
            dataString={teacherSelect}
            onChange={(e: any) => handleFilterSubject("teacher", e)}
          />
          <SelectComp
            style={{ display: "block" }}
            textLabel="Tình trạng tài liệu"
            defaultValue=""
            dataString={status}
            onChange={(e: any) => handleFilterSubject("status", e)}
          />
        </Col>
        <Col className="table-header" span={8}>
          <SearchComponent placeholder="Tìm kết quả theo tên, lớp, môn học,..." />
        </Col>
        <Col
          className="table-header"
          span={3}
          style={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Button onClick={handleSubGroup} type="primary">
            Tạo tổ bộ môn
          </Button>
        </Col>
        <Col
          className="table-header"
          span={2}
          style={{
            display: "flex",
            justifyContent: "right",
            paddingRight: "6px",
          }}
        >
          <Button onClick={() => handleModal("create")} type="primary">
            Tạo mới
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} />
      <ModalSubject
        record={currentRecord}
        student={student}
        teacher={teacher}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        mode={modeSubject}
      ></ModalSubject>
    </div>
  );
};
