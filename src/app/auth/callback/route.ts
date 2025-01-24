import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/home";

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const { data: user, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error(
          "Error fetching user:",
          userError?.message || "Unknown error"
        );
        return NextResponse.redirect(`${origin}/auth/auth-code-error`);
      }

      // const userId = user.user.id;
      // const email = user.user.email;
      // const user_name = user.user.user_metadata?.name || "";

      // try {
      //   const { data: customerData, error: customerError } = await supabase
      //     .from("customers")
      //     .select("id")
      //     .eq("id", userId)
      //     .single();

      //   if (customerError || !customerData) {
      //     const response = await fetch(
      //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/lemon/create-customer`,
      //       {
      //         method: "POST",
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //         body: JSON.stringify({
      //           email,
      //           name: user_name,
      //           userId,
      //         }),
      //       }
      //     );

      //     const createCustomerData = await response.json();

      //     if (!createCustomerData.customerId) {
      //       console.error("Failed to create customer:", createCustomerData);
      //       return NextResponse.redirect(`${origin}/auth/customer-error`);
      //     }

      //     console.log("Customer created successfully:", createCustomerData);
      //   } else {
      //     console.log("Customer already exists:", customerData.id);
      //   }
      // } catch (customerError) {
      //   console.error("Error handling customer logic:", customerError);
      //   return NextResponse.redirect(`${origin}/auth/customer-error`);
      // }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
