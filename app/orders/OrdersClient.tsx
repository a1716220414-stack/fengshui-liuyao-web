"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type PublicOrder = {
  id: string;
  created_at: string;
  service_type: string;
  amount_cny: number;
  status: string;
  provider: string;
  provider_order_id: string;
  provider_trade_no: string | null;
  consumed: boolean;
  ai_result: string | null;
};

const HISTORY_KEY = "sy-ai-order-history";
const LAST_ORDER_KEY = "sy-ai-last-provider-order-id";

function getServiceLabel(serviceType: string) {
  if (serviceType === "liuyao") {
    return "Liu Yao / 六爻";
  }

  if (serviceType === "fengshui") {
    return "Feng Shui / 风水";
  }

  return serviceType || "AI Reading";
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

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function getLocalOrderIds() {
  if (typeof window === "undefined") {
    return [];
  }

  const ids: string[] = [];

  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    if (Array.isArray(parsed)) {
      parsed.forEach((item) => {
        const value = String(item || "").trim();

        if (value && !ids.includes(value)) {
          ids.push(value);
        }
      });
    }
  } catch {
    // Ignore broken local history.
  }

  const lastId = window.localStorage.getItem(LAST_ORDER_KEY) || "";

  if (lastId && !ids.includes(lastId)) {
    ids.unshift(lastId);
  }

  return ids.slice(0, 50);
}

function saveLocalOrderId(providerOrderId: string) {
  if (typeof window === "undefined" || !providerOrderId) {
    return;
  }

  const oldIds = getLocalOrderIds();
  const nextIds = [
    providerOrderId,
    ...oldIds.filter((item) => item !== providerOrderId),
  ].slice(0, 50);

  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(nextIds));
  window.localStorage.setItem(LAST_ORDER_KEY, providerOrderId);
}

function removeLocalOrderId(providerOrderId: string) {
  if (typeof window === "undefined" || !providerOrderId) {
    return;
  }

  const nextIds = getLocalOrderIds().filter((item) => item !== providerOrderId);

  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(nextIds));

  if (window.localStorage.getItem(LAST_ORDER_KEY) === providerOrderId) {
    window.localStorage.setItem(LAST_ORDER_KEY, nextIds[0] || "");
  }
}

async function fetchOrderHistory(payload: Record<string, unknown>) {
  const response = await fetch("/api/orders/history", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || data.ok === false) {
    throw new Error(data.message || "Failed to fetch order history.");
  }

  return data.orders as PublicOrder[];
}

export default function OrdersClient() {
  const [orders, setOrders] = useState<PublicOrder[]>([]);
  const [providerOrderId, setProviderOrderId] = useState("");
  const [contact, setContact] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const summary = useMemo(() => {
    const total = orders.length;
    const paid = orders.filter((order) => order.status === "paid").length;
    const generated = orders.filter((order) => order.ai_result).length;

    return {
      total,
      paid,
      generated,
    };
  }, [orders]);

  async function copyText(text: string, successMessage = "Copied. / 已复制。") {
    if (!text) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setMessage(successMessage);
      window.setTimeout(() => setMessage(""), 2200);
    } catch {
      setError("Copy failed. Please copy manually. / 复制失败，请手动复制。");
      window.setTimeout(() => setError(""), 2600);
    }
  }

  async function loadLocalOrders() {
    setError("");
    setMessage("");

    const ids = getLocalOrderIds();

    if (ids.length === 0) {
      setOrders([]);
      setMessage("No local order history found. / 当前浏览器暂无本地订单记录。");
      return;
    }

    try {
      setIsLoading(true);

      const nextOrders = await fetchOrderHistory({
        providerOrderIds: ids,
      });

      setOrders(nextOrders);
      setMessage("Local order history loaded. / 已加载本地订单记录。");
    } catch (caughtError) {
      const finalMessage =
        caughtError instanceof Error
          ? caughtError.message
          : "Failed to load local orders.";

      setError(finalMessage);
    } finally {
      setIsLoading(false);
    }
  }

  async function lookupOrder() {
    setError("");
    setMessage("");

    const targetOrderId = providerOrderId.trim();

    if (!targetOrderId) {
      setError("Please enter Provider Order ID. / 请输入支付宝商户订单号。");
      return;
    }

    try {
      setIsLoading(true);

      const nextOrders = await fetchOrderHistory({
        providerOrderId: targetOrderId,
        contact: contact.trim(),
      });

      if (nextOrders.length === 0) {
        setOrders([]);
        setMessage(
          "No matching order found. Please check your order number. / 未找到匹配订单，请检查订单号。",
        );
        return;
      }

      saveLocalOrderId(nextOrders[0].provider_order_id);
      setOrders(nextOrders);
      setExpandedOrderId(nextOrders[0].provider_order_id);
      setMessage("Order found and saved locally. / 已找到订单，并保存到本地历史。");
    } catch (caughtError) {
      const finalMessage =
        caughtError instanceof Error
          ? caughtError.message
          : "Failed to lookup order.";

      setError(finalMessage);
    } finally {
      setIsLoading(false);
    }
  }

  function forgetOrder(providerOrderIdToRemove: string) {
    removeLocalOrderId(providerOrderIdToRemove);
    setOrders((prev) =>
      prev.filter((order) => order.provider_order_id !== providerOrderIdToRemove),
    );
    setMessage("Removed from local history. / 已从本地历史移除。");
  }

  useEffect(() => {
    loadLocalOrders();
  }, []);

  return (
    <main className="min-h-screen bg-black px-5 py-10 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-amber-300/20 bg-white/[0.04] p-6 md:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
            My Orders / 我的订单
          </p>

          <h1 className="mt-4 text-3xl font-semibold">
            Paid AI Reading History
          </h1>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            当前页面用于查看本浏览器保存过的订单，也可以通过支付宝商户订单号找回已支付的 AI 解读。
          </p>

          <div className="mt-6 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm leading-7 text-amber-50">
            <p className="font-semibold">
              Important / 重要提示
            </p>

            <p className="mt-2 text-zinc-300">
              Historical orders are mainly restored through this browser&apos;s local
              storage and your Provider Order ID. Please keep screenshots or copied
              readings for safety.
            </p>

            <p className="mt-2 text-zinc-400">
              历史订单主要依赖当前浏览器本地记录和支付宝商户订单号找回。若你清理缓存、更换浏览器或更换设备，
              本地历史可能丢失，因此仍建议截图或复制保存 AI 解读内容。
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
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
                AI Readings
              </p>
              <p className="mt-2 text-2xl font-semibold">{summary.generated}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_1fr_auto_auto]">
            <input
              value={providerOrderId}
              onChange={(event) => setProviderOrderId(event.target.value)}
              placeholder="Provider Order ID / 支付宝商户订单号"
              className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-amber-300/60"
            />

            <input
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              placeholder="Email / WeChat / X / Instagram，可选"
              className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-amber-300/60"
            />

            <button
              type="button"
              onClick={lookupOrder}
              disabled={isLoading}
              className="rounded-xl bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Lookup / 查询
            </button>

            <button
              type="button"
              onClick={loadLocalOrders}
              disabled={isLoading}
              className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Local / 本地
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
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center text-sm leading-7 text-zinc-500">
              No orders to display. / 暂无可显示订单。
              <br />
              你可以先点击 Local / 本地加载本浏览器订单，或输入支付宝商户订单号查询。
            </div>
          ) : null}

          {orders.map((order) => {
            const expanded = expandedOrderId === order.provider_order_id;

            return (
              <article
                key={order.id}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs text-amber-100">
                        {getServiceLabel(order.service_type)}
                      </span>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClass(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>

                      <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-zinc-300">
                        {order.ai_result
                          ? "AI Ready / 解读已生成"
                          : "No AI Result / 暂无解读"}
                      </span>
                    </div>

                    <h2 className="mt-4 break-all text-xl font-semibold">
                      {order.provider_order_id}
                    </h2>

                    <p className="mt-2 text-sm text-zinc-500">
                      {formatDate(order.created_at)} · ¥
                      {Number(order.amount_cny || 0).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedOrderId(expanded ? "" : order.provider_order_id)
                      }
                      className="rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-200"
                    >
                      {expanded ? "Hide / 收起" : "View / 查看"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        copyText(
                          order.provider_order_id,
                          "Provider Order ID copied. / 订单号已复制。",
                        )
                      }
                      className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/10"
                    >
                      Copy ID / 复制订单号
                    </button>

                    <button
                      type="button"
                      onClick={() => forgetOrder(order.provider_order_id)}
                      className="rounded-full border border-red-300/30 px-4 py-2 text-sm text-red-100 transition hover:bg-red-300/10"
                    >
                      Forget / 移除
                    </button>
                  </div>
                </div>

                {expanded ? (
                  <div className="mt-6 space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                          Website Order ID
                        </p>
                        <p className="mt-2 break-all text-sm text-zinc-300">
                          {order.id}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                          Provider Trade No
                        </p>
                        <p className="mt-2 break-all text-sm text-zinc-300">
                          {order.provider_trade_no || "—"}
                        </p>
                      </div>
                    </div>

                    {order.ai_result ? (
                      <div className="rounded-2xl border border-amber-300/20 bg-black/30 p-5">
                        <div className="mb-4 rounded-xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm leading-7 text-amber-50">
                          <p className="font-semibold">
                            Please screenshot or copy this reading. / 请截图或复制保存本次解读。
                          </p>
                          <p className="mt-2 text-zinc-400">
                            这里展示的是该已支付订单对应的 AI 解读内容。建议再次复制或截图保存。
                          </p>
                        </div>

                        <div className="mb-4 flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              copyText(
                                order.ai_result || "",
                                "AI reading copied. / AI 解读已复制。",
                              )
                            }
                            className="rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-200"
                          >
                            Copy Reading / 复制解读
                          </button>
                        </div>

                        <pre className="max-h-[600px] overflow-auto whitespace-pre-wrap rounded-xl bg-black/40 p-4 text-sm leading-8 text-zinc-200">
                          {order.ai_result}
                        </pre>
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-sm leading-7 text-zinc-400">
                        当前订单暂未生成 AI 解读。如果你已经支付成功但这里没有内容，请回到支付成功页点击重新检查，
                        或保存订单号联系客服处理。
                      </div>
                    )}
                  </div>
                ) : null}
              </article>
            );
          })}
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/fengshui"
            className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Feng Shui / 风水
          </Link>

          <Link
            href="/liuyao"
            className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Liu Yao / 六爻
          </Link>

          <Link
            href="/contact"
            className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Contact / 联系
          </Link>
        </div>
      </div>
    </main>
  );
}