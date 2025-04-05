import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CustomHeader from "../../CustomHeader.js";

import MyPage from "../pages/MyPage/MyPage.js";

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
  </Stack.Navigator>
);

export default MyPageStack;
