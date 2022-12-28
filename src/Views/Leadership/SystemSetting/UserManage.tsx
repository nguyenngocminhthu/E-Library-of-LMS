import {
  PlusOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { UploadProps } from "antd/es/upload/interface";
import modal from "antd/lib/modal";
import Upload from "antd/lib/upload/Upload";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import {
  createUser,
  deleteUser,
  getUsers,
  UserState,
} from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import guideUploadListUser from "../../../shared/img/exampleUserList.png";
import { ReactComponent as Edit } from "../../../shared/img/icon/edit.svg";
import { ReactComponent as Trash } from "../../../shared/img/icon/trash.svg";
import { ModalFileExcel } from "./ModalFileExcel";
import "./SystemSetting.style.scss";

export const UserManage = () => {
  const { Option } = Select;
  const { Title } = Typography;
  const dispatch: AppDispatch = useDispatch();
  const [data, setData] = useState<UserState[]>([]);
  const [form] = Form.useForm();
  const [rowSelected, setRowSelected] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [filter, setFilter] = useState<any>({ limit: 999 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [excelRows, setExcelRows] = useState<any>([]);

  useEffect(() => {
    dispatch(getUsers(filter))
      .unwrap()
      .then((rs: any) => {
        setData(rs.results);
      });
  }, [filter]);

  const roleMenu = [
    {
      name: "Tất cả",
      value: "",
    },
    {
      name: "Quản trị viên",
      value: "leadership",
    },
    {
      name: "Sinh viên",
      value: "student",
    },
    {
      name: "Giảng viên",
      value: "teacher",
    },
  ];

  const columns = [
    {
      title: "Mã người dùng",
      dataIndex: "userCode",
      key: "id",
    },
    {
      title: "Tên người dùng",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Lần cập nhật cuối",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: any) => {
        return moment(updatedAt).format("DD/MM/YYYY");
      },
    },
    {
      title: "",
      key: "action",
      width: 100,
      render: (text: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa">
            <Button icon={<Edit />} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              icon={
                <Trash
                  onClick={() => {
                    modal.confirm(deleteRow);
                    setRowSelected(record.id);
                  }}
                />
              }
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const onFinish = (values: any) => {
    if (values.role !== "student") {
      delete values.userCode;
    } else if (values.userCode === undefined) {
      message.error("Hãy nhập MSSV");
    }
    dispatch(createUser(values)).then(() => {
      dispatch(getUsers(filter))
        .unwrap()
        .then((rs: any) => {
          setData(rs.results);
          form.resetFields();
        });
    });
  };

  const deleteRow = {
    title: "Xóa vai trò",
    content:
      "Xác nhận muốn phê duyệt đề thi này và các thông tin bên trong? Sau khi phê duyệt sẽ không thể hoàn tác.",
    okText: "Xác nhận",
    cancelText: "Huỷ",
    onOk: () =>
      dispatch(deleteUser(rowSelected)).then(() => {
        dispatch(getUsers(filter))
          .unwrap()
          .then((rs: any) => {
            setData(rs.results);
          });
      }),
  };

  const modalAdd = {
    title: "Thêm người dùng mới",
    width: "40%",
    className: "modal-add-role",
    content: (
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        name="profile-form"
        layout="horizontal"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item label="Tên vai trò" name="role" rules={[{ required: true }]}>
          <Select>
            <Option value={"leadership"}>Quản trị viên</Option>
            <Option value={"teacher"}>Giảng viên</Option>
            <Option value={"student"}>Sinh viên</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Tên người dùng"
          name="userName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="MSSV" name="userCode">
          <Input maxLength={8} />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    ),
    okText: "Lưu",
    cancelText: "Huỷ",
    onOk: () => form.submit(),
    onCancel: () => form.resetFields(),
  };

  const handleFilter = (e: any) => {
    if (e !== "") {
      setFilter({ ...filter, role: e });
    } else {
      delete filter.role;
      setFilter({ ...filter });
    }
  };

  const processExcelFile = (data: any) => {
    const workbook = XLSX.read(data, { type: "binary" });
    const wsname = workbook.SheetNames[0];
    const ws = workbook.Sheets[wsname];
    const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
    console.log(dataParse);
    if (dataParse.length) {
      setExcelRows(dataParse);
    } else {
      message.error("File rỗng");
    }
  };

  const props: UploadProps = {
    beforeUpload: (file) => {
      const isXslx =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isXslx) {
        message.error("Chỉ chấp nhận file excel!");
        return false;
      }
      const isLt50MB = file.size / 1024 / 1024 < 50;
      if (!isLt50MB) {
        message.error("Chỉ chấp nhận file nhỏ hơn 50MB!");
        return false;
      }
      if (typeof FileReader !== "undefined") {
        const reader = new FileReader();
        reader.onload = function (e) {
          processExcelFile(e.target?.result);
        };
        reader.readAsBinaryString(file);
      }
      return false;
    },
    showUploadList: false,
    maxCount: 1,
    onChange: (info) => {},
  };

  useEffect(() => {
    if (excelRows.length) {
      if (
        excelRows[0] &&
        excelRows[0].length === 5 &&
        excelRows[0].includes("STT") &&
        excelRows[0].includes("TEN") &&
        excelRows[0].includes("MS") &&
        excelRows[0].includes("SDT") &&
        excelRows[0].includes("GIOITINH")
      ) {
        setIsModalOpen(true);
      } else {
        message.error("File excel sai định dạng!");
      }
    }
  }, [excelRows]);

  const info = () => {
    Modal.info({
      title: "Hướng dẫn chọn file",
      content: (
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <p>Chọn file excel có những cột tương ứng như hình bên:</p>
            <p>STT là số thứ tự</p>
            <p>TEN là tên người dùng</p>
            <p>MS là mã số người dùng</p>
            <p>Mã giáo viên có 2 chữ GV ở đầu mã</p>
            <p>SDT là số điện thoại cá nhân của người dùng</p>
            <p>GIOITINH là giới tính của người dùng (Nam/Nu)</p>
          </div>
          <img className="img-in-modal" src={guideUploadListUser} alt="logo" />
        </div>
      ),
      className: "guide-form",
      onOk() {},
    });
  };

  return (
    <div className="role-manage-page">
      <BreadcrumbComp
        title="Quản lý người dùng"
        prevFirstPageTitle="Cài đặt hệ thống"
        prevFirstPage="setting"
      />
      <div className="title-page">
        <Title ellipsis level={5}>
          Danh sách người dùng trên hệ thống
        </Title>
        <div className="title-page">
          <Upload {...props}>
            <Button
              icon={<UploadOutlined />}
              className="default-btn icon-custom"
            >
              Tải lên danh sách
            </Button>
          </Upload>
          <QuestionCircleOutlined
            style={{ marginRight: "10px" }}
            onClick={() => {
              info();
            }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => modal.confirm(modalAdd)}
          >
            Thêm mới
          </Button>
        </div>
      </div>
      <Row>
        <Col className="table-header" span={16}>
          <SelectComp
            style={{ display: "block" }}
            defaultValue="Chọn vai trò"
            dataString={roleMenu}
            onChange={(e: any) => handleFilter(e)}
          />
        </Col>
        <Col className="table-header" span={8}>
          <SearchComponent placeholder="Tìm kết quả theo mã người dùng, tên" />
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} />
      <ModalFileExcel
        excelRows={excelRows}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></ModalFileExcel>
    </div>
  );
};

export default UserManage;
