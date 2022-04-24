import React, { FormEvent, useEffect, useState } from "react";
import "./Login.scss";
import logoLogin from "../../shared/img/icon/logo-second.svg";
import { ReactComponent as Account } from "../../shared/img/icon/account.svg";
import { ReactComponent as Password } from "../../shared/img/icon/shield-keyhole-line.svg";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button, Form } from "antd";
import { useAppDispatch } from "../../redux/hooks";
import { logIn, logout } from "../../redux/reducers/auth.reducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux";
// import { setError, signin } from "../../redux/users/actions/authActions";
// import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    dispatch(logIn(values))
      .unwrap()
      .then((rs: any) => {
        navigate("/home");
        console.debug("rs: ", rs);
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
              <Account className="test" />
              <Form.Item name="email">
                <input
                  className="input-field"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  placeholder="Email address"
                  id="username"
                />
              </Form.Item>
            </div>
            <label htmlFor="password">Mật khẩu</label>
            <div className="input-icons">
              <Password className="test" />

              <Form.Item name="password">
                <input
                  className="input-field"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  placeholder="Password"
                  id="password"
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
