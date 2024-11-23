import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Question from "../../assets/images/Word/물음표.svg";
import Plane from "../../assets/images/Word/비행기.svg";

const ToggleContent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Question />
        <Text style={styles.title}>타임라인이란?</Text>
      </View>
      <Text style={styles.description}>
        프로젝트 또는 업무의 완료 기한을 포함한 일정 계획
      </Text>
      <Text style={styles.quote}>
        <View style={styles.iconWrapper}>
          <Plane />
        </View>
        <Text style={styles.quoteText}>
          "프로젝트 타임라인을 따라 진행 중입니다."
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#268AFF",
    borderRadius: 10,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
    marginLeft: 5,
  },
  description: {
    fontSize: 11,
    color: "#000",
    marginBottom: 10,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  quote: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    marginRight: 5,
  },
  quoteText: {
    fontSize: 13,
    color: "#000",
    fontWeight: "600",
  },
});

export default ToggleContent;
