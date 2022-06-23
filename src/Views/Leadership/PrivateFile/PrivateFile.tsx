import { DownloadOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Popover, Row, Space, Table, Tooltip } from "antd";
import modal from "antd/lib/modal";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import "./style.scss";

export const PrivateFile = () => {
  const [form] = Form.useForm();

  const data = [
    {
      key: "1",
      subCode: "2020-6B",
      subName: "Thương mại điện tử",
      teacher: "Nguyễn Văn A",
      file: "15/20",
      status: 0,
      createdAt: "12/02/2021",
    },
    {
      key: "2",
      subCode: "2020-6C",
      subName: "Nguyên lý kế toán",
      teacher: "Nguyễn Văn A",
      file: "15/20",
      status: 1,
      createdAt: "12/02/2021",
    },
    {
      key: "3",
      subCode: "2020-6A",
      subName: "Hệ thống thông tin",
      teacher: "Nguyễn Văn A",
      file: "15/20",
      status: 0,
      createdAt: "12/02/2021",
    },
  ];
  const subject = [
    {
      name: "Thể loại",
      value: "default",
    },
    {
      name: "Mp4",
      value: "mp4",
    },
    {
      name: "Mp3",
      value: "mp3",
    },
    {
      name: "Doc",
      value: "doc",
    },
    {
      name: "Pptx",
      value: "pptx",
    },
    {
      name: "Xlsx",
      value: "xlsx",
    },
  ];
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
    content:
      "Bạn có chắc chắn muốn xóa tệp này khỏi thư viện không?",
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
  const columns = [
    {
      title: "Thể loại",
      dataIndex: "category",
      key: "category",
      sorter: true,
    },
    {
      title: "Tên",
      dataIndex: "nameFile",
      key: "nameFile",
      sorter: true,
    },
    {
      title: "Người chỉnh sửa",
      dataIndex: "editor",
      key: "editor",
      sorter: true,
    },
    {
      title: "Ngày sửa lần cuối",
      dataIndex: "dayEdit",
      key: "dayEdit",
      sorter: true,
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      key: "size",
      sorter: true,
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
                <p>Xem trước</p>
                <p onClick = {() => modal.confirm(modalChangeName)}>Đổi tên</p>
                <p onClick = {() => modal.confirm(downloadFile)}>Tải xuống</p>
                <p onClick = {() => modal.confirm(removeRow)}>Xóa</p>
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


  return (
    <div className="privateFile-page">
      <BreadcrumbComp title="Tất cả các tệp" />
      <div className="header-control">
        <Space className="" size="middle">
          <Tooltip title="Download">
            <Button
              type="link"
              icon={<DownloadOutlined onClick = {() => modal.confirm(downloadFile)} style={{ fontSize: "36px" }} />}
            />
          </Tooltip>
        </Space>
        <div className="line"></div>
        <Button type="primary">Đăng tải</Button>
      </div>
      <Row>
        <Col className="table-header" span={16}>
          <SelectComp
            style={{ display: "block" }}
            defaultValue="Thể loại"
            dataString={subject}
          />
        </Col>
        <Col className="table-header" span={8}>
          <SearchComponent placeholder="Tìm kết quả theo tên, lớp, môn học,..."/>
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
