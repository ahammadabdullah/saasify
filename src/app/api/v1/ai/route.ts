import openai from "@/lib/openai";
import { systemPrompt } from "@/lib/supabase/prompt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt, model } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }
    const res = await openai.chat.completions.create({
      //   model: model || "gpt-4o",
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    });
    const message = res.choices[0].message.content || "No response generated.";
    return NextResponse.json({ response: message });
  } catch (error) {
    console.error("Error in AI API:", error);
    return NextResponse.json(
      { error: "Failed to generate response." },
      { status: 500 }
    );
  }
}
