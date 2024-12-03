import React from "react";
import { View, StyleSheet, ScrollView, Dimensions, Text, Alert, Image } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import LinkButton from "../../components/BuizContents/LinkButton";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

const LinkCopy = () => {
  const url = "https://newneek.co/@techissue/article/12568";
  Clipboard.setString(url); // 클립보드에 URL 복사
  Alert.alert("알림", "링크가 클립보드에 복사되었습니다.");
};

export default function BuizContent({ route }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.listArea}>
        <Image style={styles.imageContainer} source={{ uri: item.images.url }} />
        <View style={styles.categoryBox}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <View style={styles.titleArea}>
          <Text style={styles.titleText}>{item.title}</Text>
        </View>
        <View style={styles.dateArea}>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <View style={styles.sourcesArea}>
          <View style={styles.sourcesProfile}></View>
          <Text style={styles.sourcesName}>뉴닉</Text>
          <Text style={styles.sourcesTag}>@</Text>
          <Text style={styles.sourcesTag}>newneek</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.contentBox}>
          <Text style={styles.categoryText}>{item.content}</Text>
        </View>
      </ScrollView>
      <LinkButton onPress={LinkCopy} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  listArea: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  imageContainer: {
    width: "100%",
    minHeight: widthPercentage(50),
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  categoryBox: {
    minWidth: 60,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    height: 25,
    backgroundColor: "#F2F2F2",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  categoryText: {
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "bold",
    color: "#72777A",
  },
  titleArea: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    paddingLeft: 7,
  },
  titleText: {
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: 19,
    fontWeight: "bold",
    color: "#383F49",
  },
  dateArea: {
    width: "100%",
    height: 25,
    justifyContent: "center",
    paddingLeft: 7,
  },
  dateText: {
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "semibold",
    color: "#72777A",
  },
  sourcesArea: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 7,
  },
  sourcesProfile: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: "blue",
    marginRight: 5,
  },
  sourcesName: {
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "bold",
    color: "#313131",
    marginRight: 7,
  },
  sourcesTag: {
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "semibold",
    color: "#B0B0B0",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#DDDDDD",
  },
  contentBox: {
    width: "100%",
    padding: 7,
    paddingTop: 10,
  },
  contentText: {
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "semibold",
    color: "#353535",
  },
});
