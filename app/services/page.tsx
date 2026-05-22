import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Feng Shui, Liu Yao & Taoist Consultation Services",
  description:
    "Compare free preliminary readings, paid Feng Shui consultation, deeper Liu Yao interpretation, and Taoist ritual inquiry services.",
  alternates: {
    canonical: absoluteUrl("/services"),
  },
};

const serviceGroups = [
  {
    eyebrow: "Free Entry / 免费入口",
    title: "Preliminary Reading",
    zhTitle: "初步分析",
    price: "Free / 免费",
    description:
      "A lightweight first step for users who want to understand the general direction before requesting deeper consultation.",
    zhDescription:
      "适合首次体验用户，用于先判断住宅格局或占问问题的大致方向，再决定是否进一步深度咨询。",
    items: [
      "Basic Feng Shui form review",
      "Basic Liu Yao hexagram result",
      "Preliminary direction and issue type",
      "Lead submission for follow-up",
    ],
    zhItems: [
      "基础风水信息填写与初判",
      "基础六爻起卦与卦象展示",
      "初步判断问题方向",
      "可提交联系方式进行后续跟进",
    ],
    href: "/fengshui",
    button: "Start Free Reading / 开始免费体验",
  },
  {
    eyebrow: "Feng Shui / 风水",
    title: "Home & Room Feng Shui Review",
    zhTitle: "住宅与房间风水分析",
    price: "Paid Consultation / 付费咨询",
    description:
      "For users who can provide a floor plan, room photos, directions, and specific concerns about wealth, health, relationship, sleep, work, or family harmony.",
    zhDescription:
      "适合能够提供户型图、房间照片、朝向信息和具体问题的用户，用于进一步分析财运、健康、感情、睡眠、工作和家庭关系等问题。",
    items: [
      "Floor plan and room photo review",
      "Main door, bedroom, kitchen, bathroom focus",
      "Room-level or whole-home analysis",
      "Practical layout suggestions",
    ],
    zhItems: [
      "户型图与房间照片分析",
      "入户门、卧室、厨房、卫生间重点判断",
      "可做全屋或单个房间分析",
      "提供更具体的空间调整建议",
    ],
    href: "/fengshui",
    button: "Submit Feng Shui Request / 提交风水需求",
  },
  {
    eyebrow: "Liu Yao / 六爻",
    title: "Deeper Liu Yao Interpretation",
    zhTitle: "六爻深度解卦",
    price: "Paid Consultation / 付费咨询",
    description:
      "For users who have a focused question and want deeper interpretation of the primary hexagram, changed hexagram, changing lines, timing, and practical advice.",
    zhDescription:
      "适合已经有明确问题的用户，用于进一步分析本卦、变卦、动爻、时机、用神方向和实际建议。",
    items: [
      "Manual, automatic, or existing hexagram input",
      "Question background review",
      "Changing line and changed hexagram interpretation",
      "Follow-up advice based on the question",
    ],
    zhItems: [
      "支持手动摇卦、自动模拟和已有卦象录入",
      "结合事情背景进行分析",
      "分析动爻、变卦和问题变化",
      "根据具体问题给出后续建议",
    ],
    href: "/liuyao",
    button: "Start Liu Yao Request / 提交六爻需求",
  },
  {
    eyebrow: "Zhengyi Taoist / 正一道",
    title: "Taoist Ritual & Blessing Consultation",
    zhTitle: "法事与祈福服务咨询",
    price: "Inquiry Required / 需先咨询",
    description:
      "For users who want to inquire about blessing, home peace, thanksgiving, memorial, consecration, date selection, or Taoist ritual planning.",
    zhDescription:
      "适合希望咨询祈福、安宅、还愿、追思、开光、择日或正一道法事规划的用户。具体服务需根据诉求、地区、法脉和实际条件确认。",
    items: [
      "Blessing and peace ritual inquiry",
      "Home peace and purification inquiry",
      "Thanksgiving and memorial support",
      "Consecration, date selection, and ritual planning",
    ],
    zhItems: [
      "祈福保安类咨询",
      "安宅净宅类咨询",
      "还愿追思类咨询",
      "开光、择日与仪式规划咨询",
    ],
    href: "/taoist",
    button: "View Taoist Services / 查看正一道服务",
  },
];

const comparisonRows = [
  {
    label: "Purpose / 目的",
    free: "Understand general direction / 了解大致方向",
    paid: "Detailed interpretation and advice / 深度解读与建议",
  },
  {
    label: "Input / 输入资料",
    free: "Basic form or casting / 基础表单或起卦",
    paid: "More context, photos, notes / 更多背景、图片与说明",
  },
  {
    label: "Output / 输出内容",
    free: "Preliminary result / 初步结果",
    paid: "More specific analysis / 更具体分析",
  },
  {
    label: "Follow-up / 后续沟通",
    free: "Optional / 可选",
    paid: "Recommended / 建议沟通",
  },
];

const preparationItems = [
  {
    title: "For Feng Shui",
    zhTitle: "风水咨询建议准备",
    items: [
      "Floor plan or simple room layout",
      "Photos of the main door, bedroom, kitchen, and key areas",
      "Home facing direction if known",
      "Your main concern: wealth, health, sleep, relationship, career, or family",
    ],
    zhItems: [
      "户型图或简单房间布局",
      "入户门、卧室、厨房和关键区域照片",
      "如果知道房屋朝向，可以一并提供",
      "主要关心的问题：财运、健康、睡眠、感情、事业或家庭关系",
    ],
  },
  {
    title: "For Liu Yao",
    zhTitle: "六爻咨询建议准备",
    items: [
      "One clear and focused question",
      "Gender selection if you are comfortable providing it",
      "Casting time and time zone",
      "Background information and what decision you are facing",
    ],
    zhItems: [
      "一个明确具体的问题",
      "可选择填写问事人性别",
      "起卦时间与所在时区",
      "事情背景，以及你当前面临的选择或困惑",
    ],
  },
  {
    title: "For Taoist Ritual Inquiry",
    zhTitle: "法事咨询建议准备",
    items: [
      "Your purpose: blessing, home peace, memorial, thanksgiving, consecration, or date selection",
      "Location, time zone, and whether offline support is needed",
      "Background information and urgency",
      "Preferred contact method and language",
    ],
    zhItems: [
      "主要诉求：祈福、安宅、追思、还愿、开光或择日",
      "所在地区、时区，以及是否需要线下支持",
      "事情背景和紧急程度",
      "优先联系方式与沟通语言",
    ],
  },
];

const processItems = [
  {
    step: "一",
    title: "Submit your request",
    zhTitle: "提交需求",
    text: "Choose Feng Shui, Liu Yao, or Taoist ritual inquiry, then submit your basic information.",
    zhText: "选择风水、六爻或正一道法事咨询入口，填写基础信息并提交需求。",
  },
  {
    step: "二",
    title: "Preliminary review",
    zhTitle: "初步判断",
    text: "The free result or inquiry description helps identify the general direction and whether deeper consultation is suitable.",
    zhText: "免费结果或咨询描述用于判断大致方向，并判断是否适合进一步深度咨询。",
  },
  {
    step: "三",
    title: "Deeper consultation",
    zhTitle: "深度咨询",
    text: "If needed, we follow up through your preferred contact method and clarify the scope of paid service.",
    zhText: "如有需要，将根据你的联系方式跟进，并确认付费服务范围。",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#080706] text-stone-100">
      <section className="relative overflow-hidden px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(217,163,64,0.16),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(20,83,45,0.16),transparent_34%),linear-gradient(180deg,#080706_0%,#11100d_55%,#080706_100%)]" />
        <div className="absolute left-0 top-24 h-px w-full bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />

        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-200">
            Services / 服务
          </p>

          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-7xl">
            Feng Shui, Liu Yao, and Taoist ritual consultation
          </h1>

          <h2 className="mt-6 text-3xl font-medium text-amber-100 md:text-5xl">
            风水察形，六爻问事，道法祈安
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-stone-300 md:text-lg">
            Start with a free preliminary reading. When the matter requires
            deeper interpretation, ritual planning, or practical guidance,
            request a paid consultation.
          </p>

          <p className="mt-4 max-w-3xl text-base leading-8 text-stone-500">
            你可以先通过免费风水检测或六爻起卦了解大致方向；如果问题较复杂，也可以进一步咨询正一道法事、祈福与仪式规划服务。
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/fengshui"
              className="rounded-full bg-amber-300 px-7 py-4 text-center text-sm font-semibold text-black transition hover:bg-amber-200"
            >
              Feng Shui Reading / 风水分析
            </Link>

            <Link
              href="/liuyao"
              className="rounded-full border border-amber-200/40 px-7 py-4 text-center text-sm font-semibold text-amber-100 transition hover:bg-amber-200/10"
            >
              Liu Yao Casting / 六爻占问
            </Link>

            <Link
              href="/taoist"
              className="rounded-full border border-emerald-200/40 px-7 py-4 text-center text-sm font-semibold text-emerald-100 transition hover:bg-emerald-200/10"
            >
              Taoist Services / 正一道服务
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Service Types / 服务类型"
            title="Choose the right level of support"
            zhTitle="因事择法，按需深入"
            text="The site is designed with a free entry and paid deeper consultation model."
            zhText="网站采用免费体验与深度付费咨询结合的模式，先降低用户体验门槛，再承接高意向需求。"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {serviceGroups.map((service) => (
              <article
                key={service.title}
                className="rounded-[2rem] border border-white/10 bg-[#11100d] p-7 transition hover:-translate-y-1 hover:border-amber-200/40"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-amber-200">
                  {service.eyebrow}
                </p>

                <h3 className="mt-5 text-2xl font-semibold text-white">
                  {service.title}
                </h3>

                <p className="mt-2 text-xl text-amber-100">
                  {service.zhTitle}
                </p>

                <div className="mt-5 inline-flex rounded-full border border-amber-200/30 bg-amber-200/10 px-4 py-2 text-sm text-amber-100">
                  {service.price}
                </div>

                <p className="mt-5 text-sm leading-7 text-stone-300">
                  {service.description}
                </p>

                <p className="mt-3 text-sm leading-7 text-stone-500">
                  {service.zhDescription}
                </p>

                <div className="mt-6 space-y-3">
                  {service.items.map((item, index) => (
                    <div key={item} className="rounded-xl bg-black/20 p-3">
                      <p className="text-sm text-stone-300">{item}</p>
                      <p className="mt-1 text-xs leading-5 text-stone-500">
                        {service.zhItems[index]}
                      </p>
                    </div>
                  ))}
                </div>

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

      <section className="border-y border-amber-200/10 bg-[#0d0b08] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Free vs Paid / 免费与付费"
            title="What changes when you request deeper consultation"
            zhTitle="免费知其方向，付费辨其细节"
            text="Free results are designed for orientation. Paid consultation is designed for more context, interpretation, planning, and practical suggestions."
            zhText="免费结果用于判断方向；付费咨询用于结合更多资料进行更细致的分析、规划与建议。"
          />

          <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#11100d]">
            <div className="grid grid-cols-3 border-b border-white/10 bg-amber-200/10 text-sm font-semibold text-amber-100">
              <div className="p-4">Item / 项目</div>
              <div className="border-l border-white/10 p-4">
                Free / 免费体验
              </div>
              <div className="border-l border-white/10 p-4">
                Paid / 深度咨询
              </div>
            </div>

            {comparisonRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-3 border-b border-white/10 text-sm last:border-b-0"
              >
                <div className="p-4 text-stone-300">{row.label}</div>
                <div className="border-l border-white/10 p-4 text-stone-500">
                  {row.free}
                </div>
                <div className="border-l border-white/10 p-4 text-stone-300">
                  {row.paid}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Preparation / 准备资料"
            title="What to prepare before consultation"
            zhTitle="问前有备，断中有据"
            text="Clearer information usually leads to a more useful consultation."
            zhText="提交的信息越清晰，后续分析越容易具体、准确和可执行。"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {preparationItems.map((group) => (
              <article
                key={group.title}
                className="rounded-[2rem] border border-white/10 bg-[#11100d] p-7"
              >
                <h3 className="text-2xl font-semibold text-white">
                  {group.title}
                </h3>

                <p className="mt-2 text-xl text-amber-100">
                  {group.zhTitle}
                </p>

                <div className="mt-6 space-y-3">
                  {group.items.map((item, index) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/10 bg-black/20 p-4"
                    >
                      <p className="text-sm text-stone-300">{item}</p>
                      <p className="mt-2 text-sm leading-6 text-stone-500">
                        {group.zhItems[index]}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-amber-200/10 bg-[#0d0b08] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Process / 流程"
            title="How consultation works"
            zhTitle="循序渐进，由浅入深"
            text="The process is intentionally simple so overseas users can start without knowing technical metaphysics terms."
            zhText="流程尽量简单，让海外用户即使不懂专业术语，也能顺利开始。"
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {processItems.map((item) => (
              <article
                key={item.step}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-200/30 bg-amber-200/10 text-xl text-amber-100">
                  {item.step}
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
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-amber-200/20 bg-[radial-gradient(circle_at_top,rgba(217,163,64,0.18),rgba(255,255,255,0.03)_45%,rgba(0,0,0,0.28)_100%)] p-8 text-center md:p-12">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
            Begin / 开始
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">
            Choose your first reading or inquiry
          </h2>

          <p className="mt-4 text-3xl text-amber-100 md:text-4xl">
            先起一问，再看其象
          </p>

          <p className="mt-6 text-sm leading-7 text-stone-400">
            Start with a free preliminary reading, or submit a Taoist ritual
            inquiry if your concern is ceremonial, spiritual, or family-related.
          </p>

          <p className="mt-3 text-sm leading-7 text-stone-500">
            先通过免费体验判断方向；如涉及法事、祈福、安宅或追思需求，可进入正一道服务咨询页面。
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/fengshui"
              className="rounded-full bg-amber-300 px-7 py-4 text-sm font-semibold text-black transition hover:bg-amber-200"
            >
              Feng Shui Reading / 风水分析
            </Link>

            <Link
              href="/liuyao"
              className="rounded-full border border-amber-200/40 px-7 py-4 text-sm font-semibold text-amber-100 transition hover:bg-amber-200/10"
            >
              Liu Yao Casting / 六爻占问
            </Link>

            <Link
              href="/taoist"
              className="rounded-full border border-emerald-200/40 px-7 py-4 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-200/10"
            >
              Taoist Services / 正一道服务
            </Link>
          </div>

          <Link
            href="/privacy"
            className="mt-6 inline-flex text-sm text-stone-500 transition hover:text-amber-100"
          >
            Privacy & Disclaimer / 隐私与免责声明
          </Link>
        </div>
      </section>
    </main>
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
