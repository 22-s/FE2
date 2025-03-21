import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Check from "../../assets/images/Home/check.svg";
import Fire from "../../assets/images/Home/fire.svg";

const windowWidth = Dimensions.get("window").width;
const widthPercentage = (percentage) => (windowWidth * percentage) / 100;

export default function ReviewQuizBox({ number, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.titleArea}>
        <Check style={{ marginRight: 4 }} />
        <Text style={styles.title}>복습하기</Text>
      </View>
      <View style={styles.subTitleArea}>
        <Text style={styles.subTitle}>어제 푼 퀴즈 수 </Text>
        <Text style={styles.highlightedSubTitle}>{number}개</Text>
      </View>
      <Fire style={styles.fire} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: widthPercentage(30),
    height: widthPercentage(33),
    backgroundColor: "#FFEDED",
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
    color: "#FF5526",
  },
  subTitleArea: {
    marginTop: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  subTitle: {
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "600",
    color: "#5A5A5A",
  },
  highlightedSubTitle: {
    fontFamily: "Pretendard",
    fontSize: 12,
    color: "#FF734C",
    fontWeight: "700",
  },
  fire: {
    position: "absolute",
    bottom: widthPercentage(3),
    right: widthPercentage(3),
  },
});
