import Link from "next/link";

const serviceCards = [
  {
    title: "Feng Shui Analysis",
    zhTitle: "风水分析",
    description:
      "Upload or describe your home, apartment, room, or floor plan to receive a preliminary Feng Shui reading.",
    zhDescription:
      "填写住宅、公寓、房间或户型图信息，获得一份基础风水分析，用于判断格局问题和后续咨询方向。",
    href: "/fengshui",
    button: "Start Free Feng Shui Check / 开始免费风水检测",
    tags: ["Home", "Room", "Floor Plan", "Photos"],
  },
  {
    title: "Liu Yao Divination",
    zhTitle: "六爻占问",
    description:
      "Ask one focused question, cast six lines manually or automatically, and submit a request for deeper interpretation.",
    zhDescription:
      "输入一个具体问题，可选择手动摇卦、自动模拟或手动录入卦象，并提交深度解卦需求。",
    href: "/liuyao",
    button: "Start Liu Yao Casting / 开始六爻起卦",
    tags: ["Question", "Hexagram", "Changing Lines", "Reading"],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Start with a free reading",
    zhTitle: "先从免费体验开始",
    text: "Use the Feng Shui form or Liu Yao casting page to generate a preliminary result.",
    zhText: "通过风水表单或六爻起卦页面，先获得一个基础结果和问题方向。",
  },
  {
    step: "02",
    title: "Submit context and contact",
    zhTitle: "提交背景与联系方式",
    text: "If you want deeper analysis, leave your preferred contact method and background notes.",
    zhText: "如果需要更深入分析，可以留下联系方式和事情背景，方便后续跟进。",
  },
  {
    step: "03",
    title: "Request deeper consultation",
    zhTitle: "申请深度咨询",
    text: "A paid review can provide more detailed interpretation, layout advice, or practical suggestions.",
    zhText: "付费咨询可以进一步提供更完整的解读、布局建议或实际调整方向。",
  },
];

const trustPoints = [
  {
    title: "Private submissions",
    zhTitle: "提交内容不公开展示",
    text: "Your floor plans, room photos, questions, and contact details are used for analysis and follow-up only.",
    zhText: "你提交的户型图、房间照片、占问问题和联系方式仅用于分析与后续沟通。",
  },
  {
    title: "Bilingual experience",
    zhTitle: "中英文双语体验",
    text: "The site is designed for overseas users while retaining Chinese metaphysics concepts.",
    zhText: "网站面向海外用户，但保留风水、六爻和东方玄学的核心表达。",
  },
  {
    title: "Clear service boundary",
    zhTitle: "明确服务边界",
    text: "Metaphysics readings are for cultural, lifestyle, reflective, and spatial guidance, not guaranteed predictions.",
    zhText: "玄学分析用于文化体验、生活方式参考和空间建议，不构成确定性预测。",
  },
];

const faqItems = [
  {
    question: "Is the free result the same as a paid consultation?",
    zhQuestion: "免费结果和付费咨询一样吗？",
    answer:
      "No. The free result gives a preliminary direction. A paid consultation can include more context, clearer interpretation, and more specific suggestions.",
    zhAnswer:
      "不一样。免费结果主要提供初步方向；付费咨询可以结合更多背景信息，给出更细致的判断和建议。",
  },
  {
    question: "Can I analyze just one room?",
    zhQuestion: "可以只看一个房间吗？",
    answer:
      "Yes. You can choose room-level Feng Shui analysis and upload room photos or describe the room layout.",
    zhAnswer:
      "可以。风水页面支持单个房间分析，你可以上传房间实景图或描述房间布局。",
  },
  {
    question: "Can I submit an already-cast Liu Yao hexagram?",
    zhQuestion: "已经在线下起好的六爻卦可以提交吗？",
    answer:
      "Yes. The Liu Yao page supports manual hexagram input, so you can directly select six lines from bottom to top.",
    zhAnswer:
      "可以。六爻页面支持手动选卦，可以从初爻到上爻直接录入已有卦象。",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="relative overflow-hidden px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(120,53,15,0.20),transparent_36%)]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-200">
              SY Metaphysics
            </p>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-7xl">
              Feng Shui & Liu Yao consultation for modern overseas users
            </h1>

            <h2 className="mt-6 text-2xl font-medium leading-relaxed text-amber-100 md:text-4xl">
              面向海外用户的风水分析与六爻占问服务
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
              Start with a free preliminary reading, then request a deeper paid
              consultation when you need specific layout advice, hexagram
              interpretation, or practical next-step guidance.
            </p>

            <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-400">
              你可以先通过免费风水检测或六爻起卦获得初步结果。如果需要更深入的判断，可以进一步提交资料并申请付费咨询。
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/fengshui"
                className="rounded-full bg-amber-300 px-7 py-4 text-center text-sm font-semibold text-black transition hover:bg-amber-200"
              >
                Start Free Feng Shui Check / 免费风水检测
              </Link>

              <Link
                href="/liuyao"
                className="rounded-full border border-amber-300/40 px-7 py-4 text-center text-sm font-semibold text-amber-100 transition hover:bg-amber-300/10"
              >
                Start Liu Yao Casting / 六爻起卦
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <HeroStat number="2" label="Core Services" zhLabel="核心服务" />
              <HeroStat
                number="Free"
                label="Preliminary Reading"
                zhLabel="免费初步体验"
              />
              <HeroStat
                number="Paid"
                label="Deeper Consultation"
                zhLabel="深度付费咨询"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
              Choose a Service / 选择服务
            </p>

            <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
              Start from the question you care about most
            </h2>

            <p className="mt-5 text-base leading-8 text-zinc-400">
              不同问题适合不同入口：住宅、房间和布局问题适合风水分析；工作、关系、选择、财务等具体问题适合六爻占问。
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {serviceCards.map((service) => (
              <article
                key={service.title}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-amber-300/40 hover:bg-white/[0.07]"
              >
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mt-7 text-3xl font-semibold text-white">
                  {service.title}
                </h3>

                <p className="mt-2 text-xl text-amber-100">
                  {service.zhTitle}
                </p>

                <p className="mt-5 text-sm leading-7 text-zinc-300">
                  {service.description}
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {service.zhDescription}
                </p>

                <Link
                  href={service.href}
                  className="mt-7 inline-flex rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
                >
                  {service.button}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/20 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
                How It Works / 服务流程
              </p>

              <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
                From free insight to deeper consultation
              </h2>

              <p className="mt-5 text-sm leading-7 text-zinc-400">
                The site is designed as a lightweight consultation funnel:
                users can try a free tool first, then submit a deeper request
                when they have stronger intent.
              </p>

              <p className="mt-3 text-sm leading-7 text-zinc-500">
                网站当前定位是轻量获客闭环：先让用户免费体验，再将高意向用户引导到深度咨询。
              </p>
            </div>

            <div className="grid gap-4">
              {processSteps.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <p className="text-sm font-semibold text-amber-200">
                    {item.step}
                  </p>

                  <h3 className="mt-3 text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-lg text-amber-100">
                    {item.zhTitle}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-zinc-300">
                    {item.text}
                  </p>

                  <p className="mt-2 text-sm leading-7 text-zinc-500">
                    {item.zhText}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
              Trust & Boundary / 信任与边界
            </p>

            <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
              Clear, private, and practical
            </h2>

            <p className="mt-5 text-base leading-8 text-zinc-400">
              用户愿意上传户型图、房间照片或留下联系方式之前，需要先看到隐私说明、服务边界和实际价值。
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {trustPoints.map((point) => (
              <article
                key={point.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-xl font-semibold text-white">
                  {point.title}
                </h3>

                <p className="mt-1 text-lg text-amber-100">
                  {point.zhTitle}
                </p>

                <p className="mt-5 text-sm leading-7 text-zinc-300">
                  {point.text}
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {point.zhText}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-amber-300/20 bg-amber-300/10 p-6">
            <h3 className="text-xl font-semibold text-amber-100">
              Service Disclaimer / 服务说明
            </h3>

            <p className="mt-4 text-sm leading-7 text-zinc-300">
              Feng Shui, Liu Yao, and metaphysics services are provided for
              cultural, lifestyle, reflective, and spatial guidance. They should
              not replace legal, medical, financial, psychological, or other
              professional advice.
            </p>

            <p className="mt-3 text-sm leading-7 text-zinc-500">
              风水、六爻和玄学服务主要用于文化体验、生活方式参考、个人反思和空间建议，不应替代法律、医疗、财务、心理或其他专业意见。
            </p>

            <Link
              href="/privacy"
              className="mt-5 inline-flex rounded-full border border-amber-300/30 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-300/10"
            >
              Read Privacy & Disclaimer / 查看隐私与免责声明
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/20 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
                FAQ / 常见问题
              </p>

              <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
                Before you start
              </h2>

              <p className="mt-5 text-sm leading-7 text-zinc-400">
                These answers help first-time users understand what they can do
                on the site before submitting personal information.
              </p>
            </div>

            <div className="space-y-4">
              {faqItems.map((item) => (
                <article
                  key={item.question}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {item.question}
                  </h3>

                  <p className="mt-1 text-base text-amber-100">
                    {item.zhQuestion}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-zinc-300">
                    {item.answer}
                  </p>

                  <p className="mt-2 text-sm leading-7 text-zinc-500">
                    {item.zhAnswer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-amber-300/20 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.18),rgba(255,255,255,0.04)_45%,rgba(0,0,0,0.2)_100%)] p-8 text-center md:p-12">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
            Start Now / 立即开始
          </p>

          <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
            Begin with a free preliminary reading
          </h2>

          <p className="mt-5 text-base leading-8 text-zinc-300">
            Choose Feng Shui for home or room layout questions. Choose Liu Yao
            for a focused life, relationship, career, or decision question.
          </p>

          <p className="mt-3 text-sm leading-7 text-zinc-500">
            如果你关心住宅或房间格局，选择风水分析；如果你有具体事情想问，选择六爻占问。
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/fengshui"
              className="rounded-full bg-amber-300 px-7 py-4 text-sm font-semibold text-black transition hover:bg-amber-200"
            >
              Feng Shui Check / 风水检测
            </Link>

            <Link
              href="/liuyao"
              className="rounded-full border border-amber-300/40 px-7 py-4 text-sm font-semibold text-amber-100 transition hover:bg-amber-300/10"
            >
              Liu Yao Casting / 六爻起卦
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroStat({
  number,
  label,
  zhLabel,
}: {
  number: string;
  label: string;
  zhLabel: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur">
      <p className="text-2xl font-bold text-amber-200">{number}</p>
      <p className="mt-2 text-sm text-zinc-300">{label}</p>
      <p className="mt-1 text-xs text-zinc-500">{zhLabel}</p>
    </div>
  );
}