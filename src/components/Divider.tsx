import React from "react";
import { View, Text } from "react-native";

interface DividerProps {
  text?: string;
}

export const Divider: React.FC<DividerProps> = ({ text }) => {
  return (
    <View className="flex-row items-center w-full my-4">
      <View className="flex-1 h-[1px] bg-gray-200" />
      {text && (
        <Text className="mx-4 text-gray-700 font-semibold text-base">
          {text}
        </Text>
      )}
      <View className="flex-1 h-[1px] bg-gray-200" />
    </View>
  );
};

export default Divider;
