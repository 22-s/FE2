import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import StarFull from "../../assets/images/Manner/bigStar_full.svg";
import StarEmpty from "../../assets/images/Manner/bigStar_empty.svg";
import { Image } from "react-native";
import axiosInstance from "../../api/axiosInstance";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const widthPercentage = (percentage) => (windowWidth * percentage) / 100;
const heightPercentage = (percentage) => (windowHeight * percentage) / 100;

export default function MannerContent({ route }) {
  const [isStarFull, setIsStarFull] = useState(false); // 초기 상태를 false로 설정
  const [mannerInfo, setMannerInfo] = useState({});
  const item = route.params.item;

  //매너 설명서 상세 정보 조회
  const fetchMannerInfo = async () => {
    try {
      console.log(item.mannerId);
      const response = await axiosInstance.get(`/api/manners/${item.mannerId}`);

      if (response.data.isSuccess) {
        setMannerInfo(response.data.result);
        setIsStarFull(response.data.result.favorited);
      }
    } catch (e) {
      console.log("매너설명서 상세 조회 실패: ", e);
    }
  };

  useEffect(() => {
    fetchMannerInfo();
  }, []);

  const addMannerLikes = async () => {
    try {
      console.log(item.mannerId);
      const response = await axiosInstance.post(
        `/api/manners/likes/${item.mannerId}`
      );
      console.log("야야야" + response.isSuccess);
      if (response.data.isSuccess) {
        Alert.alert("즐겨찾기에 추가되었습니다.");
        return true;
      } else {
        Alert.alert("문제가 발생했습니다.");
        return false;
      }
    } catch (e) {
      console.log("즐겨찾기 추가 문제 발생 : ", e);
      return false;
    }
  };

  const removeMannerLikes = async () => {
    try {
      console.log(item.mannerId);
      const response = await axiosInstance.delete(
        `/api/manners/likes/${item.mannerId}`
      );
      if (response.data.isSuccess) {
        Alert.alert("즐겨찾기에서 삭제되었습니다.");
        return true;
      } else {
        Alert.alert("문제가 발생했습니다.");
        return false;
      }
    } catch (e) {
      console.log("즐겨찾기 추가 문제 발생 : ", e);
      return false;
    }
  };

  const toggleStar = async () => {
    if (isStarFull) {
      //즐겨찾기 삭제
      const isSuccess = await removeMannerLikes();
      if (isSuccess) {
        setIsStarFull(false);
      }
    } else {
      //즐겨찾기 추가
      const isSuccess = await addMannerLikes();
      if (isSuccess) {
        setIsStarFull(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.listArea}>
        <Image
          source={{
            uri: item.imageUrl,
          }}
          style={styles.imageContainer}
        />
        <View style={styles.categoryBox}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <View style={styles.titleArea}>
          <Text style={styles.titleText}>{mannerInfo.title}</Text>
          <TouchableOpacity onPress={toggleStar}>
            {isStarFull ? <StarFull /> : <StarEmpty />}
          </TouchableOpacity>
        </View>

        <View style={styles.line} />
        <View style={styles.contentBox}>
          <Text style={styles.contentText}>{mannerInfo.content}</Text>
        </View>
      </ScrollView>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 7,
    marginBottom: 10,
    flexDirection: "row",
  },
  titleText: {
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: 19,
    fontWeight: "bold",
    color: "#383F49",
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
    fontSize: 15,
    fontWeight: "semibold",
    color: "#353535",
  },
});
