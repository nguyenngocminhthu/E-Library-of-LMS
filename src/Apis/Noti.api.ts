import axiosClient from "../config/axiosClient";
import queryString from "query-string";

const url = "/v1/noti";

const getNotis = (params: any) => {
  const query = queryString.stringify(params);
  return axiosClient.get(url + `?${query}`).then((rs: any) => {
    return rs;
  });
};

const getNoti = (id: string) => {
  return axiosClient.get(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const createNoti = (payload: any) => {
  return axiosClient.post(url, payload).then((rs: any) => {
    return rs;
  });
};

const updateNoti = (id: string, payload: any) => {
  return axiosClient.patch(url + `/${id}`, payload).then((rs: any) => {
    return rs;
  });
};

const getByMultiSubject = (payload: any) => {
  return axiosClient.post(url + '/get-by-subjects', payload).then((rs: any) => {
    return rs;
  });
};

const deleteNoti = (id: string) => {
  return axiosClient.delete(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const Noti = { getNotis, updateNoti, createNoti, deleteNoti, getNoti, getByMultiSubject };

export default Noti;
