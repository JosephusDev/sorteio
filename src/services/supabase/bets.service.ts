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

export async function deleteBet(id: string) {
  console.log("a eliminar: ", id);
  const { error } = await supabase.from("aposta").delete().eq("id", id);
  if (error) throw error;
}
