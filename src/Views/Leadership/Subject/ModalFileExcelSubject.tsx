import { Modal, Row, Table } from "antd";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createSubjectByFile } from "../../../redux/reducers/subject.reducer";
import { createUsers } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import "./Subject.style.scss";

interface IUser {
  userName: string;
  userCode: string;
  phone: string;
  gender: number;
}

export const ModalFileExcelSubject = (props: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { excelRows, isModalOpen, setIsModalOpen } = props;
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [dataSource, setDataSource] = useState<any>([]);
  const [bodyCreate, setBodyCreate] = useState<any>([]);
  const [extraInfo, setExtraInfo] = useState({
    subGroup: "",
    subCode: "",
    subName: "",
    year: "",
    semester: 1,
  });
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "TEN",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "MS",
      dataIndex: "userCode",
      key: "userCode",
    },
  ];

  const handleOk = () => {
    dispatch(createSubjectByFile(bodyCreate))
      .unwrap()
      .then((rs) => {
        console.log("tao xong mon hoc: ", rs);
        setIsModalOpen(false);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (isModalOpen) {
      if (excelRows.length) {
        let tempRows = cloneDeep(excelRows).filter(
          (item: any) => item && item.length === 3
        );
        tempRows.shift();
        const dataConverted = tempRows.map((item: any) => {
          return {
            key: item[0],
            stt: item[0],
            userName: item[1],
            userCode: item[2].toString(),
          };
        });
        setDataSource(dataConverted);
      }
    }
  }, [isModalOpen]);

  useEffect(() => {
    console.log("dataConverted: ", dataSource);
    if (dataSource.length) {
      const info = cloneDeep(excelRows).slice(0, 4);
      setExtraInfo({
        subGroup: info[0][0],
        subCode: info[1][0],
        subName: info[1][1],
        year: info[2][0],
        semester: info[3][0].at(-1),
      });
      const tempDataSource = cloneDeep(dataSource);
      tempDataSource.shift();
      const students: any = cloneDeep(tempDataSource).map((item: any) => {
        return item.userCode;
      });
      const temp = {
        subCode: info[1][0],
        subName: info[1][1],
        subGroup: info[0][0],
        teacher: dataSource[0].userCode,
        year: info[2][0],
        semester: parseInt(info[3][0].at(-1) || 1),
        students,
      };
      console.log("temp: ", temp);
      setBodyCreate(temp);
    }
  }, [dataSource]);
  return (
    <Modal
      title="Nội dung file"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width="40%"
      className="cancel-form"
      okText="Import"
      cancelText="Huỷ"
    >
      <Row>
        <label>Tổ bộ môn: {extraInfo.subGroup}.</label>
        <label>Mã môn: {extraInfo.subCode}.</label>
        <label>Tên môn: {extraInfo.subName}.</label>
        <label>Niên khoá: {extraInfo.year}.</label>
        <label>Học kỳ: {extraInfo.semester}.</label>
      </Row>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          defaultPageSize: 10,
          current: page,
          total: dataSource.length,
          showTotal(total, range) {
            return `Total ${total} items`;
          },
          onChange(page, pageSize) {
            setPage(page);
          },
          pageSize,
          pageSizeOptions: ["10", "15", "20", "25"],
          showSizeChanger: true,
          onShowSizeChange(current, size) {
            setPageSize(size);
            setPage(1);
          },
        }}
        scroll={{
          y: 600,
        }}
      />
    </Modal>
  );
};
