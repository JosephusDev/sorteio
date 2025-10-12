import { signUp, signIn, logOut, getUserInfo } from "@/services/supabase/auth.service";
import { Auth } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useSignUpMutation({ name, password, email, phone }: Auth) {
  return useMutation({
    mutationFn: () => signUp({ name, password, email, phone }),
  });
}

export function useSignInMutation({
  password,
  email,
}: Omit<Auth, "name" | "phone">) {
  return useMutation({
    mutationFn: () => signIn({ password, email }),
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
    staleTime: Infinity
  });
}
