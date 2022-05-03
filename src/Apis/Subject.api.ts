import axiosClient from "../config/axiosClient";

const url = "/v1/subjects";

const getSubjects = () => {
  return axiosClient.get(url).then((rs: any) => {
    return rs;
  });
};

const Subject = { getSubjects };

export default Subject;
