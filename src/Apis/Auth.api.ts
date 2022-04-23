import Cookie from "js-cookie";
import axiosClient from "../config/axiosClient";

const url = "/v1/auth";

const login = async (body: any) => {
  try {
    const res = await axiosClient.post(`${url}/login`, body);
    console.log("log at ==> Auth.Api.js ==> line 23 ==>  res: ", res);
    if (res.data) {
      Cookie.set("accessToken", res.data.tokens.access.token);
      console.log(res.data);
      return { data: res, success: true };
    }
    return { data: {}, success: false };
  } catch (error) {
    return {
      success: false,
    };
  }
};

const Auth = { login };

export default Auth;
