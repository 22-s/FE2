import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import TogglePic from "../../assets/images/Word/오른쪽세모.svg";
import ToggleTouched from "../../assets/images/Word/아래세모.svg";
import StarFull from "../../assets/images/Word/채운별.svg";
import Star from "../../assets/images/Word/빈별.svg";
import ToggleContent from "./ToggleContent";

const Toggle = ({ vocaId, term, description, example, favorited }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorited); // 즐겨찾기 상태

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  const handleFavorite = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    console.log("토큰이당: "+token);
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    console.log(vocaId);
    try {
      if (isFavorite) {
        // 즐겨찾기 해제 API 호출
        await axios.delete(`https://22s.store/api/voca/likes/${vocaId}`, {
          headers,
        });
        Alert.alert("알림", "용어를 즐겨찾기 리스트에서 삭제하였습니다.");
      } else {
        // 즐겨찾기 추가 API 호출
        await axios.post(`https://22s.store/api/voca/likes/${vocaId}`, {}, {
          headers,
        });
        Alert.alert("알림", "용어를 즐겨찾기 리스트에 추가하였습니다.");
      }
      setIsFavorite((prev) => !prev); // 상태 변경
    } catch (error) {
      console.error("즐겨찾기 API 요청 중 오류가 발생했습니다:", error);
      Alert.alert(
        "오류",
        isFavorite
          ? "즐겨찾기 해제 중 문제가 발생했습니다."
          : "즐겨찾기 추가 중 문제가 발생했습니다."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggleArea}>
        <TouchableOpacity onPress={handleToggle}>
          {isToggled ? (
            <ToggleTouched width={14} height={14} />
          ) : (
            <TogglePic width={14} height={14} />
          )}
        </TouchableOpacity>
        <Text style={styles.toggleText}>{term}</Text>
        <TouchableOpacity style={{ marginLeft: 7 }} onPress={handleFavorite}>
          {isFavorite ? <StarFull /> : <Star />}
        </TouchableOpacity>
      </View>
      {isToggled && (
        <View style={styles.contentArea}>
          <ToggleContent
            term={term}
            description={description}
            example={example}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
  },
  toggleArea: {
    flexDirection: "row",
    alignItems: "center",
    height: 30,
  },
  toggleText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 7,
  },
  contentArea: {
    padding: 10,
  },
});

export default Toggle;
