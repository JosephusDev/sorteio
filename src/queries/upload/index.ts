import { UploadProfileImage } from "@/services/supabase/upload.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUploadProfileImageMutation(uri: string) {
  return useMutation({
    mutationFn: () => UploadProfileImage(uri),
    onSuccess: () => useQueryClient().invalidateQueries({ queryKey: ["user-info"] })
  });
}