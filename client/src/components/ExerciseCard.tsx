import { NavigationProp } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import Title from "./ui/Title";

type Props = {
  navigation?: NavigationProp<any, any>;
  id: string;
  title: string;
  image?: string;
};

const ExerciseCard = ({ image, title, navigation, id }: Props) => {
  return (
    <TouchableOpacity
      className="flex-row"
      onPress={() =>
        navigation?.navigate("ExerciseDetails", {
          id: id,
        })
      }
    >
      <Image
        source={{
          uri: image,
        }}
        className="h-24 w-24"
      />
      <View className="ml-3 justify-center">
        <Title intent="subtitle">{title}</Title>
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseCard;
