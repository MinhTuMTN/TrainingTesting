import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://tuyetvi-testing.ddns.net:8080/api",
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

export default axiosInstance;
