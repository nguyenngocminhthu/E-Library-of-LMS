import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import modal from "antd/lib/modal";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import "./style.scss";

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

export const ListFile = () => {
  const navigate = useNavigate();
  const params = useParams<{ idSub: string }>();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();
  // const dispatch: AppDispatch = useDispatch();
  // const [data, setData] = useState<ISubject>();

  // useEffect(() => {
  //   if (params.idSub) {
  //     dispatch(getSubject(params.idSub))
  //       .unwrap()
  //       .then((rs: ISubject) => {
  //         setData(rs);
  //         console.debug('teacher: ', rs)
  //       })
  //       .catch((e: any) => {
  //         console.debug("e: ", e);
  //       });
  //   }
  // }, []);

  const config = {
    title: "Phê duyệt",
    className: "file-modal",
    content:
      "Xác nhận muốn phê duyệt đề thi này và các thông tin bên trong? Sau khi phê duyệt sẽ không thể hoàn tác.",
    okText: "Xác nhận",
    cancelText: "Huỷ",
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
        </Form.Item >
        <Form.Item name="cbnotification" label=" ">
          <Checkbox className="cb-style">Gửi thông báo cho người tạo</Checkbox>
        </Form.Item>
      </Form>
    ),
    okText: "Lưu",
    cancelText: "Huỷ",
  };
  const columns = [
    {
      title: "Tên tài liệu",
      dataIndex: "fileName",
      key: "fileName",
      sorter: (a: any, b: any) => a.fileName.length - b.fileName.length,
    },
    {
      title: "Phân loại",
      dataIndex: "fileType",
      key: "fileType",
    },
    {
      title: "Giảng viên",
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: "Ngày gửi",
      dataIndex: "createdAt",
      key: "createdAt",
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
      render: (stt: any, record: any) => (
        <div>
          {record.status === 0 ? (
            <div style={{ display: "flex" }}>
              <Button onClick={() => modal.confirm(config)} type="primary">
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

  const data = [
    {
      key: "1",
      fileName: "2020-6B",
      fileType: "Bài giảng",
      teacher: "Nguyễn Văn A",
      status: 0,
      createdAt: "12/02/2021",
    },
    {
      key: "2",
      fileName: "2020-6C",
      fileType: "Tài nguyên",
      teacher: "Nguyễn Văn A",
      status: 1,
      createdAt: "12/02/2021",
    },
    {
      key: "3",
      fileName: "2020-6A",
      fileType: "Bài giảng",
      teacher: "Nguyễn Văn A",
      status: 2,
      createdAt: "12/02/2021",
    },
  ];
  const downloadFile = {
    title: "Tải xuống tệp",
    className: "modal-change-name",
    content:
      "Xác nhận muốn tải xuống 25 tệp đã chọn. Các file đã chọn sẽ được lưu dưới dạng .rar.",
    okText: "Xác nhận",
    cancelText: "Huỷ",
  };

  const seeDetails = {
    title: "Tổng quan về Thương mại Điện tử ở Việt Nam",
    className: "modal-delete",
    width: "90%",
    content: <div></div>,
  };

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="subject sub-manage">
      <BreadcrumbComp
        title="Danh sách tài liệu"
        prevPageTitle="Quản lý môn học"
        prevPage="subjects"
      />
      <div className="top-head">
        <h1>{params.idSub}</h1>
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
        </Col>
        <Col className="table-header" span={8}>
          <SearchComponent placeholder="Tìm kết quả theo tên, lớp, môn học,..."/>
        </Col>
      </Row>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};
