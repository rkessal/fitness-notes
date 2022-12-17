import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import useTimer from "../hooks/timer";

type Props = {};

const TimerScreen = (props: Props) => {
  const {
    minutes,
    seconds,
    totalTime,
    start,
    setStart,
    manageTimer,
    resetTimer,
  } = useTimer();
  return (
    <View className="bg-white flex-1 p-5">
      <View className="flex-1 items-center justify-center">
        <Text className="text-7xl font-bold">
          {minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })} :{" "}
          {seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })}
        </Text>
      </View>
      <SafeAreaView>
        <View className="flex-row w-full justify-between">
          <TouchableOpacity
            onPress={() => {
              setStart((prev) => !prev);
              manageTimer(start);
            }}
            className="bg-brand p-5 items-center justify-center rounded-xl w-36"
          >
            <Text className="text-white text-center capitalize font-bold">
              {start ? "stop" : totalTime === 0 ? "start" : "continue"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              resetTimer();
            }}
            className="bg-brand p-5 items-center justify-center rounded-xl w-36"
          >
            <Text className="text-white text-center capitalize font-bold">
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default TimerScreen;
