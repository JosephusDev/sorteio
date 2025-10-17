import { create } from "zustand";
import { ImageStore } from "@/types";

export const usePickerImageStore = create<ImageStore>((set) => ({
  image: null,
  setImage: (image) => set({ image }),
  resetImage: () => set({ image: null }),
}));
