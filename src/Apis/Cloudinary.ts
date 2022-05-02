import axiosClient from "../config/axiosClient";

const url = "/v1/cloudinary";

const cloudinaryUpload = (fileToUpload: any) => {
  return axiosClient
    .post(url, fileToUpload)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

export default cloudinaryUpload;
