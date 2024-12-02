import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import Back from "./src/assets/images/Header/Back.svg";
import Logo from "./src/assets/images/Header/Logo.png";
import axios from "axios";
import { useAuth } from "./src/contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomHeader = ({ title, navigation, routeName }) => {
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const { isLoggedIn, logout } = useAuth();

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
      const token = await AsyncStorage.getItem("accessToken"); // 토큰 가져오기
      if (!token) {
        throw new Error("로그인 상태가 아닙니다.");
      }

      await axios.post(
        "https://22s.store/api/user/signout",
        {}, // 요청 본문이 없으면 빈 객체를 전달
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    if (isLoggedIn) {
      Alert.alert(
        "로그아웃",
        "로그아웃을 하시겠습니까?",
        [
          { text: "취소", style: "cancel" },
          { text: "확인", onPress: handleLogout },
        ],
        { cancelable: true }
      );
      
    } else {
      navigation.replace("AuthStack");
    }
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
        <TouchableOpacity
          onPress={() => {
            if (!isLogoVisible) navigation.goBack();
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
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "black",
          }}
        >
          {title}
        </Text>
        <TouchableOpacity onPress={handleAuthAction}>
          <Text style={{ color: "blue" }}>
            {isLoggedIn ? "로그아웃" : "로그인"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;
