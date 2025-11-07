import { Stack } from "expo-router";
import { Fragment } from "react";
import { StatusBar } from "react-native";

export const unstable_settings = {
  initialRouteName: "sign-in",
};

export default function AuthLayout() {
  return (
    <Fragment>
      <StatusBar barStyle={"dark-content"} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          headerTitleStyle: { fontFamily: "Urbanist_700Bold", fontSize: 18 },
        }}
      >
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
        <Stack.Screen
          name="forgot-password"
          options={{ headerShown: true, title: "Recuperação de Senha" }}
        />
        <Stack.Screen
          name="verify-otp"
          options={{ headerShown: true, title: "Confirme o Código" }}
        />
      </Stack>
    </Fragment>
  );
}
