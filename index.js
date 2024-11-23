/**
 * @format
 */
import "react-native-gesture-handler";
import React, { useState } from "react";
import { AppRegistry } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/contexts/AuthContext";
import TabNavigator from "./src/navigators/TabNavigator";
import AuthStack from "./src/navigators/AuthStack";
import { name as appName } from "./app.json";

<<<<<<< HEAD
// 페이지 임포트
// import Welcome from "./src/pages/Welcome/Welcome";
// import Login from "./src/pages/Login/Login";
// import Signup from "./src/pages/Signup/Signup";
// import BuizContentsList from "./src/pages/BuizContents/BuizContentList";
// import BuizContent from "./src/pages/BuizContents/BuizContent";
import WordList from "./src/pages/Word/WordList";
import MannerList from "./src/pages/Manner/MannerList";
import MannerContent from "./src/pages/Manner/MannerContent";

const Stack = createStackNavigator();

=======
>>>>>>> be95de9bad0af90234a23b5ad53fdfc3fd134a0b
function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);

  return (
<<<<<<< HEAD
    <WordList />
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="MannerList">
    //     <Stack.Screen name="MannerList" component={MannerList} />
    //     <Stack.Screen name="MannerContent" component={MannerContent} />
    //   </Stack.Navigator>
    // </NavigationContainer>
=======
    <AuthProvider>
      <NavigationContainer>
        {isLoggedIn ? <TabNavigator /> : <AuthStack />}
      </NavigationContainer>
    </AuthProvider>
>>>>>>> be95de9bad0af90234a23b5ad53fdfc3fd134a0b
  );
}

AppRegistry.registerComponent(appName, () => App);
export default App;
