import { NavigationProp } from "@react-navigation/native";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, signout } from "../redux/slices/authSlice";

type Props = {
  navigation: NavigationProp<any, any>;
};

const HomeScreen = ({ navigation }: Props) => {
  const [exercises, setExercises] = useState<AxiosResponse<any, any>>();
  const dispatch = useDispatch();
  const user = useSelector(selectAuth);
  console.log("USER: ", user);
  useEffect(() => {
    // getExercises().then((data) => console.log(data?.data));
  });
  //   console.log(exercises);
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("AddExercise")}>
          <Text>AddExercise</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
