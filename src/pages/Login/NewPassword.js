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
import { useNavigation, useRoute } from "@react-navigation/native";
import axiosInstance from "../../api/axiosInstance";

const NewPassword = () => {
  const route = useRoute();
  const { email } = route.params;
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showToast = (message) => {
    Alert.alert(message);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    setIsPasswordMatch(password === text || text === "");
  };

  const handlePasswordChange = async () => {
    if (!password || !confirmPassword) {
       Alert.alert("비밀번호를 입력해주세요.");
      return;
    }
    if (password !== confirmPassword) {
       Alert.alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const requestBody = { email, newPassword: password, confirmPassword };
      const response = await axiosInstance.post(
        "/api/user/password/reset",
        requestBody
      );
      if (response.data.isSuccess) {
        console.log("비밀번호 변경 성공!");
        setIsPasswordChanged(true);
      } else {
        console.log("비밀번호 변경에 실패하였습니다.");
      }
    } catch (error) {
      Alert.alert("비밀번호 변경 실패", "비밀번호 변경에 실패하였습니다. 다시 시도해주세요.");
    }
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {isPasswordChanged
          ? "비밀번호 변경이 완료되었습니다."
          : "새 비밀번호를 입력해주세요."}
      </Text>

      {!isPasswordChanged && (
        <>
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

          <View style={styles.inputContainer}>
            <TextInput
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              placeholder="비밀번호 확인"
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
          {!isPasswordMatch && (
            <Text style={styles.errorText}>
              비밀번호가 일치하지 않습니다. 다시 확인해주세요.
            </Text>
          )}
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={
          isPasswordChanged
            ? () => navigation.navigate("Login")
            : handlePasswordChange
        }
      >
        <Text style={styles.buttonText}>
          {isPasswordChanged ? "로그인 하기" : "비밀번호 변경하기"}
        </Text>
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
  button: {
    width: "90%",
    backgroundColor: "#268AFF",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
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

export default NewPassword;