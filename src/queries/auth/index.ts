import {
  signUp,
  signIn,
  logOut,
  getUserInfo,
  updateProfile,
  setPushToken,
} from "@/services/supabase/auth.service";
import { Auth } from "@/types";
import { User } from "@/types/database.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useSignUpMutation() {
  return useMutation({
    mutationFn: ({ name, password, email, phone }: Auth) =>
      signUp({ name, password, email, phone }),
  });
}

export function useSignInMutation() {
  return useMutation({
    mutationFn: ({ password, email }: Omit<Auth, "name" | "phone">) =>
      signIn({ password, email }),
  });
}

export function useLogOutMutation() {
  return useMutation({
    mutationFn: () => logOut(),
  });
}

export function useGetUserInfo() {
  return useQuery({
    queryKey: ["user-info"],
    queryFn: () => getUserInfo(),
    refetchInterval: 1000 * 5,
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<User, "auth_id" | "created_at" | "role_id">) =>
      updateProfile(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user-info"] });
    },
  });
}

export function useSetPushTokenMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (push_token: string) =>
      setPushToken(push_token),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user-info"] });
    },
  });
}
