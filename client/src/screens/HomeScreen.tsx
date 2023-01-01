import { NavigationProp } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
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
import ExerciseCard from "../components/ExerciseCard";
import Title from "../components/ui/Title";

type Props = {
  navigation: NavigationProp<any, any>;
};

const HomeScreen = ({ navigation }: Props) => {
  const { userId } = useSelector(selectAuth);
  const { data, isLoading, error, refetch } = User.useGetUserExercises(userId);

  return (
    <SafeAreaView className="flex-1 relative bg-white">
      {isLoading ? (
        <ActivityIndicator className="flex-1" />
      ) : (
        <View className="absolute right-5 bottom-5 z-30">
          <RoundedButton
            onPress={() => navigation.navigate("AddExercise")}
            name="plus"
          />
        </View>
      )}
      <ScrollView
        className="flex-1 bg-white p-6"
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        {data?.map((exercise: Exercise) => (
          <TouchableOpacity
            key={exercise.id}
            onPress={() =>
              navigation.navigate("Exercise", {
                id: exercise.id,
                title: exercise.name,
              })
            }
          >
            <ExerciseCard title={exercise.name} image={exercise.gifUrl} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
