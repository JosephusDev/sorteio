import { useGetAllBets } from "@/queries/bets";
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

export type BetsData = NonNullable<ReturnType<typeof useGetAllBets>["data"]>;

export type NotificationStore = {
  qtdNotification: number;
  setQtdNotification: (qtd: number) => void;
};

export type ImageStore = {
  image: ImagePicker.ImagePickerResult | null;
  setImage: (image: ImagePicker.ImagePickerResult) => void;
  resetImage: () => void;
};
