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
import { useNavigation, useRoute } from "@react-navigation/native";
import axiosInstance from "../../api/axiosInstance";

const windowWidth = Dimensions.get("window").width;
const widthPercentage = (percentage) => (windowWidth * percentage) / 100;

const EmailVerification = () => {
  const route = useRoute();
  const { email } = route.params;
  const navigation = useNavigation();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(180);
  const timerRef = useRef(null);

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

  const CodeConfirm = async () => {
    
    try {
      const requestBody = { email, code };
      const response = await axiosInstance.post(
        "/api/user/password/verify-code",
        requestBody
      );
      if (response.data.isSuccess) {
        console.log("인증 성공!");
        navigation.navigate("NewPassword", { email }); 
      } else {
        console.log("인증번호가 올바르지 않습니다.");
      }
    } catch (error) {
      Alert.alert("인증 실패", "인증에 실패했습니다. 다시 시도해주세요.");
    }
  };

  React.useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);
  
  const startTimer = () => {
    clearInterval(timerRef.current);
    setTimer(180);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendCode = async () => {
    try {
      console.log(email);
      const response = await axiosInstance.post("/api/user/password/send-code", {
        email,
      });
      if (response.data.isSuccess) {
        showToast("인증코드가 재전송되었습니다.");
        startTimer(); // ⏱ 타이머 재시작
      } else {
        showToast("재전송 실패. 다시 시도해주세요.");
      }
    } catch (e) {
      Alert.alert("재전송 실패", "다시 시도해주세요.");
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>인증코드가 발송되었습니다.</Text>
      <Text style={styles.semiTitle}>이메일을 확인하여 인증코드를 입력해주세요.</Text>
      {/* <Text style={styles.title}>이메일을 확인하여 인증코드를 입력해주세요.</Text> */}
      <View style={styles.inputRow}>
        <TextInput
          value={code}
          onChangeText={setCode}
          placeholder="인증코드"
          style={styles.input}
          placeholderTextColor="#4D678C"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.resendButton} onPress={handleResendCode}>
          <Text style={styles.resendText}>재전송</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.timerText}>
        {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}
      </Text>


      <TouchableOpacity style={styles.loginButton} onPress={CodeConfirm}>
        <Text style={styles.loginButtonText}>확인</Text>
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
    marginBottom: 10,
    // backgroundColor: 'green'
  },
  semiTitle: {
    fontSize: 15,
    color: "#383F49",
    textAlign: "center",
    fontWeight: "bold",
    width: "80%",
    marginBottom: 30,
    // backgroundColor: 'green'
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#268AFF",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "90%",
    justifyContent: "space-between",
  },
  
  resendButton: {
    backgroundColor: "#D2E7FF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginLeft: 8,
  },
  
  resendText: {
    color: "#268AFF",
    fontWeight: "bold",
  },
  
  timerText: {
    marginBottom: 20,
    fontSize: 15,
    fontWeight: "bold",
    color: "#4D678C",
  },
  
});

export default EmailVerification;
