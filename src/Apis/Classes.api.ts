import axiosClient from "../config/axiosClient";
import queryString from "query-string";

const url = "/v1/classes";

const createClass = (body: any) => {
  return axiosClient.post(url, body).then((rs: any) => {
    return rs;
  });
};

const getClasses = (params: any) => {
  const query = queryString.stringify(params);
  return axiosClient.get(url + `?${query}`).then((rs: any) => {
    return rs;
  });
};

const getClass = (id: string) => {
  return axiosClient.get(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const Classes = { createClass, getClasses, getClass };

export default Classes;
