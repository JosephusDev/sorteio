import { useToast } from "@/providers/toast";
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
import { authExceptionMessages } from "@/utils/auth-exceptions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useSignUpMutation() {
  
  const {showToast} = useToast()

  return useMutation({
    mutationFn: ({ name, password, email, phone }: Auth) =>
      signUp({ name, password, email, phone }),
    onError: (error: Error & { code: string }) => {
      const code = error?.code;
      showToast({
        title: 'Aviso',
        message: authExceptionMessages[code],
        variant: 'error',
      });
    },
    onSuccess: () => {
      showToast({
        title: 'Aviso',
        message: 'Conta criada com sucesso',
        variant: 'success',
      });
    }
  });
}

export function useSignInMutation() {

  const {showToast} = useToast()

  return useMutation({
    mutationFn: ({ password, email }: Omit<Auth, "name" | "phone">) =>
      signIn({ password, email }),
    onError: (error: Error & { code: string }) => {
      const code = error?.code;
      showToast({
        title: 'Aviso',
        message: authExceptionMessages[code],
        variant: 'error',
      });
    },
    onSuccess: () => {
      showToast({
        title: 'Aviso',
        message: 'Sessão iniciada com sucesso',
        variant: 'success',
      });
    }
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
    refetchOnWindowFocus: true
  });
}

export function useUpdateProfileMutation() {

  const {showToast} = useToast()

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<User, "auth_id" | "created_at" | "role_id" | "push_token">) =>
      updateProfile(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user-info"] });
      showToast({
        title: 'Aviso',
        message: 'Alterações guardadas com sucesso',
        variant: 'success',
      });
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
