import { NextResponse } from "next/server";
import { buildFengShuiAIPrompt } from "@/lib/ai/prompts";
import { generateAIReading } from "@/lib/ai/provider";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const rawText = JSON.stringify(body);

    if (rawText.length > 12000) {
      return NextResponse.json(
        {
          ok: false,
          error: "Input is too long. Please reduce the submitted content.",
        },
        { status: 400 },
      );
    }

    const prompt = buildFengShuiAIPrompt(body);

    const reading = await generateAIReading({
      prompt,
      maxOutputTokens: 10000,
    });

    return NextResponse.json(
      {
        ok: true,
        reading,
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    );
  } catch (error) {
    console.error("Feng Shui AI route error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to generate Feng Shui AI reading.",
      },
      { status: 500 },
    );
  }
}