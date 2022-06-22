import { Avatar, Form, Modal, Comment, Button, Col, Row, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getQA, IQA, updateQA } from "../../../redux/reducers/QA.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { AppDispatch } from "../../../redux/store";

export const ModalReply: React.FC<{
  visible: boolean;
  setVisible: any;
  data: any;
  handleRefresh: any;
}> = (props) => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [data, setData] = useState<IQA>();

  useEffect(() => {
    if (props.data) {
      dispatch(getQA(props.data))
        .unwrap()
        .then((rs: IQA) => {
          setData(rs);
        });
    }
  }, [props.data]);

  const handleRefresh = () => {
    if (props.data) {
      dispatch(getQA(props.data))
        .unwrap()
        .then((rs: IQA) => {
          setData(rs);
        });
    }
  };

  const onFinish = (values: any) => {
    console.debug(values);
    dispatch(
      updateQA({
        id: props.data,
        payload: { answers: [{ user: user.id, content: values.content }] },
      })
    )
      .unwrap()
      .then(() => {
        props.handleRefresh();
        form.resetFields();
        handleRefresh();
      });
  };

  return (
    <Modal
      title="Bình luận"
      className="modal-add-role"
      width="40%"
      visible={props.visible}
      onCancel={() => {
        props.setVisible(false);
      }}
      footer={() => false}
    >
      <Form
        name="Reply-form"
        layout="horizontal"
        form={form}
        onFinish={onFinish}
      >
        <Row>
          <Col span={19}>
            <Form.Item name="content">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item>
              <Button onClick={() => form.submit()} type="primary">
                Reply
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Comment
        author={<span>{data?.user.userName}</span>}
        avatar={
          <Avatar
            src={
              data?.user.avt ||
              "https://banner2.cleanpng.com/20180603/jx/kisspng-user-interface-design-computer-icons-default-stephen-salazar-photography-5b1462e1b19d70.1261504615280626897275.jpg"
            }
            alt={data?.user.userName}
          />
        }
        content={<p>{data?.content}</p>}
      >
        {data?.answers.map((value: { user: UserState; content: string }) => (
          <Comment
            author={<span>{value.user.userName}</span>}
            avatar={
              <Avatar
                src={
                  value.user.avt ||
                  "https://banner2.cleanpng.com/20180603/jx/kisspng-user-interface-design-computer-icons-default-stephen-salazar-photography-5b1462e1b19d70.1261504615280626897275.jpg"
                }
                alt={value.user.userName}
              />
            }
            content={<p>{value.content}</p>}
          />
        ))}
      </Comment>
    </Modal>
  );
};
