import { getAllTransactions } from "@/services/supabase/transation.service";
import { useQuery } from "@tanstack/react-query";
  
  export function useGetAllTransactions() {
    return useQuery({
      queryKey: ["allTransactions"],
      queryFn: () => getAllTransactions(),
      refetchInterval: 1000 * 60 * 5, // 5 minutos
    });
  }
  
 