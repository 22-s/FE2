import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CustomHeader from "../../CustomHeader.js"

// Pages
import MannerHome from "../pages/Home/MannerHome";
import MannerList from "../pages/Manner/MannerList";
import MannerContent from "../pages/Manner/MannerContent";

const Stack = createStackNavigator();

const MannerStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MannerHome"
      component={MannerHome}
      options={{
        header: ({ navigation }) => <CustomHeader title="비즈니스 매너 설명서" navigation={navigation} />,
      }}
    />
    <Stack.Screen
      name="MannerList"
      component={MannerList}
      options={{
        header: ({ navigation }) => <CustomHeader title="매너 설명서" navigation={navigation} />,
      }}
    />
    <Stack.Screen
      name="MannerContent"
      component={MannerContent}
      options={{
        header: ({ navigation }) => <CustomHeader title="매너 상세" navigation={navigation} />,
      }}
    />
  </Stack.Navigator>
);

export default MannerStack;
