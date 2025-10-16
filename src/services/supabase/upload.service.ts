import { getFileFromUri } from "@/utils";
import supabase from ".";


export async function UploadProfileImage(uri: string) {
  const session = await supabase.auth.getSession()
  if(!session.data.session?.user.id) throw new Error("Usuário não autenticado")
  const file = await getFileFromUri(uri)
  const { data, error } = await supabase.functions.invoke('usuarios-upload', {
    body: {
        file,
        idUsuario: session.data.session?.user.id
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  if(error) throw error
  return data
}
