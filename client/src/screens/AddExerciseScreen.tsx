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

const INCREMENTER = 15;

const AddExerciseScreen = ({ navigation }: Props) => {
  const { data, error, isLoading, isFetched } = Exercise.useGetExercises();
  const [exercises, setExercises] = useState<TExercise[]>();
  const [numberOfExercises, setNumberOfExercises] = useState(INCREMENTER);
  const [filterName, setFilterName] = useState("");
  const [tempData, setTempData] = useState<TExercise[]>([]);

  let filteredList: TExercise[] | undefined = [];

  useEffect(() => {
    if (data) {
      setExercises(data?.slice(0, numberOfExercises));
      setTempData(data);
    }
  }, [data]);

  const filterByName = (name: string) => {
    filteredList = data?.filter((exercise) =>
      exercise.name.toLowerCase().includes(name.toLowerCase())
    );
    setNumberOfExercises(INCREMENTER);
    setExercises(filteredList?.slice(0, numberOfExercises));
    setTempData(filteredList!);
  };

  const loadMore = () => {
    setExercises((prev) => [
      ...prev!,
      ...tempData?.slice(numberOfExercises, numberOfExercises + INCREMENTER)!,
    ]);
    setNumberOfExercises((prev) => prev + INCREMENTER);
  };

  console.log(exercises?.length);

  const renderItem: ListRenderItem<TExercise> = ({ item, index }) => (
    <TouchableOpacity
      key={index}
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
    <SafeAreaView className="relative flex-1 bg-white">
      <View className="absolute z-30 right-5 bottom-10">
        <RoundedButton
          onPress={() => navigation.navigate("AddCustomExercise")}
          name="plus"
        />
      </View>
      <View className="flex-1">
        <View className="flex-1 p-6 space-y-10">
          <TextInput
            className="w-full p-5 bg-gray-100 rounded-xl"
            placeholder="Search"
            value={filterName}
            onChangeText={(e) => {
              setFilterName(e);
              filterByName(e);
            }}
          />
          {isLoading && (
            <View className="items-center justify-center flex-1">
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
              showsVerticalScrollIndicator={false}
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
