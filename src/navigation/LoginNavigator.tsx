import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./authScreens/Login";
import Signup from "./authScreens/Signup";

// Anotate the routes
export type LoginStackParamList = {
  Login: undefined;
  Signup: undefined;
};

const Stack = createStackNavigator<LoginStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
