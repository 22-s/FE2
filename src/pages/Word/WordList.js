import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Pic from "../../assets/images/Word/회계재무.svg";
import Toggle from "../../components/Word/Toggle";

const WordList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <View style={styles.left}>
          <Text style={styles.top}>정확한 회계 재무</Text>
          <Text style={styles.down}>회계/재무</Text>
        </View>
        <Pic width={85} height={85} />
      </View>
      <View style={styles.content}>
        <Toggle />
        <Toggle />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    overflow: "hidden",
  },
  title: {
    position: "absolute",
    top: 143.01,
    left: 60,
    width: 294,
    height: 136,
    borderRadius: 24.756,
    backgroundColor: "#F4F4F4",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 48,
  },
  left: {
    marginRight: 30,
  },
  top: {
    color: "#303437",
    fontSize: 16.416,
    fontWeight: "600",
  },
  down: {
    color: "#000",
    fontSize: 22.386,
    fontWeight: "600",
  },
  content: {
    position: "absolute",
    top: 330,
    width: 294,
  },
});

export default WordList;
