import axiosClient from "../config/axiosClient";
import { ISubjectGroup } from "../redux/reducers/subjectgroup.reducer";

const url = "/v1/subjectgroups";

const createSubjectGroup = (body: ISubjectGroup) => {
  return axiosClient.post(url, body).then((rs: any) => {
    return rs;
  });
};

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

const SubjectGroup = { getSubjectGroups, getSubjectGroup, createSubjectGroup };

export default SubjectGroup;
