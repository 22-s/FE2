import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Smile from "../../assets/images/TestStep/smile.svg";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const widthPercentage = (percentage) => (windowWidth * percentage) / 100;

export default function TestStep1() {
  const navigation = useNavigation();

  const goBeforeResult = () => {
    navigation.navigate("TestResult");
  };

  const goNextStep = () => {
    navigation.navigate("TestStep2");
  };

  return (
    <View style={styles.container}>
      <Smile />
      <Text style={styles.title}>환영해요!</Text>
      <Text style={styles.subTitle}>모의고사 테스트를 시작하시겠어요?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button1} onPress={goBeforeResult}>
          <Text style={styles.Text1}>이전 결과 조회</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={goNextStep}>
          <Text style={styles.Text2}>시작하기</Text>
        </TouchableOpacity>
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
    backgroundColor: "white",
  },
  title: {
    fontFamily: "Pretendard",
    fontSize: 22,
    fontWeight: "700",
    color: "#383838",
    marginTop: 12,
  },
  subTitle: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
    color: "#5F5F5F",
    marginTop: 15,
  },
  buttonContainer: {
    width: widthPercentage(60),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "pink",
    marginTop: 15,
  },
  button1: {
    display: "flex",
    width: widthPercentage(28),
    height: widthPercentage(12),
    backgroundColor: "#D2E7FF",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  button2: {
    display: "flex",
    width: widthPercentage(28),
    height: widthPercentage(12),
    backgroundColor: "#61ABFF",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  Text1: {
    color: "#268AFF",
    fontSize: 14,
    fontWeight: "600",
  },
  Text2: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
