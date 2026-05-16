"use client";

import { useState } from "react";
import type {
  FengShuiInsight,
  FengShuiReport,
} from "@/lib/fengshui-insights";

export default function FengShuiReportCard({
  report,
}: {
  report: FengShuiReport;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopySummary() {
    const summaryText = [
      "SY Metaphysics Feng Shui Preliminary Report / 风水免费初步报告",
      "",
      `Score / 评分：${report.score}/100`,
      `Level / 等级：${report.levelLabel}｜${report.zhLevelLabel}`,
      "",
      `Summary / 总结：`,
      report.summary,
      report.zhSummary,
      "",
      "Key Insights / 重点提示：",
      ...report.keyInsights.map(
        (item, index) =>
          `${index + 1}. ${item.title}｜${item.zhTitle}\n${item.description}\n${item.zhDescription}`,
      ),
      "",
      "Suggested focus for deeper consultation / 深度咨询建议重点：",
      ...report.paidFocus.map(
        (item, index) => `${index + 1}. ${item}\n${report.zhPaidFocus[index]}`,
      ),
      "",
      "I would like to continue with a deeper Feng Shui consultation.",
      "我想继续进行更深入的风水咨询。",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="mt-8 rounded-[1.75rem] border border-amber-200/20 bg-amber-200/10 p-6">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
            Free Preliminary Report / 免费初步报告
          </p>

          <h3 className="mt-4 text-2xl font-semibold text-white">
            Feng Shui Clarity Score
          </h3>

          <p className="mt-2 text-xl text-amber-100">
            风水信息清晰度评分
          </p>
        </div>

        <div className="rounded-full border border-amber-200/30 bg-black/30 px-6 py-4 text-center">
          <p className="text-3xl font-bold text-amber-100">{report.score}</p>
          <p className="mt-1 text-xs text-stone-500">/ 100</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5">
        <p className="text-lg font-semibold text-white">
          {report.levelLabel}
        </p>

        <p className="mt-1 text-lg text-amber-100">{report.zhLevelLabel}</p>

        <p className="mt-4 text-sm leading-7 text-stone-300">
          {report.summary}
        </p>

        <p className="mt-3 text-sm leading-7 text-stone-500">
          {report.zhSummary}
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {report.keyInsights.map((item) => (
          <InsightItem key={`${item.title}-${item.zhTitle}`} insight={item} />
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5">
        <h4 className="font-semibold text-white">
          Suggested focus for deeper consultation
        </h4>

        <p className="mt-1 text-sm text-amber-100">
          深度咨询建议重点
        </p>

        <div className="mt-4 space-y-3">
          {report.paidFocus.map((item, index) => (
            <div
              key={item}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <p className="text-sm leading-6 text-stone-300">{item}</p>
              <p className="mt-1 text-xs leading-5 text-stone-500">
                {report.zhPaidFocus[index]}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-200/20 bg-black/25 p-5">
        <h4 className="font-semibold text-white">
          Continue consultation
        </h4>

        <p className="mt-1 text-sm text-amber-100">
          复制这份摘要，发送给咨询师继续深度分析
        </p>

        <p className="mt-4 text-sm leading-7 text-stone-400">
          This summary includes your preliminary Feng Shui score, key concerns,
          and suggested focus for deeper review. You can copy it and send it
          through WeChat, Instagram, X, or Email.
        </p>

        <p className="mt-3 text-sm leading-7 text-stone-500">
          这段摘要会整理你的风水评分、重点提示和深度咨询方向。你可以复制后通过微信、Instagram、X 或邮箱发送给我。
        </p>

        <button
          type="button"
          onClick={handleCopySummary}
          className="mt-5 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
        >
          {copied
            ? "Copied / 已复制"
            : "Copy Consultation Summary / 复制咨询摘要"}
        </button>
      </div>
    </section>
  );
}

function InsightItem({ insight }: { insight: FengShuiInsight }) {
  const colorClass =
    insight.level === "positive"
      ? "border-emerald-200/20 bg-emerald-200/10 text-emerald-100"
      : insight.level === "attention"
        ? "border-red-300/20 bg-red-300/10 text-red-100"
        : "border-amber-200/20 bg-amber-200/10 text-amber-100";

  const label =
    insight.level === "positive"
      ? "Positive / 有利"
      : insight.level === "attention"
        ? "Attention / 需注意"
        : "Neutral / 中性";

  return (
    <article className="rounded-2xl border border-white/10 bg-black/25 p-5">
      <span
        className={`inline-flex rounded-full border px-3 py-1 text-xs ${colorClass}`}
      >
        {label}
      </span>

      <h4 className="mt-4 font-semibold text-white">{insight.title}</h4>

      <p className="mt-1 text-sm text-amber-100">{insight.zhTitle}</p>

      <p className="mt-4 text-sm leading-7 text-stone-300">
        {insight.description}
      </p>

      <p className="mt-3 text-sm leading-7 text-stone-500">
        {insight.zhDescription}
      </p>
    </article>
  );
}