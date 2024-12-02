import React, { useState, useEffect } from "react";
import { View, StyleSheet, Touchable, Alert } from "react-native";
import Title from "../../components/Quiz/QuizDetailComponent/Title";
import Content from "../../components/Quiz/QuizDetailComponent/Content";
import O from "../../assets/images/QuizDetail/O.svg";
import X from "../../assets/images/QuizDetail/X.svg";
import CorrectModal from "../../components/Quiz/QuizDetailComponent/CorrectModal";
import NavButtonNext from "../../components/Quiz/AfterQuizComponent/NavButtonNext";
import NavButtonPrev from "../../components/Quiz/AfterQuizComponent/NavButtonPrev";
import OpenModalButton from "../../components/Quiz/AfterQuizComponent/OpenModalButton";
import AddReviewButton from "../../components/Quiz/AfterQuizComponent/AddReviewButton";

import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const QuizDetail = ({ route }) => {
  const navigation = useNavigation();
  const { quizId, quizzes, firstQuizId, lastQuizId, isSubmit: initialIsSubmit } = route.params;
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
    // setIsQuizId(quizId);
    const token = await AsyncStorage.getItem("accessToken");
    console.log("토큰이당: " + token);

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
      const response = await axios.get(
        `https://22s.store/api/quiz/${quizId}`,
        { headers }
      );
      console.log(response.data);
      console.log("solved: "+response.data.result.solved);
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

  const submitAnswer = async (quizId, selectedAnswer) => {
    console.log("quizId:", quizId);
    const token = await AsyncStorage.getItem("accessToken");
    console.log("토큰이당: " + token);

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
      const response = await axios.post(
        `https://22s.store/api/quiz/${quizId}/submit`,
        { selectedAnswer }, // Request body에 selectedAnswer 추가
        { headers }
      );
      console.log(response.data);

      if (response.data.isSuccess) {
        setAnswer(response.data.result);
        setIsCorrect(response.data.result.correct); // 정답 여부 설정
        //fetchQuizzes(quizId);
        setModalVisible(true); // 모달 열기
        setIsSubmit(true);
        setIsSolved(true);
        
      } else {
        console.error("데이터를 가져오지 못했습니다:", response.data.message);
        Alert.alert("오류", response.data.message);
      }
    } catch (error) {
      console.error("해설 데이터를 가져오는 중 오류가 발생했습니다:", error);
      Alert.alert("오류", "해설 데이터를 가져오는 중 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchQuizzes(quizId);
  }, []);

  // const updateQuizId = async (quizId) => {
  //   console.log("업데이트 퀴즈 아이디: " + quizId);
  //   navigation.replace("QuizDetail", { quizId, firstQuizId, lastQuizId } )
  // };

  const nextQuiz = () => {
    if (isSolved) {
      if (currentIndex < quizzes.length - 1) {
        const nextQuizId = quizzes[currentIndex + 1].quizId;
        navigation.replace("QuizDetail", {
          quizId: nextQuizId,
          quizzes,
          firstQuizId,
          lastQuizId,
        });
      } else {
        Alert.alert("마지막 퀴즈입니다.");
      }
    } else {
      Alert.alert("현재 퀴즈를 풀어야 넘어갈 수 있습니다.");
    }
  };

  const prevQuiz = () => {
    if (isSolved) {
      if (currentIndex > 0) {
        const prevQuizId = quizzes[currentIndex - 1].quizId;
        navigation.replace("QuizDetail", {
          quizId: prevQuizId,
          quizzes,
          firstQuizId,
          lastQuizId,
        });
      } else {
        Alert.alert("이전 퀴즈가 없습니다.");
      }
    } else {
      Alert.alert("현재 퀴즈를 풀어야 넘어갈 수 있습니다.");
    }
  };

  const addReview = async () => {
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
      if (bookmark) {
        Alert.alert("이미 복습리스트에 추가되어 있습니다.");
      } else {
        // 복습하기 추가 API 호출
        await axios.post(`https://22s.store/api/quiz/${quizId}/review`, {
          headers,
        });
        Alert.alert("알림", "복습하기 리스트에 추가하였습니다.");
        // setBookmark((prev) => !prev); // 상태 변경
        // fetchQuizzes(quizId);
        // setIsSubmit(true);
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
    <View style={styles.container}>
      <View marginBottom={12}>
        <Title content={quiz.question} review={quiz.inReviewList} quizId={quizId} solved={quiz.solved} isSubmit={quiz.isSubmit}/>
      </View>
      <View marginBottom={17}>
        <Content content={quiz.questionDetail} />
      </View>
      <View style={styles.buttonContainer}>
        <NavButtonPrev onPress={() => prevQuiz(quizId)}/>
        <NavButtonNext onPress={() => nextQuiz(quizId)}/>
      </View>
      { isSubmit ?
      <View style={styles.bottomContainer}>
        <OpenModalButton onPress={openModal} />
        <AddReviewButton onPress={addReview}/>
      </View>
      :
      <View style={styles.answer}>
        <TouchableOpacity onPress={() => submitAnswer(quizId, "O")}>
          <O width={165} height={75} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => submitAnswer(quizId, "X")}>
          <X width={165} height={75} />
        </TouchableOpacity>
      </View>
      }

      <CorrectModal
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

export default QuizDetail;
