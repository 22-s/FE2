import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import Stack Navigators
import QuizStack from "./QuizStack";
import MannerStack from "./MannerStack";
import WordStack from "./WordStack";
import MyPage from "./MyPageStack";

// Import Tab Icons
import Quiz from "../assets/images/TabBar/QuizSvg";
import Manner from "../assets/images/TabBar/MannerSvg";
import Term from "../assets/images/TabBar/TermSvg";
import Profile from "../assets/images/TabBar/MyPageSvg";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "퀴즈") {
            return <Quiz focused={focused} color={color} size={size} />;
          }
          if (route.name === "매너설명서") {
            return <Manner focused={focused} color={color} size={size} />;
          }
          if (route.name === "업무용어") {
            return <Term focused={focused} color={color} size={size} />;
          }
          if (route.name === "마이페이지") {
            return <Profile focused={focused} color={color} size={size} />;
          }
        },
        tabBarActiveTintColor: "#268AFF",
        tabBarInactiveTintColor: "#BAC4CE",
        tabBarStyle: { backgroundColor: "#FFFFFF" },
        labelStyle: { fontSize: 10 },
      })}
    >
      <Tab.Screen
        name="퀴즈"
        component={QuizStack}
        options={{ tabBarLabel: "퀴즈", headerShown: false }}
      />
      <Tab.Screen
        name="매너설명서"
        component={MannerStack}
        options={{ tabBarLabel: "매너설명서", headerShown: false }}
      />
      <Tab.Screen
        name="업무용어"
        component={WordStack}
        options={{ tabBarLabel: "업무용어", headerShown: false }}
      />
      <Tab.Screen
        name="마이페이지"
        component={MyPage}
        options={{ tabBarLabel: "마이페이지", headerShown: false }}
      />
      {/* <Tab.Screen
        name="트렌드"
        component={BuizContentStack}
        options={{ tabBarLabel: "마이페이지", headerShown: false }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault(); // 기본 동작 방지
            Alert.alert("알림", "추후 업데이트 예정입니다.");
          },
        })}
      /> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;
