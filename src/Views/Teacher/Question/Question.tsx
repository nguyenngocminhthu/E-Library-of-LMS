import { EyeOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Collapse,
  Radio,
  Row,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import modal from "antd/lib/modal";
import lodash from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { ISelect, SelectComp } from "../../../Components/Select";
import {
  deleteQuestion,
  getQuestions,
  IQuestion,
} from "../../../redux/reducers/question.reducer";
import { ISubject } from "../../../redux/reducers/subject.reducer";
import {
  getSubjectGroup,
  getSubjectGroups,
  ISubjectGroup,
} from "../../../redux/reducers/subjectgroup.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import { ReactComponent as Edit } from "../../../shared/img/icon/edit.svg";
import { ReactComponent as Trash } from "../../../shared/img/icon/trash.svg";
import { ModalUploadFileQuestion } from "./ModalUploadFileQuestion";
import "./Question.style.scss";

export const Question = () => {
  const { Panel } = Collapse;
  const { Title } = Typography;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [subjectSelect, setSubjectSelect] = useState<ISelect[]>([
    { name: "Tất cả bộ môn", value: "" },
  ]);
  const [subjectGroupSelect, setSubjectGroupSelect] = useState<ISelect[]>([
    { name: "Tất cả tổ bộ môn", value: "" },
  ]);
  const dataSubGroup = useSelector(
    (state: any) => state.subjectgroup.listSubjectGroup.results
  );

  const dataQuestions = useSelector(
    (state: any) => state.question.listQuestion
  );
  const [data, setData] = useState<IQuestion[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [filter, setFilter] = useState<any>({ limit: 999, user: user.id });
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const [collapseShow, setCollapseShow] = useState<any>(false);
  const [question, setQuestion] = useState<IQuestion>();
  const [showModalUpload, setShowModalUpload] = useState(false);

  useEffect(() => {
    dispatch(getQuestions(filter));
  }, [filter]);

  useEffect(() => {
    let list: IQuestion[] = [];
    if (dataQuestions.length) {
      dataQuestions.forEach((vl: IQuestion, idx: number) => {
        list.push({ key: idx, ...vl });
      });
      setData(list);
    } else {
      setData([]);
    }
    dispatch(getSubjectGroups(999));
    setPage(1);
  }, [dataQuestions]);

  const handleRefresh = () => {
    dispatch(getQuestions(filter))
      .unwrap()
      .then((rs: any) => {
        let list: IQuestion[] = [];
        rs.results.forEach((vl: IQuestion, idx: number) => {
          list.push({ key: idx, ...vl });
        });
        setData(list);
      });
  };

  useEffect(() => {
    const option: ISelect[] = [{ name: "Tất cả tổ bộ môn", value: "" }];
    if (dataSubGroup) {
      dataSubGroup.forEach((it: ISubjectGroup) => {
        option.push({ name: it.groupName, value: it.id });
      });
    }
    setSubjectGroupSelect(option);
  }, [dataSubGroup]);

  const convertAnswer = (num: number | undefined) => {
    if (num === 0) {
      return "A";
    } else if (num === 1) {
      return "B";
    } else if (num === 2) {
      return "C";
    } else {
      return "D";
    }
  };

  const modalRemove = (record: IQuestion) => {
    const removeQuestion = {
      title: "Xóa câu hỏi",
      className: "modal-common-style",
      content:
        "Xác nhận muốn xoá câu hỏi này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác.",
      okText: "Xác nhận",
      cancelText: "Huỷ",
      onOk: () =>
        dispatch(deleteQuestion(record.id)).then(() => {
          handleRefresh();
        }),
    };
    modal.confirm(removeQuestion);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: 50,
      render: (key: number) => {
        return <div>{key + 1}</div>;
      },
    },
    {
      title: "Mã câu hỏi",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Độ khó",
      dataIndex: "level",
      key: "level",
      render: (level: number) => {
        return (
          <div>{level === 0 ? "Thấp" : level === 1 ? "Trung bình" : "Cao"}</div>
        );
      },
    },
    {
      title: "Được tạo bởi",
      dataIndex: "user",
      key: "user",
      render: (user: UserState) => {
        return <div>{user.userName}</div>;
      },
    },
    {
      title: "",
      key: "action",
      width: 160,
      render: (text: any, record: IQuestion) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết">
            <Button
              icon={
                <EyeOutlined
                  style={{
                    fontSize: "20px",
                  }}
                />
              }
              onClick={() => handleShowQuestion(record)}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button
              icon={<Edit />}
              onClick={() =>
                navigate(`/teacher/questions/editQuestions/${record.id}`)
              }
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              disabled={!lodash.isEmpty(record.bank)}
              icon={<Trash onClick={() => modalRemove(record)} />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleFilter = (e: any) => {
    if (e !== "") {
      delete filter.subject;
      setFilter({ ...filter, subjectgroup: e });
      dispatch(getSubjectGroup(e))
        .unwrap()
        .then((rs: ISubjectGroup) => {
          const option: ISelect[] = [{ name: "Tất cả bộ môn", value: "" }];

          rs.subject.forEach((it: ISubject) => {
            option.push({ name: it.subName, value: it.id });
          });

          setSubjectSelect(option);
        });
    } else {
      delete filter.subjectgroup;
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

  const handleFilterLevel = (e: any) => {
    if (e !== "") {
      setFilter({ ...filter, level: e });
    } else {
      delete filter.level;
      setFilter({ ...filter });
    }
  };

  const handleShowQuestion = (record?: IQuestion) => {
    setCollapseShow(true);
    setQuestion(record);
  };

  return (
    <div className="exam-bank sub-exam-bank question-page">
      <BreadcrumbComp title="Ngân hàng câu hỏi trắc nghiệm" />
      <div className="top-head" style={{ justifyContent: "right" }}>
        <div style={{ display: "flex" }}>
          <Button
            icon={<UploadOutlined />}
            className="default-btn icon-custom"
            onClick={() => setShowModalUpload(true)}
          >
            Tải lên
          </Button>
          <Button
            onClick={() => navigate("/teacher/questions/createQuestions")}
            style={{ marginLeft: "1rem" }}
            type="primary"
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <Row>
        <Col span={8}>
          <Title ellipsis level={3}>
            Bộ lọc câu hỏi
          </Title>
          <Card title="Lọc theo dạng" bordered={false}>
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
            <div className="select-label">Độ khó</div>
            <Radio.Group
              onChange={(e: any) => handleFilterLevel(e.target.value)}
              defaultValue=""
            >
              <Radio value="">Tất cả</Radio>
              <Radio value={0}>Thấp</Radio>
              <Radio value={1}>Trung bình</Radio>
              <Radio value={2}>Cao</Radio>
            </Radio.Group>
          </Card>
        </Col>
        <Col span={15} offset={1}>
          <Row>
            <Col span={12}>
              <Title ellipsis level={3}>
                Danh sách câu hỏi
              </Title>
            </Col>
            <Col className="table-header" span={12}>
              <SearchComponent placeholder="Tìm kiếm" />
            </Col>
          </Row>
          <Table
            pagination={{
              defaultPageSize: 10,
              current: page,
              total: data.length,
              showTotal(total, range) {
                return `Total ${total} items`;
              },
              onChange(page, pageSize) {
                setPage(page);
              },
              pageSize,
              pageSizeOptions: ["10", "15", "20", "25"],
              showSizeChanger: true,
              onShowSizeChange(current, size) {
                setPageSize(size);
                setPage(1);
              },
            }}
            scroll={{
              y: 600,
            }}
            columns={columns}
            dataSource={data}
          />
          {collapseShow && (
            <Collapse
              bordered={false}
              className="site-collapse-custom-collapse"
            >
              <Panel
                header="Nội dung câu hỏi"
                key="3"
                className="site-collapse-custom-panel"
              >
                <div>
                  <h3>{question?.quesName}</h3>
                  <Space direction="vertical">
                    {question?.answers.map((value) => (
                      <div key={value}>{value}</div>
                    ))}
                  </Space>
                </div>
                <h3>ĐÁP ÁN: {convertAnswer(question?.correct[0])}</h3>
                <div className="button-group-filter">
                  <Button
                    className="default-btn icon-custom"
                    onClick={() => setCollapseShow(false)}
                  >
                    Ẩn
                  </Button>
                </div>
              </Panel>
            </Collapse>
          )}
        </Col>
      </Row>
      <ModalUploadFileQuestion
        isModalOpen={showModalUpload}
        setIsModalOpen={setShowModalUpload}
      ></ModalUploadFileQuestion>
    </div>
  );
};
