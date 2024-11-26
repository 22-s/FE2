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

const Stack = createStackNavigator();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false); // 초기 조건 설정

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? "TabNavigator" : "AuthStack"}>
          {/* AuthStack */}
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
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

AppRegistry.registerComponent(appName, () => App);
export default App;
