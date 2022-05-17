import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, Radio, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { getBank, IBanks } from "../../../redux/reducers/banks.reducer";
import { getSubjectGroups } from "../../../redux/reducers/subjectgroup.reducer";
import { AppDispatch } from "../../../redux/store";
import { ISubjectGroup } from "../../../redux/reducers/subjectgroup.reducer";
import "./style.scss";
import { getSubjects, ISubject } from "../../../redux/reducers/subject.reducer";

const { Option } = Select;

export const CreateExam = () => {
  const dispatch: AppDispatch = useDispatch();
  const [select, setSelect] = useState(0);
  const [data, setData] = useState<IBanks>();
  const [form] = Form.useForm();
  const dataSubGroup = useSelector(
    (state: any) => state.subjectgroup.listSubjectGroup.results
  );
  const dataSub = useSelector(
    (state: any) => state.subject.listSubject.results
  );

  useEffect(() => {
    dispatch(getSubjectGroups(999));
    dispatch(getSubjects(999));
  }, []);

  const handleSelect = (idx: number) => {
    setSelect(idx);
  };

  return (
    <div className="sub-exam-bank">
      <BreadcrumbComp
        title="Tạo đề thi mới"
        prevPageTitle="Ngân hàng đề thi"
        prevPage="teacher/exams"
      />
      <Form
        className="new-exam-form"
        form={form}
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
            <Form.Item name="examType" label="Hình thức">
              <Radio.Group>
                <Radio value={0}>Trắc nghiệm</Radio>
                <Radio value={1}>Tự luận</Radio>
              </Radio.Group>
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

        <div className="body-bank">
          <Row>
            <Col span={6} className="question-number">
              <div style={{ marginBottom: "1rem" }}>Phần câu hỏi - đáp án:</div>
              <Form.List
                name="question"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 2) {
                        return Promise.reject(new Error("Ít nhất 2 câu hỏi"));
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item required={false} key={field.key}>
                        <div
                          className={
                            select === index ? "answer true" : "answer"
                          }
                          onClick={() => handleSelect(index)}
                        >
                          <Form.Item {...field}>Câu {index + 1}</Form.Item>
                          {fields.length > 1 ? (
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => remove(field.name)}
                            />
                          ) : null}
                        </div>
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        className="default-btn"
                        type="default"
                        onClick={() => add()}
                        style={{ width: "100%" }}
                      >
                        Thêm câu hỏi
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
            <Col span={18} className="question-detail">
              <Form.Item name=""></Form.Item>
              <h3>
                Câu hỏi {select + 1}: {data?.question[select].quesName}
              </h3>
              <Radio.Group value={data?.question[select].correct[0]}>
                <Space direction="vertical">
                  {data?.question[select].answers.map((vl, idx) => (
                    <Radio value={idx}>{vl}</Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};
