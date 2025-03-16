import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Surprise from "../../assets/images/Quiz/surprise.svg";
import Warning from "../../assets/images/Quiz/warning.svg";

const windowWidth = Dimensions.get("window").width;
const widthPercentage = (percentage) => (windowWidth * percentage) / 100;

export default function TestStep1() {
  return (
    <View style={styles.container}>
      <Surprise />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Warning />
        <Text style={styles.title}>주의사항</Text>
      </View>
      <View style={styles.issueContainer}>
        <Text style={styles.issueTitle}>1. 이탈 금지</Text>
        <Text style={styles.issueContent}>
          테스트 중에는 뒤로 가거나 나갈 수 없어요!{"\n"}시험이 끝날 때까지 계속
          풀어주세요.
        </Text>
      </View>
      <View style={styles.issueContainer}>
        <Text style={styles.issueTitle}>2. 제한 시간</Text>
        <Text style={styles.issueContent}>
          테스트는 총 10분간 진행돼요! 시간이 끝나기 전까지 집중해서 풀어주세요.
        </Text>
      </View>
      <View style={styles.issueContainer}>
        <Text style={styles.issueTitle}>3. 파이팅!</Text>
        <Text style={styles.issueContent}>
          좋은 결과가 기다릴거에요! 그럼 파이팅 :)
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.button1}>뒤로</Text>
        <Text style={styles.button2}>확인</Text>
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
    color: "#E45A33",
  },
  issueContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: widthPercentage(5),
    // backgroundColor: "orange",
  },
  issueTitle: {
    fontFamily: "Pretendard",
    fontSize: 18,
    fontWeight: "700",
    color: "#383838",
  },
  issueContent: {
    fontFamily: "Pretendard",
    fontSize: 13,
    fontWeight: "400",
    color: "#5F5F5F",
    marginLeft: 5,
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
