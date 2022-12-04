import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CalendarScreen from "../screens/CalendarScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddExerciseScreen from "../screens/AddExerciseScreen";
import Icon from "react-native-vector-icons/AntDesign";
import { Text, View } from "react-native";
import ExerciseDetailsScreen from "../screens/ExerciseDetailsScreen";
import { RootStackParamList } from "../types/types";
import AddCustomExerciseScreen from "../screens/AddCustomExerciseScreen";

type Props = {};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#2274A5",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "hearto";
          switch (route.name) {
            case "Home":
              iconName = "hearto";
              break;
            case "Calendar":
              iconName = "calendar";
              break;
            case "Profile":
              iconName = "user";
              break;
          }
          return <Icon name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = (props: Props) => {
  return (
    <Stack.Navigator
      initialRouteName="HomeStack"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeStack" component={HomeStack} />
      <Stack.Screen name="AddExercise" component={AddExerciseScreen} />
      <Stack.Screen
        name="ExerciseDetails"
        component={ExerciseDetailsScreen}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="AddCustomExercise"
        component={AddCustomExerciseScreen}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
