import React from "react";
import { View, StyleSheet, ScrollView, Dimensions, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../../components/Home/searchBarQuiz";
import ReviewBar from "../../components/Home/reviewBarQuiz";
import TitleBar from "../../components/Home/titleBar";
import ReviewQuizBox from "../../components/Home/ReviewQuizBox";
import SolveQuizBox from "../../components/Home/SolveQuizBox";
import TestBox from "../../components/Home/TestBox";
import QuizList from "../../components/Home/quizList";

const windowWidth = Dimensions.get("window").width;

export default function QuizHome() {
  const navigation = useNavigation();

  const goLikeList = () => {
    navigation.navigate("QuizLikeList");
  };

  const goQuizCategory = () => {
    navigation.navigate("QuizCategory");
  };

  const quizData = [
    { num: 1, question: "어떤 동물이 가장 빠를까요?" },
    { num: 2, question: "태양계에서 가장 큰 행성은?" },
    { num: 3, question: "물의 화학식은 무엇인가요?" },
    { num: 4, question: "피타고라스 정리는 어떤 삼각형에 적용되나요?" },
    { num: 5, question: "세계에서 가장 긴 강은?" },
  ];

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
          <ReviewQuizBox number={12} />
          <SolveQuizBox percentage={34} onPress={goQuizCategory} />
        </View>
        <TitleBar
          title={"Test"}
          subTitle={"테스트를 통해 실력을 검증해보세요."}
        />
        <View style={styles.quizBoxArea}>
          <TestBox
            name={"박주형"}
            score={74}
            percentage={16}
            // navigation={navigation}
          />
        </View>
        <TitleBar
          title={"Daily Quiz"}
          subTitle={"어제 사람들이 가장 많이 틀린 Top5 퀴즈입니다."}
        />
        {quizData.map((quiz) => (
          <QuizList key={quiz.num} num={quiz.num} question={quiz.question} />
        ))}
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
});
