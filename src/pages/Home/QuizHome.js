import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../../components/Home/searchBarQuiz";
import ReviewBar from "../../components/Home/reviewBarQuiz";
import TitleBar from "../../components/Home/titleBar";
import ReviewQuizBox from "../../components/Home/ReviewQuizBox";
import SolveQuizBox from "../../components/Home/SolveQuizBox";
import TestBox from "../../components/Home/TestBox";
import QuizList from "../../components/Home/quizList";
import LockQuizList from "../../components/Home/LockQuizList";
import axiosInstance from "../../api/axiosInstance";

const windowWidth = Dimensions.get("window").width;

export default function QuizHome() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [progressRate, setProgressRate] = useState(0);
  const [latestMockExamScore, setLatestMockExamScore] = useState(0);
  const [topPercentile, setTopPercentile] = useState(0);
  const [yesterdaySolvedCount, setYesterdaySolvedCount] = useState(0);
  const [quizzes, setQuizzes] = useState([]);
  const [firstQuizId, setFirstQuizId] = useState(null);
  const [lastQuizId, setLastQuizId] = useState(null);

  const fetchMainInfo = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/quiz/main`);

      if (response.status === 200 && response.data.isSuccess) {
        const result = response.data.result;
        setQuizzes(result);
        if (result.length > 0) {
          setFirstQuizId(quizData[0].quizId); // 첫 번째 퀴즈 ID 저장
          setLastQuizId(quizData[quizData.length - 1].quizId); // 마지막 퀴즈 ID 저장
        }

        console.log(result);
        setYesterdaySolvedCount(result.yesterdaySolvedCount);
        setProgressRate(parseFloat(result.progressRate.toFixed(1)));
        setLatestMockExamScore(result.latestMockExamScore ?? 0);
        setTopPercentile(result.topPercentile);
        setQuizData(result.top5WrongQuizzes);
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

  useEffect(() => {
    fetchMainInfo();
  }, []);

  const goLikeList = () => {
    navigation.navigate("QuizLikeList");
  };

  const goQuizCategory = () => {
    navigation.navigate("QuizCategory");
  };

  const goReviewList = () => {
    navigation.navigate("QuizReviewList");
  };

  const handleQuizPress = (quizId) => {
    navigation.navigate("QuizDetail", {
      quizId,
      quizzes: quizData,
      firstQuizId,
      lastQuizId,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#268AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <SearchBar />
        <ReviewBar onPress={goLikeList} />
        <TitleBar
          title={"Quiz"}
          subTitle={"매일 퀴즈를 풀고 실력을 향상시켜보세요."}
        />
        <View style={styles.quizBoxArea}>
          <ReviewQuizBox number={yesterdaySolvedCount} onPress={goReviewList} />
          <SolveQuizBox percentage={progressRate} onPress={goQuizCategory} />
        </View>
        <TitleBar
          title={"Test"}
          subTitle={"테스트를 통해 실력을 검증해보세요."}
        />
        <View style={styles.quizBoxArea}>
          <TestBox
            name={"박주형"}
            score={latestMockExamScore}
            percentage={topPercentile}
          />
        </View>
        <TitleBar
          title={"Daily Quiz"}
          subTitle={"어제 사람들이 가장 많이 틀린 Top5 퀴즈입니다."}
        />
        {quizData.map((quiz, index) =>
          quiz.locked ? (
            <LockQuizList
              key={quiz.quizId}
              num={index + 1}
              question={quiz.question}
            />
          ) : (
            <QuizList
              key={quiz.quizId}
              num={index + 1}
              question={quiz.question}
              onPress={() => handleQuizPress(quiz.quizId)}
            />
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
  },
  quizBoxArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30,
    paddingHorizontal: 7,
  },
  categoryArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
