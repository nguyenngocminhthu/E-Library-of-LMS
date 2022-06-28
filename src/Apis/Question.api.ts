import axiosClient from "../config/axiosClient";
import queryString from "query-string";

const url = "/v1/questions";

const createQuestion = (body: any) => {
  return axiosClient.post(url, body).then((rs: any) => {
    return rs;
  });
};

const getQuestions = (params: any) => {
  const query = queryString.stringify(params);
  return axiosClient.get(url + `?${query}`).then((rs: any) => {
    return rs;
  });
};

const getQuestion = (id: string) => {
  return axiosClient.get(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const updateQuestion = (id: string, payload: any) => {
  return axiosClient.patch(url + `/${id}`, payload).then((rs: any) => {
    return rs;
  });
};

const deleteQuestion = (id: string) => {
  return axiosClient.delete(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const Banks = {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};

export default Banks;
