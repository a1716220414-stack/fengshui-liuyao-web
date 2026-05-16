import { supabaseAdmin } from "@/lib/supabase-admin";

export type PaidOrderServiceType = "fengshui" | "liuyao";

export async function verifyPaidOrder({
  orderId,
  serviceType,
}: {
  orderId: string;
  serviceType: PaidOrderServiceType;
}) {
  if (!orderId) {
    return {
      ok: false,
      status: 402,
      message: "Payment is required before generating AI reading.",
      order: null,
    };
  }

  const { data: order, error } = await supabaseAdmin
    .from("ai_orders")
    .select(
      "id, service_type, amount_cny, status, provider_order_id, provider_trade_no, consumed",
    )
    .eq("id", orderId)
    .single();

  if (error || !order) {
    return {
      ok: false,
      status: 404,
      message: "Order not found.",
      order: null,
    };
  }

  if (order.service_type !== serviceType) {
    return {
      ok: false,
      status: 400,
      message: "Order service type does not match this AI reading.",
      order,
    };
  }

  if (order.status !== "paid") {
    return {
      ok: false,
      status: 402,
      message: "This order has not been paid yet.",
      order,
    };
  }

  if (order.consumed) {
    return {
      ok: false,
      status: 409,
      message: "This paid order has already been used.",
      order,
    };
  }

  return {
    ok: true,
    status: 200,
    message: "Order verified.",
    order,
  };
}

export async function markOrderConsumed({
  orderId,
  aiResult,
}: {
  orderId: string;
  aiResult: string;
}) {
  const { error } = await supabaseAdmin
    .from("ai_orders")
    .update({
      consumed: true,
      ai_result: aiResult,
      updated_at: new Date().toISOString(),
    })
    .eq("id", orderId);

  if (error) {
    throw new Error(error.message);
  }
}