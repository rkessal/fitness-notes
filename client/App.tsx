import { NavigationProp } from "@react-navigation/native";
import { store } from "./src/redux/store";
import AppRoute from "./src/navigation/index.navigator";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastProvider } from "react-native-toast-notifications";

type Props = {
  navigation: NavigationProp<any, any>;
};

const queryClient = new QueryClient();

export default function App({ navigation }: Props) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ToastProvider>
            <AppRoute />
            <StatusBar />
          </ToastProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
}
