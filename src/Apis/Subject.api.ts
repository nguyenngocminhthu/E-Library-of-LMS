import axiosClient from "../config/axiosClient";

const url = "/v1/subjects";

const getSubjects = () => {
  return axiosClient.get(url).then((rs: any) => {
    console.debug("subject: ", rs);
    return rs;
  });
};

const Subject = { getSubjects };

export default Subject;
