import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

function checkAdminPassword(request: Request) {
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedPassword) {
    return {
      ok: false,
      status: 500,
      message: "Missing ADMIN_PASSWORD environment variable.",
    };
  }

  const providedPassword = request.headers.get("x-admin-password") || "";

  if (providedPassword !== expectedPassword) {
    return {
      ok: false,
      status: 401,
      message: "Unauthorized.",
    };
  }

  return {
    ok: true,
    status: 200,
    message: "Authorized.",
  };
}

export async function GET(request: Request) {
  try {
    const auth = checkAdminPassword(request);

    if (!auth.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: auth.message,
        },
        { status: auth.status },
      );
    }

    const url = new URL(request.url);

    const status = url.searchParams.get("status") || "";
    const serviceType = url.searchParams.get("serviceType") || "";
    const limitRaw = Number(url.searchParams.get("limit") || "50");

    const limit =
      Number.isFinite(limitRaw) && limitRaw > 0 && limitRaw <= 200
        ? limitRaw
        : 50;

    let query = supabaseAdmin
      .from("ai_orders")
      .select(
        [
          "id",
          "created_at",
          "updated_at",
          "service_type",
          "amount_cny",
          "status",
          "provider",
          "provider_order_id",
          "provider_trade_no",
          "customer_name",
          "customer_email",
          "customer_wechat",
          "customer_x_account",
          "customer_instagram",
          "request_payload",
          "ai_result",
          "consumed",
        ].join(","),
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (status) {
      query = query.eq("status", status);
    }

    if (serviceType) {
      query = query.eq("service_type", serviceType);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      ok: true,
      orders: data || [],
    });
  } catch (error) {
    console.error("Admin AI orders list error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to fetch AI orders.";

    return NextResponse.json(
      {
        ok: false,
        message,
      },
      { status: 500 },
    );
  }
}