/**
 * @format
 */

import React from "react";
import { AppRegistry } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { name as appName } from "./app.json";

// 페이지 임포트
// import Welcome from "./src/pages/Welcome/Welcome";
// import Login from "./src/pages/Login/Login";
// import Signup from "./src/pages/Signup/Signup";
// import BuizContentsList from "./src/pages/BuizContents/BuizContentList";
// import BuizContent from "./src/pages/BuizContents/BuizContent";
import MannerList from "./src/pages/Manner/MannerList";
import MannerContent from "./src/pages/Manner/MannerContent";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MannerList">
        <Stack.Screen name="MannerList" component={MannerList} />
        <Stack.Screen name="MannerContent" component={MannerContent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => App);
