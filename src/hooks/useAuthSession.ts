import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import supabase from "@/services/supabase";

export const useAuthSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_e, sess) => {
      setSession(sess);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return { session };
};
