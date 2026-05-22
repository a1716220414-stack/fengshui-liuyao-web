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
    question: "What should I prepare for an online Feng Shui floor plan review?",
    answer:
      "Prepare a floor plan, room photos, compass direction, building type, main door location, bedroom, kitchen, bathroom, and the concern you want to improve.",
  },
  {
    question: "Can Feng Shui be reviewed online without visiting the home?",
    answer:
      "A preliminary online review can identify broad layout patterns and questions to investigate. A deeper consultation depends on the quality of the floor plan, photos, directions, and personal context.",
  },
  {
    question: "Is a free Feng Shui reading enough?",
    answer:
      "A free reading is useful for orientation. Deeper consultation is better when you need room-level details, layout suggestions, and follow-up discussion.",
  },
];

export const metadata: Metadata = {
  title: "Online Feng Shui Floor Plan Review Guide",
  description:
    "Learn what to prepare for an online Feng Shui floor plan review, including room photos, compass direction, main door, bedroom, kitchen, and bathroom details.",
  alternates: {
    canonical: absoluteUrl("/learn/feng-shui-floor-plan-review"),
  },
};

export default function FengShuiFloorPlanReviewGuide() {
  return (
    <main className="min-h-screen bg-stone-950 px-6 py-16 text-stone-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          articleJsonLd({
            headline: "Online Feng Shui Floor Plan Review Guide",
            description:
              "What to prepare before requesting an online Feng Shui floor plan review.",
            url: "/learn/feng-shui-floor-plan-review",
          }),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(faqItems))}
      />

      <article className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
          Feng Shui Guide / 风水指南
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          How Online Feng Shui Floor Plan Review Works
        </h1>

        <p className="mt-6 text-lg leading-8 text-stone-300">
          Online Feng Shui consultation is most useful when the request is
          practical: what kind of home it is, where the main door is, how the
          rooms are arranged, and what issue you want to improve. A clear floor
          plan and a few photos usually help more than a long vague story.
        </p>

        <p className="mt-4 text-base leading-8 text-stone-400">
          线上风水分析并不是只看一句“我家风水好不好”。更有效的方式是提供户型图、
          房屋朝向、入户门位置、卧室、厨房、卫生间、客厅和你最关心的问题。资料越清楚，
          初步判断和后续深度分析越有方向。
        </p>

        <section className="mt-10 space-y-6">
          <GuideBlock
            title="1. Start with the floor plan"
            zhTitle="1. 先准备户型图"
          >
            A readable floor plan helps identify the relationship between the
            main door, bedroom, kitchen, bathroom, balcony, and central area. If
            you do not have a formal plan, a simple sketch can still help.
          </GuideBlock>

          <GuideBlock
            title="2. Add photos and direction"
            zhTitle="2. 补充照片与朝向"
          >
            Room photos, a compass screenshot, and notes about the direction of
            the main door make the reading more concrete. For room-level review,
            include the bed, desk, window, door, and major furniture placement.
          </GuideBlock>

          <GuideBlock
            title="3. Define one main concern"
            zhTitle="3. 明确一个主要问题"
          >
            Feng Shui requests are easier to analyze when focused on sleep,
            work, study, wealth flow, family harmony, relationship tension, or
            health-related living habits. One clear concern is better than
            asking for everything at once.
          </GuideBlock>
        </section>

        <section className="mt-12 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-6">
          <h2 className="text-2xl font-semibold text-amber-100">
            Try a free preliminary Feng Shui reading
          </h2>
          <p className="mt-3 text-sm leading-7 text-stone-300">
            You can use the free form first, then decide whether deeper
            consultation is necessary.
          </p>
          <Link
            href="/fengshui"
            className="mt-5 inline-flex rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
          >
            Start Feng Shui Review / 开始风水初判
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
      <p className="mt-4 text-sm leading-7 text-stone-400">{children}</p>
    </section>
  );
}
