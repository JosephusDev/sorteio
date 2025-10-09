import { Text as TextComponent, TextProps } from "react-native";
import { cn } from "@/utils/cn";

export const Text: React.FC<TextProps> = ({ children, className, ...rest }) => {
  return (
    <TextComponent
      className={cn("font-urbanist-regular text-base text-gray-900", className)}
      {...rest}
    >
      {children}
    </TextComponent>
  );
};
