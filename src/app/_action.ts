"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { CreateUserInput, LoginUserInput } from "@/lib/user-schema";
import { revalidatePath } from "next/cache";

export async function signUpWithEmailAndPassword({
  data,
  emailRedirectTo,
}: {
  data: CreateUserInput;
  emailRedirectTo?: string;
}) {
  const supabase = await createSupabaseServerClient();
  const name = data.name;
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo,
      data: {
        name,
      },
    },
  });
  if (error) {
    return {
      success: false,
      error: {
        message: error.code,
      },
    };
  }
  revalidatePath("/", "layout");
  return { success: true };
}

export async function signInWithEmailAndPassword(data: LoginUserInput) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  if (error) {
    return {
      success: false,
      error: {
        message: error.code,
      },
    };
  }
  revalidatePath("/", "layout");
  return { success: true };
}
