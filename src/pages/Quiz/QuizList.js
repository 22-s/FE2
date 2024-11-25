import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import QuizListComponent from "../../components/Quiz/QuizListComponent/QuizComponent";
import LockedQuizListComponent from "../../components/Quiz/QuizListComponent/LockedQuizListComponent";

const QuizList = () => {
  const navigation = useNavigation();

  const handleQuizPress = (quizId) => {
    navigation.navigate("QuizDetail", { quizId });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <QuizListComponent
          content="1. 신입 사원은 정시에 맞추어 출근해야 하나요?"
          onPress={() => handleQuizPress(1)}
        />
        <LockedQuizListComponent content="6. 명함을 건내는 순서" />
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
});

export default QuizList;
