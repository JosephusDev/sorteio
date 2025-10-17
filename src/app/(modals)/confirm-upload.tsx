import Button from "@/components/Button";
import { Text } from "@/components/Text";
import { useUploadProfileImageMutation } from "@/queries/upload";
import { router } from "expo-router";
import { View } from "react-native";

export default function ModalUpload() {
  const { mutateAsync: upload, isPending } = useUploadProfileImageMutation();

  const handleUpload = () => {
    upload().then(() => router.back());
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="bg-white rounded-2xl mx-6 p-6 w-full max-w-sm">
        <View className="items-center mb-4">
          <Text className="text-xl font-urbanist-bold text-error text-center mb-2">
            Fazer Upload?
          </Text>
          <Text className="text-gray-600 text-center text-sm">
            Tem certeza que deseja fazer o upload?
          </Text>
        </View>

        <View className="mt-6">
          <Button
            className="mb-3"
            onPress={handleUpload}
            title={isPending ? "Carregando..." : "Confirmar"}
            disabled={isPending}
          />

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
