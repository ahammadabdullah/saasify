import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { subscriptionId } = await req.json();
  try {
    const response = await fetch(
      `https://api.lemonsqueezy.com/v1/subscriptions/${subscriptionId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.LEMON_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "canceled" }),
      }
    );

    const subscription = await response.json();
    return NextResponse.json(subscription);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update subscription" },
      { status: 500 }
    );
  }
}
