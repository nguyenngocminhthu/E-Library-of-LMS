import { Modal, Button, Form, Input, Radio, Select } from "antd";
import { FormContext } from "antd/lib/form/context";
import { useState } from "react";

const { Option } = Select;

export const ModalAdd: React.FC<{ visible: boolean; setVisible: any }> = (
  props
) => {
  const [form] = Form.useForm();
  const [test, setTest] = useState(0);
  return (
    <Modal
      title="Thêm tài liệu"
      className="cancel-form file-modal"
      width="50%"
      visible={props.visible}
      onCancel={() => {
        props.setVisible(false);
        form.resetFields();
      }}
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
          <Select defaultValue="Chọn chủ đề">
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

        <Form.Item>{test === 0 ? <div>0</div> : <div>1</div>}</Form.Item>
      </Form>
    </Modal>
  );
};
