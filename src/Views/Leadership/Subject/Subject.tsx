import { UnorderedListOutlined, UploadOutlined } from "@ant-design/icons";
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
  Upload,
} from "antd";
import modal from "antd/lib/modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { uploadFilesToFirebase } from "../../../Apis/Firebase";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import {
  createSubject,
  getSubjects,
  ISubject,
} from "../../../redux/reducers/subject.reducer";
import {
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
import "./style.scss";

const { Option } = Select;
export interface ISubjectSelect {
  name: string;
  value: string;
}

export const Subject = () => {
  const navigate = useNavigate();
  const data = useSelector((state: any) => state.subject.listSubject.results);
  const [subjectSelect, setSubjectSelect] = useState<ISubjectSelect[]>([
    { name: "Tất cả bộ môn", value: "" },
  ]);
  const [teacherSelect, setTeacherSelect] = useState<ISubjectSelect[]>([
    { name: "Tất cả giảng viên", value: "" },
  ]);
  const dispatch: AppDispatch = useDispatch();
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const [form] = Form.useForm();
  const dataSubGroup = useSelector(
    (state: any) => state.subjectgroup.listSubjectGroup.results
  );
  const [filter, setFilter] = useState<any>({ limit: 999 });

  const teacher = useSelector((state: any) => state.user.listUser.results);

  useEffect(() => {
    dispatch(getSubjects(filter));
    dispatch(getSubjectGroups(999));
    dispatch(getUsers({ limit: 999, role: "teacher" }));
  }, [filter]);

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
    dispatch(getSubjects(filter));
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

  const handleFilter = (e: any) => {
    if (e !== "") {
      setFilter({ ...filter, teacher: e });
    } else {
      delete filter.teacher;
      setFilter({ ...filter });
    }
  };

  const onFinish = async (values: any) => {
    await dispatch(uploadFilesToFirebase([values.image.file], "Subject")).then(
      (rs: any) => {
        values.image = rs;
        dispatch(createSubject(values)).then((rs) => {
          handleRefresh();
        });
      }
    );
  };

  const handleModal = () => {
    const config = {
      title: "Tạo môn học mới",
      width: "40%",
      className: "cancel-form",
      content: (
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item name="subCode" label="Mã môn học">
            <Input />
          </Form.Item>
          <Form.Item name="subName" label="Tên môn học">
            <Input />
          </Form.Item>
          <Form.Item name="subGroup" label="Tổ bộ môn">
            <Select>
              {dataSubGroup.map((vl: ISubjectGroup) => (
                <Option value={vl.id}>{vl.groupName}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="teacher" label="Giảng viên">
            <Select>
              <Option value="">Tất cả</Option>
              {teacher.map((vl: UserState) => (
                <Option value={vl.id}>{vl.userName}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="image" label="Hình ảnh">
            <Upload
              beforeUpload={() => false}
              maxCount={1}
              className="upload-inline"
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      ),
      okText: "Tạo",
      cancelText: "Huỷ",
      onOk: () => form.submit(),
    };
    modal.confirm(config);
  };

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
    },
    {
      title: "",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Detail">
            <Button
              onClick={() => navigate(`/subjects/listfile/${record.id}`)}
              icon={<UnorderedListOutlined />}
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
        <Col className="table-header" span={14}>
          <SelectComp
            style={{ display: "block" }}
            defaultValue=""
            textLabel="Môn học"
            dataString={subjectSelect}
          />
          <SelectComp
            style={{ display: "block" }}
            defaultValue=""
            textLabel="Giảng viên"
            dataString={teacherSelect}
            onChange={(e: any) => handleFilter(e)}
          />
          <SelectComp
            style={{ display: "block" }}
            textLabel="Tình trạng tài liệu"
            defaultValue="Tất cả tình trạng"
            dataString={status}
          />
        </Col>
        <Col className="table-header" span={8}>
          <SearchComponent placeholder="Tìm kết quả theo tên, lớp, môn học,..." />
        </Col>
        <Col
          className="table-header"
          span={2}
          style={{ display: "flex", justifyContent: "right" }}
        >
          <Button onClick={handleModal} type="primary">
            Tạo mới
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
