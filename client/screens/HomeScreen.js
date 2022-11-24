import { ScrollView, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../components/Header";
import Set from "../components/Set";
import RoundButton from "../components/RoundButton";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View className="relative flex-1">
      <Header name="Workouts" />
      <View className="absolute right-5 bottom-5 z-30">
        <RoundButton navigation={navigation} icon="plus" route="NewWorkout" />
      </View>
      <ScrollView className="py-10 px-5 bg-white">
        <Text className="text-2xl font-bold">Biceps</Text>
        <View className="flex flex-col space-y-5 my-8">
          <Set />
          <Set />
          <Set />
          <Set />
          <Set />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
