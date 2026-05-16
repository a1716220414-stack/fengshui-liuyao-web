"use client";

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
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(reading);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="mt-8 rounded-[1.75rem] border border-amber-200/20 bg-black/30 p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
            AI Interpretation / AI 解读
          </p>

          <h3 className="mt-4 text-2xl font-semibold text-white">{title}</h3>

          <p className="mt-2 text-xl text-amber-100">{zhTitle}</p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-amber-300/40 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-300/10"
        >
          {copied ? "Copied / 已复制" : "Copy / 复制"}
        </button>
      </div>

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
          此 AI 解读仍属于初步层级。若需要具体布局调整、应期细断或法事相关方案，建议继续进行人工深度咨询。
        </p>
      </div>
    </section>
  );
}