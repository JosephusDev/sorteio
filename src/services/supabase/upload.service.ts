import { usePickerImageStore } from "@/stores/image";
import supabase from ".";
import { uploadFile } from "./upload";

export async function UploadProfileImage() {
  const imagePickerStore = usePickerImageStore.getState();

  const session = await supabase.auth.getSession();

  if (!session.data.session?.user.id)
    throw new Error("Usuário não autenticado");

  const id_usuario = session.data.session.user.id;

  // faz o upload e obtém a url

  const { url } = await uploadFile("usuarios", imagePickerStore.image!);

  // insere a url na tabela de imagens

  const { error } = await supabase
    .from("imagem_usuario")
    .insert({ id_usuario, url });

  // elimina a imagem enviada caso tenha ocorrido um erro

  if (error) {
    const { error } = await supabase.storage.from("usuarios").remove([url]);
    if (error) throw error;
  }
}
