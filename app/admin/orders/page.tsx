"use client";

import { useEffect, useMemo, useState } from "react";

type ServiceType = "fengshui" | "liuyao";

type AIOrder = {
  id: string;
  created_at: string;
  updated_at?: string | null;
  service_type: ServiceType;
  amount_cny: number;
  status: string;
  provider: string;
  provider_order_id: string;
  provider_trade_no?: string | null;
  customer_name?: string | null;
  customer_email?: string | null;
  customer_wechat?: string | null;
  customer_x_account?: string | null;
  customer_instagram?: string | null;
  request_payload?: unknown;
  ai_result?: string | null;
  consumed: boolean;
};

type OrdersResponse = {
  ok: boolean;
  orders?: AIOrder[];
  message?: string;
};

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function getStatusClass(status: string) {
  if (status === "paid") {
    return "border-emerald-400/30 bg-emerald-500/10 text-emerald-200";
  }

  if (status === "pending") {
    return "border-amber-400/30 bg-amber-500/10 text-amber-200";
  }

  if (status === "failed") {
    return "border-red-400/30 bg-red-500/10 text-red-200";
  }

  return "border-white/15 bg-white/5 text-zinc-300";
}

function getServiceLabel(serviceType: ServiceType) {
  if (serviceType === "liuyao") {
    return "Liu Yao / 六爻";
  }

  return "Feng Shui / 风水";
}

function safeJson(value: unknown) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export default function AdminOrdersPage() {
  const [adminPassword, setAdminPassword] = useState("");
  const [orders, setOrders] = useState<AIOrder[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [syncingOrderId, setSyncingOrderId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const summary = useMemo(() => {
    const total = orders.length;
    const paid = orders.filter((order) => order.status === "paid").length;
    const pending = orders.filter((order) => order.status === "pending").length;
    const consumed = orders.filter((order) => order.consumed).length;
    const revenue = orders
      .filter((order) => order.status === "paid")
      .reduce((sum, order) => sum + Number(order.amount_cny || 0), 0);

    return {
      total,
      paid,
      pending,
      consumed,
      revenue,
    };
  }, [orders]);

  useEffect(() => {
    const savedPassword = window.localStorage.getItem("sy-admin-password") || "";
    setAdminPassword(savedPassword);
  }, []);

  async function fetchOrders() {
    setError("");
    setMessage("");

    if (!adminPassword.trim()) {
      setError("Please enter admin password. / 请输入后台密码。");
      return;
    }

    try {
      setIsLoading(true);
      window.localStorage.setItem("sy-admin-password", adminPassword);

      const params = new URLSearchParams();

      if (statusFilter) {
        params.set("status", statusFilter);
      }

      if (serviceFilter) {
        params.set("serviceType", serviceFilter);
      }

      params.set("limit", "100");

      const response = await fetch(`/api/admin/ai-orders?${params.toString()}`, {
        method: "GET",
        headers: {
          "x-admin-password": adminPassword,
        },
      });

      const data = (await response.json()) as OrdersResponse;

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Failed to fetch orders.");
      }

      setOrders(data.orders || []);
      setMessage("Orders loaded. / 订单已加载。");
    } catch (caughtError) {
      const finalMessage =
        caughtError instanceof Error
          ? caughtError.message
          : "Failed to fetch orders.";

      setError(finalMessage);
    } finally {
      setIsLoading(false);
    }
  }

  async function syncOrder(providerOrderId: string) {
    setError("");
    setMessage("");

    if (!adminPassword.trim()) {
      setError("Please enter admin password. / 请输入后台密码。");
      return;
    }

    try {
      setSyncingOrderId(providerOrderId);

      const response = await fetch("/api/admin/sync-ai-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify({
          providerOrderId,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.ok === false) {
        throw new Error(data.message || "Failed to sync order.");
      }

      setMessage(data.message || "Order synced. / 订单已同步。");
      await fetchOrders();
    } catch (caughtError) {
      const finalMessage =
        caughtError instanceof Error
          ? caughtError.message
          : "Failed to sync order.";

      setError(finalMessage);
    } finally {
      setSyncingOrderId("");
    }
  }

  return (
    <main className="min-h-screen bg-black px-5 py-10 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] border border-amber-300/20 bg-white/[0.04] p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
            Admin Orders / 后台订单
          </p>

          <h1 className="mt-4 text-3xl font-semibold">
            AI Reading Payment Orders
          </h1>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            查看风水和六爻 AI 付费订单、支付状态、AI 生成状态，并可手动同步支付宝状态。
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Total
              </p>
              <p className="mt-2 text-2xl font-semibold">{summary.total}</p>
            </div>

            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">
                Paid
              </p>
              <p className="mt-2 text-2xl font-semibold">{summary.paid}</p>
            </div>

            <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                Pending
              </p>
              <p className="mt-2 text-2xl font-semibold">{summary.pending}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Paid Amount
              </p>
              <p className="mt-2 text-2xl font-semibold">
                ¥{summary.revenue.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-[1.2fr_0.7fr_0.7fr_0.5fr]">
            <input
              type="password"
              value={adminPassword}
              onChange={(event) => setAdminPassword(event.target.value)}
              placeholder="Admin password / 后台密码"
              className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-amber-300/60"
            />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/60"
            >
              <option value="">All Status / 全部状态</option>
              <option value="pending">Pending / 待支付</option>
              <option value="paid">Paid / 已支付</option>
              <option value="failed">Failed / 失败</option>
            </select>

            <select
              value={serviceFilter}
              onChange={(event) => setServiceFilter(event.target.value)}
              className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/60"
            >
              <option value="">All Services / 全部服务</option>
              <option value="fengshui">Feng Shui / 风水</option>
              <option value="liuyao">Liu Yao / 六爻</option>
            </select>

            <button
              type="button"
              onClick={fetchOrders}
              disabled={isLoading}
              className="rounded-xl bg-amber-300 px-4 py-3 text-sm font-semibold text-black transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Loading..." : "Load"}
            </button>
          </div>

          {message ? (
            <div className="mt-5 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              {message}
            </div>
          ) : null}

          {error ? (
            <div className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}
        </section>

        <section className="space-y-5">
          {orders.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-zinc-500">
              No orders loaded yet. / 尚未加载订单。
            </div>
          ) : null}

          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClass(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>

                    <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-zinc-300">
                      {getServiceLabel(order.service_type)}
                    </span>

                    <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-zinc-300">
                      {order.consumed
                        ? "Consumed / 已生成"
                        : "Not consumed / 未生成"}
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-semibold">
                    {order.provider_order_id}
                  </h2>

                  <p className="mt-2 text-sm text-zinc-500">
                    Created at / 创建时间：{formatDate(order.created_at)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => syncOrder(order.provider_order_id)}
                    disabled={syncingOrderId === order.provider_order_id}
                    className="rounded-full border border-emerald-300/40 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-300/10 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {syncingOrderId === order.provider_order_id
                      ? "Syncing..."
                      : "Sync Alipay / 同步支付宝"}
                  </button>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs text-zinc-500">Amount / 金额</p>
                  <p className="mt-1 font-semibold">¥{order.amount_cny}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs text-zinc-500">Provider / 支付平台</p>
                  <p className="mt-1 font-semibold">{order.provider}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs text-zinc-500">Alipay Trade No</p>
                  <p className="mt-1 break-all text-sm font-semibold">
                    {order.provider_trade_no || "—"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs text-zinc-500">Order ID</p>
                  <p className="mt-1 break-all text-sm font-semibold">
                    {order.id}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm font-semibold text-zinc-200">
                  Contact / 联系方式
                </p>

                <div className="mt-3 grid gap-2 text-sm text-zinc-400 md:grid-cols-2">
                  <p>Name: {order.customer_name || "—"}</p>
                  <p>Email: {order.customer_email || "—"}</p>
                  <p>WeChat: {order.customer_wechat || "—"}</p>
                  <p>X: {order.customer_x_account || "—"}</p>
                  <p>Instagram: {order.customer_instagram || "—"}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <details className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-amber-100">
                    Request Payload / 用户提交数据
                  </summary>

                  <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-xl bg-black/40 p-4 text-xs leading-6 text-zinc-400">
                    {safeJson(order.request_payload)}
                  </pre>
                </details>

                <details className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-amber-100">
                    AI Result / AI 解读结果
                  </summary>

                  <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-xl bg-black/40 p-4 text-xs leading-6 text-zinc-400">
                    {order.ai_result || "No AI result yet. / 暂无 AI 结果。"}
                  </pre>
                </details>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}