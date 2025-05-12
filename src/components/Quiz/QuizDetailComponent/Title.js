import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import BookMarkButton from "../../../assets/images/QuizList/Bookmark.svg";
import BookmarkFilled from "../../../assets/images/QuizList/BookmarkFilled.svg";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "../../../api/axiosInstance";

const Title = ({ content, review, quizId, solved, isSubmit }) => {
  const navigation = useNavigation();

  const handleReview = async () => {
    try {
      if (!solved) {
        Alert.alert("답을 제출해야 복습 리스트에 추가할 수 있습니다.");
      } else {
        if (review) {
          await axiosInstance.delete(`/api/quiz/${quizId}/review`);
          Alert.alert("복습 리스트에서 삭제하였습니다.");
        } else {
          await axiosInstance.post(`/api/quiz/${quizId}/review`, {});
          Alert.alert("복습 리스트에 추가하였습니다.");
        }

        navigation.replace("QuizDetail", {
          quizId,
          review: !review,
          isSubmit,
        });
      }
    } catch (error) {
      console.error("복습하기 에러:", error);
      Alert.alert("복습 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentArea}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.text}>{content}</Text>
        </ScrollView>
        {/* 북마크 버튼 원하면 아래 주석 해제 */}
        {/* <TouchableOpacity onPress={handleReview}>
          {solved ? (
            review ? (
              <BookmarkFilled style={styles.bookMarkButton} />
            ) : (
              <BookMarkButton style={styles.bookMarkButton} />
            )
          ) : (
            <BookMarkButton style={styles.bookMarkButton} />
          )}
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
