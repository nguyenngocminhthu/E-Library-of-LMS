import React, { useState } from "react";
import "./Login.scss";
import logoLogin from "../../shared/img/icon/logo-second.svg";
import { ReactComponent as Account } from "../../shared/img/icon/account.svg";
import { ReactComponent as Password } from "../../shared/img/icon/shield-keyhole-line.svg";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button, Form, Input } from "antd";
import { logIn } from "../../redux/reducers/auth.reducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    dispatch(logIn(values))
      .unwrap()
      .then((rs: any) => {
        if (rs.user.role === "teacher") {
          navigate("/teacher/home");
        } else if (rs.user.role === "student") {
          navigate("/student/home");
        } else {
          navigate("/home");
        }
      })
      .catch((e: any) => {
        console.debug("e: ", e);
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
                rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}>
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
