import axios from "axios";

const API_BASE_URL = "https://api.22s.store/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // To send cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 2000,
});

export default axiosInstance;
