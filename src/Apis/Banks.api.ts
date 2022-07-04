import axiosClient from "../config/axiosClient";
import queryString from "query-string";

const url = "/v1/banks";

const createBank = (body: any) => {
  return axiosClient.post(url, body).then((rs: any) => {
    return rs;
  });
};

const getBanks = (params: any) => {
  const query = queryString.stringify(params);
  return axiosClient.get(url + `?${query}`).then((rs: any) => {
    return rs;
  });
};

const getBank = (id: string) => {
  return axiosClient.get(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const updateBank = (id: string, payload: any) => {
  return axiosClient.patch(url + `/${id}`, payload).then((rs: any) => {
    return rs;
  });
};

const deleteBank = (id: string) => {
  return axiosClient.delete(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const Banks = { getBanks, getBank, updateBank, createBank, deleteBank };

export default Banks;
