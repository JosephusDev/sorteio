import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as NavigationBar from "expo-navigation-bar";
import { useFonts, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold } from "@expo-google-fonts/urbanist";
import { usePushTokenStore } from "@/stores/PushToken";
import { registerForPushNotificationsAsync } from "@/services/notifications";

SplashScreen.preventAutoHideAsync();

export const useAppSetup = () => {
  const [isReady, setIsReady] = useState(false);
  const {setPushToken} = usePushTokenStore()

  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
  });

  useEffect(() => {
    const run = async () => {
      await NavigationBar.setButtonStyleAsync("dark");
      await registerForPushNotificationsAsync().then((token) => setPushToken(token!))

      setTimeout(async () => {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }, 2000);
    };

    run();
  }, []);

  return { isReady: fontsLoaded && isReady };
};
