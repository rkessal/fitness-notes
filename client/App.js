import {
  NavigationContainer,
  NavigationContainerRefContext,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navbar from "./components/Navbar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Account from "./screens/Account";
import Calendar from "./screens/Calendar";
import HomeScreen from "./screens/HomeScreen";
import NewWorkout from "./screens/NewWorkout";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navbar />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
