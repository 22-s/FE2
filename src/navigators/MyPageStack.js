import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CustomHeader from "../../CustomHeader.js";

import MyPage from "../pages/MyPage/MyPage.js";
import TermsOfService from "../pages/MyPage/TermsOfService";
import PrivacyPolicy from "../pages/MyPage/PrivacyPolicy";

const Stack = createStackNavigator();

const MyPageStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MyPage"
      component={MyPage}
      options={{
        header: ({ navigation }) => (
          <CustomHeader
            title="마이페이지"
            navigation={navigation}
            routeName={"MyPage"}
          />
        ),
      }}
    />
    <Stack.Screen
      name="TermsOfService"
      component={TermsOfService}
      options={{
        header: ({ navigation }) => (
          <CustomHeader
            title="서비스 이용약관"
            navigation={navigation}
            routeName={"TermsOfService"}
          />
        ),
      }}
    />
    <Stack.Screen
      name="PrivacyPolicy"
      component={PrivacyPolicy}
      options={{
        header: ({ navigation }) => (
          <CustomHeader
            title="개인정보 처리방침"
            navigation={navigation}
            routeName={"PrivacyPolicy"}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

export default MyPageStack;
