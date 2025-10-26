import { CongratsImage } from "@/assets/icons";
import Button from "@/components/Button";
import { Text } from "@/components/Text";
import { router } from "expo-router";
import { View } from "react-native";

export default function () {
  return (
      <View className="bg-white flex-1 gap-4 items-center justify-center p-6 rounded-3xl">
        <CongratsImage />
        <Text className="text-center text-2xl font-urbanist-bold text-primary">
          Parabéns!
        </Text>
        <Text className="text-center text-base font-urbanist-regular text-gray-600">
          Sua conta está pronta para ser usada
        </Text>
        <Button
          className="w-60 mt-2"
          title="Ir para o Início"
          onPress={() => router.push("/sign-in")}
        />
      </View>
  );
}
