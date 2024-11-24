import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Back from "./src/assets/images/Header/Back.svg";
import Logo from "./src/assets/images/Header/Logo.png";

const CustomHeader = ({ title, navigation, routeName }) => {
  const [isLogoVisible, setIsLogoVisible] = useState(false);

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
        <TouchableOpacity>
          <Text style={{ color: "blue" }}>로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;
