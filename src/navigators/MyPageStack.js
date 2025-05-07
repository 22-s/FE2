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
    options={{ title: "서비스 이용약관" }}
  />
  <Stack.Screen
    name="PrivacyPolicy"
    component={PrivacyPolicy}
    options={{ title: "개인정보 처리방침" }}
  />
  </Stack.Navigator>
);

export default MyPageStack;
