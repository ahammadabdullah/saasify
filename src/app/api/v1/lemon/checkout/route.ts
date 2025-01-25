import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { price, product_name, user_id, variant_id } = body;
  //   console.log("------------body from checkout------------", body);
  //   console.log(price, "price");
  //   console.log(product_name, "product_name");
  //   console.log(user_id, "user_id");
  //   console.log(variant_id, "variant_id");
  //   console.log(process.env.NEXT_PUBLIC_BASE_URL, "process.env.NEXT_PUBLIC_URL");
  const data = {
    type: "checkouts",
    attributes: {
      custom_price: price * 100,
      product_options: {
        name: product_name,
        redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment`,
      },
      checkout_data: {
        custom: {
          user_id,
        },
      },
      expires_at: new Date(Date.now() + 1000 * 60 * 15).toISOString(),
    },
    relationships: {
      store: {
        data: {
          type: "stores",
          id: process.env.LEMON_STORE_ID,
        },
      },
      variant: {
        data: {
          type: "variants",
          id: variant_id,
        },
      },
    },
  };
  if (!product_name || !user_id || !variant_id) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  const res = await fetch(`${process.env.LEMON_URL}/checkouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LEMON_API_KEY}`,
    },
    body: JSON.stringify({ data }),
  });
  const checkout = await res.json();
  console.log("------------res form checkout------------", checkout.data);
  return NextResponse.json(checkout.data);
}
