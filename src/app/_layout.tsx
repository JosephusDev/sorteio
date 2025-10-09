import "../../global.css";
import { Stack } from "expo-router";
import {
  useFonts,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
} from "@expo-google-fonts/urbanist";
import { View, ActivityIndicator, StatusBar } from "react-native";
import { Fragment } from "react";

export default function Layout() {
  const isAuthenticated = false
  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={"#4D5DFA"} size={"large"} />
      </View>
    );
  }

  return (
    <Fragment>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
        </Stack.Protected>
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="notifications" />
          <Stack.Screen name="search" />
        </Stack.Protected>
      </Stack>
    </Fragment>
  );
}
