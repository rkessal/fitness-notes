import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const TimerComponent = () => {
  const [totalTime, setTotalTime] = useState(0);
  const [seconds, setSeconds] = useState(totalTime);
  const [minutes, setMinutes] = useState(totalTime);
  const [timer, setTimer] = useState();
  const [start, setStart] = useState(false);

  useEffect(() => {
    setSeconds(() =>
      (totalTime % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 })
    );
    setMinutes(() =>
      Math.floor(totalTime / 60).toLocaleString(undefined, {
        minimumIntegerDigits: 2,
      })
    );
  }, [totalTime]);

  const ResetTimer = () => {
    StopTimer();
    setStart(false);
    setTotalTime(() => 0);
  };

  const ManageTimer = (state) => {
    !state ? StartTimer() : StopTimer();
  };

  const StartTimer = () => {
    setTimer(() => setInterval(() => setTotalTime((curr) => curr + 1), 1000));
  };

  const StopTimer = () => {
    clearInterval(timer);
  };
  return (
    <View className="bg-white flex-1 p-5">
      <View className="flex-1 items-center justify-center">
        <Text className="text-7xl font-bold">
          {minutes} : {seconds}
        </Text>
      </View>
      <SafeAreaView>
        <View className="flex-row w-full justify-between">
          <TouchableOpacity
            onPress={() => {
              setStart((prev) => !prev);
              ManageTimer(start);
            }}
            className="bg-blueMain p-5 items-center justify-center rounded-xl w-36"
          >
            <Text className="text-white text-center capitalize font-bold">
              {start ? "stop" : totalTime === 0 ? "start" : "continue"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              ResetTimer();
            }}
            className="bg-blueMain p-5 items-center justify-center rounded-xl w-36"
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

export default TimerComponent;
