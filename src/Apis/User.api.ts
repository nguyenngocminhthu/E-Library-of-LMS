import axiosClient from "../config/axiosClient";

const url = "/v1/users";

const getUsers = () => {
  return axiosClient.get(url).then((rs: any) => {
    return rs;
  });
};

const createUser = (payload: any) => {
  return axiosClient.post(url, payload).then((rs: any) => {
    return rs;
  });
};

const updateProfile = (id: string, payload: any) => {
  return axiosClient.patch(url + `/${id}`, payload).then((rs: any) => {
    return rs;
  });
};

const deleteUser = (id: string) => {
  return axiosClient.delete(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const User = { getUsers, updateProfile, createUser, deleteUser };

export default User;
