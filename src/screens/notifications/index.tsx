import { View, SectionList } from "react-native";
import { Text } from "@/components/Text";
import { NotificationCard } from "@/components/NotificationCard";
import { NotificationSkeleton } from "@/components/skeleton/NotificationSkeleton";
import {
  useGetNotificationsByUser,
  useGetNotificationsByUserToday,
} from "@/queries/notifications";

export function Notifications() {
  const { data: oldNotifications, isLoading } = useGetNotificationsByUser();
  const { data: todayNotifications, isLoading: isLoadingToday } =
    useGetNotificationsByUserToday();

  if (isLoading || isLoadingToday) {
    return (
      <View className="bg-white h-screen">
        <NotificationSkeleton />
      </View>
    );
  }

  // Garante que só adicionamos se houver dados
  const sections = [];

  if (todayNotifications && todayNotifications.length > 0) {
    sections.push({ title: "Hoje", data: todayNotifications });
  }

  if (oldNotifications && oldNotifications.length > 0) {
    sections.push({ title: "Anteriores", data: oldNotifications });
  }

  // Se todas as seções estiverem vazias
  const isEmpty = sections.length === 0;

  if (isEmpty) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-greyscale-400 text-base font-urbanist-medium">
          Nenhuma notificação disponível
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white/20 py-1">
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={NotificationCard}
        renderSectionHeader={({ section: { title } }) => (
          <View className="mx-2 my-4">
            {title === "Hoje" ? (
              <Text className="text-greyscale-500 text-sm">
                Suas notificações mais recentes
              </Text>
            ) : (
              <Text className="text-greyscale-500 text-sm">
                Notificações anteriores
              </Text>
            )}
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListFooterComponent={<View className="h-8" />}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}
