"use client";

import Link from "next/link";
import { useState } from "react";

export default function AIReadingCard({
  title,
  zhTitle,
  reading,
}: {
  title: string;
  zhTitle: string;
  reading: string;
}) {
  const [copyStatus, setCopyStatus] = useState<
    "idle" | "success" | "failed"
  >("idle");

  async function handleCopy() {
    try {
      const content = [
        title,
        zhTitle,
        "",
        "AI Interpretation / AI 解读",
        "",
        reading,
      ].join("\n");

      await navigator.clipboard.writeText(content);

      setCopyStatus("success");
      window.setTimeout(() => setCopyStatus("idle"), 2200);
    } catch {
      setCopyStatus("failed");
      window.setTimeout(() => setCopyStatus("idle"), 2600);
    }
  }

  const copyButtonText =
    copyStatus === "success"
      ? "Copied / 已复制"
      : copyStatus === "failed"
        ? "Copy Failed / 复制失败"
        : "Copy Full Reading / 复制完整解读";

  return (
    <section className="mt-8 rounded-[1.75rem] border border-amber-200/20 bg-black/30 p-5 md:p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
            AI Interpretation / AI 解读
          </p>

          <h3 className="mt-4 text-2xl font-semibold text-white">{title}</h3>

          <p className="mt-2 text-xl text-amber-100">{zhTitle}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <button
            type="button"
            onClick={handleCopy}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
              copyStatus === "success"
                ? "border border-emerald-300/40 bg-emerald-300/10 text-emerald-100"
                : copyStatus === "failed"
                  ? "border border-red-300/40 bg-red-300/10 text-red-100"
                  : "border border-amber-300/40 text-amber-100 hover:bg-amber-300/10"
            }`}
          >
            {copyButtonText}
          </button>

          <Link
            href="/orders"
            className="rounded-full border border-white/15 px-5 py-3 text-center text-sm font-semibold text-zinc-200 transition hover:bg-white/10"
          >
            My Orders / 我的订单
          </Link>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-300/40 bg-gradient-to-br from-amber-300/15 via-amber-300/5 to-white/[0.03] p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-base font-semibold text-amber-50">
              Save this reading now / 请立即保存本次解读
            </p>

            <p className="mt-3 text-sm leading-7 text-amber-100">
              Please take a screenshot or copy this AI reading before leaving
              this page. You can later try to find it in “My Orders”, but saving
              your own copy is strongly recommended.
            </p>

            <p className="mt-3 text-sm leading-7 text-stone-300">
              离开页面前，请及时截图或复制保存本次 AI 解读。后续可以尝试在“我的订单”中查看，
              但仍建议你自行保存一份，避免更换设备、清理浏览器缓存或订单号遗失后查找不便。
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
          >
            Copy Now / 立即复制
          </button>
        </div>
      </div>

      {copyStatus === "success" ? (
        <div className="mt-5 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          Reading copied successfully. / 解读内容已复制。
        </div>
      ) : null}

      {copyStatus === "failed" ? (
        <div className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm leading-7 text-red-200">
          Copy failed. Please manually select the text below, or take a
          screenshot to save it.
          <br />
          复制失败，请手动选择下方文本复制，或直接截图保存。
        </div>
      ) : null}

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="whitespace-pre-wrap text-sm leading-8 text-stone-300">
          {reading}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-200/20 bg-amber-200/10 p-5">
        <p className="text-sm leading-7 text-amber-100">
          This AI interpretation is still a preliminary reading. For detailed
          layout adjustment, timing judgment, or ritual-related planning, please
          continue with human consultation.
        </p>

        <p className="mt-3 text-sm leading-7 text-stone-500">
          此 AI 解读仍属于初步层级。若需要具体布局调整、应期细断或法事相关方案，
          建议继续进行人工深度咨询。
        </p>
      </div>
    </section>
  );
}