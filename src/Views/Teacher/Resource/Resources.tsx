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
  Tag,
  Tooltip,
} from "antd";
import modal from "antd/lib/modal";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import { getFiles, IFile } from "../../../redux/reducers/file.reducer";
import { getLessons, ILesson } from "../../../redux/reducers/lesson.reducer";
import { ISubject } from "../../../redux/reducers/subject.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import { ReactComponent as Delete } from "../../../shared/img/icon/fi_delete.svg";
import { ReactComponent as Mp4 } from "../../../shared/img/icon/mp4_file.svg";
import { ReactComponent as Word } from "../../../shared/img/icon/word.svg";

import { ModalUpload } from "./modalUpload";
import { ModalUploadFiles } from "./modalUploadFiles";

export const Resources = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const [data, setData] = useState<ILesson[]>([]);

  useEffect(() => {
    dispatch(getFiles({ limit: 999, user: user.id }))
      .unwrap()
      .then((rs) => {
        setData(rs.results);
      });
  }, []);

  const handleRefresh = () => {
    dispatch(getFiles({ limit: 999, user: user.id }))
      .unwrap()
      .then((rs) => {
        setData(rs.results);
      });
  };

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const subjectSelect = [
    {
      name: "Công nghệ thông tin",
      value: "CNTT",
    },
    {
      name: "Tài chính kế toán",
      value: "TCKT",
    },
    {
      name: "Xã hội học",
      value: "XHH",
    },
  ];

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

  const columnsTable = [
    {
      title: "Tên file",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Thể loại",
      dataIndex: "file",
      key: "file",
      render: (file: string) => {
        let vid = file.split("/");
        let vidName = vid[vid.length - 1];
        console.debug(vidName);
        return <>test</>;
      },
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "",
      key: "action",
      render: (text: any, record: any) => (
        <Delete
          style={{
            fontSize: "24px",
          }}
        />
      ),
    },
  ];

  const dataTable = [
    {
      key: "11",
      fileType: 2,
      nameType: "Tiềm năng của thương mại điện tử.doc",
      size: "2 MB",
    },
    {
      key: "12",
      fileType: 2,
      nameType: "Tiềm năng của thương mại điện tử.doc",
      size: "2 MB",
    },
    {
      key: "13",
      fileType: 1,
      nameType: "Tiềm năng của thương mại điện tử.doc",
      size: "2 MB",
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
        <Form.Item label="Tên mới" name="userName">
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
        <div style={{ marginBottom: "16px" }} className="subject">
          <Table
            columns={columnsTable}
            dataSource={dataTable}
            pagination={false}
          />
        </div>
        <Form.Item label="Chọn môn học">
          <SelectComp style={{ display: "block" }} dataString={subjectSelect} />
        </Form.Item>
        <Form.Item label="Chọn lớp học">
          <SelectComp style={{ display: "block" }} dataString={classSelect} />
        </Form.Item>
        <Form.Item label="Chọn chủ đề">
          <SelectComp style={{ display: "block" }} dataString={topicSelect} />
        </Form.Item>
        <Form.Item label="Tiêu đề bài giảng">
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
        return (
          <>
            {fileType.endsWith("doc") ||
              (fileType.endsWith("docx") && <Word />)}
          </>
        );
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        if (status === 0) {
          return <Tag color="default">Chưa phê duyệt</Tag>;
        } else if (status === 1) {
          return <Tag color="green">Đã phê duyệt</Tag>;
        } else {
          return <Tag color="red">Đã hủy</Tag>;
        }
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
      render: (text: any, record: any) => (
        <Space size="middle">
          <Tooltip title="More">
            <Popover
              content={
                <div className="popover">
                  <p onClick={() => modal.confirm(seeDetails)}>Xem chi tiết</p>
                  <p onClick={() => modal.confirm(modalChangeName)}>Đổi tên</p>
                  <p onClick={() => modal.confirm(downloadFile)}>Tải xuống</p>
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
            defaultValue="Tùy chọn môn học"
            dataString={subjectSelect}
          />
        </Col>
        <Col className="table-header" span={8}>
          <SearchComponent placeholder="Tìm kết quả theo tên, lớp, môn học,..." />
        </Col>
      </Row>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      <ModalUploadFiles
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        data={subjectSelect}
        handleRefresh={handleRefresh}
      />
    </div>
  );
};
