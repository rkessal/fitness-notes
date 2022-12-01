import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, signin } from "../redux/slices/authSlice";
import { NavigationProp } from "@react-navigation/native";

type Props = {
  navigation: NavigationProp<any, any>;
};

const SigninScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectAuth);
  // console.log(user);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6 bg-white space-y-12">
        <Text className="text-3xl font-bold">Login to your account</Text>
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
            onPress={() => dispatch(signin(email, password))}
          >
            <Text className="text-white font-semibold">Sign in</Text>
          </TouchableOpacity>
        </View>
        <Text className="font-semibold text-lg">Forgot password?</Text>

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
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text className="text-brand">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SigninScreen;
