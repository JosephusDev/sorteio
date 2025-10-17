import { useGetActiveProducts } from "@/queries/products";
import * as ImagePicker from "expo-image-picker";

export type Auth = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

export type ProductsData = NonNullable<
  ReturnType<typeof useGetActiveProducts>["data"]
>;

export type NotificationStore = {
  qtd: number;
  setQtd: (qtd: number) => void;
  resetQtd: () => void;
};

export type ImageStore = {
  image: ImagePicker.ImagePickerResult | null;
  setImage: (image: ImagePicker.ImagePickerResult) => void;
  resetImage: () => void;
};
