import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import modal from "antd/lib/modal";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BreadcrumbComp } from "../../../../Components/Breadcrumb";
import SearchComponent from "../../../../Components/SearchComponent";
import { SelectComp } from "../../../../Components/Select";
import "../style.scss";

const { Option } = Select;

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
  const [radioChangeComponent, setRadioChangeComponent] = useState();

  const handleModal = () => {
    const addNewLecture = {
      title: "Thêm bài giảng mới",
      width: "40%",
      className: "cancel-form file-modal",
      forceRender: true,
      content: (
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          name="cancel-form"
          layout="horizontal"
          form={form}
        >
          <Form.Item name="fileName" label="Tên bài giảng">
            <div>Thương mại điện tử</div>
          </Form.Item>
          <Form.Item name="chooseTopic" label="Chọn chủ đề">
            <Select disabled={disable} defaultValue="Chọn chủ đề">
              <Option value={0}>Văn hóa xã hội</Option>
              <Option value={1}>Sample</Option>
            </Select>
          </Form.Item>
          <Form.Item name="fileNameTitle" label="Tiêu đề bài giảng">
            <Input />
          </Form.Item>
          <Form.Item name="chooseFile" label="Chọn tệp">
            <Radio.Group onChange={(e) => handleChange(e)} className="teacher-subject">
              <Radio value={0}>Tải tệp lên</Radio>
              <Radio value={1}>Bài giảng</Radio>
            </Radio.Group>
          </Form.Item>
            <Form.Item name='file'>
              {form.getFieldValue('file') === 0 ? <div>0</div> : <div>1</div>}
              {console.debug(form.getFieldValue('file'))}
            </Form.Item>
        </Form>
      ),
      okText: "Lưu",
      cancelText: "Huỷ",
    };
  }


  const handleChange = (e: any) => {
    setRadioChangeComponent(e.target.value)
    form.setFieldsValue({file: e.target.value})
  };

  const [form] = Form.useForm();
  const [disable, setDisable] = useState(false);


 
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
      title: "Ngày gửi phê duyệt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Người phê duyệt",
      dataIndex: "approver",
      key: "approver",
    },
    {
      title: "Tình trạng phê duyệt",
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
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      render: (note: string) => {return <div style={{ color: '#ED2025'}}>{note}</div>}
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
      fileName: "Thương mại điện tử.mp4",
      fileType: "Bài giảng",
      createdAt: "12/02/2021",
      approver: "Admin",
      status: 0,
      note: "Không phù hợp giáo trình",
    },
    {
      key: "2",
      fileName: "Nguyên lý kế toán.docx",
      fileType: "Bài giảng",
      createdAt: "12/02/2021",
      approver: "Admin",
      status: 0,
      note: "",
    },
    {
      key: "3",
      fileName: "Hệ thống thông tin.xlsx",
      fileType: "Bài giảng",
      createdAt: "12/02/2021",
      approver: "Admin",
      status: 0,
      note: "",
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
    <div className="subject sub-manage teacher-subject">
      <BreadcrumbComp
        title="Danh sách tài liệu"
        prevPageTitle="Danh sách môn giảng dạy"
        prevPage="teacher/subject"
      />
      <div className="top-head">
        <h1>Thương mại điện tử</h1>
        <div style={{ display: "flex" }}>
          <Space className="" size="middle">
            <Tooltip title="Delete">
              <Button
                type="link"
                disabled={selectedRowKeys.length === 0 ? true : false}
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Space>
          <div className="line"></div>
          <Button
            className="default-btn"
            style={{ marginLeft: "1rem" }}
          >
            Tải xuống
          </Button>
          <Button
            style={{ marginLeft: "1rem" }}
            type="primary"
            onClick={() => handleModal()}
          >
            Thêm mới
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
