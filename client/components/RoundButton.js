import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
const RoundButton = ({ icon, route, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(route)}>
      <View className="rounded-full w-16 h-16 bg-white shadow-lg flex items-center justify-center">
        <Icon name={icon} color="#2274A5" size={30} />
      </View>
    </TouchableOpacity>
  );
};

export default RoundButton;
