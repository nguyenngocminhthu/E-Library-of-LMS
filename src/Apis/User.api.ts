import Toast from "../Components/Toast";
import axiosClient from "../config/axiosClient";

const url = "/v1/users";

const getUsers = () => {
  return axiosClient.get(url);
};

const updateProfile = (id: string, payload: any) => {
  return axiosClient.patch(url + `/${id}`, payload).then((rs: any) => {
    return rs;
  });
};

const User = { getUsers, updateProfile };

export default User;
