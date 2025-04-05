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
  Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../api/axiosInstance";

const windowWidth = Dimensions.get("window").width;
const widthPercentage = (percentage) => (windowWidth * percentage) / 100;

const EmailVerification = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isEmailMatch, setIsEmailMatch] = useState(true);
  const [isCodeButtonEnabled, setIsCodeButtonEnabled] = useState(false);

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

  const EmailConfirmButton = async () => {
    try {
      const requestBody = { email };
      const response = await axiosInstance.post(
        "/api/user/password/verify-email",
        requestBody
      );
      if (response.data.isSuccess) {
        console.log("이메일 인증 성공!");
        setIsCodeButtonEnabled(true);
        setIsEmailMatch(true);
        Alert.alert("이메일 인증에 성공하였습니다.");
      } else {
        showToast("이메일 인증에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.log("이메일 인증 오류:", error);
  
      // 에러 상세 로그
      if (error.response) {
        console.log("응답 데이터:", error.response.data);
        console.log("응답 상태 코드:", error.response.status);
        console.log("응답 헤더:", error.response.headers);
        Alert.alert("서버 오류", error.response.data?.message || "에러 응답이 도착했습니다.");
      } else if (error.request) {
        console.log("요청은 되었지만 응답 없음:", error.request);
        Alert.alert("네트워크 오류", "서버로부터 응답이 없습니다.");
      } else {
        console.log("기타 오류:", error.message);
        Alert.alert("오류 발생", error.message);
      }
  
      setIsEmailMatch(false);
    }
  };
  

  const CodeSendButton = async () => {
    try {
      const requestBody = { email };
      const response = await axiosInstance.post(
        "/api/user/password/send-code",
        requestBody
      );
      if (response.data.isSuccess) {
        console.log("인증번호 전송 성공!");
        navigation.navigate("VerificationCode", { email });
      } else {
        showToast("인증번호 전송을 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.log("인증번호 전송 에러:", error);
  
      if (error.response) {
        console.log("응답 데이터:", error.response.data);
        console.log("응답 상태 코드:", error.response.status);
        console.log("응답 헤더:", error.response.headers);
        Alert.alert("서버 오류", error.response.data?.message || "서버 응답 오류가 발생했습니다.");
      } else if (error.request) {
        console.log("요청은 되었지만 응답 없음:", error.request);
        Alert.alert("네트워크 오류", "서버로부터 응답이 없습니다.");
      } else {
        console.log("기타 오류:", error.message);
        Alert.alert("에러 발생", error.message);
      }
  
      setIsEmailMatch(false);
    }
  };
  
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        이메일 인증을 위한 {"\n"}이메일을 입력해주세요.
      </Text>
      <View
        style={[styles.inputContainer, !isEmailMatch && styles.inputError]}
      >
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="이메일"
          style={styles.input}
          placeholderTextColor="#4D678C"
        />
      </View>
      {!isEmailMatch && (
        <Text style={styles.errorText}>
          존재하지 않는 이메일입니다. 다시 확인해주세요.
        </Text>
      )}


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button1} onPress={EmailConfirmButton}>
          <Text style={styles.Text1}>이메일 확인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button2,
            !isCodeButtonEnabled && { backgroundColor: "#CCCCCC" },
          ]}
          disabled={!isCodeButtonEnabled}
          onPress={() => {
            if (isCodeButtonEnabled) {
              CodeSendButton();
            }
          }}
        >
          <Text style={styles.Text2}>인증번호 받기</Text>
        </TouchableOpacity>
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
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: 35,
  },


  buttonContainer: {
    width: widthPercentage(80),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "pink",
    marginTop: 10,
  },
  button1: {
    display: "flex",
    width: widthPercentage(37),
    height: widthPercentage(12),
    backgroundColor: "#D2E7FF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  button2: {
    display: "flex",
    width: widthPercentage(37),
    height: widthPercentage(12),
    backgroundColor: "#268AFF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  Text1: {
    color: "#268AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  Text2: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default EmailVerification;