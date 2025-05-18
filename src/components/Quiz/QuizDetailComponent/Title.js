import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const Title = ({ content, review, quizId, solved, isSubmit }) => {
  const [containerHeight, setContainerHeight] = useState(50);

  const handleTextLayout = (e) => {
    const { height } = e.nativeEvent.layout;
    if (height > 20) {
      setContainerHeight(60); // 두 줄 이상
    } else {
      setContainerHeight(50); // 한 줄
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentArea}>
        <Text style={styles.text} onLayout={handleTextLayout}>
          {content}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 359,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 16,
  },
  contentArea: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
    paddingRight: 10,
  },
  bookMarkButton: {
    width: 30,
    height: 30,
    marginLeft: 15,
  },
});

export default Title;
