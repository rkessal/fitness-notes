import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Category, RootStackParamList } from "./types/types";
import Title from "../components/ui/Title";
import Exercise from "../api/exercise/exercise.hooks";

type Props = NativeStackScreenProps<RootStackParamList, "ExerciseDetails">;

const ExerciseDetailsScreen = ({ route }: Props) => {
  const { id } = route.params;
  const { data, error, isLoading } = Exercise.useGetExerciseById(id);
  console.log(data);
  return (
    <SafeAreaView className="flex-1 bg-white">
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View className="flex-1 p-6 space-y-12">
          <Image
            source={{
              uri: data?.image,
            }}
            className="w-full h-1/3"
          />
          <View>
            <Title intent="title">{data?.name}</Title>
          </View>
          <View>
            <Title intent="subtitle">Description</Title>
            <Text>{data?.description}</Text>
          </View>
          <View>
            <Title intent="subtitle">Categories</Title>
            {data?.categories.map((category: Category) => (
              <Text key={category.id}>{category.name}</Text>
            ))}
          </View>
          <TouchableOpacity className="p-5 bg-brand rounded-2xl w-full items-center">
            <Text className="text-white font-semibold">Add to workout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ExerciseDetailsScreen;
