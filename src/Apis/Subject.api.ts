import axiosClient from "../config/axiosClient";
import queryString from "query-string";
import { ISubject } from "../redux/reducers/subject.reducer";

const url = "/v1/subjects";

const createSubject = (body: ISubject) => {
  return axiosClient.post(url, body).then((rs: any) => {
    return rs;
  });
};

const getSubjects = (params: any) => {
  const query = queryString.stringify(params);
  return axiosClient.get(url + `?${query}`).then((rs: any) => {
    return rs;
  });
};

const getSubject = (id: string) => {
  return axiosClient.get(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const updateSubject = (id: string, payload: ISubject) => {
  return axiosClient.patch(url + `/${id}`, payload).then((rs: any) => {
    return rs;
  });
};

const Subject = { getSubjects, getSubject, createSubject, updateSubject };

export default Subject;
