import axiosClient from "../config/axiosClient";
import queryString from "query-string";

const url = "/v1/questions";

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

const Banks = { getQuestions, getQuestion };

export default Banks;
