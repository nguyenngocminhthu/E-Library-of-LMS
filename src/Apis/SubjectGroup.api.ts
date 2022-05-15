import axiosClient from "../config/axiosClient";

const url = "/v1/subjectgroups";

const getSubjectGroups = (limit: any) => {
  return axiosClient.get(url + `?limit=${limit}`).then((rs: any) => {
    return rs;
  });
};

const getSubjectGroup = (id: string) => {
  return axiosClient.get(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const SubjectGroup = { getSubjectGroups, getSubjectGroup };

export default SubjectGroup;
