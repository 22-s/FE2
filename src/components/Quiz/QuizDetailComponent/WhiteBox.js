import React from "react";
import { View, StyleSheet } from "react-native";

const whiteBox = ({ minHeight, children }) => {
  return <View style={[styles.container, { minHeight }]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingTop: 22,
  },
});

export default whiteBox;
