import React, { useState, useRef } from "react";
import { useRoute } from "@react-navigation/native";
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
import DatePicker from "react-native-date-picker";
import EyeIcon1 from "../../assets/images/Logo/eye.svg";
import EyeIcon2 from "../../assets/images/Logo/eye2.svg";
import { useNavigation } from "@react-navigation/native";
import { post } from "../../api/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CookieManager from "@react-native-cookies/cookies";
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../api/axiosInstance";
import DateIcon from "../../assets/images/Logo/date.svg";

const JoiningDate = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const fromLogin = route.params?.fromLogin === true;
  const { login } = useAuth();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateStatusMessage, setDateStatusMessage] = useState("");
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

  const handleSubmitJoiningDate = async () => {
    if (!date) {
      setDateStatusMessage("입사일을 선택해주세요.");
      return;
    }

    try {
      const formattedDate = date.toISOString().split("T")[0];

      const response = fromLogin
        ? await axiosInstance.post("/api/user/join-date", {
            joinDate: formattedDate,
          })
        : await axiosInstance.patch("/api/user/join-date", {
            joinDate: formattedDate,
          });

      if (response.data.isSuccess) {
        Alert.alert("입사일이 성공적으로 등록되었습니다.");
        navigation.navigate("TabNavigator", {
          screen: "퀴즈",
          params: {
            screen: "QuizHome",
          },
        });
      } else {
        showToast("입사일 등록에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.log("입사일 등록 에러:", error);
      if (error.response) {
        Alert.alert(
          "서버 오류",
          error.response.data?.message || "에러 응답이 도착했습니다."
        );
      } else if (error.request) {
        Alert.alert("네트워크 오류", "서버로부터 응답이 없습니다.");
      } else {
        Alert.alert("오류 발생", error.message);
      }
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>입사일을 선택해주세요.</Text>
      <View
        style={[
          styles.inputContainer,
          openDatePicker && styles.inputError, // 입사일 미선택 시 빨간 테두리 적용
        ]}
      >
        <TouchableOpacity
          onPress={() => setOpenDatePicker(true)}
          style={styles.dateButton}
        >
          <Text style={styles.dateText}>
            {date.toDateString() === new Date().toDateString()
              ? "입사일"
              : `${date.getFullYear()}년 ${
                  date.getMonth() + 1
                }월 ${date.getDate()}일`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
          <DateIcon width={24} height={24} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={openDatePicker}
        date={date}
        mode="date"
        locale="ko"
        onConfirm={(selectedDate) => {
          setDate(selectedDate);
          setOpenDatePicker(false);
        }}
        onCancel={() => setOpenDatePicker(false)}
        minimumDate={new Date(1900, 0)}
        maximumDate={new Date()}
        title="날짜 선택"
        confirmText="확인"
        cancelText="취소"
      />
      {dateStatusMessage && (
        <Text style={styles.errorText}>입사일을 선택해주세요.</Text>
      )}

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSubmitJoiningDate}
      >
        <Text style={styles.loginButtonText}>입사일 등록</Text>
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
    height: 50,
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
  dateButton: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 12,
  },
});

export default JoiningDate;
