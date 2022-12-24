import { NavigationProp } from "@react-navigation/native";
import { store, persistor } from "./src/redux/store";
import AppRoute from "./src/navigation/index.navigator";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastProvider } from "react-native-toast-notifications";
import { PersistGate } from "redux-persist/integration/react";

type Props = {
  navigation: NavigationProp<any, any>;
};

const queryClient = new QueryClient();

export default function App({ navigation }: Props) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ToastProvider>
              <AppRoute />
              <StatusBar />
            </ToastProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </>
  );
}
