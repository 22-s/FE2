import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://22s.store/api",
  withCredentials: true,
  timeout: 10000,
});

export default axiosInstance;
