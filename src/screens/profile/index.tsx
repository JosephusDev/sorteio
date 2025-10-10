import { View } from "react-native";
import Button from "@/components/Button";

interface ProfilePros {
  onLogout: () => void;
  isLoading: boolean;
}

export function Profile({ onLogout, isLoading }: ProfilePros) {
  return (
    <View className="flex-1 justify-center items-center min-h-screen">
      <Button
        onPress={onLogout}
        title={isLoading ? "Aguarde..." : "Terminar sessão"}
        className="bg-red-500 w-fit rounded-lg"
      />
    </View>
  );
}
