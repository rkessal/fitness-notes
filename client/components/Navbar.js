import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Calendar from "../screens/Calendar";
import Account from "../screens/Account";
import HomeStackScreen from "../screens/HomeStackScreen";

const Navbar = () => {
  const Tab = createBottomTabNavigator();
  return (
    // <View className="flex flex-row justify-evenly items-center absolute bottom-0 left-0 right-0 pb-4 shadow-xl z-20 h-20 bg-white">
    //   <NavbarItem icon="calendar" text="Calendar" route="Calendar" />
    //   <NavbarItem icon="hearto" text="Workout" route="Home" />
    //   <NavbarItem icon="user" text="Account" route="Account" />
    // </View>
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#2274A5",
        tabBarabelStyle: { fontWeight: "bold", fontSize: 14 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName = route.name;

          switch (routeName) {
            case "Home":
              iconName = "hearto";
              break;
            case "Calendar":
              iconName = "calendar";
              break;
            case "Account":
              iconName = "user";
              break;
          }
          return <Icon name={iconName} size={25} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default Navbar;
