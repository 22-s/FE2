import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CustomHeader from "../../CustomHeader.js"

// Pages
import BuizContentList from "../pages/BuizContents/BuizContentList";
import BuizContent from "../pages/BuizContents/BuizContent";

const Stack = createStackNavigator();

const BuizContentStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="BuizContentList"
      component={BuizContentList}
      options={{
        header: ({ navigation }) => <CustomHeader title="비즈니스 트렌드 콘텐츠 목록" navigation={navigation} routeName={"BuizContentList"}/>,
      }}
    />
    <Stack.Screen
      name="BuizContent"
      component={BuizContent}
      options={{
        header: ({ navigation }) => <CustomHeader title="비즈니스 트렌드 콘텐츠 상세" navigation={navigation} routeName={"BuizContent"}/>,
      }}
    />
  </Stack.Navigator>
);

export default BuizContentStack;
