import {
  DownloadOutlined,
  MoreOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Collapse,
  Form,
  Popover,
  Radio,
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
import { IBanks } from "../../../redux/reducers/banks.reducer";
import { getQuestions } from "../../../redux/reducers/question.reducer";
import { getSubjects, ISubject } from "../../../redux/reducers/subject.reducer";
import {
  getSubjectGroups,
  ISubjectGroup,
} from "../../../redux/reducers/subjectgroup.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import { ISubjectSelect } from "../../Leadership/Subject/Subject";
import "./style.scss";

const { Panel } = Collapse;

const { Title } = Typography;

export const Question = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [subjectSelect, setSubjectSelect] = useState<ISubjectSelect[]>([
    { name: "Tất cả bộ môn", value: "" },
  ]);
  const [subjectGroupSelect, setSubjectGroupSelect] = useState<
    ISubjectSelect[]
  >([{ name: "Tất cả tổ bộ môn", value: "" }]);
  const [form] = Form.useForm();
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
    dispatch(getQuestions(filter))
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

  const handleModal = () => {
    let test = 0;
    const config = {
      title: "Tạo đề thi mới",
      width: "40%",
      className: "cancel-form file-modal",
      content: (
        <Row>
          <Col span={6}>
            <b>Cách tạo đề thi</b>
          </Col>
          <Col span={18}>
            <Radio.Group
              defaultValue={0}
              onChange={(e) => {
                test = e.target.value;
              }}
            >
              <Radio value={0}>Tạo đề thi từ ngân hàng câu hỏi</Radio>
              <Radio value={1}>Tạo đề thi với câu hỏi mới</Radio>
            </Radio.Group>
          </Col>
        </Row>
      ),
      okText: "Tiếp tục",
      cancelText: "Huỷ",
      onOk: () => {
        if (test === 1) {
          navigate("/teacher/exams/createExam");
        }
      },
    };
    modal.confirm(config);
  };

  const downloadFile = {
    title: "Tải xuống tệp",
    className: "modal-change-name",
    content:
      "Xác nhận muốn tải xuống 25 tệp đã chọn. Các file đã chọn sẽ được lưu dưới dạng .rar.",
    okText: "Xác nhận",
    cancelText: "Huỷ",
  };
  
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      sorter: true,
      render: (key: number) => {
        return <div>{key + 1}</div>;
      },
    },
    {
      title: "Mã câu hỏi",
      dataIndex: "quesCode",
      key: "quesCode",
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
      render: (text: any, record: IBanks) => (
        <Space size="middle">
          <Tooltip title="More">
            <Popover
              content={
                <div className="popover">
                  <p
                    onClick={() =>
                      navigate(`/teacher/exams/examdetail/${record.id}`)
                    }
                  >
                    Xem chi tiết
                  </p>
                  <p>Đổi tên</p>
                  <p>Tải xuống</p>
                  <p>Gửi phê duyệt</p>
                  <p>Xoá file</p>
                </div>
              }
              trigger="click"
            >
              <Button icon={<MoreOutlined  style={{
                fontSize: "24px",
              }}/>}/>
            </Popover>
          </Tooltip>
        </Space>
      ),
    },
  ];

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
    <div className="exam-bank sub-exam-bank question-page subDetail">
      <BreadcrumbComp title="Ngân hàng câu hỏi trắc nghiệm" />
      <div className="top-head" style={{ justifyContent: "right" }}>
        <div style={{ display: "flex" }}>
          <Space className="" size="middle">
            <Tooltip title="Download">
              <Button
                type="link"
                icon={
                  <DownloadOutlined
                    onClick={() => modal.confirm(downloadFile)}
                  />
                }
              />
            </Tooltip>
          </Space>
          <div className="line"></div>
          <Button icon={<UploadOutlined />} className="default-btn icon-custom">
            Tải lên
          </Button>
          <Button
            onClick={handleModal}
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
            <Radio.Group>
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
              <SearchComponent placeholder="Tìm kết quả theo tên, lớp, môn học,..." />
            </Col>
          </Row>
          <Table
            pagination={{ defaultPageSize: 4 }}
            columns={columns}
            dataSource={data}
          />
          <Collapse bordered={false} className="site-collapse-custom-collapse">
            <Panel
              header="Nội dung câu hỏi"
              key="3"
              className="site-collapse-custom-panel"
            >
              hehe
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </div>
  );
};
