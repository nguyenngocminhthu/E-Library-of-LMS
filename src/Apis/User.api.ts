import axiosClient from "../config/axiosClient";

const url = "/v1/users";

const getUsers = () => {
  return axiosClient.get(url);
};

const User = { getUsers };

export default User;
