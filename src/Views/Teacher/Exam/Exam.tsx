import {
  DesktopOutlined,
  DownloadOutlined,
  MoreOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Modal,
  Popover,
  Radio,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import modal from "antd/lib/modal";
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

const { Title } = Typography;

const downloadFile = {
  title: "Tải xuống tệp",
  className: "modal-change-name",
  content:
    "Xác nhận muốn tải xuống 25 tệp đã chọn. Các file đã chọn sẽ được lưu dưới dạng .rar.",
  okText: "Xác nhận",
  cancelText: "Huỷ",
};
export const Exam = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
    const modalCreate = modal.confirm(config);
  };
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
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (
        <Tag
          color={status === 0 ? "green" : status === 1 ? "blue" : "red"}
          key={status}
        >
          {status === 0
            ? "Chờ phê duyệt"
            : status === 1
            ? "Đã phê duyệt"
            : "Đã huỷ"}
        </Tag>
      ),
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
              <Button icon={<MoreOutlined />} size="large" />
            </Popover>
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
        <div style={{ display: "flex" }}>
          <Space className="" size="middle">
            <Tooltip title="Download">
              <Button
                type="link"
                disabled={selectedRowKeys.length === 0 ? true : false}
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
