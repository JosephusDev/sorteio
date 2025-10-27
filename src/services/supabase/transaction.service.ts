import supabase from ".";

export async function getAllTransactions() {
  try {
    const { data, error } = await supabase
      .from("auditoria_transacoes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    throw error;
  }
}
