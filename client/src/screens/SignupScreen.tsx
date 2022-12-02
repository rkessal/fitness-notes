import { NavigationProp } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import {
  AuthState,
  setAuthFail,
  setAuthSuccess,
} from "../redux/slices/authSlice";
import Auth from "../api/auth/auth.hooks";
import { showToast } from "../utils/index.utils";
import { useToast } from "react-native-toast-notifications";

type Props = {
  navigation: NavigationProp<any, any>;
};

const SignupScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const register = Auth.useRegister();
  const login = Auth.useLogin();
  const toast = useToast();

  const handleRegister = () => {
    register.mutate(
      { email, password },
      {
        onSuccess: () => {
          handleLogin();
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const handleLogin = () => {
    login.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          dispatch(setAuthSuccess(data));
        },
        onError: (error) => {
          dispatch(setAuthFail(error as string));
          showToast(toast, "danger", error as string);
        },
      }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6 bg-white space-y-12">
        <Text className="text-3xl font-bold">Create your account</Text>
        <View className="w-full space-y-6">
          <TextInput
            className="w-full rounded-2xl  p-5 bg-gray-50"
            placeholder="Email"
            onChangeText={setEmail}
          />
          <TextInput
            className="w-full rounded-2xl  p-5 bg-gray-50"
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
          />
          <TouchableOpacity
            className="p-5 bg-brand rounded-2xl w-full items-center"
            onPress={() => handleRegister()}
          >
            <Text className="text-white font-semibold">Sign up</Text>
          </TouchableOpacity>
        </View>

        <View className="items-center justify-center w-full space-y-5">
          <Text className="text-gray-500 text-lg">or continue with</Text>
          <View className="flex-row space-x-3">
            <View className="rounded-lg border-[1px] border-gray-300 p-4">
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dsmrg2vyw/image/upload/v1669651108/fitness-notes/instagram_betglx.png",
                }}
                className="w-6 h-6"
              />
            </View>
            <View className="rounded-lg border-[1px] border-gray-300 p-4">
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dsmrg2vyw/image/upload/v1669651179/fitness-notes/google_qfl5mz.png",
                }}
                className="w-6 h-6"
              />
            </View>
            <View className="rounded-lg border-[1px] border-gray-300 p-4">
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dsmrg2vyw/image/upload/v1669651221/fitness-notes/apple-logo_cc5nh1.png",
                }}
                className="w-6 h-6"
              />
            </View>
          </View>
        </View>
        <View className="flex-row">
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
            <Text className="text-brand">Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;
