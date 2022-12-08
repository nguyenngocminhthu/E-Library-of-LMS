import axiosClient from "../config/axiosClient";
import queryString from "query-string";
import { ITimeLearning } from "../redux/reducers/timeLearning.reducer";

const url = "/v1/time-learning";

const createTimeLearning = (body: ITimeLearning) => {
  return axiosClient.post(url, body).then((rs: any) => {
    return rs;
  });
};

const getTimeLearnings = (params: any) => {
  const query = queryString.stringify(params);
  return axiosClient.get(url + `?${query}`).then((rs: any) => {
    return rs;
  });
};

const getTimeLearning = (id: string) => {
  return axiosClient.get(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const updateTimeLearning = (id: string, payload: ITimeLearning) => {
  return axiosClient.patch(url + `/${id}`, payload).then((rs: any) => {
    return rs;
  });
};

interface IParamsUpdate {
  student: string,
  subject: string
}

const updateTimeLearningByStudentAndSubject = (params: IParamsUpdate, payload: ITimeLearning) => {
  console.log('param', params)
  return axiosClient.post(url + `/${params.student}/${params.subject}`, payload).then((rs: any) => {
    return rs;
  });
};

const TimeLearning = { getTimeLearnings, getTimeLearning, createTimeLearning, updateTimeLearning, updateTimeLearningByStudentAndSubject };

export default TimeLearning;
