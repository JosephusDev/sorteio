import { useToast } from "@/providers/toast";
import { Session } from "@supabase/supabase-js";
import { Stack } from "expo-router";
import { useEffect } from "react";

export function AppRoutes({ session, isConnected }: { session: Session, isConnected: boolean }) {

  const { showToast } = useToast();

  useEffect(() => {
    if (!isConnected) {
      showToast({
        message: "Sem conexão com à internet",
        variant: "error",
      });
    }
  }, [isConnected]);
  
  return (
    <Stack screenOptions={{ headerShown: false, animation: "fade", headerShadowVisible: false, headerTitleStyle: { fontFamily: "Urbanist_600SemiBold", fontSize: 18 } }}>
      
      <Stack.Protected guard={!isConnected}>
        <Stack.Screen name="no-internet" />
      </Stack.Protected>
      
      <Stack.Protected guard={!session?.user && isConnected}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
      </Stack.Protected>

      <Stack.Protected guard={!!session?.user && isConnected}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="notifications" options={{ headerShown: true, title: "Notificações" }} />
        <Stack.Screen name="search" options={{ headerShown: true, title: "Pesquisar" }} />
        <Stack.Screen name="help" options={{ headerShown: true, title: "Ajuda" }} />
        <Stack.Screen name="edit-profile" options={{ headerShown: true, title: "Editar Perfil" }} />
        <Stack.Screen name="bet-viewer" />
        <Stack.Screen name="(modals)" options={{ presentation: "formSheet", sheetAllowedDetents: [0.4], sheetCornerRadius: 20 }} />
        <Stack.Screen
          name="recovery-password"
          options={{ headerShown: true, title: "Criar Nova Senha" }}
        />
        <Stack.Screen name="congrats" options={{ presentation: "modal" }} />
      </Stack.Protected>
    </Stack>
  );
}
