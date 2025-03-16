import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const widthPercentage = (percentage) => (windowWidth * percentage) / 100;

export default function TitleBar({ title, subTitle }) {
  return (
    <View style={styles.titleBar}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: widthPercentage(5.5),
    marginBottom: widthPercentage(1.5),
    // backgroundColor: "orange",
  },
  title: {
    fontFamily: "Pretendard",
    fontSize: 20,
    fontWeight: "700",
    color: "#303437",
    marginRight: 7,
  },
  subTitle: {
    fontFamily: "Pretendard",
    fontSize: 10,
    fontWeight: "400",
    color: "#404446",
    marginTop: 7,
  },
});
