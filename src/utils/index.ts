import * as FileSystem from "expo-file-system";

export const formatPrice = (price: number) =>
  `${price.toLocaleString("pt-AO")} Kz`;

export const capitalizeText = (text: string | null) => {
  return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : "";
};
