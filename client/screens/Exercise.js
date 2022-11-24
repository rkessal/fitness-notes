import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Set from "../components/Set";
import RoundButton from "../components/RoundButton";

const Exercise = ({ navigation, route }) => {
  const { title } = route.params;
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState([]);

  const saveSet = (reps, weight) => {
    setSets((prev) => {
      let tempStack = prev;
      tempStack = [
        {
          id: tempStack.length,
          exercise: title,
          weight: weight,
          reps: reps,
        },
        ...tempStack,
      ];
      if (tempStack.length > 4) {
        tempStack.pop();
      }
      return tempStack;
    });
  };

  useEffect(() => {
    navigation.setOptions({ title: title });
  }, []);

  return (
    <View className="flex-1 relative">
      <View className="absolute right-5 bottom-5 z-30">
        <RoundButton
          navigation={navigation}
          icon="clockcircleo"
          route="Timer"
        />
      </View>
      <ScrollView className="py-10 px-5 bg-white space-y-8">
        <View>
          <Text className="text-2xl font-bold mb-4">Weight</Text>
          <View className="flex-row items-center space-x-8 ">
            <TouchableOpacity
              onPress={() =>
                setWeight((prev) => {
                  let res;
                  res = parseInt(prev) - 2.5;
                  if (res < 0) res = 0;
                  return res;
                })
              }
            >
              <View className="bg-blueMain rounded-lg p-5">
                <Icon name="minus" size={30} color="white" />
              </View>
            </TouchableOpacity>
            <View className=" flex-1 items-center justify-center bg-white rounded-lg border-2 border-gray-400">
              <TextInput
                className="py-5 text-lg"
                keyboardType="numeric"
                value={weight.toString()}
                maxLength={6}
                onChangeText={(value) =>
                  setWeight(() => value.replace(/[^0-9.]/g, ""))
                }
                placeholder="Weight"
              />
            </View>
            <TouchableOpacity
              onPress={() => setWeight((prev) => parseInt(prev) + 2.5)}
            >
              <View className="bg-blueMain rounded-lg p-5">
                <Icon name="plus" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text className="text-2xl font-bold mb-4">Reps</Text>
          <View className="flex-row items-center space-x-8 ">
            <TouchableOpacity
              onPress={() =>
                setReps((prev) => {
                  let res;
                  res = parseInt(prev) - 1;
                  if (res < 1) res = 1;
                  return res;
                })
              }
            >
              <View className="bg-blueMain rounded-lg p-5">
                <Icon name="minus" size={30} color="white" />
              </View>
            </TouchableOpacity>
            <View className=" flex-1 items-center justify-center bg-white rounded-lg border-2 border-gray-400">
              <TextInput
                className="py-5 text-lg"
                keyboardType="numeric"
                value={reps.toString()}
                maxLength={3}
                onChangeText={(value) =>
                  setReps(() => value.replace(/[^0-9]/g, ""))
                }
                placeholder="Reps"
              />
            </View>
            <TouchableOpacity
              onPress={() => setReps((prev) => parseInt(prev) + 1)}
            >
              <View className="bg-blueMain rounded-lg p-5">
                <Icon name="plus" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => saveSet(reps, weight)}
          className="bg-blueMain p-5 items-center justify-center rounded-xl"
        >
          <Text className="capitalize text-white font-semibold">Add set</Text>
        </TouchableOpacity>
        <View>
          <Text className="text-2xl font-bold mb-4">Progress</Text>
          {sets.map(({ id, exercise, weight, reps }, set) => (
            <Set key={id} exercise={exercise} weight={weight} reps={reps} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Exercise;
