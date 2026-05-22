import type { Metadata } from "next";
import Link from "next/link";
import {
  absoluteUrl,
  articleJsonLd,
  faqJsonLd,
  jsonLdScript,
} from "@/lib/seo";

const faqItems = [
  {
    question: "How should I ask a Liu Yao question online?",
    answer:
      "Ask one focused question about one matter. Include the background, current situation, time of casting, and what decision or timing issue you want to understand.",
  },
  {
    question: "Can I use an online Liu Yao coin casting tool?",
    answer:
      "Yes. An online tool can record the six lines, primary hexagram, changed hexagram, and changing lines. Deeper interpretation still depends on the question and context.",
  },
  {
    question: "What kinds of questions fit Liu Yao reading?",
    answer:
      "Liu Yao is commonly used for focused questions about work, relationship, money, timing, choices, travel, study, and practical decisions.",
  },
];

export const metadata: Metadata = {
  title: "Online Liu Yao Reading Guide",
  description:
    "Learn how to ask one focused Liu Yao question online, cast six lines, and prepare background for deeper hexagram interpretation.",
  alternates: {
    canonical: absoluteUrl("/learn/liu-yao-online-reading"),
  },
};

export default function LiuYaoOnlineReadingGuide() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          articleJsonLd({
            headline: "Online Liu Yao Reading Guide",
            description:
              "How to ask one focused Liu Yao question and prepare for deeper interpretation.",
            url: "/learn/liu-yao-online-reading",
          }),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(faqItems))}
      />

      <article className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
          Liu Yao Guide / 六爻指南
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          How to Ask a Liu Yao Question Online
        </h1>

        <p className="mt-6 text-lg leading-8 text-zinc-300">
          Liu Yao reading works best when the question is specific. Instead of
          asking whether life will become good, ask about one decision, one
          relationship, one job opportunity, one payment, or one timing issue.
        </p>

        <p className="mt-4 text-base leading-8 text-zinc-400">
          六爻讲究“一事一占”。问题越具体，卦象越容易对应现实情况。比起问
          “我以后会不会好”，更适合问“这个工作机会是否适合接受”“这笔款项近期能否到账”
          或“这段关系接下来应该如何处理”。
        </p>

        <section className="mt-10 space-y-6">
          <GuideBlock
            title="1. Ask one matter at a time"
            zhTitle="1. 一次只问一件事"
          >
            Keep the question focused. If you have several unrelated concerns,
            cast separately instead of mixing work, relationship, money, and
            family issues into one question.
          </GuideBlock>

          <GuideBlock
            title="2. Record the casting time"
            zhTitle="2. 记录起卦时间"
          >
            Time and context help the reading stay grounded. Use your local time
            zone and note whether the result was cast manually, automatically,
            or entered from an existing hexagram.
          </GuideBlock>

          <GuideBlock
            title="3. Add the real-world background"
            zhTitle="3. 补充现实背景"
          >
            A hexagram should be read together with the question. Briefly
            describe what happened, what options you have, and what answer you
            are trying to clarify.
          </GuideBlock>
        </section>

        <section className="mt-12 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-6">
          <h2 className="text-2xl font-semibold text-emerald-100">
            Try the online Liu Yao casting tool
          </h2>
          <p className="mt-3 text-sm leading-7 text-zinc-300">
            Cast six lines online first, then request AI or deeper human
            interpretation when you are ready.
          </p>
          <Link
            href="/liuyao"
            className="mt-5 inline-flex rounded-full bg-emerald-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-200"
          >
            Start Liu Yao Reading / 开始六爻起卦
          </Link>
        </section>
      </article>
    </main>
  );
}

function GuideBlock({
  title,
  zhTitle,
  children,
}: {
  title: string;
  zhTitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-1 text-lg text-amber-100">{zhTitle}</p>
      <p className="mt-4 text-sm leading-7 text-zinc-400">{children}</p>
    </section>
  );
}
