import axiosClient from "../config/axiosClient";

const url = "/v1/subjects";

const getSubjects = (limit: any) => {
  return axiosClient.get(url + `?limit=${limit}`).then((rs: any) => {
    return rs;
  });
};

const getSubject = (id: string) => {
  return axiosClient.get(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const Subject = { getSubjects, getSubject };

export default Subject;
