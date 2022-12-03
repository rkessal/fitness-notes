import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import RoundedButton from "../components/ui/RoundedButton";
import { selectAuth } from "../redux/slices/authSlice";

type Props = {
  navigation: NavigationProp<any, any>;
};

const HomeScreen = ({ navigation }: Props) => {
  const user = useSelector(selectAuth);
  console.log("USER: ", user);
  return (
    <SafeAreaView className="flex-1">
      <View className="relative flex-1">
        <View className="absolute right-5 bottom-5 z-30">
          <RoundedButton
            onPress={() => navigation.navigate("AddExercise")}
            name="plus"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
