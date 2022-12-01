import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";

type Props = {};

const Stack = createNativeStackNavigator();

const AuthNavigator = (props: Props) => {
  return (
    <Stack.Navigator
      initialRouteName="Signin"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
