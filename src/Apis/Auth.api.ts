import axiosClient from "../config/axiosClient";

const url = "/v1/auth";

const login = (email: string, password: string) => {
  return axiosClient
    .post(url + "/login", {
      email,
      password,
    })
    .then((response: any) => {
      if (response.tokens) {
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem(
          "accestoken",
          JSON.stringify(response.tokens.access.token)
        );
      }
      return response;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};

const Auth = { login, logout };

export default Auth;
