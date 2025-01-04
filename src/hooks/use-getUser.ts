"use client";
import { useEffect, useState } from "react";

import { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const useGetUser = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const supabase = getSupabaseBrowserClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (!error && user) {
        setUser(user);
      }
    };
    getUser();
  }, []);

  return [user];
};

export default useGetUser;
