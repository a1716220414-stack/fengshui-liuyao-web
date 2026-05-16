import { NextResponse } from "next/server";
import { createAlipayPagePayUrl } from "@/lib/alipay/client";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

function generateOutTradeNo() {
  const random = Math.random().toString(36).slice(2, 10).toUpperCase();
  return `AI${Date.now()}${random}`;
}

function getPrice() {
  const raw = process.env.AI_READING_PRICE_CNY || "6.99";
  const price = Number(raw);

  if (!Number.isFinite(price) || price <= 0) {
    throw new Error("Invalid AI_READING_PRICE_CNY");
  }

  return price.toFixed(2);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const serviceType = String(body.serviceType || "");

    if (!["fengshui", "liuyao"].includes(serviceType)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Invalid serviceType",
        },
        { status: 400 },
      );
    }

    const outTradeNo = generateOutTradeNo();
    const totalAmount = getPrice();

    const subject =
      serviceType === "fengshui"
        ? "SY Metaphysics Feng Shui AI Reading"
        : "SY Metaphysics Liu Yao AI Reading";

    const { data: order, error } = await supabaseAdmin
      .from("ai_orders")
      .insert({
        service_type: serviceType,
        amount_cny: Number(totalAmount),
        status: "pending",
        provider: "alipay",
        provider_order_id: outTradeNo,

        customer_name: body.customer?.name || null,
        customer_email: body.customer?.email || null,
        customer_wechat: body.customer?.wechat || null,
        customer_x_account: body.customer?.xAccount || null,
        customer_instagram: body.customer?.instagram || null,

        request_payload: body.requestPayload || body,
      })
      .select("id, provider_order_id")
      .single();

    if (error || !order) {
      throw new Error(error?.message || "Failed to create order");
    }

    const notifyUrl = process.env.ALIPAY_NOTIFY_URL;
    const returnUrl = process.env.ALIPAY_RETURN_URL;

    if (!notifyUrl || !returnUrl) {
      throw new Error("Missing ALIPAY_NOTIFY_URL or ALIPAY_RETURN_URL");
    }

    const payUrl = createAlipayPagePayUrl({
      notifyUrl,
      returnUrl,
      outTradeNo,
      totalAmount,
      subject,
      body: `AI preliminary reading order: ${outTradeNo}`,
    });

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      providerOrderId: outTradeNo,
      payUrl,
    });
  } catch (error) {
    console.error("Create Alipay order error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to create Alipay order";

    return NextResponse.json(
      {
        ok: false,
        message,
      },
      { status: 500 },
    );
  }
}