import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { RootStackParamList } from "../types/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Title from "../components/ui/Title";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = NativeStackScreenProps<RootStackParamList, "Exercise">;

const ExerciseScreen = ({ route }: Props) => {
  const [weight, setWeight] = useState<string>("0");
  const [reps, setReps] = useState<string>("0");
  const WEIGHT_MODIFIER = 2.5;
  const REP_MODIFIER = 1;

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
    console.log(weight);
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

  console.log(route.params.id);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 pt-5 ">
        <View className="items-center justify-center px-6 bg-white space-y-12">
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
                  className="text-2xl w-28 flex-1 bg-red-50 text-center"
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
                  className="text-2xl w-28 flex-1 bg-red-50 text-center"
                  placeholder="reps"
                  keyboardType="numeric"
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
          <TouchableOpacity className="p-5 bg-brand rounded-2xl w-full items-center">
            <Text className="text-white font-bold">Add set</Text>
          </TouchableOpacity>
          <View className="w-full space-y-6">
            <View>
              <Title intent="title">Progress</Title>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExerciseScreen;
