"use client";

import { useState } from "react";
import type { LiuYaoBasicReading } from "@/lib/liuyao-reading";

export default function LiuYaoBasicReadingCard({
  reading,
}: {
  reading: LiuYaoBasicReading;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopySummary() {
    const summaryText = [
      "SY Metaphysics Liu Yao Basic Reading / 六爻免费基础解读",
      "",
      `Headline / 卦象提示：${reading.headline}`,
      `${reading.zhHeadline}`,
      "",
      "Summary / 总结：",
      reading.summary,
      reading.zhSummary,
      "",
      "Reading Sections / 解读层次：",
      ...reading.sections.map(
        (section, index) =>
          `${index + 1}. ${section.title}｜${section.zhTitle}\n${section.content}\n${section.zhContent}`,
      ),
      "",
      "Deeper reading can focus on / 深度解卦可以进一步分析：",
      ...reading.deeperReadingFocus.map(
        (item, index) =>
          `${index + 1}. ${item}\n${reading.zhDeeperReadingFocus[index]}`,
      ),
      "",
      "I would like to continue with a deeper Liu Yao reading.",
      "我想继续进行更深入的六爻解卦。",
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
    <section className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
      <p className="text-sm uppercase tracking-[0.28em] text-amber-200">
        Free Basic Reading / 免费基础解读
      </p>

      <h3 className="mt-4 text-xl font-semibold text-amber-100">
        {reading.headline}
      </h3>

      <p className="mt-2 text-lg text-white">{reading.zhHeadline}</p>

      <div className="mt-5 rounded-xl border border-white/10 bg-black/25 p-4">
        <p className="text-sm leading-7 text-stone-300">{reading.summary}</p>

        <p className="mt-3 text-sm leading-7 text-stone-500">
          {reading.zhSummary}
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {reading.sections.map((section) => (
          <article
            key={`${section.title}-${section.zhTitle}`}
            className="rounded-xl border border-white/10 bg-black/25 p-4"
          >
            <h4 className="font-semibold text-white">{section.title}</h4>

            <p className="mt-1 text-sm text-amber-100">{section.zhTitle}</p>

            <p className="mt-4 text-sm leading-7 text-stone-300">
              {section.content}
            </p>

            <p className="mt-3 text-sm leading-7 text-stone-500">
              {section.zhContent}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-black/25 p-4">
        <h4 className="font-semibold text-white">
          Deeper reading can focus on
        </h4>

        <p className="mt-1 text-sm text-amber-100">
          深度解卦可以进一步分析
        </p>

        <div className="mt-4 space-y-3">
          {reading.deeperReadingFocus.map((item, index) => (
            <div
              key={item}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
            >
              <p className="text-sm leading-6 text-stone-300">{item}</p>
              <p className="mt-1 text-xs leading-5 text-stone-500">
                {reading.zhDeeperReadingFocus[index]}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-amber-200/20 bg-black/25 p-4">
        <h4 className="font-semibold text-white">
          Continue consultation
        </h4>

        <p className="mt-1 text-sm text-amber-100">
          复制这份摘要，发送给咨询师继续深度解卦
        </p>

        <p className="mt-4 text-sm leading-7 text-stone-400">
          This summary includes the free Liu Yao reading structure and deeper
          interpretation focus. You can copy it and send it through WeChat,
          Instagram, X, or Email.
        </p>

        <p className="mt-3 text-sm leading-7 text-stone-500">
          这段摘要会整理基础卦象解读和深度解卦方向。你可以复制后通过微信、Instagram、X 或邮箱发送给我。
        </p>

        <button
          type="button"
          onClick={handleCopySummary}
          className="mt-5 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
        >
          {copied
            ? "Copied / 已复制"
            : "Copy Reading Summary / 复制解卦摘要"}
        </button>
      </div>
    </section>
  );
}