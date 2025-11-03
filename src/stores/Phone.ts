import { create } from "zustand";
import { PhoneStore } from "@/types";

export const usePhoneStore = create<PhoneStore>((set) => ({
  phone: "",
  setPhone: (phone) => set({ phone: phone }),
}));
