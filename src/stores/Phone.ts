import { create } from "zustand";
import { PhoneStore } from "@/types";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const usePhoneStore = create<PhoneStore>()(
  persist(
    (set) => ({
      phone: "",
      setPhone: (phone) => set({ phone: phone }),
    }),
    {
      name: "phone-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
