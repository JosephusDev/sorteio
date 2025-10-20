import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotificationStore } from "@/types";

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      qtdNotification: 0,
      setQtdNotification: (qtd) => set({ qtdNotification: qtd }),
    }),
    {
      name: "notification-count-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
