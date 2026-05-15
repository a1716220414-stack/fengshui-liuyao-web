import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.primaryHexagram) {
      return NextResponse.json(
        {
          ok: false,
          message: "Missing hexagram result. / 缺少卦象结果。",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        ok: false,
        requiresPayment: true,
        message:
          "AI interpretation is a paid feature. Please complete payment or contact the diviner for a deeper reading. / AI 解卦属于付费功能，请完成付费后解锁，或联系卦师进行深度解卦。",
      },
      { status: 402 },
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid request. / 请求格式错误。",
      },
      { status: 400 },
    );
  }
}