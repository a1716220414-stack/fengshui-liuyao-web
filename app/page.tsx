import Link from "next/link";

const gateways = [
  {
    eyebrow: "Feng Shui / 风水",
    title: "Observe the home, read the flow of Qi",
    zhTitle: "观宅察气，审形定局",
    description:
      "Submit your home, apartment, room, floor plan, or interior photos to receive a preliminary Feng Shui reading.",
    zhDescription:
      "适合住宅、公寓、单个房间、户型图与实景照片分析，先判断格局问题，再决定是否进一步深度咨询。",
    href: "/fengshui",
    button: "Enter Feng Shui Reading / 进入风水分析",
    symbols: ["宅", "门", "水", "局"],
  },
  {
    eyebrow: "Liu Yao / 六爻",
    title: "Ask one question, cast six lines",
    zhTitle: "一事一占，六爻成象",
    description:
      "Ask a focused question, cast manually or automatically, or enter an existing hexagram for deeper interpretation.",
    zhDescription:
      "适合工作、感情、财务、选择、时机等具体问题。可手动摇卦、自动模拟，或录入已有卦象。",
    href: "/liuyao",
    button: "Start Liu Yao Casting / 开始六爻起卦",
    symbols: ["卦", "爻", "问", "变"],
  },
  {
    eyebrow: "Zhengyi Taoist / 正一道",
    title: "Ritual, blessing, and ceremonial consultation",
    zhTitle: "斋醮科仪，祈福安宅",
    description:
      "Explore Taoist ritual-related consultation such as blessing, home peace, thanksgiving, memorial, consecration, and date selection.",
    zhDescription:
      "适合咨询祈福、安宅、还愿、追思、开光、择日和仪式规划等正一道相关服务需求。",
    href: "/taoist",
    button: "Explore Taoist Services / 查看正一道服务",
    symbols: ["道", "符", "醮", "斋"],
  },
];

const processSteps = [
  {
    number: "一",
    title: "Begin with a free preliminary reading",
    zhTitle: "先以免费初判，明其大势",
    text: "Use the Feng Shui or Liu Yao tool to receive an initial direction.",
    zhText: "先通过风水表单或六爻起卦获得基础判断，了解问题所在与后续方向。",
  },
  {
    number: "二",
    title: "Add context and personal details",
    zhTitle: "再补背景资料，辨其细节",
    text: "For deeper consultation, add your background notes, images, layout details, or contact method.",
    zhText: "若需深入判断，可补充户型图、房间照片、事情背景、联系方式等信息。",
  },
  {
    number: "三",
    title: "Request deeper consultation",
    zhTitle: "终作深度推演，给出建议",
    text: "Paid consultation can provide more detailed reading, ritual inquiry support, practical advice, and follow-up communication.",
    zhText: "付费咨询可进一步结合具体背景，给出更完整的解读、仪式咨询与可执行建议。",
  },
];

const trustItems = [
  {
    title: "Private by default",
    zhTitle: "资料默认私密",
    text: "Submitted floor plans, room photos, questions, ritual inquiries, and contact information are used for analysis and follow-up only.",
    zhText: "用户提交的户型图、房间照片、占问问题、法事需求和联系方式，仅用于分析与后续沟通，不在网站公开展示。",
  },
  {
    title: "Bilingual service",
    zhTitle: "中英文双语",
    text: "Designed for overseas users while preserving the structure and language of Chinese metaphysics.",
    zhText: "面向海外用户设计，同时保留风水、六爻、正一道和东方玄学的核心表达。",
  },
  {
    title: "Clear boundary",
    zhTitle: "边界清晰",
    text: "Readings and ritual inquiries are for cultural, reflective, lifestyle, spiritual, and spatial guidance, not guaranteed predictions.",
    zhText: "分析与法事咨询用于文化体验、个人反思、生活方式、精神支持和空间建议，不构成确定性承诺。",
  },
];

const serviceTiers = [
  {
    title: "Free Preliminary Reading",
    zhTitle: "免费初步分析",
    content:
      "Suitable for first-time users who want to understand the general direction before deeper consultation.",
    zhContent:
      "适合首次体验用户，用于先了解住宅格局或所问之事的大致方向。",
  },
  {
    title: "Feng Shui & Liu Yao Consultation",
    zhTitle: "风水与六爻深度咨询",
    content:
      "Suitable for users who need more specific analysis based on floor plans, room photos, questions, hexagrams, and personal context.",
    zhContent:
      "适合需要结合户型图、房间照片、具体问题、卦象和背景信息进行更细致分析的用户。",
  },
  {
    title: "Taoist Ritual Inquiry",
    zhTitle: "正一道法事咨询",
    content:
      "Suitable for users who want to inquire about blessing, home peace, memorial, thanksgiving, consecration, or ritual planning.",
    zhContent:
      "适合希望咨询祈福、安宅、追思、还愿、开光、择日和仪式规划等服务的用户。",
  },
];

const faqItems = [
  {
    q: "Can I use this if I know nothing about Feng Shui or Liu Yao?",
    zhQ: "完全不懂风水或六爻也可以使用吗？",
    a: "Yes. The website is designed for first-time users. You only need to describe your situation or follow the form.",
    zhA: "可以。网站面向首次体验用户设计，只需要按照表单描述住宅、房间或所问之事即可。",
  },
  {
    q: "Can I submit photos or a floor plan?",
    zhQ: "可以上传户型图或房间照片吗？",
    a: "Yes. The Feng Shui page supports uploaded floor plans and room photos for deeper review.",
    zhA: "可以。风水页面支持上传户型图和房间实景照片，便于后续进一步分析。",
  },
  {
    q: "Can I ask about Taoist ritual services?",
    zhQ: "可以咨询正一道法事服务吗？",
    a: "Yes. You can first describe your purpose, location, time zone, and preferred contact method on the Taoist service page or Contact page.",
    zhA: "可以。你可以先在正一道服务页或联系页说明诉求、所在地区、时区和优先联系方式。",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080706] text-stone-100">
      <section className="relative overflow-hidden px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(217,163,64,0.18),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(20,83,45,0.20),transparent_34%),linear-gradient(180deg,#080706_0%,#11100d_48%,#080706_100%)]" />
        <div className="absolute left-0 top-24 h-px w-full bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />
        <div className="absolute bottom-20 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-200/10 to-transparent" />

        <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full border border-amber-200/10" />
        <div className="pointer-events-none absolute -right-32 bottom-12 h-96 w-96 rounded-full border border-emerald-200/10" />

        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-amber-200/20 bg-amber-200/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-amber-200" />
              <span className="text-xs uppercase tracking-[0.32em] text-amber-100">
                SY Metaphysics
              </span>
            </div>

            <h1 className="mt-8 text-4xl font-semibold leading-tight tracking-tight text-stone-50 md:text-7xl">
              Eastern wisdom for space, timing, ritual, and decisions
            </h1>

            <h2 className="mt-6 text-3xl font-medium leading-relaxed text-amber-100 md:text-5xl">
              观宅察气，六爻问事，道法祈安
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-stone-300 md:text-lg">
              A bilingual Feng Shui, Liu Yao, and Taoist ritual consultation
              website for overseas users. Start with a free preliminary reading,
              then request deeper consultation when needed.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-8 text-stone-500">
              面向海外用户的东方玄学服务网站。先以免费初判了解方向，再根据户型、照片、卦象、背景信息或法事需求申请深度咨询。
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link
                href="/fengshui"
                className="rounded-full bg-amber-300 px-7 py-4 text-center text-sm font-semibold text-black shadow-lg shadow-amber-950/30 transition hover:bg-amber-200"
              >
                Feng Shui / 风水分析
              </Link>

              <Link
                href="/liuyao"
                className="rounded-full border border-amber-200/40 px-7 py-4 text-center text-sm font-semibold text-amber-100 transition hover:bg-amber-200/10"
              >
                Liu Yao / 六爻起卦
              </Link>

              <Link
                href="/taoist"
                className="rounded-full border border-emerald-200/40 px-7 py-4 text-center text-sm font-semibold text-emerald-100 transition hover:bg-emerald-200/10"
              >
                Taoist Services / 正一道服务
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2.5rem] bg-amber-300/10 blur-3xl" />

            <div className="relative rounded-[2rem] border border-amber-200/20 bg-[#12100c]/90 p-6 shadow-2xl shadow-black/40">
              <div className="rounded-[1.5rem] border border-amber-200/10 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.16),transparent_45%),rgba(255,255,255,0.03)] p-7">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-amber-200">
                      易 · 宅 · 道
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-white">
                      SY Metaphysics
                    </p>
                  </div>

                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-200/40 bg-amber-200/10 text-xl font-semibold text-amber-100">
                    玄
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-3">
                  {["乾", "坤", "震", "巽", "坎", "离", "艮", "兑", "道"].map(
                    (item) => (
                      <div
                        key={item}
                        className="flex h-16 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-xl text-amber-100"
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>

                <div className="mt-8 space-y-3">
                  <ClassicLine type="solid" />
                  <ClassicLine type="broken" />
                  <ClassicLine type="solid" />
                  <ClassicLine type="broken" />
                  <ClassicLine type="broken" />
                  <ClassicLine type="solid" />
                </div>

                <div className="mt-8 rounded-2xl border border-amber-200/10 bg-black/20 p-5">
                  <p className="text-sm leading-7 text-stone-300">
                    “Start with a simple reading. Continue only when the
                    question deserves a deeper answer.”
                  </p>
                  <p className="mt-3 text-sm leading-7 text-stone-500">
                    “先知其大势，再辨其细微。以简入深，以问入道。”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Three Gateways / 三个入口"
            title="Choose by what you want to ask"
            zhTitle="因事择法，因问入门"
            text="Home and room layout questions are better suited for Feng Shui. Specific questions are better suited for Liu Yao. Ritual, blessing, and ceremonial matters enter through Taoist services."
            zhText="住宅、房间与空间格局入风水；工作、感情、财务、选择和时机入六爻；祈福、安宅、还愿、追思与仪式规划入正一道服务。"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {gateways.map((item) => (
              <article
                key={item.title}
                className="group rounded-[2rem] border border-white/10 bg-[#11100d] p-7 transition hover:-translate-y-1 hover:border-amber-200/40 hover:bg-[#17140f]"
              >
                <div className="flex flex-wrap gap-2">
                  {item.symbols.map((symbol) => (
                    <span
                      key={symbol}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-200/20 bg-amber-200/10 text-sm text-amber-100"
                    >
                      {symbol}
                    </span>
                  ))}
                </div>

                <p className="mt-8 text-sm uppercase tracking-[0.28em] text-amber-200">
                  {item.eyebrow}
                </p>

                <h3 className="mt-4 text-2xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-2xl text-amber-100">{item.zhTitle}</p>

                <p className="mt-5 text-sm leading-7 text-stone-300">
                  {item.description}
                </p>

                <p className="mt-3 text-sm leading-7 text-stone-500">
                  {item.zhDescription}
                </p>

                <Link
                  href={item.href}
                  className="mt-7 inline-flex rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
                >
                  {item.button}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-amber-200/10 bg-[#0d0b08] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Path / 流程"
            title="From first impression to deeper reading"
            zhTitle="由浅入深，由象入理"
            text="The website is designed as a light consultation funnel: free experience first, deeper interpretation later."
            zhText="网站当前是轻量化获客闭环：先让用户免费体验，再将高意向用户引导至深度咨询。"
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {processSteps.map((item) => (
              <article
                key={item.number}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-200/30 bg-amber-200/10 text-xl text-amber-100">
                  {item.number}
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-lg text-amber-100">{item.zhTitle}</p>

                <p className="mt-5 text-sm leading-7 text-stone-300">
                  {item.text}
                </p>

                <p className="mt-3 text-sm leading-7 text-stone-500">
                  {item.zhText}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Services / 服务"
            title="Free entry, deeper paid consultation"
            zhTitle="免费入门，深度付费"
            text="The free tools help users understand the direction. Paid consultation is for users who need a more complete reading and practical suggestions."
            zhText="免费工具用于判断方向；深度咨询面向需要完整解读、具体建议和后续沟通的用户。"
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {serviceTiers.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.75rem] border border-white/10 bg-[#11100d] p-6"
              >
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-lg text-amber-100">{item.zhTitle}</p>

                <p className="mt-5 text-sm leading-7 text-stone-300">
                  {item.content}
                </p>

                <p className="mt-3 text-sm leading-7 text-stone-500">
                  {item.zhContent}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-[1.75rem] border border-amber-200/20 bg-amber-200/10 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-amber-100">
                Need a more specific consultation?
              </h3>
              <p className="mt-2 text-sm leading-7 text-stone-400">
                Submit your details through Feng Shui, Liu Yao, or Taoist
                Services, then we can follow up based on your preferred contact
                method.
              </p>
              <p className="mt-1 text-sm leading-7 text-stone-500">
                如需更具体分析，请通过风水、六爻或正一道服务页面提交资料，我们会根据你的联系方式跟进。
              </p>
            </div>

            <Link
              href="/services"
              className="shrink-0 rounded-full border border-amber-200/40 px-5 py-3 text-center text-sm font-semibold text-amber-100 transition hover:bg-amber-200/10"
            >
              View Services / 查看服务
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-amber-200/10 bg-[#0d0b08] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Trust / 信任"
            title="Private, clear, and practical"
            zhTitle="守隐私，明边界，重实用"
            text="For overseas users, trust matters before they upload a floor plan, room photo, personal question, or ritual request."
            zhText="对于海外用户而言，在上传户型图、房间照片、个人问题或法事需求之前，必须先看见清晰的隐私说明与服务边界。"
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {trustItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-lg text-amber-100">{item.zhTitle}</p>

                <p className="mt-5 text-sm leading-7 text-stone-300">
                  {item.text}
                </p>

                <p className="mt-3 text-sm leading-7 text-stone-500">
                  {item.zhText}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-amber-200/20 bg-black/20 p-6">
            <h3 className="text-xl font-semibold text-amber-100">
              Service Disclaimer / 服务边界
            </h3>

            <p className="mt-4 text-sm leading-7 text-stone-300">
              Feng Shui, Liu Yao, and Taoist ritual inquiries are provided for
              cultural, lifestyle, reflective, spiritual, and spatial guidance.
              They should not replace legal, medical, financial, psychological,
              or other professional advice.
            </p>

            <p className="mt-3 text-sm leading-7 text-stone-500">
              风水、六爻与正一道服务主要用于文化体验、生活方式参考、个人反思、精神支持和空间建议，不替代法律、医疗、财务、心理或其他专业意见。
            </p>

            <Link
              href="/privacy"
              className="mt-5 inline-flex rounded-full border border-amber-200/40 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-200/10"
            >
              Privacy & Disclaimer / 隐私与免责声明
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Questions / 常见问题"
            title="Before you begin"
            zhTitle="起问之前，先明其法"
            text="These answers help first-time users understand how to start and what information to prepare."
            zhText="以下内容帮助首次使用者了解如何开始，以及需要准备哪些信息。"
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {faqItems.map((item) => (
              <article
                key={item.q}
                className="rounded-[1.75rem] border border-white/10 bg-[#11100d] p-6"
              >
                <h3 className="text-lg font-semibold text-white">{item.q}</h3>

                <p className="mt-2 text-base text-amber-100">{item.zhQ}</p>

                <p className="mt-5 text-sm leading-7 text-stone-300">
                  {item.a}
                </p>

                <p className="mt-3 text-sm leading-7 text-stone-500">
                  {item.zhA}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 pt-6">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-amber-200/20 bg-[radial-gradient(circle_at_top,rgba(217,163,64,0.18),rgba(255,255,255,0.03)_45%,rgba(0,0,0,0.28)_100%)] p-8 text-center md:p-12">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
            Start / 开始
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">
            Begin with one clear question or request
          </h2>

          <p className="mt-4 text-3xl text-amber-100 md:text-4xl">
            一念既起，象法自明
          </p>

          <p className="mt-6 text-sm leading-7 text-stone-400">
            Choose Feng Shui for home or room layout. Choose Liu Yao for a
            focused question. Choose Taoist Services for ritual, blessing,
            memorial, or ceremonial inquiry.
          </p>

          <p className="mt-3 text-sm leading-7 text-stone-500">
            住宅与房间格局，入风水；具体事情与时机判断，入六爻；祈福、安宅、追思与仪式咨询，入正一道服务。
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="/fengshui"
              className="rounded-full bg-amber-300 px-7 py-4 text-sm font-semibold text-black transition hover:bg-amber-200"
            >
              Feng Shui / 风水分析
            </Link>

            <Link
              href="/liuyao"
              className="rounded-full border border-amber-200/40 px-7 py-4 text-sm font-semibold text-amber-100 transition hover:bg-amber-200/10"
            >
              Liu Yao / 六爻占问
            </Link>

            <Link
              href="/taoist"
              className="rounded-full border border-emerald-200/40 px-7 py-4 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-200/10"
            >
              Taoist / 正一道服务
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ClassicLine({ type }: { type: "solid" | "broken" }) {
  if (type === "solid") {
    return <div className="h-3 rounded-full bg-amber-200/80" />;
  }

  return (
    <div className="grid grid-cols-[1fr_0.6fr_1fr] gap-4">
      <div className="h-3 rounded-full bg-amber-200/80" />
      <div />
      <div className="h-3 rounded-full bg-amber-200/80" />
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  zhTitle,
  text,
  zhText,
}: {
  eyebrow: string;
  title: string;
  zhTitle: string;
  text: string;
  zhText: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">
        {title}
      </h2>

      <p className="mt-3 text-2xl text-amber-100 md:text-3xl">{zhTitle}</p>

      <p className="mt-5 text-sm leading-7 text-stone-300">{text}</p>

      <p className="mt-3 text-sm leading-7 text-stone-500">{zhText}</p>
    </div>
  );
}