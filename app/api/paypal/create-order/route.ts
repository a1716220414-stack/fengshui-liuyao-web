import { NextResponse } from "next/server";
import { createPayPalOrder, getPayPalAiReadingPrice } from "@/lib/paypal/client";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

function generateTemporaryOrderNo() {
  const random = Math.random().toString(36).slice(2, 10).toUpperCase();
  return `PP${Date.now()}${random}`;
}

function getSubject(serviceType: string) {
  return serviceType === "fengshui"
    ? "SY Metaphysics Feng Shui AI Reading"
    : "SY Metaphysics Liu Yao AI Reading";
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

    const temporaryOrderNo = generateTemporaryOrderNo();
    const amountUsd = getPayPalAiReadingPrice();
    const subject = getSubject(serviceType);

    const { data: order, error } = await supabaseAdmin
      .from("ai_orders")
      .insert({
        service_type: serviceType,
        amount_cny: Number(amountUsd),
        status: "pending",
        provider: "paypal",
        provider_order_id: temporaryOrderNo,

        customer_name: body.customer?.name || null,
        customer_email: body.customer?.email || null,
        customer_wechat: body.customer?.wechat || null,
        customer_x_account: body.customer?.xAccount || null,
        customer_instagram: body.customer?.instagram || null,

        request_payload: body.requestPayload || body,
      })
      .select("id")
      .single();

    if (error || !order) {
      throw new Error(error?.message || "Failed to create local order");
    }

    const paypalOrder = await createPayPalOrder({
      orderId: order.id,
      serviceType,
      subject,
    });

    const { error: updateError } = await supabaseAdmin
      .from("ai_orders")
      .update({
        provider_order_id: paypalOrder.paypalOrderId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    if (updateError) {
      throw new Error(updateError.message);
    }

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      provider: "paypal",
      providerOrderId: paypalOrder.paypalOrderId,
      payUrl: paypalOrder.approveUrl,
    });
  } catch (error) {
    console.error("Create PayPal order error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to create PayPal order";

    return NextResponse.json(
      {
        ok: false,
        message,
      },
      { status: 500 },
    );
  }
}
