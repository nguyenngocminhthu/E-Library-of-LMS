import { LinkOutlined } from "@ant-design/icons";
import { Modal, Button, Form, Input, Radio, Select, Row, Col, Table } from "antd";
import { useState } from "react";
import SearchComponent from "../../../../Components/SearchComponent";
import { ReactComponent as Word } from "../../../../shared/img/icon/word.svg";
import { ReactComponent as Powerpoint } from "../../../../shared/img/icon/pptw_file.svg";
import { ReactComponent as Excel } from "../../../../shared/img/icon/excel_file.svg";
import { ReactComponent as Mp4 } from "../../../../shared/img/icon/mp4_file.svg";

const { Option } = Select;

export const ModalAdd: React.FC<{ visible: boolean; setVisible: any }> = (
  props
) => {
  const [form] = Form.useForm();
  const [test, setTest] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const columns = [
    {
      title: "Thể loại",
      dataIndex: "fileType",
      key: "fileType",
      render: (fileType: number) => {
        return (
          <>
            {fileType === 0 ? (
              <Powerpoint />
            ) : fileType === 1 ? (
              <Word />
            ) : fileType === 2 ? (
              <Excel />
            ) : (
              <Mp4 />
            )}
          </>
        );
      },
    },
    {
      title: "Tên",
      dataIndex: "nameType",
      key: "nameType",
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      key: "size",
    },
  ];

  const data = [
    {
      key: "1",
      fileType: 3,
      nameType: "GTTTMDT01.mp4",
      size: "20.5 MB",
    },
    {
      key: "2",
      fileType: 2,
      nameType: "GTTTMDT01.mp4",
      size: "20.5 MB",
    },
    {
      key: "3",
      fileType: 1,
      nameType: "GTTTMDT01.mp4",
      size: "20.5 MB",
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
    <Modal
      title="Thêm bài giảng mới"
      className="modal-add-role subject sub-manage teacher-subject"
      width="40%"
      visible={props.visible}
      onCancel={() => {
        props.setVisible(false);
        form.resetFields();
      }}
      okText="Lưu và gửi phê duyệt"
      cancelText="Huỷ"
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        name="cancel-form"
        layout="horizontal"
        form={form}
      >
        <Form.Item name="fileName" label="Tên bài giảng">
          <div>Thương mại điện tử</div>
        </Form.Item>
        <Form.Item name="topic" label="Chọn chủ đề">
          <Select defaultValue="Chọn chủ đề" className="select">
            <Option value={0}>Văn hóa xã hội</Option>
            <Option value={1}>Sample</Option>
          </Select>
        </Form.Item>
        <Form.Item name="title" label="Tiêu đề bài giảng">
          <Input />
        </Form.Item>
        <Form.Item label="Chọn tệp">
          <Radio.Group
            onChange={(e) => {
              setTest(e.target.value);
            }}
            className="teacher-subject"
          >
            <Radio value={0}>Tải tệp lên</Radio>
            <Radio value={1}>Bài giảng</Radio>
          </Radio.Group>
        </Form.Item>

        <div>
          {test === 0 ? (
            <div>
              <Row>
                <Col span={6}></Col>
                <Col span={18}>
                  <div className="download-file">
                    <div className="file-name">
                      <LinkOutlined />
                      HTKL_KT4SP_10A1.doc
                    </div>
                    <Button>Chọn tệp tải lên...</Button>
                  </div>
                </Col>
              </Row>
            </div>
          ) : (
            <div>
              <div style={{ width: "60%", marginTop: "1rem" }}>
                <SearchComponent placeholder="Tìm kết quả theo tên, thể loại tài liệu..." />
              </div>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                pagination={false}
              />
            </div>
          )}
        </div>
      </Form>
    </Modal>
  );
};
