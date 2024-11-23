import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Star from "../../assets/images/Manner/star_full.svg";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function MannerListBox({ title, content, images }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("MannerContent")}>
      <View style={styles.block}>
        <View style={styles.contentBox}>
          <View style={styles.textArea}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {title}
              </Text>
              <Star />
            </View>
            <View style={styles.textAreaGap} />
            <Text style={styles.content} numberOfLines={2} ellipsizeMode="tail">
              {content}
            </Text>
          </View>

          <View style={styles.imageContainer} />
        </View>
      </View>

      <View style={styles.line} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  block: {
    width: "100%",
    height: widthPercentage(31),
    backgroundColor: "white",
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  contentBox: {
    width: "100%",
    height: widthPercentage(18),
    // backgroundColor: "lightgreen",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -4,
    //marginTop: 25,
  },
  imageContainer: {
    width: widthPercentage(16),
    height: widthPercentage(16),
    borderRadius: 10,
    overflow: "hidden", // 내부 이미지가 컨테이너 경계를 넘어서지 않도록 함
    backgroundColor: "pink",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' or 'contain'
  },
  textArea: {
    width: widthPercentage(69),
    height: widthPercentage(18),
    //backgroundColor: "gray",
    paddingRight: 15,
  },
  title: {
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: "700",
    color: "#232323",
    paddingRight: 5,
  },
  content: {
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "500",
    color: "#232323",
  },
  textAreaGap: {
    width: widthPercentage(65),
    height: widthPercentage(1),
    //backgroundColor: "gray",
  },
  line: {
    width: "100%",
    height: widthPercentage(0.3),
    backgroundColor: "#e5e5e7",
  },
  highBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 2,
    //backgroundColor: 'pink',
  },
  highText: {
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "bold",
    color: "#40A2DB",
  },
  lowBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: 'pink',
  },
  lowText: {
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 5,
    paddingRight: 8,
  },
  date: {
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "500",
    color: "#acacac",
  },
});