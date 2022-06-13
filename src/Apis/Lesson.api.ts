import axiosClient from "../config/axiosClient";
import queryString from "query-string";

const url = "/v1/lessons";

const createLesson = (body: any) => {
  return axiosClient.post(url, body).then((rs: any) => {
    return rs;
  });
};

const getLessons = (params: any) => {
  const query = queryString.stringify(params);
  return axiosClient.get(url + `?${query}`).then((rs: any) => {
    return rs;
  });
};

const getLesson = (id: string) => {
  return axiosClient.get(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const Lesson = { getLessons, getLesson, createLesson };

export default Lesson;
