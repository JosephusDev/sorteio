import { useGetActiveProducts } from "@/queries/products";

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
  qtd: number
  setQtd: (qtd: number) => void
  resetQtd: () => void
}