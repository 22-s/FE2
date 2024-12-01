import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Correct from "../../../assets/images/QuizList/Correct.svg";
import Wrong from "../../../assets/images/QuizList/Wrong.svg";
import BookMarkButton from "../../../assets/images/QuizList/Bookmark.svg";
import BookmarkFilled from "../../../assets/images/QuizList/BookmarkFilled.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const QuizListComponent = ({ quizId, content, correct, review, onPress, solved }) => {
  const [bookmark, setBookmark] = useState(review);

  const handleReview = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    console.log("토큰이당: "+token);
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    // console.log(quizId);
    // console.log("요청 URL: ", `https://22s.store/api/quiz/${quizId}/review`);
    // console.log("Authorization 헤더: ", headers.Authorization);
    try {
      if(!solved) {
        Alert.alert('답을 제출해야 복습 리스트에 추가할 수 있습니다.');
      } else {
      if (bookmark) {
        // 복습하기 해제 API 호출
        await axios.delete(`https://22s.store/api/quiz/${quizId}/review`, {
          headers,
        });
        Alert.alert("알림", "복습하기 리스트에서 삭제하였습니다.");
      } else {
        // 복습하기 추가 API 호출
        await axios.post(`https://22s.store/api/quiz/${quizId}/review`, {
          headers,
        });
        Alert.alert("알림", "복습하기 리스트에 추가하였습니다.");
      }
      setBookmark((prev) => !prev); // 상태 변경
    }
    } catch (error) {
      console.error("복습하기 API 요청 중 오류가 발생했습니다:", error);
      Alert.alert(
        "오류",
        bookmark
          ? "복습하기 해제 중 문제가 발생했습니다."
          : "복습하기 추가 중 문제가 발생했습니다."
      );
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {solved ? (
        correct ? (
          <Correct style={styles.answer} />
        ) : (
          <Wrong style={styles.answer} />
        )
      ) : (
        <View style={styles.answer}></View>
      )}      
      <View style={styles.contentArea}>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{content}</Text>
        <TouchableOpacity onPress={handleReview}>
          {solved ? (
            bookmark ? (
              <BookmarkFilled style={styles.bookMarkButton} />
          ) : (
              <BookMarkButton style={styles.bookMarkButton} />
          )
          ) : (
            <BookMarkButton style={styles.bookMarkButton} />
          )}
          
        </TouchableOpacity>
        
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 359,
    height: 77.3,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: 11,
    // alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20
  },
  text: {
    width: '85%',
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "600",
  },
  contentArea: {

    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    // backgroundColor: 'yellow'
  },
  answer: {
    position: "absolute",
    left: 10,
    top: 7,
  },
  bookMarkButton: {
    width: 30,
    height: 30,
    marginRight: 10
  },
});

export default QuizListComponent;
