import { Button, Col, Form, Input, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../../redux/reducers/auth.reducer";
import { AppDispatch } from "../../redux/store";
import { ReactComponent as Account } from "../../shared/img/icon/account.svg";
import logoLogin from "../../shared/img/icon/logo-second.svg";
import { ReactComponent as Password } from "../../shared/img/icon/shield-keyhole-line.svg";
import { SocketContext } from "../../context/socket.context";
import "./Login.style.scss";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const client = useContext(SocketContext);

  const onFinish = (values: any) => {
    dispatch(logIn(values))
      .unwrap()
      .then((rs: any) => {
        if (!client.socket.connected) {
          client.socket.connect();
        }
        client.socket.emit("SEND_JOIN_REQUEST", rs.user.id);
        console.log("emit socket", client.socket);
        if (rs.user.role === "teacher") {
          navigate("/teacher/home");
        } else if (rs.user.role === "student") {
          navigate("/student/home");
        } else {
          navigate("/home");
        }
      })
      .catch((e: any) => {
      });
  };

  return (
    <div className="login">
      <img className="logoLogin" src={logoLogin} alt="logoLogin" />
      <Row>
        <Col span={12}></Col>
        <Col span={12}>
          <Form onFinish={onFinish} form={form} className="formLogin">
            <h1>Đăng nhập</h1>
            <label htmlFor="username">Tên đăng nhập</label>
            <div className="input-icons">
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                ]}
              >
                <Input
                  className="input-style"
                  prefix={<Account className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
            </div>
            <label htmlFor="password">Mật khẩu</label>
            <div className="input-icons">
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input
                  className="input-style"
                  prefix={<Password className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
            </div>
            <Link className="forgotPass" to="/forgotpassword">
              Quên mật khẩu?
            </Link>

            <Button
              type="primary"
              onClick={() => form.submit()}
              disabled={loading}
              style={{ width: "100%" }}
            >
              {loading ? "Loading..." : "Đăng nhập"}
              {/* <ToastContainer /> */}
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
