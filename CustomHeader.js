import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import Back from "./src/assets/images/Header/Back.svg";
import Logo from "./src/assets/images/Header/Logo.png";
import BellOn from "./src/assets/images/Header/Bell_on.svg";
import BellOff from "./src/assets/images/Header/Bell_off.svg";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "./src/contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./src/api/axiosInstance";

const CustomHeader = ({ title, navigation, routeName }) => {
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const hideHeaderIcons =
    routeName === "TestDetail" || routeName === "TestLoading";

  useEffect(() => {
    if (
      routeName === "QuizHome" ||
      routeName === "WordHome" ||
      routeName === "BuizContentList" ||
      routeName === "MannerHome"
    ) {
      setIsLogoVisible(true);
    } else {
      setIsLogoVisible(false);
    }
  }, [routeName]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/user/signout");

      await AsyncStorage.removeItem("accessToken"); // 토큰 제거
      logout(); // 상태 업데이트
      Alert.alert("알림", "로그아웃되었습니다.");
      navigation.replace("AuthStack");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      Alert.alert("오류", "로그아웃 중 문제가 발생했습니다.");
    }
  };

  const handleAuthAction = () => {
    // if (isLoggedIn) {
    //   Alert.alert(
    //     "로그아웃",
    //     "로그아웃을 하시겠습니까?",
    //     [
    //       { text: "취소", style: "cancel" },
    //       { text: "확인", onPress: handleLogout },
    //     ],
    //     { cancelable: true }
    //   );
    // } else {
    //   navigation.replace("AuthStack");
    // }
    navigation.navigate("AlarmStack");
  };

  return (
    <View
      style={{
        paddingTop: 15,
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
        }}
      >
        {hideHeaderIcons ? (
          <View style={{ width: 30 }} />
        ) : (
          <TouchableOpacity
            onPress={() => {
              if (routeName === "TestResult") {
                navigation.navigate("QuizHome");
              } else if (!isLogoVisible) {
                navigation.goBack();
              }
            }}
            style={{
              width: 30,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isLogoVisible ? (
              <Image
                source={Logo}
                style={{ width: 35, height: 35 }}
                resizeMode="contain"
              />
            ) : (
              <Back />
            )}
          </TouchableOpacity>
        )}

        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "black",
          }}
        >
          {title}
        </Text>
        {hideHeaderIcons ? (
          <View style={{ width: 30 }} />
        ) : (
          <TouchableOpacity onPress={handleAuthAction}>
            <Text style={{ color: "blue" }}>
              {isLoggedIn ? <BellOff /> : "로그인"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;
