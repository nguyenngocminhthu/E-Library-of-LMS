import {
  DesktopOutlined,
  DownloadOutlined,
  MoreOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
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
import { ISelect, SelectComp } from "../../../Components/Select";
import {
  deleteBank,
  getBanks,
  IBanks,
  updateBank,
} from "../../../redux/reducers/banks.reducer";
import { getSubjects, ISubject } from "../../../redux/reducers/subject.reducer";
import {
  getSubjectGroups,
  ISubjectGroup,
} from "../../../redux/reducers/subjectgroup.reducer";
import { AppDispatch } from "../../../redux/store";
import { ReactComponent as Word } from "../../../shared/img/icon/word.svg";
import "./Exam.style.scss";
import { ModalCreateExamWithQuestion } from "./ModalCreateExamWithQuestion";

export const Exam = () => {
  const { Title } = Typography;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [subjectSelect, setSubjectSelect] = useState<ISelect[]>([
    { name: "Tất cả bộ môn", value: "" },
  ]);
  const [subjectGroupSelect, setSubjectGroupSelect] = useState<ISelect[]>([
    { name: "Tất cả tổ bộ môn", value: "" },
  ]);
  const [form] = Form.useForm();
  const [formAssign] = Form.useForm();

  const dataSubGroup = useSelector(
    (state: any) => state.subjectgroup.listSubjectGroup.results
  );
  const data = useSelector((state: any) => state.bank.listBanks.results);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [filter, setFilter] = useState<any>({ limit: 999, user: user.id });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getBanks(filter));
    dispatch(getSubjectGroups(999));
  }, [filter]);

  useEffect(() => {
    const option: ISelect[] = [{ name: "Tất cả bộ môn", value: "" }];

    dispatch(getSubjects({ limit: 999, teacher: user.id }))
      .unwrap()
      .then((rs: any) => {
        rs.results.forEach((it: ISubject) => {
          option.push({ name: it.subName, value: it.id });
        });
        setSubjectSelect(option);
      });
  }, []);

  useEffect(() => {
    const option: ISelect[] = [{ name: "Tất cả tổ bộ môn", value: "" }];
    if (dataSubGroup) {
      dataSubGroup.forEach((it: ISubjectGroup) => {
        option.push({ name: it.groupName, value: it.id });
      });
    }
    setSubjectGroupSelect(option);
  }, [dataSubGroup]);

  const handleRefresh = () => {
    dispatch(getBanks(filter));
    dispatch(getSubjectGroups(999));
  };

  const handleModal = () => {
    let test = 0;
    const config = {
      title: "Tạo đề thi mới",
      width: "45%",
      className: "cancel-form file-modal",
      content: (
        <Row>
          <Col span={5}>
            <b>Cách tạo đề thi</b>
          </Col>
          <Col span={19}>
            <Radio.Group
              defaultValue={0}
              onChange={(e) => {
                test = e.target.value;
              }}
              style={{ textAlign: "left", marginLeft: "36px" }}
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
        if (test === 0) {
          setIsModalOpen(true);
        } else if (test === 1) {
          navigate("/teacher/exams/createExam");
        }
      },
    };
    modal.confirm(config);
  };

  const ModalDelete = (id: string) => {
    const removeRow = {
      title: "Xác nhận xóa",
      className: "modal-common-style",
      content: "Bạn có chắc chắn muốn xóa đề thi này khỏi thư viện không?",
      okText: "Xoá",
      cancelText: "Huỷ",
      onOk: () =>
        dispatch(deleteBank(id)).then(() => {
          handleRefresh();
        }),
    };
    modal.confirm(removeRow);
  };

  const downloadFile = {
    title: "Tải xuống tệp",
    className: "modal-common-style",
    content:
      "Xác nhận muốn tải xuống 25 tệp đã chọn. Các file đã chọn sẽ được lưu dưới dạng .rar.",
    okText: "Xác nhận",
    cancelText: "Huỷ",
  };

  const modalUpload = {
    title: "Tải tệp lên",
    width: "40%",
    className: "modal-add-role",
    content: (
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        name="profile-form"
        layout="horizontal"
        form={form}
      >
        <Form.Item label="Chọn môn học" rules={[{ required: true }]}>
          <div className="upload-file">
            <Button
              icon={<UploadOutlined style={{ color: "#f17f21" }} />}
              style={{ float: "left" }}
            >
              Tải tệp lên
            </Button>
          </div>
          Chọn tệp để tải lên
        </Form.Item>
        <Form.Item label="Lưu thành" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Chọn tổ bộ môn" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Chọn môn học" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Được tạo bởi" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    ),
    okText: "Lưu",
    cancelText: "Huỷ",
    onOk: () => form.submit(),
  };

  const modalAssign = (id: string) => {
    const range = (start: number, end: number) => {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    };

    const onFinish = (values: any) => {
      dispatch(updateBank({ id: id, payload: values }))
        .unwrap()
        .then(() => {
          handleRefresh();
        });
    };
    const assign = {
      title: "Phân bố đề thi",
      width: "30%",
      className: "modal-common-style",
      content: (
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          name="profile-form"
          layout="horizontal"
          form={formAssign}
          onFinish={onFinish}
        >
          <Form.Item
            name="releaseTime"
            label="Chọn thời gian"
            rules={[{ required: true }]}
          >
            <DatePicker
              format="DD-MM-YYYY HH:mm:ss"
              showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
              disabledDate={(c) => c && c < moment().startOf("day")}
            />
          </Form.Item>
        </Form>
      ),
      okText: "Lưu",
      cancelText: "Huỷ",
      onOk: () => formAssign.submit(),
    };
    modal.confirm(assign);
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
      dataIndex: "isFinal",
      key: "isFinal",
      render: (isFinal: boolean) => {
        return (
          <>{isFinal === true ? <div>Đề thi</div> : <div>Bài kiểm tra</div>}</>
        );
      },
    },
    {
      title: "Môn học",
      dataIndex: "subject",
      key: "subject",
      render: (subject: ISubject) => {
        return subject.subName;
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
          <Popover
            content={
              <div className="popover">
                <p
                  onClick={() =>
                    navigate(`/teacher/exams/examdetail/${record?.id}`)
                  }
                >
                  Xem chi tiết
                </p>
                <p
                  onClick={() =>
                    navigate(`/teacher/exams/submissions/${record?.id}`)
                  }
                >
                  Xem bài nộp
                </p>
                {record.status === 1 && (
                  <p onClick={() => modalAssign(record.id)}>Phân bố đề thi</p>
                )}

                <p onClick={() => modal.confirm(downloadFile)}>
                  Tải xuống đề thi
                </p>

                <p onClick={() => ModalDelete(record.id)}>Xoá đề thi</p>
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
            <Tooltip title="Tải xuống">
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
          <Button
            onClick={() => modal.confirm(modalUpload)}
            icon={<UploadOutlined />}
            className="default-btn icon-custom"
          >
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
      <ModalCreateExamWithQuestion
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></ModalCreateExamWithQuestion>
    </div>
  );
};
