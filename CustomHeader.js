import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Back from "./src/assets/images/Header/Back.svg";
import Logo from "./src/assets/images/Header/Logo.svg";

const CustomHeader = ({ title, navigation, routeName }) => {
  const [isLogoVisible, setIsLogoVisible] = useState(false);

  useEffect(() => {
    // QuizHome일 때만 Logo를 표시하고, 나머지 화면에서는 Back 버튼 표시
    if (routeName === "QuizHome") {
      setIsLogoVisible(true);
    } else {
      setIsLogoVisible(false);
    }
  }, [routeName]);

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
          style={{ width: 30, height: 30 }}
        >
          {isLogoVisible ? <Logo /> : <Back />}
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
        <TouchableOpacity>
          <Text style={{ color: "blue" }}>로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;
