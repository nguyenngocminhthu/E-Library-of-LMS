import { CameraOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import cloudinaryUpload from "../../../Apis/Cloudinary";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { setLoading } from "../../../redux/reducers/loading.reducer";
import { updateProfile } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import "./SystemSetting.style.scss";

export const Information = () => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [disable, setDisable] = useState(false);
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

  useEffect(() => {
    form.setFieldsValue(user);
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

  return (
    <div className="information-system-page">
      <BreadcrumbComp
        title="Thông tin hệ thống"
        prevFirstPageTitle="Cài đặt hệ thống"
        prevFirstPage="setting"
      />
      <div className="tab-control">
        <Button type="primary" onClick={() => setDisable(!disable)}>
          <FormOutlined />
          Chỉnh sửa
        </Button>
      </div>
      <div className="tab-notilist">
        <div className="box-cover">
          <div className="header-box">
            <p className="text-header">Thông tin hệ thống thư viện</p>
          </div>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            name="profile-form"
            layout="horizontal"
            form={form}
          >
            <Row style={{ padding: "16px" }}>
              <Col span={6}>
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
                      disabled={disable}
                    >
                      <CameraOutlined />
                    </Upload>
                  </ImgCrop>
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  label="Mã trường học"
                  name="schoolCode"
                  rules={[{ required: true }]}
                >
                  <Input disabled={disable} />
                </Form.Item>
                <Form.Item
                  label="Tên trường học"
                  name="schoolName"
                  rules={[{ required: true }]}
                >
                  <Input disabled={disable} />
                </Form.Item>
                <Form.Item
                  label="Website"
                  name="website"
                  rules={[{ required: true }]}
                >
                  <Input disabled={disable} />
                </Form.Item>
              </Col>
              <Col span={8} offset={1}>
                <Form.Item
                  label="Loại trường"
                  name="schoolType"
                  rules={[{ required: true }]}
                >
                  <Select disabled={disable}>
                    <Option value={0}>Dân lập</Option>
                    <Option value={1}>Công lập</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Hiệu trưởng"
                  name="headmaster"
                  rules={[{ required: true }]}
                >
                  <Input disabled={disable} />
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ padding: "16px" }}>
              <Col span={5}></Col>
              <Col span={9} offset={1}>
                <Form.Item
                  label="Tên hệ thống thư viện"
                  name="libraryName"
                  rules={[{ required: true }]}
                >
                  <Input disabled={disable} />
                </Form.Item>
                <Form.Item
                  label="Địa chỉ truy cập"
                  name="adressConect"
                  rules={[{ required: true }]}
                >
                  <Input disabled={disable} />
                </Form.Item>
              </Col>
              <Col span={8} offset={1}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[{ required: true }]}
                >
                  <Input disabled={disable} />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true }]}
                >
                  <Input disabled={disable} />
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ padding: "16px" }}>
              <Col span={5}></Col>
              <Col span={9} offset={1}>
                <Form.Item
                  label="Ngôn ngữ xác định"
                  name="language"
                  rules={[{ required: true }]}
                >
                  <Select disabled={disable}>
                    <Option value={0}>Tiếng Việt</Option>
                    <Option value={1}>Tiếng Anh</Option>
                    <Option value={2}>Tiếng Trung Quốc</Option>
                    <Option value={3}>Tiếng Pháp</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Niên khóa mặc định"
                  name="schoolYear"
                  rules={[{ required: true }]}
                >
                  <Select disabled={disable}>
                    <Option value={0}>2019-2020</Option>
                    <Option value={1}>2020-2021</Option>
                    <Option value={2}>2021-2022</Option>
                    <Option value={3}>2022-2023</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} offset={1}></Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Information;
