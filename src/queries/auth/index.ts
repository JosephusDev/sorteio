import { useToast } from "@/providers/toast";
import {
  signUp,
  signIn,
  logOut,
  getUserInfo,
  updateProfile,
  setPushToken,
  verifyOtp,
  recoveryPassword,
  changePassword,
  signInWithGoogle,
} from "@/services/supabase/auth.service";
import { usePhoneStore } from "@/stores/phone";
import { Auth } from "@/types";
import { User } from "@/types/database.types";
import { authExceptionMessages } from "@/utils/auth-exceptions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

export function useSignUpMutation() {
  
  const {showToast} = useToast()
  const {setPhone} = usePhoneStore()

  return useMutation({
    mutationFn: ({ name, password, email, phone }: Auth) =>
      signUp({ name, password, email, phone }),
    onError: (error: Error & { code: string }) => {
      const code = error?.code;
      showToast({
        title: 'Aviso',
        message: authExceptionMessages[code] || 'Erro ao criar conta, tente novamente.',
        variant: 'error',
      });
    },
    onSuccess: (_, {phone}) => {
      setPhone(phone)
      router.navigate('/(auth)/verify-otp')
    }
  });
}

export function useSignInMutation() {

  const {showToast} = useToast()
  const {setPhone} = usePhoneStore()

  return useMutation({
    mutationFn: ({ password, phone }: Omit<Auth, "name" | "email">) =>
      signIn({ password, phone }),
    onError: (error: Error & { code: string }) => {
      const code = error?.code;
      showToast({
        title: 'Aviso',
        message: authExceptionMessages[code] || 'Erro ao fazer login, tente novamente.',
        variant: 'error',
      });
    },
    onSuccess: (_, {phone}) => {
      setPhone(phone)
    }
  });
}

export function useSignInWithGoogleMutation() {

  const {showToast} = useToast()

  return useMutation({
    mutationFn: ({ token, displayName, image_url }: {token: string, displayName: string, image_url: string}) =>
      signInWithGoogle({ token, displayName, image_url }),
    onError: (error: Error & { code: string }) => {
      const code = error?.code;
      showToast({
        title: 'Aviso',
        message: authExceptionMessages[code] || 'Erro ao fazer login com Google, tente novamente.',
        variant: 'error',
      });
    }
  });
}

export function useVerifyOtp() {

  const {showToast} = useToast()

  return useMutation({
    mutationFn: ({ otp, phone }: { otp: string; phone: string, type: 'recovery' | 'create-account' }) =>
      verifyOtp({ otp, phone }),
    onError: (error: Error & { code: string }) => {
      const code = error?.code;
      showToast({
        title: 'Aviso',
        message: authExceptionMessages[code],
        variant: 'error',
      });
    },
    onSuccess: (_, {type}) => {
      showToast({
        title: 'Aviso',
        message: 'Código verificado com sucesso',
        variant: 'success',
      });
      type === 'create-account' ? router.replace('/(tabs)/home') : router.replace('/recovery-password')
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

export function useRecoveryPassword() {

  const {showToast} = useToast()
  const {setPhone} = usePhoneStore()

  return useMutation({
    mutationFn: ({ phone }: { phone: string }) =>
      recoveryPassword({ phone }),
    onError: (error: Error & { code: string }) => {
      const code = error?.code;
      showToast({
        title: 'Aviso',
        message: authExceptionMessages[code] || 'Erro ao gerar OTP, tente novamente.',
        variant: 'error',
      });
    },
    onSuccess: (_, {phone}) => {
      setPhone(phone)
      showToast({
        title: 'Aviso',
        message: 'OTP gerado com sucesso',
        variant: 'success',
      });
    }
  });
}

export function useChangePassword() {

  const {showToast} = useToast()

  return useMutation({
    mutationFn: ({ password }: {password: string}) =>
      changePassword({ password }),
    onError: (error: Error & { code: string }) => {
      const code = error?.code;
      showToast({
        title: 'Aviso',
        message: authExceptionMessages[code] || 'Erro ao alterar a palavra-passe, tente novamente.',
        variant: 'error',
      });
    },
    onSuccess: () => {
      showToast({
        title: 'Aviso',
        message: 'Palavra-passe alterada com sucesso',
        variant: 'success',
      });
      router.push('/congrats')
    }
  });
}