import { NavigationProp } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import RoundedButton from "../components/ui/RoundedButton";
import { selectAuth } from "../redux/slices/authSlice";
import User from "../api/user/user.hooks";
import { Category, Exercise } from "../types/types";

type Props = {
  navigation: NavigationProp<any, any>;
};

const HomeScreen = ({ navigation }: Props) => {
  const { userId } = useSelector(selectAuth);
  const { data, isLoading, error } = User.useGetUserExercises(userId);

  console.log(data);
  return (
    <SafeAreaView className="flex-1 relative">
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View className="absolute right-5 bottom-5 z-30">
          <RoundedButton
            onPress={() => navigation.navigate("AddExercise")}
            name="plus"
          />
        </View>
      )}
      <View className="flex-1 bg-red-50">
        {data?.map((exercise: Exercise) => (
          <TouchableOpacity
            key={exercise.id}
            onPress={() =>
              navigation.navigate("Exercise", {
                id: exercise.id,
              })
            }
          >
            <Text>{exercise.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
