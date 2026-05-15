import Link from "next/link";

const featureCards = [
  {
    title: "Feng Shui Analysis",
    subtitle: "风水分析",
    description:
      "A basic home energy-flow check based on direction, entrance, bedroom, kitchen, bathroom, and floor-plan information.",
    zhDescription:
      "根据房屋朝向、入户门、卧室、厨房、卫生间及户型信息，提供初步的家居风水格局分析。",
    href: "/fengshui",
    tag: "For overseas clients / 面向海外客户",
  },
  {
    title: "Liu Yao Divination",
    subtitle: "六爻占问",
    description:
      "A question-based divination section for casting, recording, displaying hexagrams, and preparing structured interpretation.",
    zhDescription:
      "围绕具体问题进行起卦、记录、排盘展示，并为后续结构化解卦提供基础。",
    href: "/liuyao",
    tag: "Question-based reading / 问事占断",
  },
  {
    title: "Unconventional Reading",
    subtitle: "非常规咨询",
    description:
      "A flexible section for symbolic reading, dream analysis, timing suggestions, and customized metaphysical services.",
    zhDescription:
      "用于承接梦境解析、象征分析、择时建议及其他非标准化玄学咨询服务。",
    href: "/unconventional",
    tag: "Custom services / 定制服务",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-5 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm text-amber-100">
              Eastern metaphysics service platform for global clients
              <span className="ml-2 text-amber-100/70">
                东方玄学海外服务平台
              </span>
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              Discover the energy pattern behind your space, timing, and
              questions.
            </h1>

            <h2 className="mt-5 max-w-3xl text-2xl font-medium leading-relaxed text-amber-100 md:text-3xl">
              洞察空间、时机与问题背后的能量结构。
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              SY Metaphysics is a modern online platform for Feng Shui analysis,
              Liu Yao divination, and customized metaphysical consultation. The
              first version focuses on overseas client attraction, basic
              analysis, and consultation conversion.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">
              本网站将风水、六爻与个性化玄学咨询进行网页化呈现，第一阶段重点用于海外客户引流、基础分析展示、联系方式收集与付费咨询转化。
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/fengshui"
                className="rounded-full bg-amber-300 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-amber-200"
              >
                Start Free Feng Shui Check / 开始免费风水检测
              </Link>

              <Link
                href="/liuyao"
                className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Try Liu Yao Reading / 尝试六爻占问
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="rounded-[1.5rem] border border-amber-300/20 bg-black/40 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
                Project Positioning
              </p>

              <h2 className="mt-5 text-3xl font-semibold">
                From free reading to paid consultation
              </h2>

              <h3 className="mt-3 text-xl font-medium text-amber-100">
                从免费检测到深度付费咨询
              </h3>

              <div className="mt-6 space-y-4 text-sm leading-7 text-zinc-300">
                <p>
                  1. Attract overseas users through Feng Shui and metaphysics
                  content.
                </p>
                <p className="text-zinc-400">
                  通过风水、六爻和东方玄学内容吸引海外用户访问。
                </p>

                <p>
                  2. Let users complete a simple form and receive a preliminary
                  reading.
                </p>
                <p className="text-zinc-400">
                  让用户填写基础信息，并获得一份初步分析结果。
                </p>

                <p>
                  3. Collect email, WhatsApp, floor plan, and consultation
                  intention.
                </p>
                <p className="text-zinc-400">
                  收集邮箱、WhatsApp、户型图和深度咨询意向。
                </p>

                <p>
                  4. Convert interested users into deeper paid analysis or
                  one-on-one service.
                </p>
                <p className="text-zinc-400">
                  将高意向用户转化为付费报告或一对一咨询服务。
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-20">
          <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
                Core Sections / 核心板块
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                Three service entrances
              </h2>
              <p className="mt-2 text-lg text-zinc-400">
                三个主要服务入口
              </p>
            </div>

            <p className="max-w-xl text-sm leading-6 text-zinc-400">
              The current stage is to build a clear bilingual website structure
              first. Later we will add forms, report generation, database
              storage, image upload, and AI-assisted analysis.
              <br />
              当前阶段先建立清晰的中英文网站结构，后续再加入表单、报告生成、数据库、图片上传和 AI 辅助分析。
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {featureCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-amber-300/40 hover:bg-white/[0.07]"
              >
                <div className="mb-5 inline-flex rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">
                  {card.tag}
                </div>

                <h3 className="text-2xl font-semibold text-white">
                  {card.title}
                </h3>

                <p className="mt-1 text-sm text-amber-200">{card.subtitle}</p>

                <p className="mt-5 text-sm leading-7 text-zinc-300">
                  {card.description}
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {card.zhDescription}
                </p>

                <p className="mt-6 text-sm font-semibold text-amber-200 transition group-hover:translate-x-1">
                  Enter section / 进入板块 →
                </p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}