import {
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import { Text } from "./Text";
import { NotificationIcon, SearchIcon } from "@/assets/icons";
import { router } from "expo-router";
import { useGetUserInfo } from "@/queries/auth";
import { UserInfoSkeleton } from "./skeleton/UserInfoSkeleton";
import { useGetNotificationsByUser } from "@/queries/notifications";
import { useNotificationCountStore } from "@/stores/Notifications";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Header() {
  const { data, isPending } = useGetUserInfo();
  const { data: notifications, isPending: isPendingNotifications } =
    useGetNotificationsByUser();
  const notificationStore = useNotificationCountStore();
  const [qtdNotifications, setQtdNotifications] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  // safe area
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top ?? 0;

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
    const qtd_notifications = Math.max(totalNotifications - storedQtd, 0);
    setQtdNotifications(qtd_notifications);
  }, [isHydrated, notifications]);

  const goToNotificationsPage = (qtd: number) => {
    setQtdNotifications(0);
    notificationStore.setQtd(notifications?.length ?? 0);
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
            <Text className="text-greyscale-800 text-lg font-urbanist-medium">
              {data?.nome ? data.nome.charAt(0).toUpperCase() : ""}
            </Text>
          </View>
        )}
        <View>
          <Text className="text-greyscale-600 text-sm font-urbanist-regular">
            Olá! 👋
          </Text>
          <Text className="text-greyscale-900 text-lg font-urbanist-bold">
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
          onPress={() => goToNotificationsPage(qtdNotifications)}
          activeOpacity={1}
        >
          <NotificationIcon />
          {qtdNotifications > 0 && (
            <View className="absolute top-2 right-2 w-4 h-4 bg-error rounded-full items-center justify-center">
              {" "}
              <Text
                className="text-white text-xs font-urbanist-bold"
                style={{ fontSize: 9 }}
              >
                {" "}
                {qtdNotifications > 9 ? "+9" : qtdNotifications}{" "}
              </Text>{" "}
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
