import { View, ActivityIndicator, StatusBar, LogBox } from "react-native";
LogBox.ignoreAllLogs()

import "../../global.css";
import { router, Stack } from "expo-router";
import {
  useFonts,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
} from "@expo-google-fonts/urbanist";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Fragment, useEffect, useRef, useState } from "react";
import { Session } from "@supabase/supabase-js";
import supabase from "@/services/supabase";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  fade: true,
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function Layout() {

  const queryClient = new QueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(false);  
  const [pendingRoute, setPendingRoute] = useState<any>(null)


  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
  });

  async function configNavigationBar() {
    await NavigationBar.setButtonStyleAsync("dark");
  }

  useEffect(() => {
    const handleNotificationNavigation = (data: any) => {
    if (data?.screen) {
        // Se o Router ainda não estiver pronto, guarda a rota
        setPendingRoute({
          pathname: data.screen,
          params: data.params || {}
        });
      }
    };

    // Caso o app tenha sido aberto clicando na notificação
    const checkInitialNotification = async () => {
      const response = Notifications.getLastNotificationResponse();
      if (response) {
        const data = response.notification.request.content.data;
        handleNotificationNavigation(data);
      }
    };

    checkInitialNotification();

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data
      handleNotificationNavigation(data);
    });

    return () => subscription.remove();

  }, [])

  useEffect(() => {
    configNavigationBar();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    setTimeout(() => {
      setIsReady(true);
    }, 2_000);
  }, []);

  useEffect(() => {
    if (isReady && pendingRoute) {
      SplashScreen.hide();
      router.push(pendingRoute);
      setPendingRoute(null);
    }
  }, [isReady, pendingRoute]);

  if (!fontsLoaded || !isReady) {
    return (
      <SafeAreaProvider>
        <StatusBar
          translucent={false}
          barStyle="dark-content"
          backgroundColor="#fff"
        />
        <View className="flex-1 items-center justify-center bg-white">
          <ActivityIndicator color={"#4D5DFA"} size={"large"} />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"dark-content"} />
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade",
            headerTitleStyle: { fontFamily: "Urbanist_700Bold", fontSize: 18 },
            contentStyle: { backgroundColor: "white" },
            headerShadowVisible: false,
          }}
        >
          <Stack.Protected guard={!session?.user}>
            <Stack.Screen name="index" />
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
              name="bet-viewer"
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
