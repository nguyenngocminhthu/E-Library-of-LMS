import axiosClient from "../config/axiosClient";
import queryString from "query-string";

const url = "/v1/submissions";

const createSubmission = (body: any) => {
  return axiosClient.post(url, body).then((rs: any) => {
    return rs;
  });
};

const getSubmissions = (params: any) => {
  const query = queryString.stringify(params);
  return axiosClient.get(url + `?${query}`).then((rs: any) => {
    return rs;
  });
};

const getSubmission = (id: string) => {
  return axiosClient.get(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const updateSubmission = (id: string, payload: any) => {
  return axiosClient.patch(url + `/${id}`, payload).then((rs: any) => {
    return rs;
  });
};

const deleteSubmission = (id: string) => {
  return axiosClient.delete(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const Submissions = { getSubmissions, getSubmission, updateSubmission, createSubmission, deleteSubmission };

export default Submissions;
