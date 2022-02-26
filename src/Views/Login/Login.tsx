import React, { FormEvent, useEffect, useState } from "react";
import "./Login.scss";
import logoLogin from "../../shared/img/icon/logo-second.svg";
import {ReactComponent as Account} from '../../shared/img/icon/account.svg';
import {ReactComponent as Password} from '../../shared/img/icon/shield-keyhole-line.svg';
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux";
// import { setError, signin } from "../../redux/users/actions/authActions";
// import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const { error } = useSelector((state: RootState) => state.auth);

//   useEffect(() => {
//     return () => {
//       if (error) {
//         dispatch(setError(""));
//       }
//     };
//   }, [error, dispatch]);

//   const submitHandler = (e: FormEvent) => {
//     e.preventDefault();
//     if (error) {
//       dispatch(setError(""));
//       toast(error);
//     }
//     setLoading(true);
//     dispatch(signin({ email, password }, () => setLoading(false)));
//   };

  return (
    <div className="login">
      <img className="logoLogin" src={logoLogin} alt="logoLogin" />
      <div className="row">
        <div className="col-sm-7"></div>
        <div className="col-sm-5">
          <div className="formLogin">
            <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
              Đăng nhập
            </h1>

            <label htmlFor="username">Tên đăng nhập</label>
            <div className="input-icons">
              <Account className="test" />
              <input
                className="input-field"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="Email address"
                id="username"
              />
            </div>
            <label htmlFor="password">Mật khẩu</label>
            <div className="input-icons">
              <Password className="test" />
              <input
                className="input-field"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                placeholder="Password"
                id="password"
              />
            </div>
            <Link className="forgotPass" to="/forgotpassword">
              Quên mật khẩu?
            </Link>

            <button
              className="btn btn-success"
            //   onClick={submitHandler}
              disabled={loading}
            >
              {loading ? "Loading..." : "Đăng nhập"}
              {/* <ToastContainer /> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
