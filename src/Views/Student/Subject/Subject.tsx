import {
  AppstoreOutlined,
  FilterOutlined,
  MoreOutlined,
  StarOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Dropdown,
  Menu,
  Popover,
  Row,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import modal from "antd/lib/modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import { IClass } from "../../../redux/reducers/classes.reducer";
import {
  getSubjects,
  ISubject,
  listSubject,
} from "../../../redux/reducers/subject.reducer";
import { AppDispatch } from "../../../redux/store";
import {
  getUser,
  updateProfile,
  UserState,
} from "../../../redux/reducers/user.reducer";
import { ISubjectSelect } from "../../Leadership/Subject/Subject";

export const Subject = () => {
  const { Title } = Typography;
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [subjectSelect, setSubjectSelect] = useState<ISubjectSelect[]>([
    { name: "Tất cả bộ môn", value: "" },
  ]);
  const [filter, setFilter] = useState<any>();
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
    if (user) {
      let arr: ISubject[] = [];
      user.classes.forEach((value: IClass, index: number) => {
        value.subject.teacher = value.teacher;
        arr.push({ ...value.subject, key: index });
      });
      setData(arr);
    }
  }, [filter]);

  useEffect(() => {
    dispatch(getSubjects({ limit: 999 }))
      .unwrap()
      .then((rs: any) => {
        let option: ISubjectSelect[] = [{ name: "Tất cả bộ môn", value: "" }];

        rs.results.forEach((value: ISubject) => {
          option.push({ name: value.subName, value: value.id });
        });
        setSubjectSelect(option);
      });
  }, []);

  const handleClick = (id: string) => {
    navigate(`/student/subjects/subjectdetails/${id}`);
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

  const handleFilterSubject = (e: any) => {
    if (e !== "") {
      setFilter({ ...filter, subject: e });
    } else {
      delete filter.subject;
      setFilter({ ...filter });
    }
  };

  const downloadFile = {
    title: "Tải xuống tệp",
    className: "modal-common-style",
    content:
      "Xác nhận muốn tải xuống 25 tệp đã chọn. Các file đã chọn sẽ được lưu dưới dạng .rar.",
    okText: "Xác nhận",
    cancelText: "Huỷ",
  };

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
      render: (teacher: UserState) => {
        return teacher.userName;
      },
    },
    {
      title: "",
      key: "action",
      render: (text: any, record: ISubject) => (
        <Space size="middle">
          <Tooltip title="More">
            <Popover
              content={
                <div className="popover">
                  <p onClick={() => handleClick(record.id)}>Chi tiết</p>
                  <p onClick={() => modal.confirm(downloadFile)}>
                    Tải xuống tài nguyên
                  </p>
                  <p
                    onClick={() =>
                      navigate(`/student/subjects/exams/${record.id}`)
                    }
                  >
                    Đề thi và kiểm tra
                  </p>
                </div>
              }
              trigger="click"
            >
              <Button
                icon={
                  <MoreOutlined
                    style={{
                      fontSize: "24px",
                    }}
                  />
                }
              />
            </Popover>
          </Tooltip>
        </Space>
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
            icon={<FilterOutlined />}
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
            defaultValue=""
            dataString={subjectSelect}
            onChange={(e: any) => handleFilterSubject(e)}
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
