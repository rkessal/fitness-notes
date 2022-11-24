import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import NewWorkout from "./NewWorkout";
import Exercise from "./Exercise";
import TimerComponent from "../components/TimerComponent";

const Stack = createNativeStackNavigator();
const HomeStackScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Workouts">
      <Stack.Screen
        name="Workouts"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="NewWorkout" component={NewWorkout} />
      <Stack.Screen name="Exercise" component={Exercise} />
      <Stack.Screen
        name="Timer"
        component={TimerComponent}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;
