import supabase from ".";

export async function getAllBets(product_name: string) {
  const session = await supabase.auth.getSession();

  if (!session.data.session?.user.id)
    throw new Error("Usuário não autenticado");

  const id_usuario = session.data.session.user.id;

  const { data, error } = await supabase.rpc(
    "getbets",
    { p_name: product_name, p_user_id: id_usuario },
    { get: true },
  );

  if (error) throw error;
  return data;
}

export async function getParticipantsByBet(product_id: string) {
  const { data, error } = await supabase.rpc(
    "get_users_for_product",
    { p_produto_id: product_id },
    { get: true },
  );

  if (error) throw error;
  return data;
}

export async function getBetDetails(product_id: string) {
  const { data, error } = await supabase
    .rpc("getbets")
    .eq("produto_id", product_id)

  if (error) throw error;
  return data[0];
}

export async function deleteBet(id: string) {
  const { error } = await supabase.from("aposta").delete().eq("id", id);
  if (error) throw error;
}
