import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LockImg from "../../../assets/images/QuizList/Lock.svg";

const LockedQuizListComponent = ({ content }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentArea}>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {content}
        </Text>
      </View>
      <LockImg style={styles.lockImg} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 359,
    height: 55.3,
    backgroundColor: "rgba(210, 210, 210, 0.5)",
    borderRadius: 10,
    marginTop: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  contentArea: {
    position: "relative",
    width: "90%",
    height: "100%",
    justifyContent: "center",
    alignItems: "left",
  },
  text: {
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "600",
    color: "#B8B8B8",
    zIndex: 1, // 이미지 위에 표시되지 않도록 텍스트의 zIndex 설정
  },
  lockImg: {
    position: "absolute", // 텍스트 위에 겹치게 설정
    width: 29,
    height: 29,
    zIndex: 2,
  },
});

export default LockedQuizListComponent;
