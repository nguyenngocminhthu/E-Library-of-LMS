import axiosClient from "../config/axiosClient";
import queryString from "query-string";

const url = "/v1/users";

const getUsers = (params: any) => {
  const query = queryString.stringify(params);
  return axiosClient.get(url + `?${query}`).then((rs: any) => {
    return rs;
  });
};

const getUser = (id: string) => {
  return axiosClient.get(url + `/${id}`).then((rs: any) => {
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

const User = { getUsers, updateProfile, createUser, deleteUser, getUser };

export default User;
