import { NextResponse } from "next/server";
import { getAlipayClient } from "@/lib/alipay/client";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

function getTradeStatus(result: Record<string, unknown>) {
  return String(result.tradeStatus || result.trade_status || "");
}

function getTradeNo(result: Record<string, unknown>) {
  return String(result.tradeNo || result.trade_no || "");
}

function getTotalAmount(result: Record<string, unknown>) {
  const raw = result.totalAmount || result.total_amount || "0";
  return Number(raw);
}

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
      .select("id, amount_cny, status, provider_order_id, provider_trade_no")
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

    const alipaySdk = getAlipayClient();

    const alipayResult = await alipaySdk.exec("alipay.trade.query", {
      bizContent: {
        outTradeNo: providerOrderId,
      },
    });

    const result = alipayResult as Record<string, unknown>;

    const code = String(result.code || "");
    const msg = String(result.msg || "");
    const subCode = String(result.subCode || result.sub_code || "");
    const subMsg = String(result.subMsg || result.sub_msg || "");

    if (code !== "10000") {
      return NextResponse.json({
        ok: false,
        message: "Alipay trade query did not return success",
        providerOrderId,
        alipay: {
          code,
          msg,
          subCode,
          subMsg,
          raw: result,
        },
        localOrder: order,
      });
    }

    const tradeStatus = getTradeStatus(result);
    const tradeNo = getTradeNo(result);
    const totalAmount = getTotalAmount(result);
    const expectedAmount = Number(order.amount_cny);

    if (Math.abs(expectedAmount - totalAmount) > 0.001) {
      return NextResponse.json(
        {
          ok: false,
          message: "Alipay amount mismatch",
          providerOrderId,
          expectedAmount,
          totalAmount,
          tradeStatus,
          tradeNo,
          alipay: result,
        },
        { status: 400 },
      );
    }

    if (tradeStatus === "TRADE_SUCCESS" || tradeStatus === "TRADE_FINISHED") {
      const { data: updatedOrder, error: updateError } = await supabaseAdmin
        .from("ai_orders")
        .update({
          status: "paid",
          provider_trade_no: tradeNo || null,
          updated_at: new Date().toISOString(),
        })
        .eq("provider_order_id", providerOrderId)
        .select(
          "id, service_type, amount_cny, status, provider_order_id, provider_trade_no, consumed, created_at",
        )
        .single();

      if (updateError || !updatedOrder) {
        throw new Error(updateError?.message || "Failed to update order");
      }

      return NextResponse.json({
        ok: true,
        message: "Order synced as paid",
        tradeStatus,
        order: updatedOrder,
        alipay: result,
      });
    }

    return NextResponse.json({
      ok: true,
      message: "Order is not paid yet",
      tradeStatus,
      order,
      alipay: result,
    });
  } catch (error) {
    console.error("Sync Alipay order error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to sync Alipay order";

    return NextResponse.json(
      {
        ok: false,
        message,
      },
      { status: 500 },
    );
  }
}