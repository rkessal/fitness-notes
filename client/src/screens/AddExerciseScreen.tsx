import { NavigationProp } from "@react-navigation/native";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
} from "react-native";
import ExerciseCard from "../components/ExerciseCard";
import Title from "../components/ui/Title";
import Exercise from "../api/exercise/exercise.hooks";
import { useEffect, useMemo, useState } from "react";
import { Exercise as TExercise } from "../types/types";
import RoundedButton from "../components/ui/RoundedButton";

type Props = {
  navigation: NavigationProp<any, any>;
};

const AddExerciseScreen = ({ navigation }: Props) => {
  const { data, error, isLoading, isFetched } = Exercise.useGetExercises();
  const [exercises, setExercises] = useState<TExercise[]>();
  const [numberOfExercises, setNumberOfExercises] = useState(25);
  useEffect(() => {
    if (data) {
      setExercises(data.slice(0, numberOfExercises));
    }
  }, [data]);

  const loadMore = () => {
    setExercises((prev) => [
      ...prev!,
      ...data?.slice(numberOfExercises, numberOfExercises + 25)!,
    ]);
    setNumberOfExercises((prev) => prev + 25);
  };
  console.log(exercises?.length);
  // console.log(numberOfExercises);

  const renderItem: ListRenderItem<TExercise> = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() =>
        navigation.navigate("ExerciseDetails", {
          id: item.id,
          image: item.gifUrl,
          title: item.name,
          bodyPart: item.bodyPart,
          equipment: item.equipment,
          target: item.target,
        })
      }
    >
      <ExerciseCard key={item.id} image={item.gifUrl} title={item.name} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="absolute right-5 bottom-10 z-30">
        <RoundedButton
          onPress={() => navigation.navigate("AddCustomExercise")}
          name="plus"
        />
      </View>
      <View className="flex-1">
        <View className="flex-1 p-6 space-y-10">
          <TextInput
            className="bg-gray-100 rounded-xl w-full p-5"
            placeholder="Search"
          />
          {isLoading && (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator />
            </View>
          )}
          <View>
            <FlatList
              data={exercises}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              onEndReached={() => loadMore()}
              onEndReachedThreshold={0}
              getItemLayout={(data, index) => ({
                length: 96,
                offset: 96 * index,
                index,
              })}
            />
            {/* {isFetched &&
              exercises.map((exercise: TExercise) => (
                <TouchableOpacity
                  key={exercise.id}
                  onPress={() =>
                    navigation.navigate("ExerciseDetails", {
                      id: exercise.id,
                      image: exercise.gifUrl,
                      title: exercise.name,
                      bodyPart: exercise.bodyPart,
                      equipment: exercise.equipment,
                      target: exercise.target,
                    })
                  }
                >
                  <ExerciseCard image={exercise.gifUrl} title={exercise.name} />
                </TouchableOpacity>
              ))} */}
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>Go back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddExerciseScreen;
