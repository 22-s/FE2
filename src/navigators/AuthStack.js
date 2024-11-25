import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CustomHeader from "../../CustomHeader.js";

// Pages
import Welcome from "../pages/Welcome/Welcome";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        header: ({ navigation }) => <CustomHeader title="로그인" navigation={navigation} />,
      }}
    />
    <Stack.Screen
      name="Signup"
      component={Signup}
      options={{
        header: ({ navigation }) => <CustomHeader title="회원가입" navigation={navigation} />,
      }}
    />
  </Stack.Navigator>
);

export default AuthStack;
