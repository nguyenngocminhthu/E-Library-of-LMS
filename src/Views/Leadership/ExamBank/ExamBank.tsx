import {
  DesktopOutlined,
  DownloadOutlined,
  EyeOutlined
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import modal from "antd/lib/modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import {
  getBanks,
  IBanks,
  updateBank
} from "../../../redux/reducers/banks.reducer";
import {
  getSubjects,
  ISubject
} from "../../../redux/reducers/subject.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import { ReactComponent as Word } from "../../../shared/img/icon/word.svg";
import { ISubjectSelect } from "../Subject/Subject";
import "./style.scss";

 const status = [
   {
     name: "Tất cả tình trạng",
     value: "",
   },
   {
     name: "Đã phê duyệt",
     value: 1,
   },
   {
     name: "Chờ phê duyệt",
     value: 0,
   },
 ];

 export const ExamBank = () => {
   const { Title } = Typography;
   const dispatch: AppDispatch = useDispatch();
   const navigate = useNavigate();
   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
   const [form] = Form.useForm();
   const [subjectSelect, setSubjectSelect] = useState<ISubjectSelect[]>([
     { name: "Tất cả bộ môn", value: "" },
   ]);
   const [teacherSelect, setTeacherSelect] = useState<ISubjectSelect[]>([
     { name: "Tất cả giảng viên", value: "" },
   ]);
   const [filter, setFilter] = useState<any>({ limit: 999 });
   const [data, setData] = useState<IBanks[]>([]);
   const teacher = useSelector((state: any) => state.user.listUser.results);

   useEffect(() => {
     dispatch(getBanks(filter))
       .unwrap()
       .then((rs: any) => {
         let list: IBanks[] = [];
         rs.results.forEach((vl: IBanks, idx: number) => {
           list.push({ key: idx, ...vl });
         });
         setData(list);
       });
   }, [filter]);

   useEffect(() => {
     const option: ISubjectSelect[] = [{ name: "Tất cả bộ môn", value: "" }];
     dispatch(getSubjects({ limit: 999 }))
       .unwrap()
       .then((rs: any) => {
         rs.results.forEach((it: ISubject) => {
           option.push({ name: it.subName, value: it.id });
         });
         setSubjectSelect(option);
       });
   }, []);

   useEffect(() => {
     const option: ISubjectSelect[] = [
       { name: "Tất cả giảng viên", value: "" },
     ];
     if (teacher) {
       teacher.forEach((it: UserState) => {
         option.push({ name: it.userName, value: it.id });
       });
     }

     setTeacherSelect(option);
   }, [teacher]);

   const handleRefresh = () => {
     dispatch(getBanks(filter))
       .unwrap()
       .then((rs: any) => {
         let list: IBanks[] = [];
         rs.results.forEach((vl: IBanks, idx: number) => {
           list.push({ key: idx, ...vl });
         });
         setData(list);
       });
   };

   const handleFilterSubject = (e: any) => {
     if (e !== "") {
       setFilter({ ...filter, subject: e });
     } else {
       delete filter.subject;
       setFilter({ ...filter });
     }
   };

   const handleFilterTeacher = (e: any) => {
     if (e !== "") {
       setFilter({ ...filter, teacher: e });
     } else {
       delete filter.teacher;
       setFilter({ ...filter });
     }
   };

   const handleFilterStatus = (e: any) => {
     if (e !== "") {
       setFilter({ ...filter, status: e });
     } else {
       delete filter.status;
       setFilter({ ...filter });
     }
   };

   const schoolYears = [
     {
       name: "2018-2029",
       value: "1819",
     },
     {
       name: "2019-2020",
       value: "1920",
     },
     {
       name: "2020-2021",
       value: "2021",
     },
   ];

   const downloadFile = {
     title: "Tải xuống tệp",
     className: "modal-common-style",
     content:
       "Xác nhận muốn tải xuống 25 tệp đã chọn. Các file đã chọn sẽ được lưu dưới dạng .rar.",
     okText: "Xác nhận",
     cancelText: "Huỷ",
   };

   const ModalConFirm = (id: string) => {
     const config = {
       title: "Phê duyệt",
       className: "file-modal",
       content:
         "Xác nhận muốn phê duyệt đề thi này và các thông tin bên trong? Sau khi phê duyệt sẽ không thể hoàn tác.",
       okText: "Xác nhận",
       cancelText: "Huỷ",
       onOk: () =>
         dispatch(updateBank({ id: id, payload: { status: 1 } })).then(() => {
           handleRefresh();
         }),
     };
     modal.confirm(config);
   };

   const config1 = {
     title: "Huỷ phê duyệt tài liệu",
     width: "40%",
     className: "cancel-form file-modal",
     content: (
       <Form
         labelCol={{ span: 6 }}
         wrapperCol={{ span: 18 }}
         name="cancel-form"
         layout="horizontal"
         form={form}
       >
         <Form.Item
           name="startDate"
           label="Ngày bắt đầu"
           rules={[{ required: true }]}
         >
           <DatePicker style={{ width: "50%" }} />
         </Form.Item>
         <Form.Item name="user" label="Người huỷ" rules={[{ required: true }]}>
           <Input />
         </Form.Item>
         <Form.Item name="note" label="Ghi chú">
           <TextArea rows={4} />
         </Form.Item>
         <Form.Item name="cbnotification" label=" ">
           <Checkbox className="cb-style">Gửi thông báo cho người tạo</Checkbox>
         </Form.Item>
       </Form>
     ),
     okText: "Lưu",
     cancelText: "Huỷ",
   };
   const columns = [
     {
       title: "Loại file",
       dataIndex: "fileType",
       key: "fileType",
       sorter: true,
       render: (fileType: number) => {
         return (
           <>
             {fileType === 0 ? (
               <DesktopOutlined style={{ fontSize: 32 }} />
             ) : (
               <Word />
             )}
           </>
         );
       },
     },
     {
       title: "Tên đề thi",
       dataIndex: "examName",
       key: "examName",
       sorter: (a: any, b: any) => a.fileName.length - b.fileName.length,
     },
     {
       title: "Môn học",
       dataIndex: "subject",
       key: "subject",
       render: (subject: ISubject) => {
         return subject?.subName;
       },
     },
     {
       title: "Giảng viên",
       dataIndex: "user",
       key: "user",
       render: (teacher: UserState) => {
         return teacher?.userName;
       },
     },
     {
       title: "Hình thức",
       dataIndex: "isFinal",
       key: "isFinal",
       render: (isFinal: boolean) => {
         return (
           <>{isFinal === true ? <div>Đề thi</div> : <div>Bài kiểm tra</div>}</>
         );
       },
     },
     {
       title: "Thời lượng",
       dataIndex: "time",
       key: "time",
       render: (time: number) => {
         return <div>{time} phút</div>;
       },
     },
     {
       title: "Tình trạng",
       dataIndex: "status",
       key: "status",
       render: (status: number) => (
         <Tag
           color={status === 0 ? "green" : status === 1 ? "blue" : "red"}
           key={status}
         >
           {status === 0
             ? "Chờ phê duyệt"
             : status === 1
             ? "Đã phê duyệt"
             : "Đã huỷ"}
         </Tag>
       ),
     },
     {
       title: "Phê duyệt tài liệu",
       dataIndex: "verify",
       key: "verify",
       render: (stt: any, record: any) => (
         <div>
           {record.status === 0 ? (
             <div style={{ display: "flex" }}>
               <Button onClick={() => ModalConFirm(record.id)} type="primary">
                 Phê duyệt
               </Button>
               <Button
                 onClick={() => modal.confirm(config1)}
                 className="cancel-btn"
               >
                 Huỷ
               </Button>
             </div>
           ) : record.status === 1 ? (
             <span className="gray">Đã phê duyệt</span>
           ) : (
             <span className="gray">Đã huỷ</span>
           )}
         </div>
       ),
     },

     {
       title: "",
       key: "action",
       render: (text: any, record: any) => (
         <Space size="middle">
           <Tooltip title="Detail">
             <Button
               onClick={() => navigate(`/exambank/examdetails/${record.id}`)}
               icon={<EyeOutlined />}
             />
           </Tooltip>
         </Space>
       ),
     },
   ];

   const onSelectChange = (selectedRowKeys: any) => {
     setSelectedRowKeys(selectedRowKeys);
   };

   const rowSelection = {
     selectedRowKeys,
     onChange: onSelectChange,
   };

   return (
     <div className="exam-bank sub-exam-bank">
       <BreadcrumbComp title="Ngân hàng đề thi" />
       <div className="top-head">
         <Title ellipsis level={5}>
           Danh sách đề thi
         </Title>
         <div style={{ display: "flex" }}>
           <Space className="" size="middle">
             <Tooltip title="Download">
               <Button
                 type="link"
                 disabled={selectedRowKeys.length === 0 ? true : false}
                 icon={
                   <DownloadOutlined
                     onClick={() => modal.confirm(downloadFile)}
                   />
                 }
               />
             </Tooltip>
           </Space>
           <div className="line"></div>
           <Button
             className="default-btn"
             disabled={selectedRowKeys.length === 0 ? true : false}
           >
             Huỷ phê duyệt
           </Button>
           <Button
             disabled={selectedRowKeys.length === 0 ? true : false}
             style={{ marginLeft: "1rem" }}
             type="primary"
           >
             Phê duyệt
           </Button>
         </div>
       </div>
       <Row>
         <Col className="table-header" span={16}>
           <SelectComp
             style={{ display: "block" }}
             textLabel="Tình trạng tài liệu"
             defaultValue="Tất cả tình trạng"
             dataString={status}
             onChange={(e: any) => handleFilterStatus(e)}
           />
           <SelectComp
             style={{ display: "block" }}
             textLabel="Niên khóa"
             defaultValue="Niên khóa"
             dataString={schoolYears}
           />
           <SelectComp
             style={{ display: "block" }}
             textLabel="Bộ môn"
             defaultValue=""
             dataString={subjectSelect}
             onChange={(e: any) => handleFilterSubject(e)}
           />
           <SelectComp
             style={{ display: "block" }}
             defaultValue=""
             textLabel="Giảng viên"
             dataString={teacherSelect}
             onChange={(e: any) => handleFilterTeacher(e)}
           />
         </Col>
         <Col className="table-header" span={8}>
           <SearchComponent placeholder="Tìm kết quả theo tên, lớp, môn học,..." />
         </Col>
       </Row>
       <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
     </div>
   );
 };
