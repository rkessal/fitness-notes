import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  GestureResponderEvent,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { RootStackParamList, Set as TSet } from "../types/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Title from "../components/ui/Title";
import Icon from "react-native-vector-icons/FontAwesome";
import Set from "../api/set/set.hooks";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/slices/authSlice";
import { showToast } from "../utils/index.utils";
import { useToast } from "react-native-toast-notifications";
import RoundedButton from "../components/ui/RoundedButton";

type Props = NativeStackScreenProps<RootStackParamList, "Exercise">;

const ExerciseScreen = ({ route, navigation }: Props) => {
  const [weight, setWeight] = useState<string>("0");
  const [reps, setReps] = useState<string>("0");
  const [selectedSet, setSelectedSet] = useState<TSet | null | undefined>(null);
  const { userId } = useSelector(selectAuth);
  const { data, isLoading, refetch } = Set.useGetExerciseSet({
    userId: userId,
    exerciseId: route.params.id,
  });
  const addSet = Set.useAddExerciseSet();
  const editSet = Set.useEditExerciseSet();
  const deleteSet = Set.useDeleteExerciseSet();
  const toast = useToast();

  const WEIGHT_MODIFIER = 2.5;
  const REP_MODIFIER = 1;

  useEffect(() => {
    navigation.setOptions({ title: route.params.title });
  }, []);

  const handleWeight = (action: "add" | "remove") => {
    setWeight((prev) => {
      let tempWeight = parseFloat(prev);
      if (action === "add") {
        tempWeight = tempWeight + WEIGHT_MODIFIER;
      }
      if (action === "remove") {
        tempWeight = tempWeight - WEIGHT_MODIFIER;
        if (tempWeight <= 0) return "0";
      }
      return tempWeight.toString();
    });
  };

  const handleReps = (action: "add" | "remove") => {
    setReps((prev) => {
      let tempReps = parseInt(prev);
      if (action === "add") {
        tempReps = tempReps + REP_MODIFIER;
      }
      if (action === "remove") {
        tempReps = tempReps - REP_MODIFIER;
        if (tempReps <= 0) return "0";
      }
      return tempReps.toString();
    });
  };

  const handleSet = (isDelete?: boolean) => {
    if (selectedSet?.id) {
      if (isDelete) {
        deleteSet.mutate(
          {
            id: selectedSet.id,
          },
          {
            onSuccess: (data) => {
              showToast(toast, "success", "Set deleted");
              setSelectedSet(null);
              refetch();
            },
            onError: (error) => {
              // showToast(toast, "danger", error as string);
              console.log(error);
            },
          }
        );
        return;
      }
      editSet.mutate(
        {
          id: selectedSet.id,
          reps: parseInt(reps),
          weight: parseFloat(weight),
        },
        {
          onSuccess: (data) => {
            showToast(toast, "success", "Set updated");
            refetch();
          },
          onError: (error) => {
            showToast(toast, "danger", error as string);
            console.log(error);
          },
        }
      );
    } else {
      addSet.mutate(
        {
          exerciseId: route.params.id,
          userId: userId,
          reps: parseInt(reps),
          weight: parseFloat(weight),
        },
        {
          onSuccess: (data) => {
            showToast(toast, "success", "Set added");
            refetch();
          },
          onError: (error) => {
            showToast(toast, "danger", error as string);
          },
        }
      );
    }
  };

  const handleSelectedSet = (set: TSet) => {
    if (selectedSet?.id === set.id) {
      setSelectedSet(() => null);
      return;
    }
    setSelectedSet(() => set);
    setWeight(() => set.weight.toString());
    setReps(() => set.reps.toString());
  };
  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="absolute right-5 bottom-12 z-30">
        <RoundedButton
          onPress={() => navigation.navigate("Timer")}
          name="clockcircleo"
        />
      </View>
      <ScrollView className="flex-1 pt-5 ">
        <View className="items-center justify-center px-6 pb-32 space-y-12">
          <View className="w-full space-y-6">
            <View>
              <Title intent="title">Weight</Title>
            </View>
            <View className="flex-row justify-around">
              <TouchableOpacity
                className="bg-brand p-7 rounded-xl items-center justify-center"
                onPress={() => handleWeight("remove")}
              >
                <Icon name="minus" color="white" size={30} />
              </TouchableOpacity>
              <View className="rounded-lg w-16 items-center justify-center">
                <TextInput
                  className="text-4xl w-28 flex-1  text-center font-bold"
                  placeholder="weight"
                  keyboardType="numeric"
                  value={weight}
                  maxLength={6}
                  onChangeText={setWeight}
                />
              </View>
              <TouchableOpacity
                className="bg-brand p-7 rounded-xl items-center justify-center"
                onPress={() => handleWeight("add")}
              >
                <Icon name="plus" color="white" size={30} />
              </TouchableOpacity>
            </View>
            <View>
              <Title intent="title">Reps</Title>
            </View>
            <View className="flex-row justify-around">
              <TouchableOpacity
                className="bg-brand p-7 rounded-xl items-center justify-center"
                onPress={() => handleReps("remove")}
              >
                <Icon name="minus" color="white" size={30} />
              </TouchableOpacity>
              <View className="rounded-lg w-16 items-center justify-center">
                <TextInput
                  className="text-4xl w-28 flex-1  text-center font-bold"
                  placeholder="reps"
                  keyboardType="number-pad"
                  maxLength={3}
                  value={reps}
                  onChangeText={setReps}
                />
              </View>
              <TouchableOpacity
                className="bg-brand p-7 rounded-xl items-center justify-center"
                onPress={() => handleReps("add")}
              >
                <Icon name="plus" color="white" size={30} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row space-x-3">
            <TouchableOpacity
              className="p-5 bg-brand rounded-2xl flex-1 items-center"
              onPress={() => handleSet()}
            >
              <Text className="text-white font-bold">
                {selectedSet ? "Update" : "Add set"}
              </Text>
            </TouchableOpacity>

            {selectedSet && (
              <TouchableOpacity
                className="p-5 bg-red-600 rounded-2xl flex-1 items-center"
                onPress={() => handleSet(true)}
              >
                <Text className="text-white font-bold">Delete</Text>
              </TouchableOpacity>
            )}
          </View>
          <View className="w-full space-y-6">
            <View>
              <Title intent="title">Progress</Title>
            </View>
            <View>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                data?.map((set) => (
                  <TouchableOpacity
                    key={set.id}
                    onPress={() => handleSelectedSet(set)}
                    className={`z-10 flex flex-row p-5 justify-between bg-gray-100 rounded-lg mb-4 ${
                      selectedSet?.id === set.id
                        ? "border-l-4 border-l-brand"
                        : ""
                    }`}
                  >
                    <Text className="font-semibold">{set.weight} kgs</Text>
                    <Text className="font-semibold">{set.reps} reps</Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExerciseScreen;
