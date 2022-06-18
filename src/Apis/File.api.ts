import axiosClient from "../config/axiosClient";
import queryString from "query-string";

const url = "/v1/files";

const createFile = (body: any) => {
  return axiosClient.post(url, body).then((rs: any) => {
    return rs;
  });
};

const getFiles = (params: any) => {
  const query = queryString.stringify(params);
  return axiosClient.get(url + `?${query}`).then((rs: any) => {
    return rs;
  });
};

const getFile = (id: string) => {
  return axiosClient.get(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const updateFile = (id: string, payload: any) => {
  return axiosClient.patch(url + `/${id}`, payload).then((rs: any) => {
    return rs;
  });
};

const File = { getFiles, getFile, createFile, updateFile };

export default File;
