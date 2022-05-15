import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import {
  getSubject,
  getSubjects,
  ISubject,
} from "../../../redux/reducers/subject.reducer";
import {
  getUser,
  updateProfile,
  UserState,
} from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import "./style.scss";

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

export interface ISubjectSelect {
  name: string;
  value: string;
}

export const Subject = () => {
  const navigate = useNavigate();
  const data = useSelector((state: any) => state.subject.listSubject.results);
  const [subjectSelect, setSubjectSelect] = useState<ISubjectSelect[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    dispatch(getSubjects(999))
      .unwrap()
      .then((rs: any) => {
        console.debug("rs: ", rs);
      })
      .catch((e: any) => {
        console.debug("e: ", e);
      });
  }, []);

  useEffect(() => {
    const option: ISubjectSelect[] = [];
    if (data) {
      data.forEach((it: ISubject) => {
        option.push({ name: it.subName, value: it.id });
      });
    }

    setSubjectSelect(option);
  }, [data]);

  const handleClick = (id: string) => {
    navigate(`/subjects/subjectdetails/${id}`);
    console.debug(user);
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
      localStorage.setItem(
        "subjectIds",
        JSON.stringify([id, ...newSubjectIds])
      );
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
      localStorage.setItem("subjectIds", JSON.stringify([id, ...subjectIds]));
    }
  };

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
              onClick={() => navigate(`/subjects/listfile/${record.subCode}`)}
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
        <Col className="table-header" span={16}>
          <SelectComp
            style={{ display: "block" }}
            textLabel="Môn học"
            defaultValue="Tất cả môn học"
            dataString={subjectSelect}
          />
          <SelectComp
            style={{ display: "block" }}
            textLabel="Giảng viên"
            defaultValue="Tất cả giảng viên"
            dataString={teacher}
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
      </Row>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
