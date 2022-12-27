import { Modal, Table } from "antd";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createSubjectByFile } from "../../../redux/reducers/subject.reducer";
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
  const { excelData, isModalOpen, setIsModalOpen } = props;
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [dataSource, setDataSource] = useState<any>([]);
  const [bodyCreate, setBodyCreate] = useState<any>([]);
  const [extraInfo, setExtraInfo] = useState([
    {
      subGroup: "",
      subCode: "",
      subName: "",
      year: "",
      semester: 1,
    },
  ]);

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
        setIsModalOpen(false);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      setPage(1);
      if (excelData.length) {
        const extra: any[] = [];
        const bodyReq: any[] = [];
        const dataFromExcel = cloneDeep(excelData).map(
          (sheet: Array<any>, index: number) => {
            const info = cloneDeep(sheet).slice(0, 4);
            extra.push({
              subGroup: info[0][0],
              subCode: info[1][0],
              subName: info[1][1],
              year: info[2][0],
              semester: info[3][0].at(-1),
            });

            let tempRows = cloneDeep(sheet).filter(
              (row: any) => row && row.length === 3
            );
            tempRows.shift();
            const dataConverted = tempRows.map((row: any) => {
              return {
                key: row[0],
                stt: row[0],
                userName: row[1],
                userCode: row[2].toString(),
              };
            });

            const tempConverted = cloneDeep(dataConverted);
            tempConverted.shift();
            const students: any = cloneDeep(tempConverted).map((item: any) => {
              return item.userCode;
            });
            const temp = {
              subCode: info[1][0],
              subName: info[1][1],
              subGroup: info[0][0],
              teacher: dataConverted[0].userCode,
              year: info[2][0],
              semester: parseInt(info[3][0].at(-1) || 1),
              students,
              description: info[1][1],
            };
            bodyReq.push(temp);

            return dataConverted;
          }
        );

        const convertToDataSource: any[] = [];
        cloneDeep(dataFromExcel).map((item: any) => {
          return item.map((ele: any) => {
            convertToDataSource.push(ele);
            return ele;
          });
        });

        setBodyCreate(bodyReq);
        setExtraInfo(extra);
        setPageSize(dataFromExcel[0].length);
        setDataSource(convertToDataSource);
      }
    }
  }, [isModalOpen]);

  useEffect(() => {
    console.debug("bodyCreate", bodyCreate);
  }, [bodyCreate]);

  return (
    <Modal
      title="Nội dung file"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width="40%"
      className="modal-common-style subject sub-exam-bank"
      okText="Xác nhận"
      cancelText="Huỷ"
    >
      <Table
        title={() => (
          <div
            className="d-flex"
            style={{ width: "34vw", justifyContent: "space-between" }}
          >
            <div style={{ maxWidth: "70%" }}>
              <div className="label">
                <div>
                  Tổ bộ môn: <label>{extraInfo[page - 1]?.subGroup}</label>
                </div>
                <div>
                  Mã môn: <label>{extraInfo[page - 1]?.subCode}</label>
                </div>
                <div style={{ wordBreak: "break-word" }}>
                  Tên môn: <label>{extraInfo[page - 1]?.subName}</label>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="label">
                <div>Niên khoá: </div>
                <div>Học kỳ: </div>
              </div>
              <div>
                <div> {extraInfo[page - 1]?.year}</div>
                <div> {extraInfo[page - 1]?.semester}</div>
              </div>
            </div>
          </div>
        )}
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
          pageSizeOptions: [],
          showSizeChanger: true,
          onShowSizeChange(current, size) {
            setPageSize(size);
            setPage(1);
          },
        }}
        scroll={{
          y: 400,
        }}
      />
    </Modal>
  );
};
