import { UploadProfileImage } from "@/services/supabase/upload.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUploadProfileImageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => UploadProfileImage(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user-info"] });
    },
  });
}
