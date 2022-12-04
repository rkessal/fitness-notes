import { NavigationProp } from "@react-navigation/native";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ExerciseCard from "../components/ExerciseCard";
import Title from "../components/ui/Title";
import Exercise from "../api/exercise/exercise.hooks";
import { useMemo } from "react";
import { Exercise as TExercise } from "../types/types";
import RoundedButton from "../components/ui/RoundedButton";

type Props = {
  navigation: NavigationProp<any, any>;
};

const AddExerciseScreen = ({ navigation }: Props) => {
  const { data, error, isLoading } = Exercise.useGetExercises();
  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="absolute right-5 bottom-10 z-30">
        <RoundedButton
          onPress={() => navigation.navigate("AddCustomExercise")}
          name="plus"
        />
      </View>
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <ScrollView className="flex-1">
          <View className="flex-1 p-6 space-y-10">
            <TextInput
              className="bg-gray-100 rounded-xl w-full p-5"
              placeholder="Search"
            />
            <View>
              <Title intent="title">Recent</Title>
              {data &&
                data.map((exercise: TExercise) => (
                  <ExerciseCard
                    key={exercise.id}
                    id={exercise.id}
                    navigation={navigation}
                    image={exercise.image}
                    title={exercise.name}
                  />
                ))}
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text>Go back</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default AddExerciseScreen;
