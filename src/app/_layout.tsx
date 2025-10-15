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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import supabase from "@/services/supabase";

export default function Layout() {
  const queryClient = new QueryClient();

  const [session, setSession] = useState<Session | null>(null);

  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={"#4D5DFA"} size={"large"} />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          headerTitleStyle: { fontFamily: "Urbanist_700Bold", fontSize: 18 },
        }}
      >
        <Stack.Protected guard={!session?.user}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
        <Stack.Protected guard={!!session?.user}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="notifications" />
          <Stack.Screen name="search" />
          <Stack.Screen
            name="help"
            options={{ headerShown: true, title: "Ajuda" }}
          />
          <Stack.Screen
            name="edit-profile"
            options={{ headerShown: true, title: "Editar Perfil" }}
          />
          <Stack.Screen
            name="modal-logout"
            options={{
              presentation: "formSheet",
              sheetAllowedDetents: [0.35],
              sheetCornerRadius: 20,
            }}
          />
        </Stack.Protected>
      </Stack>
    </QueryClientProvider>
  );
}
