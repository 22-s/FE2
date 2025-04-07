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

    const response = await axiosInstance.post("/api/user/refresh", {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data.result;
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", newRefreshToken);

    console.log("AccessToken 갱신 완료");
    return accessToken;
  } catch (error) {
    if (error.response) {
      console.error("🔴 서버 응답 오류:", error.response.data);
    } else if (error.request) {
      console.error("🔴 요청 자체 실패:", error.request);
    } else {
      console.error("🔴 기타 오류:", error.message);
    }
    throw error;
  }
};
// 요청 인터셉터: Authorization 헤더 추가
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      console.log("토큰 가져오기: ", token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("토큰 가져오기 실패:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("응답 오류:", error.response);
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
