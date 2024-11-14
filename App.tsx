import React from "react";
//import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
//import {RouteProp} from '@react-navigation/native';

//import Welcome from './src/pages/Welcome/Welcome';
//import Login from './src/pages/Login/Login';
//import Signup from './src/pages/Signup/Signup';
//import BuizContentsList from './src/pages/BuizContents/BuizContentList';
//import BuizContent from './src/pages/BuizContents/BuizContent';
import MannerList from "./src/pages/Manner/MannerList";
import MannerContent from "./src/pages/Manner/MannerContent";

const Stack = createStackNavigator();

function App(): React.ReactElement {
  return (
    <Stack.Navigator initialRouteName="MannerList">
      <Stack.Screen name="MannerList" component={MannerList} />
      <Stack.Screen
        name="MannerContent"
        component={MannerContent}
        initialParams={{ id: "" }} // 필요시 기본 값 설정
      />
    </Stack.Navigator>
  );
}

export default App;
