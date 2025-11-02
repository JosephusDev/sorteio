import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, ActivityIndicator, StatusBar } from "react-native";

export function AppLoading() {
  return (
    <SafeAreaProvider>
      <StatusBar translucent={false} barStyle="dark-content" backgroundColor="#fff" />
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color={"#4D5DFA"} />
      </View>
    </SafeAreaProvider>
  );
}
