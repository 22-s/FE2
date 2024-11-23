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

=======
>>>>>>> be95de9bad0af90234a23b5ad53fdfc3fd134a0b
function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);

  return (
    <AuthProvider>
      <NavigationContainer>
        {isLoggedIn ? <TabNavigator /> : <AuthStack />}
      </NavigationContainer>
    </AuthProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
export default App;
export default App;
