import { create } from "zustand";
import { PushTokenStore } from "@/types";

export const usePushTokenStore = create<PushTokenStore>((set) => ({
  pushToken: "",
  setPushToken: (token) => set({ pushToken: token }),
}));
