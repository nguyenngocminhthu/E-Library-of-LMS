import axiosClient from "../config/axiosClient";

const url = "/v1/auth";

const login = (email: string, password: string) => {
  return axiosClient
    .post(url + "/login", {
      email,
      password,
    })
    .then((response: any) => {
      console.debug(response.user);

      if (response.tokens) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      return response;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};

const Auth = { login, logout };

export default Auth;
