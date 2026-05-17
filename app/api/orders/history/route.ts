import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

type RawAIOrder = {
  id: string;
  created_at: string;
  service_type: string;
  amount_cny: number | string | null;
  status: string;
  provider_order_id: string;
  provider_trade_no: string | null;
  consumed: boolean | null;
  ai_result: string | null;
  customer_email: string | null;
  customer_wechat: string | null;
  customer_x_account: string | null;
  customer_instagram: string | null;
};

type PublicOrder = {
  id: string;
  created_at: string;
  service_type: string;
  amount_cny: number;
  status: string;
  provider_order_id: string;
  provider_trade_no: string | null;
  consumed: boolean;
  ai_result: string | null;
};

function cleanOrderId(value: unknown) {
  return String(value || "")
    .trim()
    .slice(0, 100);
}

function normalizeContact(value: unknown) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .slice(0, 120);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isRawAIOrder(value: unknown): value is RawAIOrder {
  if (!isPlainObject(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.created_at === "string" &&
    typeof value.service_type === "string" &&
    typeof value.status === "string" &&
    typeof value.provider_order_id === "string"
  );
}

function toNumber(value: number | string | null) {
  const numberValue = Number(value || 0);
  return Number.isFinite(numberValue) ? numberValue : 0;
}

function toPublicOrder(order: RawAIOrder): PublicOrder {
  const isPaid = order.status === "paid";

  return {
    id: order.id,
    created_at: order.created_at,
    service_type: order.service_type,
    amount_cny: toNumber(order.amount_cny),
    status: order.status,
    provider_order_id: order.provider_order_id,
    provider_trade_no: order.provider_trade_no || null,
    consumed: Boolean(order.consumed),
    ai_result: isPaid ? order.ai_result || null : null,
  };
}

function contactMatches(order: RawAIOrder, contact: string) {
  if (!contact) {
    return true;
  }

  const fields = [
    order.customer_email,
    order.customer_wechat,
    order.customer_x_account,
    order.customer_instagram,
  ]
    .filter(Boolean)
    .map((item) => String(item).trim().toLowerCase());

  return fields.includes(contact);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const providerOrderId = cleanOrderId(body.providerOrderId);
    const contact = normalizeContact(body.contact);

    const providerOrderIds = Array.isArray(body.providerOrderIds)
      ? body.providerOrderIds
          .map(cleanOrderId)
          .filter(Boolean)
          .slice(0, 30)
      : [];

    if (!providerOrderId && providerOrderIds.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Missing providerOrderId or providerOrderIds.",
        },
        { status: 400 },
      );
    }

    let query = supabaseAdmin
      .from("ai_orders")
      .select(
        [
          "id",
          "created_at",
          "service_type",
          "amount_cny",
          "status",
          "provider_order_id",
          "provider_trade_no",
          "consumed",
          "ai_result",
          "customer_email",
          "customer_wechat",
          "customer_x_account",
          "customer_instagram",
        ].join(","),
      )
      .order("created_at", { ascending: false })
      .limit(30);

    if (providerOrderId) {
      query = query.eq("provider_order_id", providerOrderId);
    } else {
      query = query.in("provider_order_id", providerOrderIds);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    const rows = Array.isArray(data) ? (data as unknown[]) : [];

    const orders = rows
      .filter(isRawAIOrder)
      .filter((order) => {
        if (providerOrderId && contact) {
          return contactMatches(order, contact);
        }

        return true;
      });

    return NextResponse.json({
      ok: true,
      orders: orders.map(toPublicOrder),
    });
  } catch (error) {
    console.error("Order history error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to fetch order history.";

    return NextResponse.json(
      {
        ok: false,
        message,
      },
      { status: 500 },
    );
  }
}