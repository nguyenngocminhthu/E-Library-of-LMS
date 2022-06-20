import axiosClient from "../config/axiosClient";
import queryString from "query-string";

const url = "/v1/QAs";

const getQAs = (params: any) => {
  const query = queryString.stringify(params);
  return axiosClient.get(url + `?${query}`).then((rs: any) => {
    return rs;
  });
};

const getQA = (id: string) => {
  return axiosClient.get(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const createQA = (payload: any) => {
  return axiosClient.post(url, payload).then((rs: any) => {
    return rs;
  });
};

const updateQA = (id: string, payload: any) => {
  return axiosClient.patch(url + `/${id}`, payload).then((rs: any) => {
    return rs;
  });
};

const deleteQA = (id: string) => {
  return axiosClient.delete(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const QA = { getQAs, updateQA, createQA, deleteQA, getQA };

export default QA;
