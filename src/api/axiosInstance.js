import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: "https://port-0-twotwos-m69bdqoxaa7c9913.sel4.cloudtype.app",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const refreshAccessToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    console.log("🔄 Refresh Token 요청 시작:", refreshToken);

    if (!refreshToken) {
      throw new Error("Refresh Token이 존재하지 않습니다.");
    }

    const response = await axios.post("/api/user/refresh", { refreshToken });

    const { accessToken, refreshToken: newRefreshToken } = response.data.result;
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", newRefreshToken);

    console.log("✅ AccessToken 갱신 완료");
    return accessToken;
  } catch (error) {
    console.error("🔴 Refresh Token 실패:", error);
    throw error;
  }
};

// 요청 시 accessToken 삽입
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 시 에러 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // ✅ 여기서 기본 axios로 재요청 (interceptor 재탑승 방지)
        return axios(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
