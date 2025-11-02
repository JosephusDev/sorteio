import "../../global.css";

import { StatusBar, LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@/providers/toast";

import { useAuthSession } from "@/hooks/useAuthSession";
import { useNotificationNavigation } from "@/hooks/useNotificationNavigation";
import { useAppSetup } from "@/hooks/useAppSetup";
import { AppLoading } from "@/components/AppLoading";
import { AppRoutes } from "@/navigation/AppRoutes";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

LogBox.ignoreAllLogs()

export default function Layout() {
  
  const queryClient = new QueryClient();

  const { session } = useAuthSession();
  const { isReady } = useAppSetup();
  const { isConnected } = useNetworkStatus();
  useNotificationNavigation(isReady);

  if (!isReady || isConnected === null) return <AppLoading />;

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AppRoutes session={session!} isConnected={isConnected} />
        </ToastProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
