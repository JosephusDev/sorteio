import { View, TouchableOpacity, Image } from "react-native";
import { Text } from "./Text";
import { NotificationIcon, SearchIcon } from "@/assets/icons";
import { router } from "expo-router";
import { useGetUserInfo } from "@/queries/auth";
import { UserInfoSkeleton } from "./skeleton/UserInfoSkeleton";
import { useGetNotificationsByUser } from "@/queries/notifications";
import { useNotificationCountStore } from "@/stores/Notifications";
import { useEffect, useState } from "react";

export function Header() {
  const { data, isPending } = useGetUserInfo();
  const { data: notifications, isPending: isPendingNotifications } = useGetNotificationsByUser();
  const notificationStore = useNotificationCountStore();
  const [qtdNotifications, setQtdNotifications] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  // Aguarda o estado de notificações lidas persistido do zustand ser carregado do AsyncStorage
  useEffect(() => {
    const unsub = useNotificationCountStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    if (useNotificationCountStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return unsub;
  }, []);

  useEffect(() => {
    if (!isHydrated || !notifications) return;

    const storedQtd = Number(notificationStore.qtd ?? 0);
    const totalNotifications = Number(notifications?.length ?? 0);

    // Calcula a quantidade de notificações não lidas
    const qtd_notifications = Math.max(totalNotifications - storedQtd, 0);

    setQtdNotifications(qtd_notifications);
  }, [isHydrated, notifications]);

  const goToNotificationsPage = (qtd: number) => {
    setQtdNotifications(0)
    notificationStore.setQtd(notifications?.length ?? 0);
    router.push("/notifications")
  }

  if (isPending || !data || isPendingNotifications) return <UserInfoSkeleton />;

  return (
    <View className="bg-white px-5 p-4 flex-row items-center justify-between shadow-sm">
      <View className="flex-row gap-2">
        {data.avatarUrl ? (
          <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
            <Image source={{ uri: data.avatarUrl }} className="w-12 h-12 rounded-2xl" />
          </TouchableOpacity>
        ) : (
          <View className="w-12 h-12 rounded-full bg-greyscale-200 items-center justify-center">
            <Text className="text-greyscale-800 text-lg font-urbanist-medium">
              {data?.nome ? data.nome.charAt(0).toUpperCase() : ""}
            </Text>
          </View>
        )}
        <View>
          <Text className="text-greyscale-600 text-sm font-urbanist-regular">Olá! 👋</Text>
          <Text className="text-greyscale-900 text-lg font-urbanist-bold">{data.nome}</Text>
        </View>
      </View>

      <View className="flex-row justify-center items-center">
        <TouchableOpacity onPress={() => router.push("/search")}>
          <SearchIcon width={24} />
        </TouchableOpacity>
        <TouchableOpacity
          className="relative ml-2"
          onPress={() => goToNotificationsPage(qtdNotifications)}
        >
          <NotificationIcon />
          {qtdNotifications > 0 && (
            <View className="absolute top-2 right-2 w-4 h-4 bg-error rounded-full items-center justify-center">
              <Text
                className="text-white text-xs font-urbanist-bold"
                style={{ fontSize: 9 }}
              >
                {qtdNotifications > 9 ? "+9" : qtdNotifications}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
