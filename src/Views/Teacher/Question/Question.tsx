import {
  DownloadOutlined,
  LinkOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Collapse,
  Form,
  Radio,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import modal from "antd/lib/modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import { IBanks } from "../../../redux/reducers/banks.reducer";
import { getQuestions } from "../../../redux/reducers/question.reducer";
import { getSubjects, ISubject } from "../../../redux/reducers/subject.reducer";
import {
  getSubjectGroups,
  ISubjectGroup,
} from "../../../redux/reducers/subjectgroup.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import { ISubjectSelect } from "../../Leadership/Subject/Subject";
import { ReactComponent as Trash } from "../../../shared/img/icon/trash.svg";
import { ReactComponent as Edit } from "../../../shared/img/icon/edit.svg";
import { EyeOutlined } from "@ant-design/icons";
import "./style.scss";

export const Question = () => {
  const { Panel } = Collapse;
  const { Option } = Select;
  const { Title } = Typography;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [subjectSelect, setSubjectSelect] = useState<ISubjectSelect[]>([
    { name: "Tất cả bộ môn", value: "" },
  ]);
  const [subjectGroupSelect, setSubjectGroupSelect] = useState<
    ISubjectSelect[]
  >([{ name: "Tất cả tổ bộ môn", value: "" }]);
  const [form] = Form.useForm();
  const dataSub = useSelector(
    (state: any) => state.subject.listSubject.results
  );
  const dataSubGroup = useSelector(
    (state: any) => state.subjectgroup.listSubjectGroup.results
  );
  const [data, setData] = useState<IBanks[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [filter, setFilter] = useState<any>({ limit: 999, user: user.id });

  const [collapseShow, setCollapseShow] = useState<any>(false)
  const [collapseContent, setCollapseContent] = useState<number>(0)

  useEffect(() => {
    dispatch(getQuestions(filter))
      .unwrap()
      .then((rs: any) => {
        let list: IBanks[] = [];
        rs.results.forEach((vl: IBanks, idx: number) => {
          list.push({ key: idx, ...vl });
        });
        setData(list);
      })
      .catch((e: any) => {
        console.debug("e: ", e);
      });

    dispatch(getSubjects(999));
    dispatch(getSubjectGroups(999));
  }, [filter]);

  useEffect(() => {
    const option: ISubjectSelect[] = [{ name: "Tất cả bộ môn", value: "" }];
    if (dataSub) {
      dataSub.forEach((it: ISubject) => {
        option.push({ name: it.subName, value: it.id });
      });
    }
    setSubjectSelect(option);
  }, [dataSub]);

  useEffect(() => {
    const option: ISubjectSelect[] = [{ name: "Tất cả tổ bộ môn", value: "" }];
    if (dataSubGroup) {
      dataSubGroup.forEach((it: ISubjectGroup) => {
        option.push({ name: it.groupName, value: it.id });
      });
    }
    setSubjectGroupSelect(option);
  }, [dataSubGroup]);

  const modalUploadFile = {
    title: "Tải lên file",
    width: "50%",
    content: (
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        className="modal-add-role"
        layout="horizontal"
        form={form}
        style={{ textAlign: "left" }}
      >
        <Form.Item name="fileName" label="Tệp đính kèm" rules={[{ required: true }]}>
          <div className="download-file">
            <div className="file-name">
              <LinkOutlined />
              HTKL_KT4SP_10A1.doc
            </div>
            <Button>Chọn tệp tải lên</Button>
          </div>
          <span className="note-span">Chỉ hỗ trợ tệp excel (.xlsx)</span>
        </Form.Item>
        <Form.Item name="fileName" label="Tải file mẫu">
          <div className="span-download-file">
            <DownloadOutlined /> [Tải xuống file mẫu]
          </div>
        </Form.Item>
        <Form.Item name="chooseTopic" label="Chọn tổ - bộ môn" rules={[{ required: true }]}>
          <Select defaultValue="Chọn tổ - bộ môn">
            <Option value={0}>Văn hóa - xã hội</Option>
            <Option value={1}>Khoa học - Tự nhiên</Option>
          </Select>
        </Form.Item>
        <Form.Item name="ChooseLeason" label="Chọn môn học" rules={[{ required: true }]}>
          <Select defaultValue="Chọn môn học">
            <Option value={0}>Thương mai điện tử</Option>
            <Option value={1}>Sinh học</Option>
          </Select>
        </Form.Item>
        <Form.Item name="createBy" label="Được tạo bởi">
          <div>Gv. Thanh Tâm</div>
        </Form.Item>
      </Form>
    ),
    okText: "Tải lên",
    cancelText: "Huỷ",
  };

  const removeQuestion = {
    title: "Xóa câu hỏi",
    className: "modal-common-style",
    content:
      "Xác nhận muốn xoá câu hỏi này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác.",
    okText: "Xác nhận",
    cancelText: "Huỷ",
  };

  const downloadFile = {
    title: "Tải xuống tệp",
    className: "modal-change-name",
    content:
      "Xác nhận muốn tải xuống 25 tệp đã chọn. Các file đã chọn sẽ được lưu dưới dạng .rar.",
    okText: "Xác nhận",
    cancelText: "Huỷ",
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      sorter: true,
      render: (key: number) => {
        return <div>{key + 1}</div>;
      },
    },
    {
      title: "Mã câu hỏi",
      dataIndex: "quesCode",
      key: "quesCode",
    },
    {
      title: "Độ khó",
      dataIndex: "level",
      key: "level",
      render: (level: number) => {
        return (
          <div>{level === 0 ? "Thấp" : level === 1 ? "Trung bình" : "Cao"}</div>
        );
      },
    },
    {
      title: "Được tạo bởi",
      dataIndex: "user",
      key: "user",
      render: (user: UserState) => {
        return <div>{user.userName}</div>;
      },
    },
    {
      title: "",
      key: "action",
      render: (text: any, record: IBanks) => (
        <Space size="middle">
          <Button
                icon={
                  <EyeOutlined
                    style={{
                      fontSize: "24px",
                    }}
                  />
                }
                onClick={handleShowQuestion}
              />
              <Button
                icon={
                  <Edit
                    style={{
                      fontSize: "24px",
                    }}
                  />
                }
                onClick={handleChangeQuestion}
              />
              <Button
                icon={
                  <Trash
                    onClick={() => modal.confirm(removeQuestion)}
                    style={{
                      fontSize: "24px",
                    }}
                  />
                }
              />
        </Space>
      ),
    },
  ];

  const handleFilter = (e: any) => {
    if (e !== "") {
      setFilter({ ...filter, subjectgroup: e });
    } else {
      delete filter.subjectGroup;
      setFilter({ ...filter });
    }
  };

  const handleFilterSub = (e: any) => {
    if (e !== "") {
      setFilter({ ...filter, subject: e });
    } else {
      delete filter.subject;
      setFilter({ ...filter });
    }
  };

  const handleShowQuestion = ()=>{
    if(!collapseShow){
      setCollapseShow(true);
    }
    if(collapseContent===1){
      setCollapseContent(0);
    }
  }

  const handleChangeQuestion = ()=>{
    if(!collapseShow){
      setCollapseShow(true);
    }
    if(collapseContent===0){
      setCollapseContent(1);
    }
    
  }

  return (
    <div className="exam-bank sub-exam-bank question-page">
      <BreadcrumbComp title="Ngân hàng câu hỏi trắc nghiệm" />
      <div className="top-head" style={{ justifyContent: "right" }}>
        <div style={{ display: "flex" }}>
          <Button
            icon={<UploadOutlined />}
            className="default-btn icon-custom"
            onClick={() => modal.confirm(modalUploadFile)}
          >
            Tải lên
          </Button>
          <Button
            onClick={() => navigate("/teacher/questions/createQuestions")}
            style={{ marginLeft: "1rem" }}
            type="primary"
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <Row>
        <Col span={8}>
          <Title ellipsis level={3}>
            Bộ lọc câu hỏi
          </Title>
          <Card title="Lọc theo dạng" bordered={false}>
            <SelectComp
              style={{ display: "block" }}
              textLabel="Tổ bộ môn"
              defaultValue=""
              dataString={subjectGroupSelect}
              onChange={(e: any) => handleFilter(e)}
            />
            <SelectComp
              style={{ display: "block" }}
              textLabel="Bộ môn"
              defaultValue=""
              dataString={subjectSelect}
              onChange={(e: any) => handleFilterSub(e)}
            />
            <div className="select-label">Độ khó</div>
            <Radio.Group>
              <Radio value="">Tất cả</Radio>
              <Radio value={0}>Thấp</Radio>
              <Radio value={1}>Trung bình</Radio>
              <Radio value={2}>Cao</Radio>
            </Radio.Group>
            <div className="button-group-filter">
              <Button className="default-btn icon-custom">Hoàn tác</Button>
              <Button style={{ marginLeft: "1rem" }} type="primary">
                Lọc
              </Button>
            </div>
          </Card>
        </Col>
        <Col span={15} offset={1}>
          <Row>
            <Col span={12}>
              <Title ellipsis level={3}>
                Danh sách câu hỏi
              </Title>
            </Col>
            <Col className="table-header" span={12}>
              <SearchComponent placeholder="Tìm kiếm" />
            </Col>
          </Row>
          <Table
            pagination={{ defaultPageSize: 4 }}
            columns={columns}
            dataSource={data}
          />
          {collapseShow ? <Collapse bordered={false} className="site-collapse-custom-collapse">
            <Panel
              header="Nội dung câu hỏi"
              key="3"
              className="site-collapse-custom-panel"
            >
              {collapseShow && collapseContent=== 0 ? <div>hehe</div> : collapseShow  && collapseContent=== 1 ? <div>hihi</div> : <></>}
              <div className="button-group-filter">
              <Button className="default-btn icon-custom">Hủy</Button>
              <Button style={{ marginLeft: "1rem" }} type="primary">
                Lưu
              </Button>
              </div>
            </Panel>
          </Collapse> : <></>}
        </Col>
      </Row>
    </div>
  );
};
