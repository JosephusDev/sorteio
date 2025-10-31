import Button from "@/components/Button";
import { Text } from "@/components/Text";
import { useLogOutMutation } from "@/queries/auth";
import { router } from "expo-router";
import { View } from "react-native";

export default function ModalLogout() {
  const { mutateAsync: logout, isPending } = useLogOutMutation();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="bg-white rounded-2xl mx-6 p-6 w-full max-w-sm">
        <View className="items-center mb-4">
          <Text className="text-xl font-urbanist-bold text-error text-center mb-2">
            Terminar Sessão?
          </Text>
          <Text className="text-gray-600 text-center text-sm">
            Tem certeza que deseja sair da sua conta?
          </Text>
        </View>
        <View className="mt-6">
          <Button className="mb-3 bg-error" onPress={() => logout()} title={isPending ? "Saindo..." : "Sair"} />
          <Button
            variant="outline"
            onPress={() => router.back()}
            title="Cancelar"
          />
        </View>
      </View>
    </View>
  );
}
