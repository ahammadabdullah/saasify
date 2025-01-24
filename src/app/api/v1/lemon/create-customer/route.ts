import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const { email, name, userId } = await req.json();
  const supabase = await createSupabaseServerClient();
  const response = await fetch(`${process.env.LEMON_URL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LEMON_API_KEY}`,
    },
    body: JSON.stringify({
      data: {
        type: "customers",
        attributes: {
          email,
          name,
        },
        relationships: {
          store: {
            data: {
              id: process.env.LEMON_STORE_ID,
              type: "stores",
            },
          },
        },
      },
    }),
  });

  const data = await response.json();

  if (data?.data) {
    const { error } = await supabase.from("customers").insert({
      id: userId,
      lemon_customer_id: data.data.id,
    });

    if (error) {
      return NextResponse.json(
        { error: "Failed to store customer in database" },
        { status: 500 }
      );
    }

    return NextResponse.json({ customerId: data.data.id });
  } else {
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 }
    );
  }
}
