import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import QuizListComponent from "../../components/Quiz/QuizListComponent/QuizComponent";
import LockedQuizListComponent from "../../components/Quiz/QuizListComponent/LockedQuizListComponent";
import axiosInstance from "../../api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

//const CATEGORY_DEFAULT = "기본 매너"; // 카테고리 상수화

const QuizLikeList = ({route}) => {
  const { category } = route.params;
  const [quizzes, setQuizzes] = useState([]); // 퀴즈 데이터 저장
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [firstQuizId, setFirstQuizId] = useState(null); // 첫 번째 퀴즈 ID
  const [lastQuizId, setLastQuizId] = useState(null); // 마지막 퀴즈 ID
  const navigation = useNavigation();

  const fetchQuizzes = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    console.log("토큰이당: "+token);
    
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
    
    try {
      setLoading(true);
      const response = await axios.get(`https://22s.store/api/quiz/review`, { headers });
      console.log(response.data);
  
      if (response.data.isSuccess) {
        const quizData = response.data.result;
        setQuizzes(quizData); // 퀴즈 데이터 저장
        if (quizData.length > 0) {
          setFirstQuizId(quizData[0].quizId); // 첫 번째 퀴즈 ID 저장
          setLastQuizId(quizData[quizData.length - 1].quizId); // 마지막 퀴즈 ID 저장
          console.log(firstQuizId + " " + lastQuizId);
        }
      } else {
        console.error("데이터를 가져오지 못했습니다:", response.data.message);
        Alert.alert("오류", response.data.message);
      }
    } catch (error) {
      console.error("퀴즈 데이터를 가져오는 중 오류가 발생했습니다:", error);
      Alert.alert("오류", "퀴즈 데이터를 가져오는 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuizPress = (quizId, review) => {
    navigation.navigate("QuizDetail", { quizId, review, firstQuizId, lastQuizId });
  };

  useEffect(() => {
    fetchQuizzes(category);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#268AFF" />
      </View>
    );
  }

  if (quizzes.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>퀴즈 데이터가 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {quizzes.map((quiz) => {
          return quiz.locked ? (
            <LockedQuizListComponent key={quiz.quizId} content={quiz.question} />
          ) : (
            <QuizListComponent
              key={quiz.quizId}
              quizId={quiz.quizId}
              content={quiz.question}
              correct={quiz.correct}
              review={quiz.inReviewList}
              solved={quiz.solved}
              onPress={() => handleQuizPress(quiz.quizId, quiz.review)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F3F3",
    height: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default QuizLikeList;
