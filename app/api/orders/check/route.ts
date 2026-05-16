import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const orderId = url.searchParams.get("orderId");
    const providerOrderId = url.searchParams.get("providerOrderId");

    if (!orderId && !providerOrderId) {
      return NextResponse.json(
        {
          ok: false,
          message: "Missing orderId or providerOrderId",
        },
        { status: 400 },
      );
    }

    let query = supabaseAdmin
      .from("ai_orders")
      .select(
        "id, service_type, amount_cny, status, provider_order_id, provider_trade_no, consumed, created_at",
      );

    if (orderId) {
      query = query.eq("id", orderId);
    } else {
      query = query.eq("provider_order_id", providerOrderId);
    }

    const { data: order, error } = await query.single();

    if (error || !order) {
      return NextResponse.json(
        {
          ok: false,
          message: "Order not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ok: true,
      order,
    });
  } catch (error) {
    console.error("Check order error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to check order";

    return NextResponse.json(
      {
        ok: false,
        message,
      },
      { status: 500 },
    );
  }
}