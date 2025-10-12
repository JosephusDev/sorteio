import supabase from ".";

export async function getActiveProducts() {
  const { data, error } = await supabase
    .from('produto')
    .select(`
      *,
      imagem_produto (*),
      fornecedor (*)
    `)
    .eq('status', 'activo');

  if (error) throw error;
  return data;
}

export async function getAllProducts() {
  const { data, error } = await supabase.from('produto').select(`
      *,
      imagem_produto (*),
      fornecedor (*)
    `)
    if (error) throw error;
    return data
}

export async function getProductByName(name: string) {
  if (!name) return [];
  const { data, error } = await supabase.from('produto').select(`
      *,
      imagem_produto (*),
      fornecedor (*)
    `)
    .ilike('nome', `%${name}%`)
    if (error) throw error;
    return data
}
