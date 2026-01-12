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
  const { error, data: authData } = await supabase.auth.signUp({
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
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
  if (authError) {
    return {
      success: false,
      error: {
        message: authError.code,
      },
    };
  }
  revalidatePath("/", "layout");

  return { success: true, data: authData };
}

export async function resetPassword(email: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/update-password`,
  });
  if (error) {
    return {
      success: false,
      error: {
        message: error.code,
      },
    };
  }
  return { success: true };
}

export async function updatePassword({ password }: { password: string }) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return {
      success: false,
      error: {
        message: error.message,
      },
    };
  }
  return { success: true };
}
