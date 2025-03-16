import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Question from "../../assets/images/Home/question.svg";

const windowWidth = Dimensions.get("window").width;
const widthPercentage = (percentage) => (windowWidth * percentage) / 100;

export default function SolveQuizBox({ percentage, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.titleArea}>
        <Question style={{ marginRight: 4 }} />
        <Text style={styles.title}>퀴즈풀기</Text>
      </View>
      <View style={styles.subTitleArea}>
        <Text style={styles.subTitle}>진척도</Text>
        <Text style={styles.highlightedSubTitle}>{percentage}%</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: widthPercentage(30),
    height: widthPercentage(33),
    backgroundColor: "#F7F7F7",
    padding: 17,
    borderRadius: 20,
  },
  titleArea: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontFamily: "Pretendard",
    fontSize: 18,
    fontWeight: "700",
    color: "#595959",
  },
  subTitleArea: {
    position: "absolute",
    bottom: widthPercentage(3),
    right: widthPercentage(3),

    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "green",
  },
  subTitle: {
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "500",
    color: "#5A5A5A",
    marginBottom: -3,
  },
  highlightedSubTitle: {
    fontFamily: "Pretendard",
    fontSize: 28,
    color: "#FFAD66",
    fontWeight: "800",
  },
});
