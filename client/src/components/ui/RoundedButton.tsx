import { NavigationProp } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { BRAND_COLOR } from "../../utils/index.utils";

type Props = {
  name: string;
  onPress: (event: GestureResponderEvent) => void;
};

const RoundedButton = (props: Props) => {
  const { name, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      className="h-16 w-16 rounded-full shadow-lg bg-white items-center justify-center"
    >
      <Icon name={name} size={24} color={BRAND_COLOR} />
    </TouchableOpacity>
  );
};

export default RoundedButton;
