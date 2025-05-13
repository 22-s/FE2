import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CustomHeader from "../../CustomHeader.js";

// Pages
import MannerHome from "../pages/Home/MannerHome";
import MannerList from "../pages/Manner/MannerList";
import MannerContent from "../pages/Manner/MannerContent";
import ReviewMannerList from "../pages/Manner/ReviewMannerList.js";

const Stack = createStackNavigator();

const MannerStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MannerHome"
      component={MannerHome}
      options={{
        header: ({ navigation }) => (
          <CustomHeader
            title="비즈니스 매너 설명서"
            navigation={navigation}
            routeName={"MannerHome"}
          />
        ),
      }}
    />
    <Stack.Screen
      name="MannerList"
      component={MannerList}
      options={{
        header: ({ navigation }) => (
          <CustomHeader
            title="매너 설명서 리스트"
            navigation={navigation}
            routeName={"MannerList"}
          />
        ),
      }}
    />
    <Stack.Screen
      name="MannerContent"
      component={MannerContent}
      options={{
        header: ({ navigation }) => (
          <CustomHeader
            title="매너 상세"
            navigation={navigation}
            routeName={"MannerContent"}
          />
        ),
      }}
    />
    <Stack.Screen
      name="ReviewMannerList"
      component={ReviewMannerList}
      options={{
        header: ({ navigation }) => (
          <CustomHeader
            title="매너 설명서 즐겨찾기"
            navigation={navigation}
            routeName={"ReviewMannerList"}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

export default MannerStack;
