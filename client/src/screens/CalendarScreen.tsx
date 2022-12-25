import { NavigationProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { useSelector } from "react-redux";
import Set from "../api/set/set.hooks";
import { selectAuth } from "../redux/slices/authSlice";
import { Set as TSet } from "../types/types";

type Props = {
  navigation: NavigationProp<any, any>;
};

const CalendarScreen = ({ navigation }: Props) => {
  const { userId } = useSelector(selectAuth);
  const { data, isLoading, refetch } = Set.useGetUserSets({
    userId,
  });
  const [sets, setSets] = useState({});
  const [setsOnSelectedDay, setSetsOnSelectedDay] = useState<any[] | []>([]);
  const [day, setDay] = useState("");

  useEffect(() => {
    setSets({});
    data?.forEach((set: TSet) => {
      let day = set.createdAt.split("T")[0];
      setSets((prev) => ({
        ...prev,
        [day]: { marked: true, dotColor: "red" },
      }));
    });
    getSetsPerDay(day);
  }, [data]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDay(today);
  }, []);

  const getSetsPerDay = (day: string) => {
    let tempSets: TSet[] | [] = [];
    let temp: any;
    let temp2: any = [];
    data?.forEach((set: TSet) => {
      const setDate = set.createdAt.split("T")[0];
      if (setDate === day) {
        tempSets = [...tempSets, set];
      }
      tempSets = tempSets.sort((a: TSet, b: TSet) => {
        return a.exerciseId.localeCompare(b.exerciseId);
      });
    });
    tempSets.forEach((set) => {
      temp = set.exerciseId;
      const found = temp2.find((item: any) => item.exerciseId === temp);
      if (!found) {
        temp2 = [
          ...temp2,
          {
            exerciseId: set.exerciseId,
            exercise: set.Exercise.name,
            sets: [set.id],
          },
        ];
      } else {
        temp2[temp2.length - 1].sets = [
          ...temp2[temp2.length - 1].sets,
          set.id,
        ];
      }
    });
    setSetsOnSelectedDay(temp2);
  };

  const onRefresh = () => {
    refetch();
    getSetsPerDay(day);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-white flex-1 overflow-y-scroll">
        <Calendar
          className="px-3 pt-6"
          initialDate={day}
          markedDates={sets}
          onDayPress={({ dateString }) => {
            setDay(dateString);
            getSetsPerDay(dateString);
          }}
        />
        <ScrollView
          className="rounded-t-xl space-y-3 px-6 pt-8 "
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
        >
          {setsOnSelectedDay.map((set) => (
            <TouchableOpacity
              key={set.exerciseId}
              onPress={() =>
                navigation.navigate("Exercise", {
                  id: set.exerciseId,
                })
              }
              className="flex-row p-5 justify-between bg-gray-100 rounded-lg"
            >
              <Text className="font-medium max-w-5/6 truncate">
                {set.exercise}
              </Text>
              <Text className="text-gray-500">{set.sets.length} sets</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;
