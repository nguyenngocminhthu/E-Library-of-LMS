import axiosClient from "../config/axiosClient";

const url = "/socket";

const get = () => {
  return axiosClient.get(url).then((rs: any) => {
    return rs;
  });
};

const Socket = { get };

export default Socket;
