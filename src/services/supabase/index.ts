import "react-native-url-polyfill/auto";
import { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: false, // 🔄 renova tokens automaticamente
      persistSession: true, // 💾 salva sessão entre reinícios
      detectSessionInUrl: false, // 🔒 necessário no React Native
    },
  },
);

export default supabase;
