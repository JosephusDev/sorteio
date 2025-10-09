import React from "react";
import { View } from "react-native";
import { Text } from "./Text";

interface DividerProps {
  text?: string;
}

export const Divider: React.FC<DividerProps> = ({ text }) => {
  return (
    <View className="flex-row items-center w-full my-4">
      <View className="flex-1 h-[1px] bg-gray-200" />
      {text && (
        <Text className="mx-4 text-gray-700 text-base font-urbanist-semiBold">
          {text}
        </Text>
      )}
      <View className="flex-1 h-[1px] bg-gray-200" />
    </View>
  );
};

export default Divider;
