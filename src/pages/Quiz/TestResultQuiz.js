import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import Title from "../../components/Quiz/QuizDetailComponent/Title";
import Content from "../../components/Quiz/QuizDetailComponent/Content";
import CommentaryModal from "../../components/Quiz/QuizDetailComponent/CommentaryModal";
import NavButtonNext from "../../components/Quiz/AfterQuizComponent/NavButtonNext";
import NavButtonPrev from "../../components/Quiz/AfterQuizComponent/NavButtonPrev";
import OpenModalButton from "../../components/Quiz/AfterQuizComponent/OpenModalButton";
import AddReviewButton from "../../components/Quiz/AfterQuizComponent/AddReviewButton";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "../../api/axiosInstance";

const TestResultQuiz = ({ route }) => {
  const navigation = useNavigation();
  const { quizId, quizzes, firstQuizId, lastQuizId, correct } = route.params;
  //const [ currentQuizId, setIsQuizId ] = useState(quizId);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quiz, setQuiz] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  const currentIndex = quizzes.findIndex((q) => q.quizId === quizId);

  const openModal = () => {
    setModalVisible(true);
  };

  const fetchQuizzes = async (quizId) => {
    console.log("quizId:", quizId);

    try {
      const response = await axiosInstance.get(`/api/quiz/${quizId}`);
      console.log(response.data);
      console.log("solved: " + response.data.result.solved);
      if (response.data.isSuccess) {
        setQuiz(response.data.result);
        setIsSolved(response.data.result.solved);
        setIsSubmit(false);
        setModalVisible(false);
        setBookmark(response.data.result.inReviewList);
      } else {
        console.error("데이터를 가져오지 못했습니다:", response.data.message);
        Alert.alert("오류", response.data.message);
      }
    } catch (error) {
      console.error("퀴즈 데이터를 가져오는 중 오류가 발생했습니다:", error);
      Alert.alert("오류", "퀴즈 데이터를 가져오는 중 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchQuizzes(quizId);
  }, []);

  const nextQuiz = () => {
    if (currentIndex < quizzes.length - 1) {
      const nextQuizId = quizzes[currentIndex + 1].quizId;
      navigation.replace("TestResultQuiz", {
        quizId: nextQuizId,
        quizzes,
        firstQuizId,
        lastQuizId,
        correct: quizzes[currentIndex + 1].correct,
      });
    } else {
      Alert.alert("마지막 퀴즈입니다.");
    }
  };

  const prevQuiz = () => {
    if (currentIndex > 0) {
      const prevQuizId = quizzes[currentIndex - 1].quizId;
      navigation.replace("TestResultQuiz", {
        quizId: prevQuizId,
        quizzes,
        firstQuizId,
        lastQuizId,
        correct: quizzes[currentIndex - 1].correct,
      });
    } else {
      Alert.alert("이전 퀴즈가 없습니다.");
    }
  };

  const addReview = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    console.log("토큰이당: " + token);
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
      if (bookmark) {
        Alert.alert("이미 즐겨찾기 리스트에 추가되어 있습니다.");
      } else {
        // 복습하기 추가 API 호출
        await axiosInstance.post(`/api/quiz/${quizId}/review`, {
          headers,
        });
        Alert.alert("알림", "즐겨찾기 리스트에 추가하였습니다.");
      }
    } catch (error) {
      // console.error("즐겨찾기 API 요청 중 오류가 발생했습니다:", error);
      // Alert.alert(
      //   "오류",
      //   bookmark
      //     ? "복습하기 해제 중 문제가 발생했습니다."
      //     : "복습하기 추가 중 문제가 발생했습니다."
      // );
      Alert.alert("이미 즐겨찾기 리스트에 추가되어 있습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topText}>
          {correct ? (
            <Text style={{ color: "#81E381" }}>정답</Text>
          ) : (
            <Text style={{ color: "#FF7A67" }}>틀림</Text>
          )}
        </Text>
      </View>
      <View marginBottom={12}>
        <Title
          content={quiz.question}
          review={quiz.inReviewList}
          quizId={quizId}
          solved={quiz.solved}
          isSubmit={quiz.isSubmit}
        />
      </View>
      <View marginBottom={17}>
        <Content content={quiz.questionDetail} />
      </View>
      <View style={styles.buttonContainer}>
        <NavButtonPrev onPress={() => prevQuiz(quizId)} />
        <NavButtonNext onPress={() => nextQuiz(quizId)} />
      </View>

      <View style={styles.bottomContainer}>
        <OpenModalButton onPress={openModal} />
        <AddReviewButton onPress={addReview} />
      </View>

      <CommentaryModal
        content={quiz.description}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        isCorrect={isCorrect}
        review={bookmark}
        quizId={quizId}
        updateQuizId={nextQuiz}
        isSubmit={quiz.isSubmit}
        firstQuizId={firstQuizId}
        lastQuizId={lastQuizId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
  },
  topBar: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  topText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#303437",
  },
  answer: {
    width: 360,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    position: "absolute",
    zIndex: 10,
  },
  bottomContainer: {
    width: 330,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default TestResultQuiz;
