import {
  DesktopOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Row,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import { getBanks, IBanks } from "../../../redux/reducers/banks.reducer";
import { getSubjects, ISubject } from "../../../redux/reducers/subject.reducer";
import {
  getSubjectGroups,
  ISubjectGroup,
} from "../../../redux/reducers/subjectgroup.reducer";
import { AppDispatch } from "../../../redux/store";
import { ReactComponent as Word } from "../../../shared/img/icon/word.svg";
import { ISubjectSelect } from "../../Leadership/Subject/Subject";
import "./style.scss";

export const Exam = () => {
  const { Title } = Typography;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [subjectSelect, setSubjectSelect] = useState<ISubjectSelect[]>([
    { name: "Tất cả bộ môn", value: "" },
  ]);
  const [subjectGroupSelect, setSubjectGroupSelect] = useState<
    ISubjectSelect[]
  >([{ name: "Tất cả tổ bộ môn", value: "" }]);
  const dataSub = useSelector(
    (state: any) => state.subject.listSubject.results
  );
  const dataSubGroup = useSelector(
    (state: any) => state.subjectgroup.listSubjectGroup.results
  );
  const [data, setData] = useState<IBanks[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [filter, setFilter] = useState<any>({ limit: 999, user: user.id });

  useEffect(() => {
    dispatch(getBanks(filter))
      .unwrap()
      .then((rs: any) => {
        let list: IBanks[] = [];
        rs.results.forEach((vl: IBanks, idx: number) => {
          list.push({ key: idx, ...vl });
        });
        setData(list);
      })
      .catch((e: any) => {
        console.debug("e: ", e);
      });

    dispatch(getSubjects(999));
    dispatch(getSubjectGroups(999));
  }, [filter]);

  useEffect(() => {
    const option: ISubjectSelect[] = [{ name: "Tất cả bộ môn", value: "" }];
    if (dataSub) {
      dataSub.forEach((it: ISubject) => {
        option.push({ name: it.subName, value: it.id });
      });
    }
    setSubjectSelect(option);
  }, [dataSub]);

  useEffect(() => {
    const option: ISubjectSelect[] = [{ name: "Tất cả tổ bộ môn", value: "" }];
    if (dataSubGroup) {
      dataSubGroup.forEach((it: ISubjectGroup) => {
        option.push({ name: it.groupName, value: it.id });
      });
    }
    setSubjectGroupSelect(option);
  }, [dataSubGroup]);

  const columns = [
    {
      title: "Loại file",
      dataIndex: "fileType",
      key: "fileType",
      sorter: true,
      render: (fileType: number) => {
        return (
          <>
            {fileType === 0 ? (
              <DesktopOutlined style={{ fontSize: 32 }} />
            ) : (
              <Word />
            )}
          </>
        );
      },
    },
    {
      title: "Tên đề thi",
      dataIndex: "examName",
      key: "examName",
      sorter: (a: any, b: any) => a.fileName.length - b.fileName.length,
    },
    {
      title: "Hình thức",
      dataIndex: "examType",
      key: "examType",
      render: (examType: number) => {
        return (
          <>{examType === 0 ? <div>Trắc nghiệm</div> : <div>Tự luận</div>}</>
        );
      },
    },
    {
      title: "Thời lượng",
      dataIndex: "time",
      key: "time",
      render: (time: number) => {
        return <div>{time} phút</div>;
      },
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: number) => {
        return <div>{moment(createdAt).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      title: "",
      key: "action",
      render: (text: any, record: IBanks) => (
        <Space size="middle">
        <Tooltip title="Detail">
          <Button
            onClick={() => navigate(`/student/exams/examdetail/${record?.id}`)}
            icon={<EyeOutlined />}
          />
        </Tooltip>
      </Space>
      ),
    },
  ];

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleFilter = (e: any) => {
    if (e !== "") {
      setFilter({ ...filter, subjectGroup: e });
    } else {
      delete filter.subjectGroup;
      setFilter({ ...filter });
    }
  };

  const handleFilterSub = (e: any) => {
    if (e !== "") {
      setFilter({ ...filter, subject: e });
    } else {
      delete filter.subject;
      setFilter({ ...filter });
    }
  };

  return (
    <div className="exam-bank sub-exam-bank">
      <BreadcrumbComp title="Ngân hàng đề thi" />
      <div className="top-head">
        <Title ellipsis level={5}>
          Danh sách đề thi
        </Title>
      </div>
      <Row>
        <Col className="table-header" span={16}>
          <SelectComp
            style={{ display: "block" }}
            textLabel="Tổ bộ môn"
            defaultValue=""
            dataString={subjectGroupSelect}
            onChange={(e: any) => handleFilter(e)}
          />
          <SelectComp
            style={{ display: "block" }}
            textLabel="Bộ môn"
            defaultValue=""
            dataString={subjectSelect}
            onChange={(e: any) => handleFilterSub(e)}
          />
        </Col>
        <Col className="table-header" span={8}>
          <SearchComponent placeholder="Tìm kết quả theo tên, lớp, môn học,..." />
        </Col>
      </Row>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};
