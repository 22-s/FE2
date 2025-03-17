import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import WriteArm from "../../assets/images/Home/writeArm.png";
import Arrow from "../../assets/images/Home/arrow_orange.svg";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const widthPercentage = (percentage) => (windowWidth * percentage) / 100;

export default function TestBox({ name, score, percentage }) {
  const navigation = useNavigation();

  const goTest = () => {
    navigation.navigate("TestStep1");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styles.lefttitle}>{name}님의 매너 점수는?</Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={goTest}
        >
          <Text style={styles.righttitle}>모의고사 풀러 가기</Text>
          <Arrow style={{ marginLeft: 4 }} onPress={goTest} />
        </TouchableOpacity>
      </View>
      <View style={styles.innerBox}>
        <View style={styles.innerContentBox}>
          <Text style={styles.innerBoxTitle}>이전 점수</Text>
          <Text style={styles.innerBoxContent}>{score}점</Text>
        </View>
        <View style={styles.innerContentBox}>
          <Text style={styles.innerBoxTitle}>상위</Text>
          <Text style={styles.innerBoxContent2}>{percentage}%</Text>
        </View>
      </View>
      <Image source={WriteArm} style={styles.writeArm} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: widthPercentage(87),
    height: widthPercentage(32),
    backgroundColor: "#F1EFFF",
    padding: 17,
    borderRadius: 20,
  },
  titleArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 7,
  },
  lefttitle: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "700",
    color: "#484848",
  },
  righttitle: {
    fontFamily: "Pretendard",
    fontSize: 13,
    fontWeight: "400",
    color: "#404446",
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
  writeArm: {
    width: widthPercentage(35),
    height: widthPercentage(30),
    position: "relative",
    alignSelf: "flex-end",
    marginTop: widthPercentage(-22.5),
    marginRight: widthPercentage(-4),
  },
  innerBox: {
    // flex: 1,
    width: widthPercentage(40),
    height: widthPercentage(16),
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    marginLeft: 7,
    marginTop: 10,
  },
  innerContentBox: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: widthPercentage(13),
    gap: 5,
    // backgroundColor: "green",
  },
  innerBoxTitle: {
    fontFamily: "Pretendard",
    fontSize: 9.5,
    fontWeight: "700",
    color: "#5A5A5A",
  },
  innerBoxContent: {
    fontFamily: "Pretendard",
    fontSize: 21,
    fontWeight: "900",
    color: "#404446",
  },
  innerBoxContent2: {
    fontFamily: "Pretendard",
    fontSize: 21,
    fontWeight: "900",
    color: "#FCCC63",
  },
});
