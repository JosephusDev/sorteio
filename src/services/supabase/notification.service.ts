import supabase from ".";

export async function getNotificationByUser({
  filter,
}: { filter?: "today" } = {}) {
  const session = await supabase.auth.getSession();
  const userId = session.data.session?.user.id;
  if (!userId) throw new Error("Usuário não encontrado");
  let query = supabase
    .from("notificacao")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (filter === "today") {
    query = query.gte("created_at", new Date().toISOString().slice(0, 10));
  } else {
    query = query.lt("created_at", new Date().toISOString().slice(0, 10));
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}
