import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Set = ({ exercise, reps, weight }) => {
  return (
    <View className="flex flex-row p-5 justify-between bg-gray-100 rounded-lg mb-4">
      <Text className="w-2/3">{exercise}</Text>
      <Text>{weight} kgs</Text>
      <Text>{reps} reps</Text>
    </View>
  );
};

export default Set;
