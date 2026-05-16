"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import AIReadingCard from "@/components/reports/AIReadingCard";

type PaymentStage =
  | "checking"
  | "syncing"
  | "generating"
  | "completed"
  | "failed";

type StoredAIReadingPayload = {
  serviceType: "fengshui" | "liuyao";
  aiRequestBody: Record<string, unknown>;
};

type OrderInfo = {
  id: string;
  service_type: "fengshui" | "liuyao";
  amount_cny: number;
  status: string;
  provider_order_id: string;
  provider_trade_no?: string | null;
  consumed: boolean;
  ai_result?: string | null;
  created_at: string;
};

function getStorageKey(providerOrderId: string) {
  return `sy-ai-reading-payload:${providerOrderId}`;
}

function getFallbackProviderOrderId() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem("sy-ai-last-provider-order-id") || "";
}

async function fetchJson(url: string, init?: RequestInit) {
  const response = await fetch(url, init);
  const data = await response.json();

  if (!response.ok || data.ok === false) {
    throw new Error(data.error || data.message || "Request failed.");
  }

  return data;
}

export default function AlipaySuccessClient() {
  const searchParams = useSearchParams();

  const outTradeNoFromUrl = searchParams.get("out_trade_no") || "";
  const [providerOrderId, setProviderOrderId] = useState(outTradeNoFromUrl);
  const [order, setOrder] = useState<OrderInfo | null>(null);
  const [stage, setStage] = useState<PaymentStage>("checking");
  const [message, setMessage] = useState("Checking payment status...");
  const [error, setError] = useState("");
  const [reading, setReading] = useState("");

  const serviceLabel = useMemo(() => {
    if (order?.service_type === "liuyao") {
      return {
        title: "Liu Yao AI Preliminary Interpretation",
        zhTitle: "六爻 AI 初步解读",
        backHref: "/liuyao",
        backText: "Back to Liu Yao / 返回六爻页面",
      };
    }

    return {
      title: "Feng Shui AI Preliminary Interpretation",
      zhTitle: "风水 AI 初步解读",
      backHref: "/fengshui",
      backText: "Back to Feng Shui / 返回风水页面",
    };
  }, [order?.service_type]);

  useEffect(() => {
    async function runPaymentUnlockFlow() {
      try {
        let currentProviderOrderId = outTradeNoFromUrl || getFallbackProviderOrderId();

        if (!currentProviderOrderId) {
          throw new Error(
            "Missing Alipay order number. Please return to the reading page and create a new payment order.",
          );
        }

        setProviderOrderId(currentProviderOrderId);

        setStage("checking");
        setMessage("Checking local order status... / 正在查询订单状态...");

        let checkData = await fetchJson(
          `/api/orders/check?providerOrderId=${encodeURIComponent(
            currentProviderOrderId,
          )}`,
        );

        let currentOrder = checkData.order as OrderInfo;
        setOrder(currentOrder);

        if (currentOrder.consumed && currentOrder.ai_result) {
          setReading(currentOrder.ai_result);
          setStage("completed");
          setMessage("AI reading has already been generated. / AI 解读已生成。");
          return;
        }

        if (currentOrder.status !== "paid") {
          setStage("syncing");
          setMessage(
            "Payment notification has not arrived yet. Syncing with Alipay... / 支付通知尚未到达，正在主动同步支付宝订单...",
          );

          const syncData = await fetchJson(
            `/api/alipay/sync-order?providerOrderId=${encodeURIComponent(
              currentProviderOrderId,
            )}`,
          );

          if (syncData.order) {
            currentOrder = syncData.order as OrderInfo;
          } else {
            checkData = await fetchJson(
              `/api/orders/check?providerOrderId=${encodeURIComponent(
                currentProviderOrderId,
              )}`,
            );
            currentOrder = checkData.order as OrderInfo;
          }

          setOrder(currentOrder);
        }

        if (currentOrder.status !== "paid") {
          throw new Error(
            "The order is not paid yet. If you have just paid, please wait a few seconds and refresh this page.",
          );
        }

        if (currentOrder.consumed && currentOrder.ai_result) {
          setReading(currentOrder.ai_result);
          setStage("completed");
          setMessage("AI reading has already been generated. / AI 解读已生成。");
          return;
        }

        const rawPayload = window.localStorage.getItem(
          getStorageKey(currentProviderOrderId),
        );

        if (!rawPayload) {
          throw new Error(
            "Payment is confirmed, but the reading data was not found in this browser. Please contact us with your order number.",
          );
        }

        const storedPayload = JSON.parse(rawPayload) as StoredAIReadingPayload;

        if (
          storedPayload.serviceType !== "fengshui" &&
          storedPayload.serviceType !== "liuyao"
        ) {
          throw new Error("Invalid stored reading payload.");
        }

        const aiEndpoint =
          storedPayload.serviceType === "liuyao"
            ? "/api/ai/liuyao"
            : "/api/ai/fengshui";

        setStage("generating");
        setMessage("Payment confirmed. Generating AI reading... / 支付已确认，正在生成 AI 解读...");

        const aiData = await fetchJson(aiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...storedPayload.aiRequestBody,
            orderId: currentOrder.id,
          }),
        });

        setReading(aiData.reading || "");
        setStage("completed");
        setMessage("AI reading generated successfully. / AI 解读已生成。");

        window.localStorage.removeItem(getStorageKey(currentProviderOrderId));
      } catch (caughtError) {
        const finalMessage =
          caughtError instanceof Error
            ? caughtError.message
            : "Failed to unlock AI reading.";

        setError(finalMessage);
        setStage("failed");
        setMessage("Failed to unlock AI reading. / AI 解读解锁失败。");
      }
    }

    runPaymentUnlockFlow();
  }, [outTradeNoFromUrl]);

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl space-y-8">
        <section className="rounded-[2rem] border border-amber-300/20 bg-white/[0.04] p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
            Alipay Payment / 支付宝支付
          </p>

          <h1 className="mt-4 text-3xl font-semibold">
            Payment Unlock / 付费解锁
          </h1>

          <p className="mt-4 text-sm leading-7 text-zinc-400">{message}</p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5 text-sm leading-7 text-zinc-300">
            <p>Provider Order ID / 支付宝商户订单号：{providerOrderId || "—"}</p>
            <p>Order ID / 网站订单 ID：{order?.id || "—"}</p>
            <p>Status / 状态：{order?.status || stage}</p>
            <p>Consumed / 是否已生成：{order?.consumed ? "Yes / 是" : "No / 否"}</p>
          </div>

          {stage !== "completed" && stage !== "failed" ? (
            <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-100">
              Please do not close this page. The system is checking payment and
              generating your AI reading.
              <br />
              请不要关闭页面，系统正在确认支付并生成 AI 解读。
            </div>
          ) : null}

          {error ? (
            <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm leading-7 text-red-200">
              {error}
              <br />
              If payment has been completed, please save the provider order ID
              above and contact us.
              <br />
              如果你已经完成支付，请保存上方订单号并联系我们。
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={serviceLabel.backHref}
              className="rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
            >
              {serviceLabel.backText}
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact / 联系
            </Link>
          </div>
        </section>

        {reading ? (
          <AIReadingCard
            title={serviceLabel.title}
            zhTitle={serviceLabel.zhTitle}
            reading={reading}
          />
        ) : null}
      </div>
    </main>
  );
}