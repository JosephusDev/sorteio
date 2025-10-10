import { signUp, signIn, logOut } from "@/services/supabase/auth.service";
import { Auth } from "@/types";
import { useMutation } from "@tanstack/react-query";

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
