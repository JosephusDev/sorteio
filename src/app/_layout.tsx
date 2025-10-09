import "../../global.css";
import { Stack } from "expo-router";
import {
  useFonts,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
} from "@expo-google-fonts/urbanist";
import { View, ActivityIndicator } from "react-native";
import { Fragment } from "react";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
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
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </Fragment>
  );
}
