import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import lodash from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { uploadFilesToFirebase } from "../../../../Apis/Firebase";
import { BreadcrumbComp } from "../../../../Components/Breadcrumb";
import { ISelect, SelectComp } from "../../../../Components/Select";
import { IClass } from "../../../../redux/reducers/classes.reducer";
import { createLesson } from "../../../../redux/reducers/lesson.reducer";
import { setLoading } from "../../../../redux/reducers/loading.reducer";
import {
  getSubject,
  ISubject,
} from "../../../../redux/reducers/subject.reducer";
import { getTopic, ITopic } from "../../../../redux/reducers/topic.reducer";
import { AppDispatch } from "../../../../redux/store";

export const AddSubject = () => {
  const { Dragger } = Upload;
  const { Option } = Select;
  const [form] = Form.useForm();
  const [linkVideo, setLinkVideo] = useState<string>("");
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [classSelect, setClassSelect] = useState<ISelect[]>();
  const [data, setData] = useState<ITopic>();
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (params.id) {
      dispatch(getTopic(params.id))
        .unwrap()
        .then((rs: ITopic) => {
          setData(rs);
          dispatch(getSubject(rs.subjectId.id))
            .unwrap()
            .then((rs: ISubject) => {
              let option: any[] = [];

              rs.classes.forEach((vl: IClass) => {
                option.push({ name: vl.classCode, value: vl.id });
              });
              setClassSelect(option);
            });
        });
    }
  }, [params.id]);

  const handleChange = (fileList: any) => {
    setLinkVideo(URL.createObjectURL(fileList.file));
  };

  const onFinish = async (values: any) => {
    dispatch(setLoading(true));
    if (url === "") {
      delete values.url;
      await dispatch(
        uploadFilesToFirebase(values.video.fileList, "Video")
      ).then((rs) => {
        values.video = rs;
        dispatch(setLoading(false));
      });
    } else {
      delete values.video;

      dispatch(setLoading(false));
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
        navigate(`/teacher/subject/editsubject/${data?.subjectId.id}`);
      });
  };

  return (
    <div className="subDetail teacher-subject">
      <BreadcrumbComp
        title="Thương mại điện tử"
        prevFirstPageTitle="Danh sách môn giảng dạy"
        prevFirstPage="teacher/subject"
      />
      <div className="box-cover">
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
              className="download-file"
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
            <Form.Item
              name="url"
              label="hoặc Đường link"
              className="download-file"
            >
              <Input
                onChange={(e: any) => setUrl(e.target.value)}
                disabled={linkVideo !== ""}
              />
            </Form.Item>
            <Form.Item name="file" label="Tài nguyên" className="download-file">
              <Upload maxCount={3} beforeUpload={() => false}>
                <Button icon={<UploadOutlined style={{ color: "#f17f21" }} />}>
                  Tải lên
                </Button>
              </Upload>
            </Form.Item>
          </div>
          <div className="header-box">
            <div className="text-header">Phân công bài giảng</div>
          </div>
          <div className="add-subject-container">
            <Form.Item
              label="Chọn lớp học"
              name="classes"
              rules={[{ required: true }]}
              className="lesson-select"
            >
              <SelectComp
                mode="multiple"
                allowClear={true}
                disabled={classSelect === undefined}
                style={{ display: "block" }}
                dataString={classSelect}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className="action-btn-add">
        <Button
          className="cancel-btn"
          onClick={() => navigate(`/teacher/subject/editsubject/${params.id}`)}
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
