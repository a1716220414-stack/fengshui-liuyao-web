import { getAlipayClient } from "@/lib/alipay/client";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

function formDataToRecord(formData: FormData) {
  const result: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    result[key] = String(value);
  }

  return result;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const params = formDataToRecord(formData);

    const alipaySdk = getAlipayClient();

    const isValid = alipaySdk.checkNotifySign(params);

    if (!isValid) {
      console.error("Alipay notify sign invalid:", params);
      return new Response("fail", { status: 200 });
    }

    const outTradeNo = params.out_trade_no;
    const tradeNo = params.trade_no;
    const tradeStatus = params.trade_status;
    const totalAmount = Number(params.total_amount || 0);

    if (!outTradeNo) {
      console.error("Missing out_trade_no in Alipay notify");
      return new Response("fail", { status: 200 });
    }

    const { data: order, error: orderError } = await supabaseAdmin
      .from("ai_orders")
      .select("id, amount_cny, status")
      .eq("provider_order_id", outTradeNo)
      .single();

    if (orderError || !order) {
      console.error("Order not found:", outTradeNo, orderError);
      return new Response("fail", { status: 200 });
    }

    const expectedAmount = Number(order.amount_cny);

    if (Math.abs(expectedAmount - totalAmount) > 0.001) {
      console.error("Alipay amount mismatch:", {
        outTradeNo,
        expectedAmount,
        totalAmount,
      });

      return new Response("fail", { status: 200 });
    }

    if (tradeStatus === "TRADE_SUCCESS" || tradeStatus === "TRADE_FINISHED") {
      const { error: updateError } = await supabaseAdmin
        .from("ai_orders")
        .update({
          status: "paid",
          provider_trade_no: tradeNo || null,
          updated_at: new Date().toISOString(),
        })
        .eq("provider_order_id", outTradeNo);

      if (updateError) {
        console.error("Failed to update paid order:", updateError);
        return new Response("fail", { status: 200 });
      }
    }

    return new Response("success", { status: 200 });
  } catch (error) {
    console.error("Alipay notify error:", error);
    return new Response("fail", { status: 200 });
  }
}