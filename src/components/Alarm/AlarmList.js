// components/Alarm/AlarmList.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AlarmList = ({ type, title, description, time }) => {
  const getDotColor = () => {
    switch (type) {
      case "daily":
        return "#FFD700"; // 노란색
      case "review":
        return "#FF6B6B"; // 붉은색
      case "test":
        return "#BDBDBD"; // 회색
      default:
        return "#D3D3D3";
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.dot, { backgroundColor: getDotColor() }]} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    position: "relative",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: "absolute",
    top: 18,
    left: 14,
  },
  textContainer: {
    marginLeft: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 6,
    color: "#5E5E5E",
  },
  desc: {
    fontSize: 14,
    color: "#4E4E4E",
  },
  time: {
    position: "absolute",
    top: 12,
    right: 16,
    fontSize: 12,
    color: "#BDBDBD",
  },
});

export default AlarmList;
