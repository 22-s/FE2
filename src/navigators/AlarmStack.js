import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CustomHeader from "../../CustomHeader.js";

// Pages
import Alarm from "../pages/Alarm/Alarm.js";

const Stack = createStackNavigator();

const AlarmStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Alarm"
      component={Alarm}
      options={{
        header: ({ navigation }) => (
          <CustomHeader
            title="알림"
            navigation={navigation}
            routeName={"Alarm"}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

export default AlarmStack;
