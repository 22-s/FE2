import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CustomHeader from "../../CustomHeader.js"

// Pages
import WordHome from "../pages/Home/WordHome.js";
import WordList from "../pages/Word/WordList.js";
import WordLikeList from "../pages/Word/WordLikeList.js";

const Stack = createStackNavigator();

const WordStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="WordHome"
      component={WordHome}
      options={{
        header: ({ navigation }) => <CustomHeader title="회사 업무 용어 단어장" navigation={navigation} routeName={"WordHome"}/>,
      }}
    />
    <Stack.Screen
      name="WordList"
      component={WordList}
      options={{
        header: ({ navigation }) => <CustomHeader title="회사 업무 용어 단어장" navigation={navigation} routeName={WordList}/>,
      }}
    />
    <Stack.Screen
      name="WordLikeList"
      component={WordLikeList}
      options={{
        header: ({ navigation }) => <CustomHeader title="회사 업무 용어 단어장" navigation={navigation} routeName={WordLikeList}/>,
      }}
    />
  </Stack.Navigator>
);

export default WordStack;
