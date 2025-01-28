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

// 응답 인터셉터: 쿠키에서 토큰 추출 및 저장
// axiosInstance.interceptors.response.use(
//   async (response) => {
//     const setCookieHeader = response.headers["set-cookie"];
//     if (setCookieHeader) {
//       const token = extractAccessToken(setCookieHeader)?.trim(); 
//       console.log("토큰:", token);
      
//       if (token) {
//         try {
//           await AsyncStorage.setItem("accessToken", token);
//           console.log("AccessToken 저장 완료:", token);
//         } catch (error) {
//           console.error("AccessToken 저장 실패:", error);
//         }
//       } else {
//         console.error("set-cookie 헤더에서 accessToken을 찾을 수 없습니다.");
//       }
//     }
//     return response;
//   },
//   (error) => Promise.reject(error)
// );

// 토큰 추출 함수
// const extractAccessToken = (setCookieHeader) => {
//   if (!setCookieHeader || !Array.isArray(setCookieHeader)) {
//     console.error("set-cookie 헤더가 잘못되었습니다.");
//     return null;
//   }
//   const cookieParts = setCookieHeader[0].split(";");
//   for (const part of cookieParts) {
//     if (part.trim().startsWith("accessToken=")) {
//       return part.split("=")[1]; 
//     }
//   }
//   return null;
// };

// export default axiosInstance;
