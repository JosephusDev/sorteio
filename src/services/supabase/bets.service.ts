import supabase from ".";

export async function getAllBets(product_name: string) {
  const { data, error } = await supabase.rpc(
    "getbets",
    { p_name: product_name },
    { get: true },
  );

  if (error) throw error;
  return data;
}

export async function getParticipantsByBet(product_id: string) {
  const { data, error } = await supabase.rpc(
    "count_unique_users_for_product",
    { p_produto_id: product_id },
    { get: true },
  );

  if (error) throw error;
  return data;
}

export async function getBetDetails(bet_id: string) {
  const { data, error } = await supabase.rpc(
    "getbets"
  ).eq("aposta_id", bet_id).single();

  if (error) throw error;
  return data;
}

export async function deleteBet(id: string) {
  const { error } = await supabase.from("aposta").delete().eq("id", id);
  if (error) throw error;
}
