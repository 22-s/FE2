import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import {
  login as KakaoLogin,
  loginWithKakaoTalk,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login';
// import {
//   NaverLogin,
//   getProfile,
// } from '@react-native-seoul/naver-login';
import LogoText from "../../assets/images/Logo/logo2.svg";
import EyeIcon1 from "../../assets/images/Logo/eye.svg";
import EyeIcon2 from "../../assets/images/Logo/eye2.svg";
import { useNavigation } from "@react-navigation/native";
import { post } from "../../api/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CookieManager from "@react-native-cookies/cookies";
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../api/axiosInstance";
import KakaoButton from "../../assets/images/Login/kakaoButton.svg";
import NaverButton from "../../assets/images/Login/naverButton.svg";
import GoogleButton from "../../assets/images/Login/googleButton.svg";
import AppleButton from "../../assets/images/Login/appleButton.svg";

const LoginPage = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);

    fadeAnim.setValue(0);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setToastVisible(false));
      }, 3000);
    });
  };

  const handleLoginButton = async () => {
    if (!email || !password) {
      showToast("모든 입력란을 입력하세요.");
      return;
    }
    await CookieManager.clearAll();
    await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
    try {
      const requestBody = { email, password };
      const response = await axiosInstance.post(
        "/api/user/signin",
        requestBody
      );
      if (response.data.isSuccess) {
        const { accessToken, refreshToken } = response.data.result;
        // 토큰 저장
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        console.log("로그인 성공: ", response.data.message);
        // useAuth의 login 메서드 호출
        login();
        // 홈 화면으로 이동
        navigation.replace("TabNavigator");
      } else {
        showToast("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          Alert.alert("존재하지 않는 사용자입니다.");
        } else if (error.response.status === 401) {
          Alert.alert("이메일 또는 비밀번호가 올바르지 않습니다.");
        } else {
          Alert.alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }
      } else if (error.message == "Network Error") {
        Alert.alert(
          "네트워크 오류",
          "인터넷 연결을 확인하고 다시 시도해주세요."
        );
      } else {
        console.error("Login Error:", error);
        showToast("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };


  const handleKakaoLogin = async () => {
    try {
      let token;
  
      // 1. 먼저 카카오톡 앱 로그인 시도
      try {
        token = await loginWithKakaoTalk();
      } catch (err) {
        console.log("카카오톡 로그인 실패, 계정 로그인 시도:", err);
        // 2. 실패 시 카카오 계정 로그인으로 fallback
        token = await loginWithKakaoAccount();
      }
  
      if (!token || !token.accessToken) {
        throw new Error("카카오 로그인 실패: accessToken 없음");
      }
  
      const kakaoAccessToken = token.accessToken;
      console.log("✅ 카카오 accessToken:", kakaoAccessToken);
  
      // 백엔드로 토큰 보내기
      const response = await axiosInstance.post(`/api/auth/kakao/login`, {
        accessToken: kakaoAccessToken,
      });
      
      if (response.data.isSuccess) {
        const { accessToken, refreshToken } = response.data.result;
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        login();
        navigation.replace("TabNavigator");
      } else {
        Alert.alert("로그인 실패", "다시 시도해주세요.");
      }
    } catch (error) {
      console.error("❌ 카카오 로그인 실패:", error);
      Alert.alert("카카오 로그인 오류", "로그인 중 오류가 발생했습니다.");
    }
  };


  // const handleNaverLogin = async () => {
  //   const initials = {
  //     kConsumerKey: 'mCbv2AKdsPzIuKmevpaB',        
  //     kConsumerSecret: 'Fq0iQWrhkI', 
  //     kServiceAppName: '신입사UP',          
  //     kServiceAppUrlScheme: 'naverlogin', 
  //   };

  //   try {
  //     console.log("🔥 NaverLogin 객체 확인:", NaverLogin);
  //     const result = await NaverLogin.login(initials);

  //     if (result.success) {
  //       const profileResult = await getProfile(result.accessToken);
  //       console.log('✅ 네이버 사용자 정보:', profileResult.response);

  //       // 백엔드에 accessToken 전달
  //       const response = await axiosInstance.post('/api/auth/naver/login', {
  //         accessToken: result.accessToken,
  //       });

  //       if (response.data.isSuccess) {
  //         const { accessToken, refreshToken } = response.data.result;
  //         await AsyncStorage.setItem("accessToken", accessToken);
  //         await AsyncStorage.setItem("refreshToken", refreshToken);
  //         login();
  //         navigation.replace("TabNavigator");
  //       } else {
  //         Alert.alert("로그인 실패", "다시 시도해주세요.");
  //       }
  //     } else {
  //       console.log("❌ 네이버 로그인 실패:", result.message);
  //       Alert.alert("네이버 로그인 실패", result.message || "알 수 없는 오류");
  //     }
  //   } catch (error) {
  //     console.error("❌ 네이버 로그인 중 오류:", error);
  //     Alert.alert("네이버 로그인 오류", "로그인 중 문제가 발생했습니다.");
  //   }
  // };

  

  return (
    <SafeAreaView style={styles.container}>
      <LogoText width={400} height={120} style={styles.logo} />

      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="이메일"
          style={styles.input}
          placeholderTextColor="#4D678C"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호"
          secureTextEntry={!isPasswordVisible}
          style={styles.input}
          placeholderTextColor="#4D678C"
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? (
            <EyeIcon1 width={24} height={24} style={styles.icon} />
          ) : (
            <EyeIcon2 width={24} height={24} style={styles.icon} />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLoginButton}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <View
        style={{
          width: "88%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Text
          style={styles.signUpLink}
          onPress={() => navigation.navigate("EmailVerification")}
        >
          비밀 번호를 잊어버리셨나요?
        </Text>
        <Text
          style={styles.signUpLink}
          onPress={() => navigation.navigate("Signup")}
        >
          회원가입
        </Text>
      </View>
      <View style={styles.socialLoginContainer}>
        <View style={styles.socialLineContainer}>
          <View style={styles.line} />
          <Text style={styles.lineText}>간편 로그인</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleKakaoLogin}>
            <KakaoButton />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={handleNaverLogin}> */}
            <NaverButton />
          {/* </TouchableOpacity> */}
          <GoogleButton />
          <AppleButton />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    marginBottom: -10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#268AFF",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: "90%",
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 12,
    fontSize: 16,
    color: "#5A5A5A",
    fontWeight: "bold",
  },
  icon: {
    marginLeft: 10,
    color: "#4D678C",
  },
  loginButton: {
    width: "90%",
    backgroundColor: "#268AFF",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpText: {
    marginTop: 15,
    fontSize: 14,
    color: "#5A5A5A",
    textAlign: "right",
    fontWeight: "bold",
    width: "90%",
  },
  signUpLink: {
    color: "#5A5A5A",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  socialLoginContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  socialLineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    gap: 7,
  },
  line: {
    width: "30%",
    height: 0.8,
    backgroundColor: "#BAC4CE",
  },
  lineText: {
    color: "#BAC4CE",
    fontSize: 11,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "58%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default LoginPage;
