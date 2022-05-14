import axiosClient from "../config/axiosClient";

const url = "/v1/questions";

const getQuestions = (limit: any) => {
  return axiosClient.get(url + `?limit=${limit}`).then((rs: any) => {
    return rs;
  });
};

const getQuestion = (id: string) => {
  return axiosClient.get(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const Banks = { getQuestions, getQuestion };

export default Banks;
