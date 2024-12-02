import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Question from "../../assets/images/Word/물음표.svg";
import Plane from "../../assets/images/Word/비행기.svg";

// 받침 여부를 확인하는 함수
const hasFinalConsonant = (term) => {
  const lastChar = term[term.length - 1]; // 마지막 글자
  const code = lastChar.charCodeAt(0); // Unicode 값
  // 한글 유니코드 범위 확인 후 종성 여부 계산
  if (code >= 0xac00 && code <= 0xd7a3) {
    const jongseong = (code - 0xac00) % 28;
    return jongseong !== 0;
  }
  return false; // 한글이 아니면 받침 없음으로 처리
};

const ToggleContent = ({ term, description, example }) => {
  const titleSuffix = hasFinalConsonant(term) ? "이란?" : "란?";
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Question />
        <Text style={styles.title}>
          {term + titleSuffix}
        </Text>
      </View>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.quote}>
        <Plane style={styles.icon} />
        <Text style={styles.quoteText}>{"\"" + example + "\""}</Text>
      </View>
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
  icon: {
    marginRight: 5,
  },
  quoteText: {
    width: "92%",
    fontSize: 13,
    color: "#000",
    fontWeight: "600",
  },
});

export default ToggleContent;
