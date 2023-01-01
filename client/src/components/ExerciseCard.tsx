import { NavigationProp } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  ActivityIndicator,
  Image,
} from "react-native";
import Title from "./ui/Title";

type Props = {
  title: string;
  image?: string;
};

const ExerciseCard = ({ image, title }: Props) => {
  return (
    <View className="flex-row">
      <Image
        source={{
          uri: image,
        }}
        className="h-24 w-24"
      />
      <View className="ml-3 justify-center">
        <Title intent="subtitle">
          {title && title[0].toUpperCase() + title.slice(1)}
        </Title>
      </View>
    </View>
  );
};

export default ExerciseCard;
