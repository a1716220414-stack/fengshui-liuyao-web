import { NextResponse } from "next/server";
import { buildLiuYaoAIPrompt } from "@/lib/ai/prompts";
import { generateAIReading } from "@/lib/ai/provider";
import { verifyPaidOrder, markOrderConsumed } from "@/lib/payment/paid-order";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const orderId = String(body.orderId || "");

    const payment = await verifyPaidOrder({
      orderId,
      serviceType: "liuyao",
    });

    if (!payment.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: payment.message,
          order: payment.order,
        },
        { status: payment.status },
      );
    }

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

    const prompt = buildLiuYaoAIPrompt(body);

    const reading = await generateAIReading({
      prompt,
      maxOutputTokens: 5000,
    });

    await markOrderConsumed({
      orderId,
      aiResult: reading,
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
    console.error("Liu Yao AI route error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to generate Liu Yao AI reading.",
      },
      { status: 500 },
    );
  }
}