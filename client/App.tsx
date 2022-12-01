import { createContext, useContext, useMemo, useReducer } from "react";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SigninScreen from "./src/screens/SigninScreen";
import { login } from "./src/modules/auth/auth.service";
import HomeScreen from "./src/screens/HomeScreen";
import { store } from "./src/redux/store";
import AppRoute from "./src/navigation/index.navigator";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

type Props = {
  navigation: NavigationProp<any, any>;
};

const queryClient = new QueryClient();

export default function App({ navigation }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppRoute />
        <StatusBar />
      </Provider>
    </QueryClientProvider>
  );
}
