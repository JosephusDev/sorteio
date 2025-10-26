import { View, TouchableOpacity, Image } from "react-native";
import { Text } from "./Text";
import { NotificationIcon, SearchIcon } from "@/assets/icons";
import { router } from "expo-router";
import { useGetUserInfo } from "@/queries/auth";
import { UserInfoSkeleton } from "./skeleton/UserInfoSkeleton";
import { useGetNotificationsByUser } from "@/queries/notifications";
import { useNotificationStore } from "@/stores/Notifications";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Header() {
  const { data, isPending } = useGetUserInfo();
  const { data: notifications, isPending: isPendingNotifications } =
    useGetNotificationsByUser();
  const notificationStore = useNotificationStore();
  const [hasNotification, setHasNotification] = useState(false);

  const [isHydrated, setIsHydrated] = useState(false);

  // safe area
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top ?? 0;

  useEffect(() => {
    const unsub = useNotificationStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });
    if (useNotificationStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }
    return unsub;
  }, []);

  useEffect(() => {
    if (!isHydrated || !notifications) return;
    setTimeout(() => {
      const existingQtdNotification = notificationStore.qtdNotification || 0;
      const hasNotification = notifications.length > existingQtdNotification;
      if (hasNotification) {
        setHasNotification(hasNotification);
        notificationStore.setQtdNotification(notifications.length);
      }
    }, 5_000);
  }, [isHydrated, notifications]);

  const goToNotificationsPage = () => {
    setHasNotification(false);
    router.push("/notifications");
  };

  if (isPending || !data || isPendingNotifications) return <UserInfoSkeleton />;

  return (
    <View
      style={{
        backgroundColor: "white",
        paddingTop: statusBarHeight + 10, // fixo e consistente
        paddingHorizontal: 20,
        paddingBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {data.avatarUrl ? (
          <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
            <Image
              source={{ uri: data.avatarUrl }}
              style={{ width: 48, height: 48, borderRadius: 16 }}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: "#E0E0E0",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text className="text-greyscale-600 text-lg font-urbanist-medium">
              {data?.nome ? data.nome.charAt(0).toUpperCase() : ""}
            </Text>
          </View>
        )}
        <View>
          <Text className="text-greyscale-600 text-sm font-urbanist-regular">
            Olá! 👋
          </Text>
          <Text className="text-greyscale-800 text-lg font-urbanist-bold">
            {data.nome}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => router.push("/search")}>
          <SearchIcon width={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 8 }}
          onPress={goToNotificationsPage}
          activeOpacity={1}
        >
          <NotificationIcon />
          {hasNotification && (
            <View className="absolute top-3 right-3 w-3 h-3 bg-error rounded-full items-center justify-center" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
