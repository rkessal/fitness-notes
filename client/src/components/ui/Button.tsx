import { cva, VariantProps } from "class-variance-authority";
import { Text, TouchableOpacity } from "react-native";

const buttonStyles = cva("px-4 py-4 rounded-lg focus:outline-none", {
  variants: {
    intent: {
      primary: "bg-brand",
      secondary: "bg-gray-200",
      danger: "bg-red-500",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

export interface Props extends VariantProps<typeof buttonStyles> {
  title: string;
  onPress(): void;
}

export function Button({ intent, title, onPress }: Props) {
  return (
    <TouchableOpacity className={buttonStyles({ intent })} onPress={onPress}>
      <Text className="text-white">{title}</Text>
    </TouchableOpacity>
  );
}
