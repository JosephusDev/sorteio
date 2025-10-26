import {
  getActiveProducts,
  getAllProducts,
  getProductByName,
} from "@/services/supabase/product.service";
import { useQuery } from "@tanstack/react-query";

export function useGetActiveProducts() {
  return useQuery({
    queryKey: ["activeProducts"],
    queryFn: () => getActiveProducts(),
    refetchInterval: 1000 * 60 * 5,
  });
}

export function useGetAllProducts() {
  return useQuery({
    queryKey: ["allProducts"],
    queryFn: () => getAllProducts(),
    refetchInterval: 1000 * 60 * 5,
  });
}

export function useGetProductByName(name: string) {
  return useQuery({
    queryKey: ["productByName", name],
    queryFn: () => getProductByName(name),
    refetchInterval: 1000 * 60 * 5,
  });
}
