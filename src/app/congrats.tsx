import { CongratsImage } from "@/assets/icons";
import Button from "@/components/Button";
import { Text } from "@/components/Text";
import { router } from "expo-router";
import { View } from "react-native";

export default function Congrats () {
  return (
    <View className="bg-white flex-1 gap-8 items-center justify-center p-6 rounded-3xl">
      <CongratsImage width={150} height={150} />
      <Text className="text-center text-2xl font-urbanist-bold text-primary">
        Parabéns!
      </Text>
      <Text className="text-center text-base font-urbanist-regular text-gray-600">
        Sua conta está pronta para ser usada
      </Text>
      <Button
        className="w-60 mt-2"
        title="Continuar"
        onPress={() => router.push("/(tabs)/home")}
      />
    </View>
  );
}
