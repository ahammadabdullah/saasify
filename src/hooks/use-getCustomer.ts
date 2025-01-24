"use client";
import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import useGetUser from "./use-getUser";

const useGetCustomer = () => {
  const [customer, setCustomer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user] = useGetUser();

  useEffect(() => {
    const getCustomer = async () => {
      if (!user?.id) {
        return;
      }

      const supabase = getSupabaseBrowserClient();
      setIsLoading(true);
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching customer:", error);
        setIsLoading(false);
        return;
      }

      if (data) {
        setCustomer(data);
      }
      setIsLoading(false);
    };

    getCustomer();
  }, [user]);

  return [customer, isLoading];
};

export default useGetCustomer;
