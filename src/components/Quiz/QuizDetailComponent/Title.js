import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import WhiteBox from "../../../components/Quiz/QuizDetailComponent/WhiteBox";
import BookMarkButton from "../../../assets/images/QuizList/Bookmark.svg";
import BookmarkFilled from "../../../assets/images/QuizList/BookmarkFilled.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Title = ({ content, review, quizId, solved, isSubmit }) => {
  const navigation = useNavigation();
  //const [bookmark, setBookmark] = useState(review);
  const [containerHeight, setContainerHeight] = useState(50); // 기본 높이를 50으로 설정

  const handleReview = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    console.log("토큰이당: " + token);
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
      if(!solved) {
        Alert.alert('답을 제출해야 복습 리스트에 추가할 수 있습니다.');
      } else {
        if (review) {
          // 복습하기 해제 API 호출
          await axios.delete(`https://22s.store/api/quiz/${quizId}/review`, {
            headers,
          });
          Alert.alert("알림", "복습하기 리스트에서 삭제하였습니다.");
        } else {
          // 복습하기 추가 API 호출
          await axios.post(`https://22s.store/api/quiz/${quizId}/review`, {}, {
            headers,
          });
          Alert.alert("알림", "복습하기 리스트에 추가하였습니다.");
        }
        //setBookmark((prev) => !prev); // 상태 변경

        navigation.replace("QuizDetail", {
          quizId,
          review: !review, // review 상태 반대로 전달
          isSubmit, // 유지하고 싶은 값 전달
        });
      }
    } catch (error) {
      console.error("복습하기 API 요청 중 오류가 발생했습니다:", error);
      Alert.alert(
        "오류",
        review
          ? "복습하기 해제 중 문제가 발생했습니다."
          : "복습하기 추가 중 문제가 발생했습니다."
      );
    }
  };

  const handleTextLayout = (e) => {
    const { height } = e.nativeEvent.layout;
    // 텍스트 높이에 따라 컨테이너 높이를 조정
    if (height > 20) {
      setContainerHeight(60); // 두 줄 이상
    } else {
      setContainerHeight(50); // 한 줄
    }
  };

  return (
    <View style={[styles.container, { height: containerHeight }]}>
      <View style={styles.contentArea}>
        <Text style={styles.text} onLayout={handleTextLayout}>
          {content}
        </Text>
        {/* <TouchableOpacity onPress={handleReview}>
          {solved ?
          (review ? (
            <BookmarkFilled style={styles.bookMarkButton} />
          ) : (
            <BookMarkButton style={styles.bookMarkButton} />
          ))
          : (
            <BookMarkButton style={styles.bookMarkButton} />
          )
          }
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 359,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 10,
  },
  contentArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 20,
    // backgroundColor: "yellow"
  },
  text: {
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "600",
  },
  bookMarkButton: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
});

export default Title;
