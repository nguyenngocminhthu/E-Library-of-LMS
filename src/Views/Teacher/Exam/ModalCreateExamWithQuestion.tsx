import { Checkbox, Col, Form, Input, Modal, Row, Select } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox/Checkbox";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBankWithQuestion } from "../../../redux/reducers/banks.reducer";
import { setLoading } from "../../../redux/reducers/loading.reducer";
import { ISubject } from "../../../redux/reducers/subject.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import "./Exam.style.scss";

export const ModalCreateExamWithQuestion = (props: any) => {
  const dispatch: AppDispatch = useDispatch();
  const subjects = useSelector(
    (state: any) => state.subject.listSubject.results
  );
  const { Option } = Select;
  const { isModalOpen, setIsModalOpen } = props;
  const [form] = Form.useForm();
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const [isFinal, setIsFinal] = useState<boolean>(false);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onFinish(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields();
    }
  }, [isModalOpen]);

  const onFinish = async (values: any) => {
    dispatch(setLoading(true));
    let rs: any = await dispatch(
      createBankWithQuestion({
        ...values,
        user: user.id,
        status: isFinal ? 0 : 1,
        isFinal,
        fileType: 0,
      })
    );
    dispatch(setLoading(false));
    if (!rs.payload.code) {
      setIsModalOpen(false);
    }
  };
  const onCheck = (e: CheckboxChangeEvent) => {
    setIsFinal(true);
  };

  return (
    <Modal
      title="Tạo mới đề thi từ ngân hàng câu hỏi"
      visible={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width="50%"
      okText="Lưu và gửi phê duyệt"
      cancelText="Huỷ"
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        className="modal-add-role create-exam-question"
        layout="horizontal"
        form={form}
        style={{ textAlign: "left" }}
      >
        <Form.Item
          name="subject"
          label="Chọn lớp học"
          rules={[{ required: true, message: "Hãy chọn lớp học" }]}
        >
          <Select defaultValue="">
            <Option value="">Chọn lớp học</Option>
            {subjects.map((vl: ISubject) => (
              <Option value={vl.id}>{vl.subName}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="examName"
          label="Tên đề thi"
          rules={[{ required: true, message: "Hãy nhập tên đề thi" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="isFinal" label="Loại đề thi" valuePropName="isFinal">
          <Checkbox onChange={onCheck} checked={isFinal}>
            Đề thi cuối kì
          </Checkbox>
        </Form.Item>
        <Form.Item
          name="time"
          label="Thời gian"
          rules={[{ required: true, message: "Hãy chọn thời gian" }]}
        >
          <Select className="small-input" defaultValue="">
            <Option value="">Chọn thời gian</Option>
            <Option value={"15"}>15 Phút</Option>
            <Option value={"30"}>30 Phút</Option>
            <Option value={"45"}>45 Phút</Option>
            <Option value={"60"}>60 Phút</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Số câu hỏi" rules={[{ required: false }]}>
          <Row>
            <Col span={8} className="display-flex">
              <Form.Item
                name="difficultLevel"
                label="Khó"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Input className="small-input" />
              </Form.Item>
            </Col>
            <Col span={8} className="display-flex">
              <Form.Item
                name="mediumLevel"
                label="Trung Bình"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Input className="small-input" />
              </Form.Item>
            </Col>
            <Col span={8} className="display-flex">
              <Form.Item
                name="easyLevel"
                label="Dễ"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Input className="small-input" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};
