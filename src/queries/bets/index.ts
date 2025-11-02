import {
  deleteBet,
  getAllBets,
  getBetDetails,
  getParticipantsByBet,
} from "@/services/supabase/bets.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllBets(product_name: string) {
  return useQuery({
    queryKey: ["allBets", product_name],
    queryFn: () => getAllBets(product_name),
    refetchInterval: 1000 * 60 * 5,
  });
}

export function useGetBetDetails(product_id: string) {
  return useQuery({
    queryKey: ["BetDetails", product_id],
    queryFn: () => getBetDetails(product_id),
    refetchInterval: 1000,
  });
}

export function useGetParticipantsByBet(product_id: string) {
  return useQuery({
    queryKey: ["ParticipantBet", product_id],
    queryFn: () => getParticipantsByBet(product_id),
    refetchInterval: 1000 * 60 * 5,
  });
}

export function useDeleteBetMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBet(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["allBets"] });
    },
  });
}
