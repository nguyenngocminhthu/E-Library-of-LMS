import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import modal from "antd/lib/modal";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import {
  getFiles,
  IFile,
  updateFile,
} from "../../../redux/reducers/file.reducer";
import {
  getLessons,
  ILesson,
  updateLesson,
} from "../../../redux/reducers/lesson.reducer";
import { getSubject, ISubject } from "../../../redux/reducers/subject.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import { ReactComponent as Mp4 } from "../../../shared/img/icon/mp4_file.svg";
import { ReactComponent as Word } from "../../../shared/img/icon/word.svg";

import "./style.scss";

export const ListFile = () => {
  const navigate = useNavigate();
  const params = useParams<{ idSub: string }>();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const dispatch: AppDispatch = useDispatch();
  const [data, setData] = useState<ILesson[]>([]);
  const [resourceData, setResourceData] = useState<IFile[]>([]);
  const [fileType, setFileType] = useState<number>(0);
  const [subData, setSubdata] = useState<ISubject>();

  useEffect(() => {
    if (params.idSub) {
      dispatch(getSubject(params.idSub))
        .unwrap()
        .then((rs) => {
          setSubdata(rs);
        });

      dispatch(getLessons({ limit: 999, subject: params.idSub }))
        .unwrap()
        .then((rs) => {
          setData(rs.results);
        });

      dispatch(getFiles({ limit: 999, subject: params.idSub }))
        .unwrap()
        .then((rs) => {
          setResourceData(rs.results);
        });
    }
  }, []);

  const handleRefresh = () => {
    dispatch(getLessons({ limit: 999, subject: params.idSub }))
      .unwrap()
      .then((rs) => {
        setData(rs.results);
      });

    dispatch(getFiles({ limit: 999, subject: params.idSub }))
      .unwrap()
      .then((rs) => {
        setResourceData(rs.results);
      });
  };

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

  const type = [
    {
      name: "Bài giảng",
      value: 0,
    },
    {
      name: "Tài nguyên",
      value: 1,
    },
  ];

  const ModalConFirm = (id: string, type: number) => {
    const config = {
      title: "Phê duyệt",
      className: "file-modal",
      content:
        type === 0
          ? "Xác nhận muốn phê duyệt bài giảng này và các thông tin bên trong? Sau khi phê duyệt sẽ không thể hoàn tác."
          : "Xác nhận muốn phê duyệt tài nguyên này và các thông tin bên trong? Sau khi phê duyệt sẽ không thể hoàn tác.",
      okText: "Xác nhận",
      cancelText: "Huỷ",
      onOk: () =>
        type === 0
          ? dispatch(updateLesson({ id: id, payload: { status: 1 } })).then(
              () => {
                handleRefresh();
              }
            )
          : dispatch(updateFile({ id: id, payload: { status: 1 } })).then(
              () => {
                handleRefresh();
              }
            ),
    };
    modal.confirm(config);
  };

  const config1 = {
    title: "Huỷ phê duyệt tài liệu",
    width: "40%",
    className: "cancel-form file-modal",
    content: (
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        name="cancel-form"
        layout="horizontal"
        form={form}
      >
        <Form.Item
          name="startDate"
          label="Ngày bắt đầu"
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: "50%" }} />
        </Form.Item>
        <Form.Item name="user" label="Người huỷ" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="note" label="Ghi chú">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="cbnotification" label=" ">
          <Checkbox className="cb-style">Gửi thông báo cho người tạo</Checkbox>
        </Form.Item>
      </Form>
    ),
    okText: "Lưu",
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

  const seeDetails = {
    title: "Tổng quan về Thương mại Điện tử ở Việt Nam",
    width: "90%",
    content: <div></div>,
  };

  const columns = [
    {
      title: "Thể loại",
      dataIndex: "video",
      key: "video",
      render: (video: string) => {
        const vid = video.split("/");
        const fileType = vid[vid.length - 1].split("?")[0];
        return <>{fileType.endsWith("mp4") && <Mp4 />}</>;
      },
    },
    {
      title: "Tên",
      dataIndex: "title",
      key: "title",
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
      title: "Tình trạng tài liệu môn học",
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
      title: "Phê duyệt tài liệu",
      dataIndex: "verify",
      key: "verify",
      render: (stt: any, record: ILesson) => (
        <div>
          {record.status === 0 ? (
            <div style={{ display: "flex" }}>
              <Button onClick={() => ModalConFirm(record.id, 0)} type="primary">
                Phê duyệt
              </Button>
              <Button
                onClick={() => modal.confirm(config1)}
                className="cancel-btn"
              >
                Huỷ
              </Button>
            </div>
          ) : record.status === 1 ? (
            <span className="gray">Đã phê duyệt</span>
          ) : (
            <span className="gray">Đã huỷ</span>
          )}
        </div>
      ),
    },

    {
      title: "",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Detail">
            <Button
              onClick={() => modal.confirm(seeDetails)}
              // onClick={() => navigate(`/subjectManage/${record.subCode}`)}
              icon={<EyeOutlined />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const resourceColumns = [
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
      title: "Tình trạng tài liệu môn học",
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
      title: "Phê duyệt tài liệu",
      dataIndex: "verify",
      key: "verify",
      render: (stt: any, record: IFile) => (
        <div>
          {record.status === 0 ? (
            <div style={{ display: "flex" }}>
              <Button onClick={() => ModalConFirm(record.id, 1)} type="primary">
                Phê duyệt
              </Button>
              <Button
                onClick={() => modal.confirm(config1)}
                className="cancel-btn"
              >
                Huỷ
              </Button>
            </div>
          ) : record.status === 1 ? (
            <span className="gray">Đã phê duyệt</span>
          ) : (
            <span className="gray">Đã huỷ</span>
          )}
        </div>
      ),
    },

    {
      title: "",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Detail">
            <Button
              onClick={() => modal.confirm(seeDetails)}
              // onClick={() => navigate(`/subjectManage/${record.subCode}`)}
              icon={<EyeOutlined />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="subject sub-manage">
      <BreadcrumbComp
        title="Danh sách tài liệu"
        prevPageTitle="Quản lý môn học"
        prevPage="subjects"
      />
      <div className="top-head">
        <h1>{subData?.subName}</h1>
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
          <Button
            className="default-btn"
            disabled={selectedRowKeys.length === 0 ? true : false}
            style={{ marginLeft: "1rem" }}
          >
            Huỷ phê duyệt
          </Button>
          <Button
            disabled={selectedRowKeys.length === 0 ? true : false}
            style={{ marginLeft: "1rem" }}
            type="primary"
          >
            Phê duyệt
          </Button>
        </div>
      </div>
      <Row>
        <Col className="table-header" span={16}>
          <SelectComp
            style={{ display: "block" }}
            textLabel="Tình trạng tài liệu"
            defaultValue="Tất cả tình trạng"
            dataString={status}
          />
          <SelectComp
            style={{ display: "block" }}
            textLabel="Loại file"
            defaultValue={fileType}
            dataString={type}
            onChange={(e: number) => setFileType(e)}
          />
        </Col>
        <Col className="table-header" span={8}>
          <SearchComponent placeholder="Tìm kết quả theo tên, lớp, môn học,..." />
        </Col>
      </Row>
      {fileType === 0 ? (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      ) : (
        <Table
          rowSelection={rowSelection}
          columns={resourceColumns}
          dataSource={resourceData}
        />
      )}
    </div>
  );
};
