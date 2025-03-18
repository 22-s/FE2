import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import Arrow from "../../assets/images/Home/arrow_blue.svg";

const windowWidth = Dimensions.get("window").width;
const widthPercentage = (percentage) => (windowWidth * percentage) / 100;

export default function QuizList({ num, question }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styles.number}>{num}</Text>
        <Text style={styles.title}>{question}</Text>
      </View>
      <Arrow />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: widthPercentage(11),
    backgroundColor: "#FAFBFF",
    borderRadius: 15,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 4,
  },
  titleArea: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "pink",
  },
  number: {
    fontFamily: "Pretendard",
    fontSize: 20,
    fontWeight: "700",
    color: "#70A0FF",
    paddingRight: 8,
  },
  title: {
    fontFamily: "Pretendard",
    fontSize: 13,
    fontWeight: "700",
    color: "#525252",
  },
});
