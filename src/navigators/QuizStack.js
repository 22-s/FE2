import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CustomHeader from "../../CustomHeader.js"

// Pages
import QuizHome from "../pages/Home/QuizHome";
import QuizList from "../pages/Quiz/QuizList";
import QuizDetail from "../pages/Quiz/QuizDetail";
import QuizDetail2 from "../pages/Quiz/QuizDetail2.js";
import AfterQuiz from "../pages/Quiz/AfterQuiz";
import QuizLikeList from "../pages/Quiz/QuizLikeList.js";

const Stack = createStackNavigator();

const QuizStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="QuizHome"
      component={QuizHome}
      options={{
        header: ({ navigation }) => <CustomHeader title="퀴즈" navigation={navigation} routeName={"QuizHome"}/>,
      }}
    />
    <Stack.Screen
      name="QuizList"
      component={QuizList}
      options={{
        header: ({ navigation }) => <CustomHeader title="퀴즈 목록" navigation={navigation} routeName={"QuizList"}/>,
      }}
    />
    <Stack.Screen
      name="QuizDetail"
      component={QuizDetail}
      options={{
        header: ({ navigation }) => <CustomHeader title="퀴즈 상세" navigation={navigation} routeName={"QuizDetail"}/>,
      }}
    />
    <Stack.Screen
      name="QuizDetail2"
      component={QuizDetail2}
      options={{
        header: ({ navigation }) => <CustomHeader title="퀴즈 상세" navigation={navigation} routeName={"QuizDetail2"}/>,
      }}
    />
    <Stack.Screen
      name="AfterQuiz"
      component={AfterQuiz}
      options={{
        header: ({ navigation }) => <CustomHeader title="퀴즈 결과" navigation={navigation} routeName={"AfterQuiz"}/>,
      }}
    />
    <Stack.Screen
      name="QuizLikeList"
      component={QuizLikeList}
      options={{
        header: ({ navigation }) => <CustomHeader title="퀴즈 복습 리스트" navigation={navigation} routeName={"QuizLikeList"}/>,
      }}
    />
  </Stack.Navigator>
);

export default QuizStack;
