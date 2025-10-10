import { Stack } from "expo-router";
import { Fragment } from "react";

export default function AuthLayout() {
  return (
    <Fragment>
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
          name="recovery-password"
          options={{ headerShown: true, title: "Criar Nova Senha" }}
        />
        <Stack.Screen
          name="congrats"
          options={{ presentation: "containedTransparentModal" }}
        />
      </Stack>
    </Fragment>
  );
}
