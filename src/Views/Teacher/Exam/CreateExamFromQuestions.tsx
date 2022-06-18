import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { MinusCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Radio, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { IQuestion } from "../../../redux/reducers/question.reducer";
import { getSubjects, ISubject } from "../../../redux/reducers/subject.reducer";
import {
  getSubjectGroups,
  ISubjectGroup,
} from "../../../redux/reducers/subjectgroup.reducer";
import { AppDispatch } from "../../../redux/store";
import "./style.scss";

const { Option } = Select;

export const CreateExamFromQuestions = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [select, setSelect] = useState(0);
  const [form] = Form.useForm();
  const dataSubGroup = useSelector(
    (state: any) => state.subjectgroup.listSubjectGroup.results
  );
  const dataSub = useSelector(
    (state: any) => state.subject.listSubject.results
  );
  const [answerNum, setAnswerNum] = useState<any[]>([]);
  const [question, setQuestion] = useState<any[]>([]);
  const [quesType, setQuesType] = useState<number>(0);
  const [examType, setExamType] = useState<number>(0);

  useEffect(() => {
    dispatch(getSubjectGroups(999));
    dispatch(getSubjects(999));
  }, []);

  const questionFinish = (values: IQuestion) => {
    console.debug(values);
    setQuestion([...question, values]);
    form.resetFields(["quesName", "quesType", "answers", "correct"]);
  };

  return (
    <div className="sub-exam-bank">
      <BreadcrumbComp
        title="Tạo đề thi từ ngân hàng câu hỏi"
        prevPageTitle="Ngân hàng đề thi"
        prevPage="teacher/exams"
      />
      <Form
        className="new-exam-form"
        form={form}
        onFinish={questionFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Row>
          <h3>
            <b>Phần thông tin:</b>
          </h3>
          <Col span={10}>
            <Form.Item name="examName" label="Tên">
              <Input />
            </Form.Item>
            <Form.Item name="subjectGroup" label="Tổ bộ môn">
              <Select>
                {dataSubGroup?.map((vl: ISubjectGroup) => (
                  <Option key={vl.id} value={vl.id}>
                    {vl.groupName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="examType" label="Hình thức">
              <Radio.Group onChange={(e) => setExamType(e.target.value)}>
                <Radio value={0}>Trắc nghiệm</Radio>
                <Radio value={1}>Tự luận</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={10} offset={4}>
            <Form.Item name="time" label="Thời lượng">
              <Select style={{ width: "100px" }}>
                <Option value={15}>15</Option>
                <Option value={30}>30</Option>
                <Option value={45}>45</Option>
                <Option value={45}>60</Option>
              </Select>{" "}
              phút
            </Form.Item>
            <Form.Item name="subject" label="Môn học">
              <Select>
                {dataSub?.map((vl: ISubject) => (
                  <Option key={vl.id} value={vl.id}>
                    {vl.subName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="body-bank">
        <Form
          className="new-exam-form"
          name="question-form"
          onFinish={questionFinish}
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Row>
            <Col span={12} className="question-detail">
              Câu hỏi 1:
            </Col>
            <Col span={12} className="question-detail"> 
              Câu hỏi 2:
            </Col>
          </Row>
        </Form>
      </div>
      <div className="footer-btn" style={{ justifyContent: "center" }}>
        <Button
          onClick={() => navigate("/teacher/exams")}
          className="default-btn"
        >
          Huỷ
        </Button>
        <Button style={{ marginLeft: "1rem" }} type="primary">
          Lưu và gửi phê duyệt
        </Button>
      </div>
    </div>
  );
};
