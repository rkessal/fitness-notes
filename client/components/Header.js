import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = ({ name, back, info }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className=" bg-blueMain">
      <StatusBar barStyle="light-content" backgroundColor="#2274A5" />
      <View
        className={`flex flex-row w-full items-center ${
          Platform.OS === "ios" ? "px-5" : "p-5"
        }`}
      >
        {back && (
          <TouchableOpacity onPress={navigation.goBack()}>
            <Icon name="left" color="white" size={24} />
          </TouchableOpacity>
        )}
        <Text className="text-white font-bold text-2xl">{name}</Text>
        <View className="ml-auto">
          {info && <Icon name="questioncircleo" color="white" size={24} />}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
