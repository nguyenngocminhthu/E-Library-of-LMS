import { Modal, Table } from "antd";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createUsers } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";
import "./SystemSetting.style.scss";

interface IUser {
  userName: string;
  userCode: string;
  phone: string;
  gender: number;
}

export const ModalFileExcel = (props: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { excelRows, isModalOpen, setIsModalOpen, handleRefresh } = props;
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [dataSource, setDataSource] = useState([]);
  const [bodyCreate, setBodyCreate] = useState<any>([]);

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
    {
      title: "SDT",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "GIOITINH",
      dataIndex: "gender",
      key: "gender",
    },
  ];

  const handleOk = () => {
    dispatch(createUsers(bodyCreate))
      .unwrap()
      .then((rs) => {
        handleRefresh();
        setIsModalOpen(false);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (isModalOpen) {
      let tempRows = cloneDeep(excelRows).filter(
        (item: any) => item && item.length === 5
      );
      tempRows.shift();
      const dataConverted = tempRows.map((item: any) => {
        return {
          key: item[0],
          stt: item[0],
          userName: item[1],
          userCode: item[2].toString(),
          phone: item[3].toString(),
          gender: item[4],
        };
      });
      setDataSource(dataConverted);
    }
  }, [isModalOpen]);

  useEffect(() => {
    console.log("dataConverted: ", dataSource);
    if (dataSource.length) {
      const temp: any = cloneDeep(dataSource).map((item: any) => {
        delete item.key;
        delete item.stt;
        item.gender = item.gender === "Nam" ? 0 : 1;
        return item;
      });
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
      className="modal-common-style subject"
      okText="Xác nhận"
      cancelText="Huỷ"
    >
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
