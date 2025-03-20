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
import EyeIcon1 from "../../assets/images/Logo/eye.svg";
import EyeIcon2 from "../../assets/images/Logo/eye2.svg";
import { useNavigation } from "@react-navigation/native";
import { post } from "../../api/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CookieManager from "@react-native-cookies/cookies";
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../api/axiosInstance";

const EmailVerification = () => {
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

  // 토큰 추출 함수
  const extractAccessToken = (setCookieHeader) => {
    const cookieParts = setCookieHeader[0].split(";");
    for (const part of cookieParts) {
      if (part.trim().startsWith("accessToken=")) {
        return part.split("=")[1];
      }
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        이메일 인증을 위한 {"\n"}이메일을 입력해주세요.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="이메일"
          style={styles.input}
          placeholderTextColor="#4D678C"
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLoginButton}>
        <Text style={styles.loginButtonText}>인증코드 받기</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 19,
    color: "#383F49",
    textAlign: "center",
    fontWeight: "bold",
    width: "70%",
    marginBottom: 30,
  },
});

export default EmailVerification;
