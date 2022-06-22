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
  Input,
  Modal,
  Popover,
  Radio,
  Row,
  Select,
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
const { Option } = Select;

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
      width: "35%",
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
              style={{ textAlign: "left", marginLeft: "36px"}}
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
          modal.confirm(modalCreateExamFromQuestions)
        } else if (test === 1){
          navigate("/teacher/exams/createExam");
        }
      },
    };
    modal.confirm(config);
  };

  const modalChangeName = {
    title: "Đổi tên tệp",
    width: "40%",
    className: "modal-common-style",
    content: (
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        name="profile-form"
        layout="horizontal"
        form={form}
      >
        <Form.Item label="Tên mới" name="userName" rules={[{ required: true }]}>
          <div className="input-layout">
            <Input />
            .file
          </div>
        </Form.Item>
      </Form>
    ),
    okText: "Lưu",
    cancelText: "Huỷ",
  };

  const removeRow = {
    title: "Xác nhận xóa",
    className: "modal-common-style",
    content: "Bạn có chắc chắn muốn xóa tệp này khỏi thư viện không?",
    okText: "Xoá",
    cancelText: "Huỷ",
  };

  const downloadFile = {
    title: "Tải xuống tệp",
    className: "modal-common-style",
    content:
      "Xác nhận muốn tải xuống 25 tệp đã chọn. Các file đã chọn sẽ được lưu dưới dạng .rar.",
    okText: "Xác nhận",
    cancelText: "Huỷ",
  };

  const sendApprove = {
    title: "Gửi phê duyệt",
    className: "modal-common-style",
    content:
      "Xác nhận muốn gửi đề thi, kiểm tra này và toàn bộ thông tin, các file chứa bên trong để được phê duyệt.",
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
            <Button icon={<UploadOutlined style={{color: "#f17f21"}}/>} style={{ float: "left" }}>
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

  const modalCreateExamFromQuestions = {
    title: "Tạo mới đề thi từ ngân hàng câu hỏi",
    width: "50%",
    content: (
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        className="modal-add-role create-exam-question"
        layout="horizontal"
        form={form}
        style={{ textAlign: "left" }}
      >
        <Form.Item name="class" label="Chọn lớp học" rules={[{ required: true }]}>
          <Select defaultValue="Chọn lớp học">
            <Option value={0}>Công nghệ thông tin</Option>
            <Option value={1}>Công nghệ thực phẩm</Option>
            <Option value={2}>Hóa học nông nghiệp</Option>
          </Select>
        </Form.Item>
        <Form.Item name="topic" label="Chọn chủ đề" rules={[{ required: true }]}>
          <Select defaultValue="Chọn chủ đề">
            <Option value={0}>Chủ nghĩa Mác - Lênin</Option>
            <Option value={1}>Kinh tế căng bản</Option>
            <Option value={2}>Hóa học nâng cao</Option>
          </Select>
        </Form.Item>
        <div className="line"></div>
        <Form.Item name="nameExam" label="Tên đề thi" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="amountExam" label="Số lượng đề thi" rules={[{ required: true }]}>
          <div className="display-flex">
          <Input className="small-input" />
          <div className="span-detail">Đề</div>
          </div>
        </Form.Item>
        <Form.Item name="amountQuestion" label="Số lượng câu hỏi" rules={[{ required: true }]}>
          <div className="display-flex">
            <Input className="small-input" />
            <div className="span-detail">Câu</div>
          </div>
        </Form.Item>
        <Form.Item name="scope" label="Thang điểm" rules={[{ required: true }]}>
          <div className="display-flex">
            <Input className="small-input" />
            <div className="span-detail">Điểm</div>
          </div>
        </Form.Item>
        <Form.Item name="amountQuestionLevel" label="Số câu hỏi theo độ khó" rules={[{ required: true }]}>
          <Row>
            <Col span={8} className="display-flex">
              <Input className="small-input"/>
              <div className="span-detail">Khó</div>
            </Col>
            <Col span={8} className="display-flex">
              <Input className="small-input"/>
              <div className="span-detail">Trung Bình</div>
            </Col>
            <Col span={8} className="display-flex">
              <Input className="small-input"/>
              <div className="span-detail">Dễ</div>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    ),
    okText: "Lưu và gửi phê duyệt",
    cancelText: "Huỷ",
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
                      navigate(`/teacher/exams/examdetail/${record?.id}`)
                    }
                  >
                    Xem chi tiết
                  </p>
                  <p onClick={() => modal.confirm(modalChangeName)}>Đổi tên</p>
                  <p onClick={() => modal.confirm(downloadFile)}>Tải xuống</p>
                  <p onClick={() => modal.confirm(sendApprove)}>Gửi phê duyệt</p>
                  <p onClick={() => modal.confirm(removeRow)}>Xoá file</p>
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
          <Button onClick={() => modal.confirm(modalUpload)} icon={<UploadOutlined />} className="default-btn icon-custom">
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
