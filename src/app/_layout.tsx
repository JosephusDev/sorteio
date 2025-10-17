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
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  const queryClient = new QueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(false);

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
    setIsReady(true);
  }, []);

  if (!fontsLoaded || !isReady) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={"#4D5DFA"} size={"large"} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          translucent={false}
          barStyle="dark-content"
          backgroundColor="#fff"
        />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade",
            headerTitleStyle: { fontFamily: "Urbanist_700Bold", fontSize: 18 },
            contentStyle: { backgroundColor: "white" }, // evita sobreposição
          }}
        >
          <Stack.Protected guard={!session?.user}>
            <Stack.Screen name="(auth)" />
          </Stack.Protected>
          <Stack.Protected guard={!!session?.user}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="notifications"
              options={{ headerShown: true, title: "Notificações" }}
            />
            <Stack.Screen
              name="search"
              options={{ headerShown: true, title: "Pesquisar" }}
            />
            <Stack.Screen
              name="help"
              options={{ headerShown: true, title: "Ajuda" }}
            />
            <Stack.Screen
              name="edit-profile"
              options={{ headerShown: true, title: "Editar Perfil" }}
            />
            <Stack.Screen
              name="(modals)"
              options={{
                presentation: "formSheet",
                sheetAllowedDetents: [0.4],
                sheetCornerRadius: 20,
              }}
            />
          </Stack.Protected>
        </Stack>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
