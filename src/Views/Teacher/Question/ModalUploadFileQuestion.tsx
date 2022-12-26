import { QuestionCircleOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  message,
  Modal,
  Select,
  Upload,
  UploadProps,
} from "antd";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { setLoading } from "../../../redux/reducers/loading.reducer";
import { createQuestions } from "../../../redux/reducers/question.reducer";
import { getSubjects, ISubject } from "../../../redux/reducers/subject.reducer";
import { ISubjectGroup } from "../../../redux/reducers/subjectgroup.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import guideUploadQuestion from "../../../shared/img/exampleQuestionData.png";
import "./Question.style.scss";

interface IQuestionExcel {
  quesName: string;
  quesType: number;
  answers: [];
  correct: [];
  level: number;
  examType: number;
}

export const ModalUploadFileQuestion = (props: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { Option } = Select;
  const { isModalOpen, setIsModalOpen } = props;
  const [form] = Form.useForm();
  const user: UserState = JSON.parse(localStorage.getItem("user") || "{}");
  const dataSubGroup = useSelector(
    (state: any) => state.subjectgroup.listSubjectGroup.results
  );
  const [dataSub, setDataSub] = useState<ISubject[]>([]);
  const [excelRows, setExcelRows] = useState<any>([]);

  const handleOk = () => {
    if (excelRows.length) {
      form.setFieldsValue({
        fileName: "excel",
      });
    } else {
      form.setFieldsValue({
        fileName: "",
      });
    }
    form
      .validateFields()
      .then((values) => {
        console.debug(values);
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
    } else {
      setDataSub([]);
    }
  }, [isModalOpen]);

  const onFinish = async (values: any) => {
    dispatch(setLoading(true));
    if (excelRows.length) {
      const extraInfo: { quesType: number; examType: number } = {
        quesType: 0,
        examType: 0,
      };
      let tempRows = cloneDeep(excelRows).filter(
        (item: any) => item && item.length === 8
      );
      tempRows.shift();
      const questions: IQuestionExcel[] = tempRows.map((item: any) => {
        let correct = [0];
        switch (item[6]) {
          case "B":
            correct = [1];
            break;
          case "C":
            correct = [2];
            break;
          case "D":
            correct = [3];
            break;
        }

        const answers = [];
        for (let i = 2; i <= 5; i++) {
          if (item[i] !== "") {
            answers.push(item[i]);
          }
        }

        return {
          quesName: item[1],
          answers,
          correct,
          level: item[7],
          ...extraInfo,
        };
      });

      const body = {
        questions,
        user: user.id,
        subject: values.subject,
        subjectgroup: values.subjectgroup,
      };
      dispatch(createQuestions(body));
    }
    setIsModalOpen(false);
  };

  const info = () => {
    Modal.info({
      title: "Hướng dẫn chọn file",
      content: (
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <p>Chọn file excel có những cột tương ứng như hình bên:</p>
            <p>STT là số thứ tự</p>
            <p>Cau hoi là nội dung câu hỏi</p>
            <p>A là đáp án A</p>
            <p>B là đáp án B</p>
            <p>C là đáp án C</p>
            <p>D là đáp án D</p>
            <p>Dap an là đáp án đúng (A B C hoặc D)</p>
            <p>Muc do là độ khó câu hỏi (0: Dễ, 1: Trung bình, 2: Khó)</p>
          </div>
          <img className="img-in-modal" src={guideUploadQuestion} alt="logo" />
        </div>
      ),
      className: "guide-form",
      onOk() {},
    });
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
      setExcelRows([]);
      message.error("File rỗng");
    }
  };

  const propsUpload: UploadProps = {
    beforeUpload: (file) => {
      const isXslx =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isXslx) {
        setExcelRows([]);
        message.error("Chỉ chấp nhận file excel!");
        return false;
      }
      const isLt50MB = file.size / 1024 / 1024 < 50;
      if (!isLt50MB) {
        setExcelRows([]);
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
    showUploadList: true,
    maxCount: 1,
    onChange: (info) => {},
  };

  const handleSelect = (e: any) => {
    dispatch(getSubjects({ limit: 999, subGroup: e }))
      .unwrap()
      .then((rs) => {
        console.debug(rs);
        setDataSub(rs.results);
      });
  };

  return (
    <Modal
      title="Tạo mới đề thi từ ngân hàng câu hỏi"
      visible={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width="50%"
      okText="Import"
      cancelText="Huỷ"
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        className="modal-add-role"
        layout="horizontal"
        form={form}
        style={{ textAlign: "left" }}
      >
        <Form.Item
          name="fileName"
          label="Tệp đính kèm"
          rules={[{ required: true, message: "Chọn file" }]}
        >
          <div className="download-file">
            <Upload {...propsUpload}>
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
          </div>
          <span className="note-span">Chỉ hỗ trợ tệp excel (.xlsx)</span>
        </Form.Item>
        <Form.Item
          name="subjectgroup"
          rules={[{ required: true, message: "Chọn tổ bộ môn" }]}
          label="Chọn tổ bộ môn"
        >
          <Select onChange={(e: any) => handleSelect(e)}>
            {dataSubGroup?.map((vl: ISubjectGroup) => (
              <Option key={vl.id} value={vl.id}>
                {vl.groupName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="subject"
          label="Chọn môn học"
          rules={[{ required: true, message: "Chọn môn học" }]}
        >
          <Select disabled={!dataSub.length}>
            {dataSub?.map((vl: ISubject) => (
              <Option key={vl.id} value={vl.id}>
                {vl.subName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="createBy" label="Được tạo bởi">
          <div>Gv. {user.userName}</div>
        </Form.Item>
      </Form>
    </Modal>
  );
};
