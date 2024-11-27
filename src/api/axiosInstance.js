import axios from "axios";
import EncryptedStorage from "react-native-encrypted-storage";

const axiosInstance = axios.create({
  baseURL: "https://22s.store/api",
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  async (response) => {
    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      const accessToken = extractAccessToken(setCookieHeader);

      if (accessToken) {
        try {
          await EncryptedStorage.setItem("accessToken", accessToken);
          console.log("AccessToken이 저장되었습니다.");
        } catch (error) {
          console.log("AccessToken 저장 실패", error);
        }
      }
    }
    return response;
  },
  (error) => {
    // 에러 처리
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

function extractAccessToken(setCookieHeader) {
  const cookieParts = setCookieHeader[0].split(";");
  for (const part of cookieParts) {
    if (part.trim().startsWith("accessToken=")) {
      return part.split("=")[1];
    }
  }
  return null;
}

export default axiosInstance;
