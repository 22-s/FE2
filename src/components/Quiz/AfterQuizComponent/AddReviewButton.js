import React from "react";

import { StyleSheet, TouchableOpacity, Text } from "react-native";

const AddReviewButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>즐겨찾기 추가</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 146,

    height: 53,

    backgroundColor: "#61ABFF",

    borderRadius: 16,

    justifyContent: "center",
  },

  text: {
    color: "#FFF",

    textAlign: "center",

    fontSize: 16,

    fontWeight: "600",
  },
});

export default AddReviewButton;
