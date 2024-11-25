import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import Back from "./src/assets/images/Header/Back.svg";
import Logo from "./src/assets/images/Header/Logo.png";
import { useAuth } from "./src/contexts/AuthContext";

const CustomHeader = ({ title, navigation, routeName }) => {
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const { isLoggedIn, login, logout } = useAuth();

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

  const handleAuthAction = () => {
    if (isLoggedIn) {
      // 로그아웃 확인 알림 표시
      Alert.alert(
        "로그아웃", 
        "로그아웃을 하시겠습니까?", 
        [
          { text: "취소", style: "cancel" },
          { 
            text: "확인", 
            onPress: () => {
              logout(); // 로그아웃 처리
              Alert.alert("알림", "로그아웃되었습니다.");
            }
          }
        ]
      );
    } else {
      // 로그인 화면으로 이동
      navigation.navigate("Login");
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
