import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Question from "../../assets/images/Word/물음표.svg";
import Plane from "../../assets/images/Word/비행기.svg";

const ToggleContent = ({ term, description, example }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Question />
        <Text style={styles.title}>{term}이란?</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.quote}>
        <Plane style={styles.icon} />
        <Text style={styles.quoteText}>{"\""+example+"\""}</Text>
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
    alignItems: "center", // 수직 가운데 정렬
  },
  icon: {
    marginRight: 5, // 텍스트와 아이콘 간격
  },
  quoteText: {
    width: "92%",
    fontSize: 13,
    color: "#000",
    fontWeight: "600",
  },
});

export default ToggleContent;
