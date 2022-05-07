import axiosClient from "../config/axiosClient";

const url = "/v1/banks";

const getBanks = (limit: any) => {
  return axiosClient.get(url + `?limit=${limit}`).then((rs: any) => {
    return rs;
  });
};

const getBank = (id: string) => {
  return axiosClient.get(url + `/${id}`).then((rs: any) => {
    return rs;
  });
};

const Banks = { getBanks, getBank };

export default Banks;
