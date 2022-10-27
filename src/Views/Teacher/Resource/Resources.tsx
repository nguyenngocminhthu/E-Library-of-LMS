import {
  DownloadOutlined,
  MoreOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Popover,
  Row,
  Space,
  Table,
  Tooltip,
} from "antd";
import modal from "antd/lib/modal";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import { getFiles, IFile } from "../../../redux/reducers/file.reducer";
import { getSubjects, ISubject } from "../../../redux/reducers/subject.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import { ReactComponent as Excel } from "../../../shared/img/icon/excel_file.svg";
import { ReactComponent as Word } from "../../../shared/img/icon/word.svg";

import pdf from "../../../shared/img/pdf.png";
import pptx from "../../../shared/img/pptx.png";
import { ISubjectSelect } from "../../Leadership/Subject/Subject";
import { ModalUploadFiles } from "./modalUploadFiles";

export const Resources = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const [data, setData] = useState<IFile[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [subjectSelect, setSubjectSelect] = useState<ISubjectSelect[]>([
    { name: "Tất cả bộ môn", value: "" },
  ]);
  const [filter, setFilter] = useState<any>({ limit: 999, user: user.id });

  useEffect(() => {
    dispatch(getFiles(filter))
      .unwrap()
      .then((rs) => {
        setData(rs.results);
      });
  }, [filter]);

  useEffect(() => {
    const option: ISubjectSelect[] = [{ name: "Tất cả bộ môn", value: "" }];
    dispatch(getSubjects({ limit: 999, teacher: user.id }))
      .unwrap()
      .then((rs: any) => {
        rs.results.forEach((it: ISubject) => {
          option.push({ name: it.subName, value: it.id });
        });
        setSubjectSelect(option);
      });
  }, []);

  const handleRefresh = () => {
    dispatch(getFiles({ limit: 999, user: user.id }))
      .unwrap()
      .then((rs) => {
        setData(rs.results);
      });
  };

  const onSelectChange = (selectedRowKeys: any, selectedRows: IFile[]) => {
    setSelectedRowKeys(selectedRowKeys);
    let files: string[] = [];
    selectedRows.forEach((vl: IFile) => {
      files.push(vl.url);
    });
    setUrls(files);
  };

  const handleFilterSubject = (e: any) => {
    if (e !== "") {
      setFilter({ ...filter, subject: e });
    } else {
      delete filter.subject;
      setFilter({ ...filter });
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDownload = () => {
    urls.forEach((vl: string) => {
      window.open(vl);
    });
  };

  const classSelect = [
    {
      name: "Lớp học nâng cao",
      value: "hightClass",
    },
    {
      name: "Lớp học cơ bản",
      value: "basicClass",
    },
    {
      name: "Lớp học bổ túc văn hóa",
      value: "subClass",
    },
  ];

  const topicSelect = [
    {
      name: "Chủ đề tự chọn",
      value: "CDTC",
    },
    {
      name: "Chủ đề nâng cao",
      value: "CDNC",
    },
    {
      name: "Chủ đề bổ túc nâng cao",
      value: "CDBCNC",
    },
  ];

  const seeDetails = {
    title: "Tổng quan về Thương mại Điện tử ở Việt Nam",
    width: "90%",
    content: <div></div>,
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
          <div style={{ display: "flex" }}>
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
    content: `Xác nhận muốn tải xuống ${urls.length} tệp đã chọn.`,
    okText: "Xác nhận",
    cancelText: "Huỷ",
    onOk: () => handleDownload(),
  };

  const modalAddSubject = {
    title: "Thêm bài giảng vào môn học",
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
          <SelectComp style={{ display: "block" }} dataString={subjectSelect} />
        </Form.Item>
        <Form.Item label="Chọn lớp học" rules={[{ required: true }]}>
          <SelectComp style={{ display: "block" }} dataString={classSelect} />
        </Form.Item>
        <Form.Item label="Chọn chủ đề" rules={[{ required: true }]}>
          <SelectComp style={{ display: "block" }} dataString={topicSelect} />
        </Form.Item>
        <Form.Item label="Tiêu đề bài giảng" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    ),
    okText: "Lưu",
    cancelText: "Huỷ",
    onOk: () => form.submit(),
  };

  const columns = [
    {
      title: "Thể loại",
      dataIndex: "url",
      key: "url",
      render: (file: string) => {
        const vid = file.split("/");
        const fileType = vid[vid.length - 1].split("?")[0];
        if (fileType.endsWith("doc") || fileType.endsWith("docx")) {
          return <Word />;
        } else if (fileType.endsWith("pdf")) {
          return <img src={pdf} alt="pdf" />;
        } else if (fileType.endsWith("pptx")) {
          return <img src={pptx} alt="pptx" />;
        } else if (
          fileType.endsWith("xlsx") ||
          fileType.endsWith("xls") ||
          fileType.endsWith("csv")
        ) {
          return <Excel />;
        }
      },
    },
    {
      title: "Tên",
      dataIndex: "url",
      key: "url",
      render: (file: string) => {
        const vid = file.split("/");
        const fileType = vid[vid.length - 1].split("?")[0];
        const fileName = fileType.split("%2F")[1];
        return <>{fileName}</>;
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
      title: "Người chỉnh sửa",
      dataIndex: "user",
      key: "user",
      render: (user: UserState) => {
        return user.userName;
      },
    },

    {
      title: "Ngày sửa lần cuối",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: any) => {
        return moment(updatedAt).format("DD/MM/YYYY");
      },
    },
    {
      title: "",
      key: "action",
      render: (text: any, record: IFile) => (
        <Space size="middle">
          <Tooltip title="Mở rộng">
            <Popover
              content={
                <div className="popover">
                  <p onClick={() => modal.confirm(seeDetails)}>Xem chi tiết</p>
                  <p onClick={() => modal.confirm(modalChangeName)}>Đổi tên</p>
                  <p onClick={() => window.open(record.url)}>Tải xuống</p>
                  <p onClick={() => modal.confirm(modalAddSubject)}>
                    Thêm vào môn học
                  </p>
                  <p onClick={() => modal.confirm(removeRow)}>Xoá file</p>
                </div>
              }
              trigger="click"
            >
              <Button
                // onClick={() => navigate(`/subjectManage/${record.subCode}`)}
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
    <div className="subject sub-manage teacher-subject">
      <BreadcrumbComp title="Tất cả Tài nguyên" />
      <div className="top-head">
        <h1>Danh sách tài nguyên</h1>
        <div style={{ display: "flex" }}>
          <Space className="" size="middle">
            <Tooltip title="Tải xuống">
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
          <Button
            icon={<UploadOutlined />}
            onClick={() => setIsModalVisible(true)}
            className="default-btn icon-custom"
          >
            Tải lên
          </Button>
        </div>
      </div>
      <Row>
        <Col className="table-header" span={16}>
          <SelectComp
            style={{ display: "block" }}
            textLabel="Bộ môn"
            defaultValue=""
            dataString={subjectSelect}
            onChange={(e: any) => handleFilterSubject(e)}
          />
        </Col>
        <Col className="table-header" span={8}>
          <SearchComponent placeholder="Tìm kết quả theo tên, lớp, môn học,..." />
        </Col>
      </Row>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        rowKey={(record: IFile) => record.id}
      />
      <ModalUploadFiles
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        data={subjectSelect}
        handleRefresh={handleRefresh}
      />
    </div>
  );
};
