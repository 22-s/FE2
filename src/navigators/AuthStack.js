import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CustomHeader from "../../CustomHeader.js";

// Pages
import Welcome from "../pages/Welcome/Welcome";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import EmailVerification from "../pages/Login/EmailVerification";
import VerificationCode from "../pages/Login/VerificationCode";
import NewPassword from "../pages/Login/NewPassword";

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={Welcome}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        header: ({ navigation }) => (
          <CustomHeader title="로그인" navigation={navigation} />
        ),
      }}
    />
    <Stack.Screen
      name="Signup"
      component={Signup}
      options={{
        header: ({ navigation }) => (
          <CustomHeader title="회원가입" navigation={navigation} />
        ),
      }}
    />
    <Stack.Screen
      name="EmailVerification"
      component={EmailVerification}
      options={{
        header: ({ navigation }) => (
          <CustomHeader title="이메일 인증" navigation={navigation} />
        ),
      }}
    />
    <Stack.Screen
      name="VerificationCode"
      component={VerificationCode}
      options={{
        header: ({ navigation }) => (
          <CustomHeader title="인증 코드" navigation={navigation} />
        ),
      }}
    />
    <Stack.Screen
      name="NewPassword"
      component={NewPassword}
      options={{
        header: ({ navigation }) => (
          <CustomHeader title="비밀번호 설정" navigation={navigation} />
        ),
      }}
    />
  </Stack.Navigator>
);

export default AuthStack;
