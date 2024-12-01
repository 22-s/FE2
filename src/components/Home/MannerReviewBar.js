import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
} from "react-native";
import Star from "../../assets/images/Home/star.svg";
import Arrow from "../../assets/images/Home/arrow_yellow.svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function MannerReviewBar() {
  const navigation = useNavigation();

  const handleClickReviewBox = () => {
    navigation.navigate("ReviewMannerList");
  };

  return (
    <TouchableOpacity style={styles.reviewBox} onPress={handleClickReviewBox}>
      <View style={{ flexDirection: "row" }}>
        <Star style={{ marginRight: 4 }} />
        <Text style={styles.reviewBoxTitle}>즐겨찾기</Text>
      </View>

      <Arrow />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  reviewBox: {
    flex: 1,
    backgroundColor: "#FFF1B9",
    borderRadius: 15,
    padding: widthPercentage(2.5),
    paddingLeft: widthPercentage(3),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reviewBoxTitle: {
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: "700",
    color: "#FBAA38",
  },
});
