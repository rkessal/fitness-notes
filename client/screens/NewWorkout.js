import { View, Text, TextInput, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import ExerciseCard from "../components/ExerciseCard";
import axios from "axios";

const NewWorkout = ({ navigation }) => {
  const API_URL = "http://localhost:1337";
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${API_URL}/api/exercise`,
    }).then((response) => {
      setApiData(response.data);
    });
  }, []);
  console.log(apiData);

  return (
    <ScrollView className="flex-1 bg-white p-6 space-y-12">
      <View className="flex flex-row  bg-gray-100 shadow-xs rounded-lg p-4 items-center space-x-3">
        <Icon name="search1" size={20} color="#B5B5B5" />
        <TextInput className="flex-1" placeholder="Search" />
      </View>
      <View>
        <Text className="text-2xl font-bold mb-4">Recents</Text>
        {apiData.map(({ category, name, img }, idx) => (
          <ExerciseCard
            key={idx}
            route="Exercise"
            navigation={navigation}
            category={category}
            name={name}
            img={img}
          />
        ))}
      </View>
      <View>
        <Text className="text-2xl font-bold mb-4">Recents</Text>
        <ExerciseCard />
        <ExerciseCard />
        <ExerciseCard />
        <ExerciseCard />
      </View>
      <View>
        <Text className="text-2xl font-bold mb-4">Recents</Text>
        <ExerciseCard />
        <ExerciseCard />
        <ExerciseCard />
        <ExerciseCard />
      </View>
      <View>
        <Text className="text-2xl font-bold mb-4">Recents</Text>
        <ExerciseCard />
        <ExerciseCard />
        <ExerciseCard />
        <ExerciseCard />
      </View>
    </ScrollView>
  );
};

export default NewWorkout;
