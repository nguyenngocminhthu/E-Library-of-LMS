import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import lodash from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { uploadFilesToFirebase } from "../../../../Apis/Firebase";
import { BreadcrumbComp } from "../../../../Components/Breadcrumb";
import { createLesson } from "../../../../redux/reducers/lesson.reducer";
import { setLoading } from "../../../../redux/reducers/loading.reducer";
import { getTopic, ITopic } from "../../../../redux/reducers/topic.reducer";
import { AppDispatch } from "../../../../redux/store";

const { Option } = Select;

export const AddSubject = () => {
  const [form] = Form.useForm();
  const [linkVideo, setLinkVideo] = useState<string>("");
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [data, setData] = useState<ITopic>();
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (params.id) {
      dispatch(getTopic(params.id))
        .unwrap()
        .then((rs: ITopic) => {
          setData(rs);
        });
    }
  }, [params.id]);

  const handleChange = (fileList: any) => {
    setLinkVideo(URL.createObjectURL(fileList.file));
  };

  const onFinish = async (values: any) => {
    dispatch(setLoading(true));
    values.exams.forEach((vl: any) => {
      vl.time = parseFloat(vl.time);
    });
    if (url === "") {
      delete values.url;
      await dispatch(
        uploadFilesToFirebase(values.video.fileList, "Video")
      ).then((rs) => {
        values.video = rs;
        dispatch(setLoading(false));
      });
    } else {
      values.video = values.url;
      delete values.url;
    }

    await dispatch(uploadFilesToFirebase(values.file.fileList, "File")).then(
      (rs) => {
        if (lodash.isArray(rs)) {
          values.file = rs;
        } else {
          values.file = [rs];
        }
        dispatch(setLoading(false));
      }
    );
    dispatch(
      createLesson({
        ...values,
        user: user.id,
        subject: data?.subjectId.id,
        topic: params.id,
      })
    )
      .unwrap()
      .then((rs) => {
        dispatch(setLoading(false));
        navigate(`/teacher/subject/editsubject/${data?.subjectId.id}`);
      });
  };

  return (
    <div className="subDetail teacher-subject">
      <BreadcrumbComp
        title={data?.subjectId.subName}
        prevFirstPageTitle="Danh sách môn giảng dạy"
        prevFirstPage="teacher/subject"
      />
      <div className="box-cover lessons">
        <Form
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          layout="horizontal"
          className="modal-add-role"
          form={form}
        >
          <div className="header-box">
            <div className="text-header">Thông tin chung</div>
          </div>
          <div className="add-subject-container">
            <Form.Item
              name="title"
              label="Tiêu đề"
              rules={[{ required: true }]}
            >
              <Input placeholder="Tiêu đề" />
            </Form.Item>
            <Form.Item name="content" label="Ghi chú">
              <TextArea rows={4} />
            </Form.Item>
          </div>
          <div className="header-box">
            <div className="text-header">Nội dung bài giảng</div>
          </div>
          <div className="add-subject-container">
            <Form.Item
              name="video"
              label="Bài giảng"
              rules={[{ required: url === "" }]}
            >
              <Upload
                maxCount={1}
                beforeUpload={() => false}
                onChange={handleChange}
                accept="video/*"
                onRemove={() => setLinkVideo("")}
              >
                <Button
                  disabled={url !== ""}
                  icon={<UploadOutlined style={{ color: "#f17f21" }} />}
                  className="default-btn icon-custom"
                >
                  Tải lên
                </Button>
              </Upload>
            </Form.Item>

            {linkVideo !== "" && (
              <video
                style={{ marginLeft: "17%" }}
                src={linkVideo}
                width={300}
                height={200}
                controls
              />
            )}
            <Form.Item name="url" label="hoặc Đường link">
              <Input
                onChange={(e: any) => setUrl(e.target.value)}
                disabled={linkVideo !== ""}
                style={{ width: "50%" }}
              />
            </Form.Item>
            <Form.Item name="file" label="Tài nguyên">
              <Upload maxCount={3} beforeUpload={() => false}>
                <Button
                  icon={<UploadOutlined style={{ color: "#f17f21" }} />}
                  className="default-btn icon-custom"
                >
                  Tải lên
                </Button>
              </Upload>
            </Form.Item>
            <Form.List name="exams">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      label={`Đề thi thứ ${index + 1}`}
                      required={false}
                      key={field.key}
                      className="answer-input"
                      wrapperCol={{ span: 18 }}
                    >
                      <Form.Item
                        {...field}
                        wrapperCol={{ span: 24 }}
                        name={[field.name, "exam"]}
                        rules={[{ required: true }]}
                      >
                        <Select
                          style={{ width: "290px", marginRight: "5px" }}
                          placeholder="Chọn đề thi"
                        >
                          {data?.subjectId.bank?.map((item) => (
                            <Option key={item.id} value={item.id}>
                              {item.examName}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...field}
                        wrapperCol={{ span: 24 }}
                        name={[field.name, "time"]}
                        validateTrigger={["onChange", "onBlur"]}
                      >
                        <Input type="number" placeholder="Phút thứ: 9.5 eg" />
                      </Form.Item>
                      <CloseOutlined onClick={() => remove(field.name)} />
                    </Form.Item>
                  ))}
                  <Form.Item
                    wrapperCol={{ span: 24 }}
                    style={{ textAlign: "right" }}
                  >
                    <Button
                      className="add-btn"
                      onClick={() => {
                        add();
                      }}
                    >
                      Thêm bài kiểm tra
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
        </Form>
      </div>
      <div className="action-btn-add">
        <Button
          className="cancel-btn"
          onClick={() =>
            navigate(`/teacher/subject/editsubject/${data?.subjectId.id}`)
          }
        >
          Huỷ
        </Button>
        <Button
          onClick={() => form.submit()}
          type="primary"
          style={{ marginLeft: "1rem" }}
        >
          Lưu
        </Button>
      </div>
    </div>
  );
};
