import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";

const ExerciseCard = ({ navigation, route, img, name, category }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(route, { title: name })}
      className="flex-row items-center space-x-2 py-2"
    >
      <Image
        source={{
          uri: img,
        }}
        className="w-20 h-20"
      />
      <View className="max-h-20 w-2/3 ">
        <Text className="capitalize text-xl">{name}</Text>
        <Text className="capitalize text-gray-400">{category}</Text>
      </View>
      <View className="ml-auto">
        <Icon name="questioncircleo" color="#2274A5" size={20} />
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseCard;
