import { CameraOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Tabs, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import cloudinaryUpload from "../../Apis/Cloudinary";
import { BreadcrumbComp } from "../../Components/Breadcrumb";
import { setLoading } from "../../redux/reducers/loading.reducer";
import { updateProfile, UserState } from "../../redux/reducers/user.reducer";
import { AppDispatch } from "../../redux/store";
import "./Profile.style.scss";

export const Profile = () => {
  const { Option } = Select;
  const { TabPane } = Tabs;
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [disable, setDisable] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const [fileList, setFileList] = useState<any>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://icons-for-free.com/iconfiles/png/512/gallery+image+landscape+mobile+museum+open+line+icon-1320183049020185924.png",
    },
  ]);

  useEffect(() => {
    form.setFieldsValue(user);
    setFileList([
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: `${user.avt}`,
      },
    ]);
  }, []);

  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleFileUpload = (e: any) => {
    const uploadData = new FormData();
    uploadData.append("file", e, "file");
    dispatch(setLoading(true));
    cloudinaryUpload(uploadData).then((rs: any) => {
      dispatch(setLoading(false));

      dispatch(updateProfile({ id: user.id, payload: { avt: rs.url } })).then(
        (rs: any) => {
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(rs.payload));
        }
      );
    });
  };

  const onFinish = (values: UserState) => {
    const value = {
      userName: values.userName,
      gender: values.gender,
      phone: values.phone,
      address: values.address,
      email: values.email,
    };
    dispatch(updateProfile({ id: values.id, payload: value })).then(
      (rs: any) => {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(rs.payload));
        setDisable(true);
      }
    );
  };

  return (
    <div className="profile-page">
      <BreadcrumbComp title="Thông tin người dùng" />
      <div className="tab-notilist">
        <Tabs defaultActiveKey="1" type="card" size={"small"}>
          <TabPane tab="Thông tin cá nhân" key="1">
            <div className="tab-control">
              <Button
                hidden={!disable}
                type="primary"
                onClick={() => {
                  setDisable(!disable);
                }}
              >
                Chỉnh sửa
              </Button>
            </div>
            <div className="box-cover">
              <div className="header-box">
                <p className="text-header">Thông tin chung</p>
              </div>
              <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                name="profile-form"
                layout="horizontal"
                form={form}
                onFinish={onFinish}
              >
                <Row style={{ padding: "16px" }}>
                  <Col span={7}>
                    <Form.Item name="avt">
                      <ImgCrop
                        rotate
                        shape="round"
                        onModalOk={(file) => handleFileUpload(file)}
                      >
                        <Upload
                          showUploadList={{
                            showPreviewIcon: false,
                            showRemoveIcon: false,
                          }}
                          listType="picture-card"
                          fileList={fileList}
                          onChange={({ fileList: newFileList }) => {
                            setFileList(newFileList);
                          }}
                          maxCount={1}
                          onPreview={onPreview}
                        >
                          <CameraOutlined />
                        </Upload>
                      </ImgCrop>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Mã người dùng" name="id">
                      <Input disabled={disable} />
                    </Form.Item>
                    <Form.Item label="Giới tính" name="gender">
                      <Select disabled={disable} style={{ width: 120 }}>
                        <Option value={0}>Nam</Option>
                        <Option value={1}>Nữ</Option>
                        <Option value={2}>Other</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Vai trò" name="role">
                      <Input disabled={disable} />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                      <Input disabled={disable} />
                    </Form.Item>
                  </Col>
                  <Col span={8} offset={1}>
                    <Form.Item label="Tên người dùng" name="userName">
                      <Input disabled={disable} />
                    </Form.Item>
                    <Form.Item label="Số điện thoại" name="phone">
                      <Input disabled={disable} />
                    </Form.Item>
                    <Form.Item label="Địa chỉ" name="address">
                      <TextArea disabled={disable} rows={4} />
                    </Form.Item>
                  </Col>
                </Row>
                <div hidden={disable} className="btn-center">
                  <Button
                    className="default-btn"
                    onClick={() => setDisable(true)}
                  >
                    Hủy
                  </Button>
                  <Button type="primary" onClick={() => form.submit()}>
                    Lưu
                  </Button>
                </div>
              </Form>
            </div>
          </TabPane>
          <TabPane tab="Thay đổi mật khẩu" key="2">
            <div className="box-cover">
              <div className="header-box">
                <p className="text-header">Thay đổi mật khẩu</p>
              </div>
              <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                name="profile-form"
                layout="horizontal"
                form={form}
              >
                <Row style={{ padding: "16px" }}>
                  <Col span={15} offset={1}>
                    <Form.Item
                      label="Mật khẩu hiện tại"
                      name="passwordCurrent"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      label="Mật khẩu mới"
                      name="newPassword"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu mới!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      label="Nhập lại mật khẩu mới"
                      name="renewPassword"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập lại mật khẩu mới!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>
                  <Col span={6} offset={2}>
                    <Row>
                      <Col span={2}>
                        <InfoCircleOutlined className="waring-passwod" />
                      </Col>
                      <Col span={21} offset={1}>
                        Mật khẩu phải có ít nhất 8 ký tự bao gồm:
                        <ul>
                          <li>Chữ cái</li>
                          <li>Số</li>
                          <li>Chữ cái viết hoa </li>
                          <li>Chữ cái viết thường</li>
                          <li>Các ký tự đặc biệt như ! ~ / ) * ^ $ &...</li>
                        </ul>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <div className="btn-center">
                  <Button className="default-btn">Hủy</Button>
                  <Button type="primary" onClick={() => form.submit()}>
                    Lưu
                  </Button>
                </div>
              </Form>
            </div>
          </TabPane>
        </Tabs>
      </div>
      <ToastContainer />
    </div>
  );
};
