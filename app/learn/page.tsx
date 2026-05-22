import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Feng Shui & Liu Yao Learning Guide",
  description:
    "Short bilingual guides for online Feng Shui consultation, floor plan review, Liu Yao divination, and how to prepare before asking for a reading.",
  alternates: {
    canonical: absoluteUrl("/learn"),
  },
};

const articles = [
  {
    title: "How Online Feng Shui Floor Plan Review Works",
    zhTitle: "线上户型图风水分析如何进行",
    description:
      "What to prepare before sending a floor plan, room photo, or compass direction for Feng Shui consultation.",
    href: "/learn/feng-shui-floor-plan-review",
  },
  {
    title: "How to Ask a Liu Yao Question Online",
    zhTitle: "线上六爻占问应该如何提问",
    description:
      "A practical guide for asking one focused question and preparing context before a Liu Yao reading.",
    href: "/learn/liu-yao-online-reading",
  },
];

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
          Learn / 玄学入门
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          Feng Shui & Liu Yao Guides
        </h1>

        <h2 className="mt-4 text-2xl font-medium text-amber-100 md:text-3xl">
          面向海外用户的风水与六爻入门说明
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
          These guides explain how online Feng Shui consultation and Liu Yao
          reading work, what information is useful, and how to prepare a clear
          request before paying for deeper interpretation.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-amber-300/40 hover:bg-amber-300/10"
            >
              <h3 className="text-2xl font-semibold text-white">
                {article.title}
              </h3>
              <p className="mt-2 text-lg text-amber-100">{article.zhTitle}</p>
              <p className="mt-4 text-sm leading-7 text-zinc-400">
                {article.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
