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
              })
            }
          >
            <View className="flex-row space-x-2 mb-3 justify-center items-center">
              <Image
                source={{
                  uri: exercise.image,
                }}
                className="h-24 w-24"
              />
              <View className="flex-1">
                <Title intent="subtitle">{exercise.name}</Title>
                <Text numberOfLines={2} className="truncate">
                  {exercise.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
