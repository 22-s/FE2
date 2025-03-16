import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Smile from "../../assets/images/Quiz/smile.svg";

const windowWidth = Dimensions.get("window").width;
const widthPercentage = (percentage) => (windowWidth * percentage) / 100;

export default function TestStep1() {
  return (
    <View style={styles.container}>
      <Smile />
      <Text style={styles.title}>환영해요!</Text>
      <Text style={styles.subTitle}>모의고사 테스트를 시작하시겠어요?</Text>
      <View style={styles.buttonContainer}>
        <Text style={styles.button1}>이전 결과 조회</Text>
        <Text style={styles.button2}>시작하기</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "orange",
  },
  title: {
    fontFamily: "Pretendard",
    fontSize: 22,
    fontWeight: "700",
    color: "#383838",
  },
  subTitle: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
    color: "#5F5F5F",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: widthPercentage(10),
    // backgroundColor: "pink",
  },
  button1: {
    width: widthPercentage(20),
    height: widthPercentage(13),
    backgroundColor: "#D2E7FF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    color: "#268AFF",
    fontSize: 14,
    fontWeight: "500",
  },
  button2: {
    width: widthPercentage(20),
    height: widthPercentage(13),
    backgroundColor: "#61ABFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});
