import { Auth } from "@/types";
import supabase from ".";
import { User } from "@/types/database.types";

export async function signUp({ name, email, password, phone }: Auth) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (data.user?.id) {
    const { error } = await supabase.from("usuario").insert({
      nome: name,
      telefone: phone,
      auth_id: data.user?.id,
    });
    if (error) throw error;
  }
  if (error) throw error;
}

export async function signIn({
  email,
  password,
}: Omit<Auth, "name" | "phone">) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getUserInfo() {
  const session = await supabase.auth.getSession();
  if (session.data.session?.user) {
    const userId = session.data.session?.user.id;
    const email = session.data.session?.user.email;
    const { data, error } = await supabase
      .from("usuario")
      .select("*")
      .eq("auth_id", userId!)
      .maybeSingle();
    const { data: imageData, error: imageError } = await supabase
      .from("imagem_usuario")
      .select("url")
      .eq("id_usuario", userId!)
      .order("created_at", { ascending: false });
    if (error) throw error;
    if (imageError) throw imageError;
    const result = { ...data, email, avatarUrl: imageData[0]?.url };
    return result;
  }
  throw new Error("Usuário não encontrado");
}

export async function updateProfile(
  data: Omit<User, "auth_id" | "created_at" | "role_id" | "push_token">,
) {
  const session = await supabase.auth.getSession();
  if (session.data.session?.user) {
    const userId = session.data.session?.user.id;
    const { error } = await supabase
      .from("usuario")
      .update(data)
      .eq("auth_id", userId!);
    if (error) throw error;
  }
}

export async function setPushToken(push_token: string) {
  const session = await supabase.auth.getSession();
  if (session.data.session?.user) {
    const userId = session.data.session?.user.id;
    const { error } = await supabase
      .from("usuario")
      .update({push_token})
      .eq("auth_id", userId!);
    if (error) throw error;
  }
}
