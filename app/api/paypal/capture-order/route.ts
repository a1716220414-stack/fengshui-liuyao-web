import { NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal/client";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const providerOrderId = url.searchParams.get("providerOrderId");

    if (!providerOrderId) {
      return NextResponse.json(
        {
          ok: false,
          message: "Missing providerOrderId",
        },
        { status: 400 },
      );
    }

    const { data: order, error: orderError } = await supabaseAdmin
      .from("ai_orders")
      .select(
        "id, service_type, amount_cny, status, provider_order_id, provider_trade_no, consumed, ai_result, created_at",
      )
      .eq("provider_order_id", providerOrderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        {
          ok: false,
          message: "Order not found in Supabase",
          providerOrderId,
        },
        { status: 404 },
      );
    }

    if (order.status === "paid") {
      return NextResponse.json({
        ok: true,
        message: "Order is already paid",
        order,
      });
    }

    const captured = await capturePayPalOrder(providerOrderId);

    if (
      captured.status !== "COMPLETED" &&
      captured.captureStatus !== "COMPLETED"
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: "PayPal order was not completed",
          paypal: captured.paypalOrder,
          order,
        },
        { status: 402 },
      );
    }

    const { data: updatedOrder, error: updateError } = await supabaseAdmin
      .from("ai_orders")
      .update({
        status: "paid",
        provider_trade_no: captured.captureId,
        updated_at: new Date().toISOString(),
      })
      .eq("provider_order_id", providerOrderId)
      .select(
        "id, service_type, amount_cny, status, provider_order_id, provider_trade_no, consumed, ai_result, created_at",
      )
      .single();

    if (updateError || !updatedOrder) {
      throw new Error(updateError?.message || "Failed to update order");
    }

    return NextResponse.json({
      ok: true,
      message: "PayPal order captured as paid",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Capture PayPal order error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to capture PayPal order";

    return NextResponse.json(
      {
        ok: false,
        message,
      },
      { status: 500 },
    );
  }
}
