/**
 * @format
 */
import "react-native-gesture-handler";
import React, { useState } from "react";
import { AppRegistry } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "./src/contexts/AuthContext";
import TabNavigator from "./src/navigators/TabNavigator";
import AuthStack from "./src/navigators/AuthStack";
import { name as appName } from "./app.json";
import Signup from "./src/pages/Signup/Signup";

const Stack = createStackNavigator();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false); // 초기 조건 설정

  return (
    <AuthProvider>
      <NavigationContainer>
        <Signup />
      </NavigationContainer>
    </AuthProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
export default App;
