import Button from "@/components/Button";
import { Text } from "@/components/Text";
import { useDeleteBetMutation } from "@/queries/bets";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function ModalDeleteBet() {
  const { id, name } = useLocalSearchParams();
  const { mutateAsync: deleteBet, isPending } = useDeleteBetMutation();

  const handleDelete = () => {
    deleteBet(id as string);
    router.back();
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="bg-white rounded-2xl mx-6 p-6 w-full max-w-sm">
        <View className="items-center mb-4">
          <Text className="text-xl font-urbanist-bold text-error text-center mb-4">
            {name.toString().toUpperCase()}
          </Text>
          <Text className="text-gray-600 text-center text-sm">
            Tem certeza que deseja cancelar essa aposta? O seu dinheiro será
            devolvido.
          </Text>
        </View>
        <View className="mt-6">
          <Button
            className="mb-3 bg-error"
            onPress={handleDelete}
            disabled={isPending}
            title={isPending ? "Cancelando..." : "Confirmar"}
          />
          <Button
            variant="outline"
            onPress={() => router.back()}
            title="Fechar"
          />
        </View>
      </View>
    </View>
  );
}
