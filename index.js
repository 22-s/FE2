import React, { useState } from "react";
import {
  AppRegistry,
  SafeAreaView,
  StatusBar,
  Platform,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "./src/contexts/AuthContext";
import TabNavigator from "./src/navigators/TabNavigator";
import AuthStack from "./src/navigators/AuthStack";
import MyPageStack from "./src/navigators/MyPageStack";
import QuizStack from "./src/navigators/QuizStack";
import AlarmStack from "./src/navigators/AlarmStack";
import { name as appName } from "./app.json";

const Stack = createStackNavigator();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? "TabNavigator" : "AuthStack"}
        >
          {/* AuthStack */}
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MyPageStack"
            component={MyPageStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="QuizStack"
            component={QuizStack}
            options={{ headerShown: false }}
          />
          {/* TabNavigator */}
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10, // iOS는 20, Android는 상태바 높이
  },
});

AppRegistry.registerComponent(appName, () => App);
export default App;
