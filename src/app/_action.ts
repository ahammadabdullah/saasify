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
  const { user } = authData;
  const userId = user?.id;
  const email = user?.email;
  const user_name = user?.user_metadata?.name || "";
  console.log("------userInfo------", userId, email, user_name);
  console.log("------Base URL------", process.env.NEXT_PUBLIC_BASE_URL);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/lemon/create-customer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name: user_name,
          userId,
        }),
      }
    );
    const data = await res.json();
    console.log("------create-customer-data------", data);
    if (!data.customerId) {
      return {
        success: false,
        error: {
          message: "Failed to create account",
        },
      };
    }
  } catch (error) {
    console.log(error);
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
  console.log(authData, "-------------");

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
