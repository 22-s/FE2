import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Correct from "../../../assets/images/QuizList/Correct.svg";
import Wrong from "../../../assets/images/QuizList/Wrong.svg";
import NonComplete from "../../../assets/images/QuizList/NonComplete.svg";
import CompleteRviw from "../../../assets/images/QuizList/CompleteRviw.svg";
import BookMarkButton from "../../../assets/images/QuizList/Bookmark.svg";
import BookmarkFilled from "../../../assets/images/QuizList/BookmarkFilled.svg";
import axiosInstance from "../../../api/axiosInstance";

const QuizListComponent = ({
  quizId,
  content,
  correct,
  review,
  onPress,
  solved,
  retriedToday,
}) => {
  const [bookmark, setBookmark] = useState(review);

  const handleReview = async () => {
    try {
      if (solved !== undefined && solved !== null) {
        if (!solved) {
          Alert.alert("답을 제출해야 즐겨찾기 리스트에 추가할 수 있습니다.");
          return;
        }
      } else {
        // solved가 존재하지 않는 경우에는 retriedToday를 확인
        if (retriedToday === null) {
          Alert.alert("오늘 복습한 문제만 즐겨찾기 할 수 있습니다.");
          return;
        }
      }

      // 북마크 상태 토글 API 호출
      if (bookmark) {
        await axiosInstance.delete(`/api/quiz/${quizId}/review`);
        Alert.alert("알림", "즐겨찾기 리스트에서 삭제하였습니다.");
      } else {
        await axiosInstance.post(`/api/quiz/${quizId}/review`);
        Alert.alert("알림", "즐겨찾기 리스트에 추가하였습니다.");
      }
      setBookmark((prev) => !prev);
    } catch (error) {
      console.error("복습하기 API 요청 중 오류가 발생했습니다:", error);
      Alert.alert(
        "오류",
        bookmark
          ? "즐겨찾기 해제 중 문제가 발생했습니다."
          : "즐겨찾기 추가 중 문제가 발생했습니다."
      );
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {retriedToday == null ? (
        solved ? (
          correct ? (
            <Correct style={styles.answer} />
          ) : (
            <Wrong style={styles.answer} />
          )
        ) : (
          <View style={styles.answer} />
        )
      ) : retriedToday ? (
        <CompleteRviw style={styles.answer} />
      ) : (
        <NonComplete style={styles.answer} />
      )}
      <View style={styles.contentArea}>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {content}
        </Text>
        <TouchableOpacity onPress={handleReview}>
          {solved !== undefined && solved !== null ? (
            solved ? (
              bookmark ? (
                <BookmarkFilled style={styles.bookMarkButton} />
              ) : (
                <BookMarkButton style={styles.bookMarkButton} />
              )
            ) : (
              <BookMarkButton style={styles.bookMarkButton} />
            )
          ) : retriedToday !== null ? (
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
    justifyContent: "center",
    paddingLeft: 20,
  },
  text: {
    width: "85%",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "600",
  },
  contentArea: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
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
    marginRight: 10,
  },
});

export default QuizListComponent;
