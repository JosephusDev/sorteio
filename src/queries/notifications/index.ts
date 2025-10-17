import { getNotificationByUser } from "@/services/supabase/notification.service";
import { useQuery } from "@tanstack/react-query";

export function useGetNotificationsByUser() {
  return useQuery({
    queryKey: ["notifications-user"],
    queryFn: () => getNotificationByUser(),
    refetchInterval: 1000 * 60,
  });
}

export function useGetNotificationsByUserToday() {
  return useQuery({
    queryKey: ["notifications-user-today"],
    queryFn: () => getNotificationByUser({ filter: "today" }),
    refetchInterval: 1000 * 60,
  });
}
