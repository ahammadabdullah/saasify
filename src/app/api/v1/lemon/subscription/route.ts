import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("user-id");
  const supabase = await createSupabaseServerClient();

  // Fetch customer record from Supabase
  const { data: customer, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 });
  }

  const response = await fetch(
    `${process.env.LEMON_URL}/subscriptions/${customer.subscription_id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.LEMON_API_KEY}`,
      },
    }
  );

  const subscription = await response.json();
  return NextResponse.json(subscription);
}
