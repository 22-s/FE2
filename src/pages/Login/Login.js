import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import LogoText from "../../assets/images/Logo/logo2.svg";
import EyeIcon1 from "../../assets/images/Logo/eye.svg";
import EyeIcon2 from "../../assets/images/Logo/eye2.svg";
import { useNavigation } from "@react-navigation/native";
import { post } from "../../api/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CookieManager from "@react-native-cookies/cookies";
import { useAuth } from '../../contexts/AuthContext';

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
    await AsyncStorage.removeItem("accessToken");

    try {
      const requestBody = { email, password };
      const response = await post("/user/signin", requestBody);
      console.log("Response 전체:", response);
  
      if (response.isSuccess) {
        console.log("로그인 성공");
        login();
        navigation.replace("TabNavigator");
      } else {
        showToast("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (e) {
      console.error("Login Error:", e);
      showToast("로그인에 실패했습니다. 다시 시도해주세요.");
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

      <Text
        style={styles.signUpText}
        onPress={() => navigation.navigate("Signup")}
      >
        계정이 없으신가요? <Text style={styles.signUpLink}>회원가입</Text>
      </Text>
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
});

export default LoginPage;
