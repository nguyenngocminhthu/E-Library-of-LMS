import { MoreOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Input, Menu, Row, Space, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import modal from "antd/lib/modal";
import { useNavigate } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import SearchComponent from "../../../Components/SearchComponent";
import { SelectComp } from "../../../Components/Select";
import { getSubjects } from "../../../redux/reducers/subject.reducer";
import { AppDispatch } from "../../../redux/store";
import "./style.scss";

const modalChangeName = {
  title: "Đổi tên tệp",
  width: "50%",
  className: "modal-change-name",  
  content: (
    <div className="input-layout">
      <Input />
      .file
    </div>
  ),
  okText: "Lưu",
  cancelText: "Huỷ",
};


export const Subject = () => {
  const navigate = useNavigate();
  const data = useSelector((state: any) => state.subject.listSubject.results);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubjects(999))
      .unwrap()
      .then((rs: any) => {
        console.debug("rs: ", rs);
      })
      .catch((e: any) => {
        console.debug("e: ", e);
      });
  }, []);
  
  const userMenu = (
    <Menu>
      <Menu.Item key="1">Chi tiết môn học</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2"   onClick={() => navigate(`/subjects/listfile`)}>Danh sách tài liệu</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick = {() => modal.confirm(modalChangeName)}>Phân công tài liệu</Menu.Item>
    </Menu>
  );
  const subjectSelect = [
    {
      value: "Xếp theo tên môn học",
      key: "XSTMH",
    },
    {
      value: "Lần truy cập gần nhất",
      key: "LTCGN",
    },
  ]
  const columns = [
    {
      title: "Mã môn học",
      dataIndex: "subCode",
      key: "subCode",
    },
    {
      title: "Tên môn học",
      dataIndex: "subName",
      key: "subName",
      sorter: (a: any, b: any) => a.subName.length - b.subName.length,
      render: (subName: string, record: any) => (
        <div onClick={() => navigate(`/subjects/${record.subCode}`)}>
          {subName}
        </div>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (
        <div className={status === 0 ? "gray" : "green"}>
          {status === 0 ? "Chờ phê duyệt" : "Đã phê duyệt"}
        </div>
      ),
    },
    {
      title: "Số tài liệu chờ duyệt",
      dataIndex: "file",
      key: "file",
    },
    {
      title: "",
      key: "action",
      render: (text: any, record: any) => (
        <Dropdown.Button
        className="dropdown-btn"
        overlay={userMenu}
        icon={
          <MoreOutlined
            style={{
              fontSize: '24px',
            }}
           
          />
        }
      ></Dropdown.Button>
      ),
    },
  ];

  return (
    <div className="subject">
      <BreadcrumbComp title="Danh sách môn học" />
      <Row>
        <Col className="table-header" span={16}>
          <SelectComp
            style={{ display: "block" }}
            defaultValue="Xếp theo tên môn học"
            dataString={subjectSelect}
          />
        </Col>
        <Col className="table-header" span={8}>
          <SearchComponent />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.id}</p>
          ),
        }}
      />
    </div>
  );
};
