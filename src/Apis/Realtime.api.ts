import axiosClient from "../config/axiosClient";

const url = "/v1/real-time";

const get = () => {
  return axiosClient.get(url).then((rs: any) => {
    return rs;
  });
};

const join = (payload: any) => {
  return axiosClient.post(`${url}/join`, payload).then((rs: any) => {
    return rs;
  });
};

const out = (payload: any) => {
  return axiosClient.post(`${url}/out`, payload).then((rs: any) => {
    return rs;
  });
};

const Realtime = { get, join, out };

export default Realtime;
