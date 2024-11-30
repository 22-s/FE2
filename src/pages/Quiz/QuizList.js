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

const CATEGORY_DEFAULT = "기본 매너"; // 카테고리 상수화

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]); // 퀴즈 데이터 저장
  const [loading, setLoading] = useState(true); // 로딩 상태
  const navigation = useNavigation();

  const fetchQuizzes = async (category) => {
    console.log("Fetching quizzes for category:", category);
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

      if (response.data.isSuccess) {
        setQuizzes(response.data.result); // 퀴즈 데이터 저장
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

  const handleQuizPress = (quizId) => {
    navigation.navigate("QuizDetail", { quizId });
  };

  useEffect(() => {
    fetchQuizzes(CATEGORY_DEFAULT);
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
              content={quiz.question}
              onPress={() => handleQuizPress(quiz.quizId)}
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

export default QuizList;
