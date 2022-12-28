import axiosClient from "../config/axiosClient";
import queryString from "query-string";

const url = "/v1/topics";

const createTopic = (body: any) => {
  return axiosClient.post(url, body).then((rs: any) => {
    return rs;
  });
};

const getTopics = (params: any) => {
  const query = queryString.stringify(params);
  return axiosClient.get(url + `?${query}`).then((rs: any) => {
    return rs;
  });
};

const getTopic = (id: string) => {
  return axiosClient.get(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const updateTopic = (id: string, payload: any) => {
  return axiosClient.patch(url + `/${id}`, payload).then((rs: any) => {
    return rs;
  });
};

const Topic = { createTopic, getTopics, getTopic, updateTopic };

export default Topic;
