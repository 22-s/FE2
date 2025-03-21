import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import Arrow from "../../assets/images/Home/arrow_gray.svg";
import Lock from "../../assets/images/Home/lock.svg";

const windowWidth = Dimensions.get("window").width;
const widthPercentage = (percentage) => (windowWidth * percentage) / 100;

export default function LockQuizList({ num, question }) {
  return (
    <View style={styles.container}>
      <View style={styles.lockWrapper}>
        <Lock />
      </View>
      <View style={styles.titleArea}>
        <Text style={styles.number}>{num}</Text>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {question}
        </Text>
      </View>
      <Arrow />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // width: "90%",
    height: widthPercentage(11),
    backgroundColor: "#F2F2F2",
    borderRadius: 15,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 4,
    position: "relative",
  },
  titleArea: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "pink",
  },
  number: {
    fontFamily: "Pretendard",
    fontSize: 20,
    fontWeight: "700",
    color: "#A8A8A8",
    paddingRight: 8,
  },
  title: {
    fontFamily: "Pretendard",
    fontSize: 13,
    fontWeight: "700",
    color: "#ABABAB",
  },
  lockWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    // transform: [{ translateX: -12 }, { translateY: -12 }],
    zIndex: 10,
  },
});
