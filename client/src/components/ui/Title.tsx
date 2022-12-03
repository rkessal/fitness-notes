import { View, Text } from "react-native";
import { cva, VariantProps } from "class-variance-authority";

const titleStyles = cva("", {
  variants: {
    intent: {
      header: "font-bold text-3xl",
      title: "font-bold text-2xl",
      shortDescription: "text-gray-300",
      subtitle: "text-xl font-medium",
    },
  },
  defaultVariants: {
    intent: "header",
  },
});

export interface Props extends VariantProps<typeof titleStyles> {
  children?: React.ReactNode;
}

const Title = ({ intent, children }: Props) => {
  return <Text className={titleStyles({ intent })}>{children}</Text>;
};

export default Title;
