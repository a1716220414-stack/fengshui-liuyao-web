import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zhengyi Taoist Ritual & Blessing Services",
  description:
    "Taoist ritual, blessing, home peace, thanksgiving, memorial, consecration, and date selection consultation for overseas users.",
};

const ritualCategories = [
  {
    title: "Blessing & Peace Rituals",
    zhTitle: "祈福保安类",
    imageLabel: "Prayer · Incense · Peace",
    imageZh: "香烟起处，愿念上达",
    description:
      "For users who seek a ceremonial way to pray for peace, clarity, family harmony, career stability, study progress, or safe travel.",
    zhDescription:
      "适合希望通过传统仪式表达祈愿的用户，例如祈求平安、家庭和合、事业稳定、学业顺利、出行平安等。",
    items: ["General blessing", "Career and study", "Family harmony", "Annual peace prayer"],
    zhItems: ["综合祈福", "事业学业", "家庭和合", "年度平安"],
  },
  {
    title: "Home Peace & Space Purification",
    zhTitle: "安宅净宅类",
    imageLabel: "Home · Threshold · Renewal",
    imageZh: "入宅安居，净室调气",
    description:
      "For users who feel their home or room needs ceremonial purification, symbolic renewal, or a more settled atmosphere.",
    zhDescription:
      "适合新居入住、搬家之后、空间气场不安、居住体验不佳等情况，用于咨询安宅、净宅和空间更新类需求。",
    items: ["Home peace", "Moving-in blessing", "Room purification", "Office renewal"],
    zhItems: ["安宅祈福", "入宅祈安", "房间净宅", "办公室更新"],
  },
  {
    title: "Thanksgiving & Vow Fulfillment",
    zhTitle: "还愿酬神类",
    imageLabel: "Vow · Gratitude · Offering",
    imageZh: "有愿既成，当以礼谢",
    description:
      "For users who want to express gratitude, fulfill a vow, or arrange a ceremonial thanksgiving after a meaningful event.",
    zhDescription:
      "适合曾经许愿、祈愿之后希望表达感谢，或在重要事情完成后希望进行还愿、酬神、答谢类仪式咨询的用户。",
    items: ["Thanksgiving", "Vow fulfillment", "Festival offering", "Personal gratitude"],
    zhItems: ["还愿咨询", "酬神安排", "节日供奉", "个人答谢"],
  },
  {
    title: "Memorial & Ancestor Remembrance",
    zhTitle: "追思祭祖类",
    imageLabel: "Memory · Ancestors · Lineage",
    imageZh: "慎终追远，念本思源",
    description:
      "For users who need a respectful cultural way to remember ancestors, honor family lineage, or arrange memorial-related ritual support.",
    zhDescription:
      "适合希望以传统文化方式追思先人、表达孝思、祭祖纪念或安排追思类仪式咨询的用户。",
    items: ["Ancestor remembrance", "Memorial prayer", "Family offering", "Festival memorial"],
    zhItems: ["祭祖追思", "追思祈愿", "家族供奉", "节日祭祀"],
  },
  {
    title: "Consecration & Object Blessing",
    zhTitle: "开光加持类",
    imageLabel: "Consecration · Symbol · Respect",
    imageZh: "法物有仪，敬而后安",
    description:
      "For users who want cultural consultation around consecration, symbolic blessing, or respectful handling of ritual objects.",
    zhDescription:
      "适合希望了解开光、加持、法物供奉、香火礼仪等文化流程的用户。具体操作应由具备相应传承和资质者承接。",
    items: ["Consecration inquiry", "Object blessing", "Ritual object handling", "Offering etiquette"],
    zhItems: ["开光咨询", "法物加持", "法物安置", "供奉礼仪"],
  },
  {
    title: "Date Selection & Ritual Planning",
    zhTitle: "择日与仪式规划",
    imageLabel: "Calendar · Timing · Ceremony",
    imageZh: "择其吉日，合其时宜",
    description:
      "For users who need help choosing an auspicious date or planning a culturally appropriate ritual process.",
    zhDescription:
      "适合搬家、开业、祭祀、祈福、还愿、安宅等事项前，咨询合适时间与仪式流程安排。",
    items: ["Date selection", "Moving or opening date", "Preparation checklist", "Online-to-offline planning"],
    zhItems: ["择日咨询", "搬家开业", "准备清单", "线上线下规划"],
  },
];

const caseScenes = [
  {
    title: "New Home Peace Inquiry",
    zhTitle: "新居安宅咨询",
    scene:
      "A family has just moved into a new apartment overseas. They feel the space is unsettled and want a culturally respectful home peace consultation.",
    zhScene:
      "一家人刚搬入海外新公寓，感觉空间不够安定，希望以传统文化方式咨询安宅与净宅方向。",
    suitable:
      "Suitable for home peace, moving-in blessing, space purification inquiry, and Feng Shui review.",
    zhSuitable:
      "适合安宅祈福、入宅祈安、净宅咨询，并可结合风水格局一起判断。",
  },
  {
    title: "Career Blessing & Timing",
    zhTitle: "事业祈福与择时",
    scene:
      "A user is preparing for a business launch, interview, or important career transition and wants blessing support plus date selection.",
    zhScene:
      "用户准备开业、面试或重要事业转折，希望咨询祈福方向，同时选择更合适的时间节点。",
    suitable:
      "Suitable for blessing inquiry, date selection, intention clarification, and follow-up consultation.",
    zhSuitable:
      "适合事业祈福、择日咨询、愿望梳理和后续深度沟通。",
  },
  {
    title: "Memorial & Family Remembrance",
    zhTitle: "追思祭祖与家族纪念",
    scene:
      "An overseas family wants to remember ancestors or hold a memorial in a respectful, culturally grounded way.",
    zhScene:
      "海外家庭希望追思先人、表达孝思，或以更符合传统文化的方式安排纪念仪式。",
    suitable:
      "Suitable for ancestor remembrance, memorial prayer inquiry, and family lineage offering consultation.",
    zhSuitable:
      "适合祭祖追思、追思祈愿、家族供奉和节日祭祀类咨询。",
  },
];

const atmosphereCards = [
  {
    seal: "斋",
    title: "Purification before ritual",
    zhTitle: "斋以洁心",
    text: "Ritual begins with preparation: intention, restraint, respect, and inner clarity.",
    zhText: "仪式之前，先正其心。所谓斋，不只是外在准备，也是一种收束心念。",
  },
  {
    seal: "醮",
    title: "Offering and petition",
    zhTitle: "醮以通诚",
    text: "Offering is a ceremonial language of respect, gratitude, prayer, and communication.",
    zhText: "醮，是以仪式表达敬意、感谢、祈愿与沟通，并非简单交易式许愿。",
  },
  {
    seal: "符",
    title: "Symbol and order",
    zhTitle: "符以立信",
    text: "Talismans and ritual objects should be handled with lineage, rules, and caution.",
    zhText: "符箓与法物有其传承、规矩和边界，不宜随意承诺效果。",
  },
];

const preparation = [
  "Purpose or concern / 主要诉求",
  "Location, time zone, and language / 所在地区、时区与沟通语言",
  "Whether this is personal, family, home, business, or memorial related / 个人、家庭、住宅、事业或追思相关",
  "Preferred contact method / 优先联系方式",
  "Whether offline ritual support is required / 是否需要线下法事支持",
];

const boundaries = [
  {
    title: "No guaranteed supernatural result",
    zhTitle: "不承诺确定性结果",
    text: "Ritual services are presented as cultural, symbolic, spiritual, and reflective support.",
    zhText: "法事与祈福服务应作为文化、象征、精神和反思层面的支持，不宣传为保证灵验或必然改变结果。",
  },
  {
    title: "Qualified ritual work matters",
    zhTitle: "具体法事应由合格人员承接",
    text: "Actual Zhengyi ritual work should be handled by qualified and properly trained practitioners according to lineage, local practice, and applicable laws.",
    zhText: "具体正一道法事应由具备相应传承、训练和资质的人员根据法脉、当地习俗和法律要求承接。",
  },
  {
    title: "Not a substitute for professional advice",
    zhTitle: "不能替代专业意见",
    text: "Ritual or metaphysical consultation should not replace legal, medical, psychological, financial, or safety-related professional advice.",
    zhText: "法事、祈福和玄学咨询不能替代法律、医疗、心理、财务或安全相关专业意见。",
  },
];

export default function TaoistServicesPage() {
  return (
    <main className="min-h-screen bg-[#080706] text-stone-100">
      <section className="relative overflow-hidden px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(217,163,64,0.20),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(20,83,45,0.20),transparent_34%),linear-gradient(180deg,#080706_0%,#11100d_55%,#080706_100%)]" />
        <div className="absolute left-0 top-24 h-px w-full bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />
        <div className="absolute bottom-20 left-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-200/10 to-transparent" />

        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-200">
              Zhengyi Taoist Services / 正一道服务
            </p>

            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-7xl">
              Taoist ritual, blessing, and ceremonial consultation
            </h1>

            <h2 className="mt-6 text-3xl font-medium text-amber-100 md:text-5xl">
              斋醮科仪，祈福安宅
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-8 text-stone-300 md:text-lg">
              A refined consultation page for Taoist ritual-related needs:
              blessing, home peace, thanksgiving, memorial, consecration, date
              selection, and ritual planning.
            </p>

            <p className="mt-4 max-w-3xl text-base leading-8 text-stone-500">
              本页用于承接正一道相关法事与祈福服务咨询，包括祈福、安宅、还愿、追思、开光、择日与仪式规划等需求。
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-amber-300 px-7 py-4 text-center text-sm font-semibold text-black transition hover:bg-amber-200"
              >
                Request Ritual Consultation / 咨询法事服务
              </Link>

              <Link
                href="/services"
                className="rounded-full border border-amber-200/40 px-7 py-4 text-center text-sm font-semibold text-amber-100 transition hover:bg-amber-200/10"
              >
                View All Services / 查看全部服务
              </Link>
            </div>
          </div>

          <RitualHeroVisual />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Atmosphere / 道教气息"
            title="Ritual is not only a service, but a form of order"
            zhTitle="科仪非只求事，更在正心立序"
            text="Zhai and Jiao are not simple commercial labels. They point to preparation, purification, offering, petition, order, and reverence."
            zhText="斋醮不是简单的商业标签，而是关于准备、清净、供奉、祈请、秩序与敬畏的仪式系统。"
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {atmosphereCards.map((card) => (
              <article
                key={card.seal}
                className="rounded-[2rem] border border-white/10 bg-[#11100d] p-7"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-200/40 bg-amber-200/10 text-3xl text-amber-100">
                  {card.seal}
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white">
                  {card.title}
                </h3>

                <p className="mt-2 text-xl text-amber-100">{card.zhTitle}</p>

                <p className="mt-5 text-sm leading-7 text-stone-300">
                  {card.text}
                </p>

                <p className="mt-3 text-sm leading-7 text-stone-500">
                  {card.zhText}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-amber-200/10 bg-[#0d0b08] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Ritual Directions / 法事方向"
            title="Common Taoist ritual service inquiries"
            zhTitle="常见正一道法事咨询方向"
            text="Different lineages and regions may use different names and procedures. These categories are consultation directions, not fixed promises."
            zhText="不同法脉与地区在名称和流程上可能不同。以下内容作为咨询方向展示，不作为固定承诺。"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {ritualCategories.map((category, index) => (
              <article
                key={category.title}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#11100d] transition hover:-translate-y-1 hover:border-amber-200/40"
              >
                <RitualImagePanel
                  label={category.imageLabel}
                  zhLabel={category.imageZh}
                  index={index}
                />

                <div className="p-7">
                  <h3 className="text-2xl font-semibold text-white">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-xl text-amber-100">
                    {category.zhTitle}
                  </p>

                  <p className="mt-5 text-sm leading-7 text-stone-300">
                    {category.description}
                  </p>

                  <p className="mt-3 text-sm leading-7 text-stone-500">
                    {category.zhDescription}
                  </p>

                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={item}
                        className="rounded-xl border border-white/10 bg-black/20 p-4"
                      >
                        <p className="text-sm text-stone-300">{item}</p>
                        <p className="mt-2 text-xs leading-5 text-stone-500">
                          {category.zhItems[itemIndex]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Case Scenes / 场景案例"
            title="How users may approach Taoist ritual consultation"
            zhTitle="用户可能如何提出法事咨询"
            text="These are illustrative scenarios that help overseas users understand what kind of request can be submitted."
            zhText="以下是示例场景，用于帮助海外用户理解什么样的需求可以提交咨询。"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {caseScenes.map((item, index) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#11100d]"
              >
                <CaseVisual index={index} />

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-lg text-amber-100">{item.zhTitle}</p>

                  <p className="mt-5 text-sm leading-7 text-stone-300">
                    {item.scene}
                  </p>

                  <p className="mt-3 text-sm leading-7 text-stone-500">
                    {item.zhScene}
                  </p>

                  <div className="mt-5 rounded-xl border border-amber-200/20 bg-amber-200/10 p-4">
                    <p className="text-sm leading-7 text-amber-100">
                      {item.suitable}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-stone-500">
                      {item.zhSuitable}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-amber-200/10 bg-[#0d0b08] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Inquiry Preparation / 咨询准备"
            title="What to provide before asking for ritual support"
            zhTitle="法事咨询前建议准备"
            text="A clearer request helps determine whether the matter is suitable for Taoist ritual consultation and what type of support may be appropriate."
            zhText="诉求越清晰，越容易判断是否适合做法事咨询，以及更适合哪一类仪式或服务方向。"
          />

          <div className="mt-10 rounded-[2rem] border border-white/10 bg-[#11100d] p-7">
            <div className="grid gap-4 md:grid-cols-2">
              {preparation.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-stone-300"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-amber-300 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-amber-200"
              >
                Contact for Ritual Inquiry / 联系法事咨询
              </Link>

              <Link
                href="/privacy"
                className="rounded-full border border-amber-200/40 px-6 py-3 text-center text-sm font-semibold text-amber-100 transition hover:bg-amber-200/10"
              >
                Privacy & Disclaimer / 隐私与免责声明
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Boundaries / 服务边界"
            title="Ritual services must be presented carefully"
            zhTitle="法事服务必须谨慎表达"
            text="This website can collect and clarify ritual-related needs, but should not promise guaranteed outcomes."
            zhText="网站可以收集和澄清法事相关需求，但不应宣传确定性结果或绝对灵验。"
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {boundaries.map((item) => (
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
        </div>
      </section>

      <section className="px-6 pb-20 pt-6">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-amber-200/20 bg-[radial-gradient(circle_at_top,rgba(217,163,64,0.18),rgba(255,255,255,0.03)_45%,rgba(0,0,0,0.28)_100%)] p-8 text-center md:p-12">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
            Begin / 开始咨询
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">
            Tell us what kind of ritual support you need
          </h2>

          <p className="mt-4 text-3xl text-amber-100 md:text-4xl">
            先明其事，再择其法
          </p>

          <p className="mt-6 text-sm leading-7 text-stone-400">
            If you are not sure which ritual direction is suitable, describe
            your situation first. We can help clarify the service category and
            next step.
          </p>

          <p className="mt-3 text-sm leading-7 text-stone-500">
            如果你不确定适合哪类法事，可以先描述情况，再进一步确认服务方向和后续流程。
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-amber-300 px-7 py-4 text-sm font-semibold text-black transition hover:bg-amber-200"
            >
              Contact / 联系咨询
            </Link>

            <Link
              href="/services"
              className="rounded-full border border-amber-200/40 px-7 py-4 text-sm font-semibold text-amber-100 transition hover:bg-amber-200/10"
            >
              Back to Services / 返回服务页
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function RitualHeroVisual() {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-[2.5rem] bg-emerald-300/10 blur-3xl" />

      <div className="relative rounded-[2rem] border border-amber-200/20 bg-[#12100c]/90 p-6 shadow-2xl shadow-black/40">
        <div className="rounded-[1.5rem] border border-amber-200/10 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_45%),rgba(255,255,255,0.03)] p-7">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-200">
                altar · incense · petition
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">
                法坛清供
              </p>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-200/40 bg-amber-200/10 text-2xl font-semibold text-amber-100">
              道
            </div>
          </div>

          <div className="mt-10 rounded-[1.25rem] border border-amber-200/20 bg-black/30 p-6">
            <div className="mx-auto h-32 w-32 rounded-full border border-amber-200/30 bg-[radial-gradient(circle,rgba(251,191,36,0.26),transparent_62%)]" />
            <div className="mx-auto mt-6 h-24 w-3 rounded-full bg-gradient-to-b from-amber-200/80 to-transparent" />
            <div className="mx-auto mt-4 h-4 w-52 rounded-full bg-amber-900/40" />
            <div className="mt-8 grid grid-cols-3 gap-3">
              {["香", "灯", "水", "符", "表", "供"].map((item) => (
                <div
                  key={item}
                  className="flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-xl text-amber-100"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-sm leading-7 text-stone-400">
            A visual atmosphere for ritual consultation: not a promise of
            outcome, but a respectful entry into order, intention, and culture.
          </p>

          <p className="mt-3 text-sm leading-7 text-stone-500">
            此处以视觉化方式呈现法事咨询氛围：不承诺结果，而强调秩序、愿念、礼仪与文化。
          </p>
        </div>
      </div>
    </div>
  );
}

function RitualImagePanel({
  label,
  zhLabel,
  index,
}: {
  label: string;
  zhLabel: string;
  index: number;
}) {
  const seals = ["福", "宅", "愿", "祖", "光", "日"];
  const gradients = [
    "from-amber-300/30 via-orange-900/20 to-black",
    "from-emerald-300/20 via-stone-900/30 to-black",
    "from-red-300/20 via-amber-900/20 to-black",
    "from-stone-200/20 via-zinc-900/30 to-black",
    "from-yellow-200/25 via-amber-900/20 to-black",
    "from-sky-200/15 via-emerald-900/20 to-black",
  ];

  return (
    <div
      className={`relative h-56 overflow-hidden bg-gradient-to-br ${
        gradients[index % gradients.length]
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_22%),radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.18),transparent_28%)]" />
      <div className="absolute left-8 top-8 flex h-20 w-20 items-center justify-center rounded-full border border-amber-200/40 bg-black/20 text-4xl text-amber-100">
        {seals[index % seals.length]}
      </div>
      <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.25em] text-amber-200">
          {label}
        </p>
        <p className="mt-2 text-xl text-white">{zhLabel}</p>
      </div>
    </div>
  );
}

function CaseVisual({ index }: { index: number }) {
  const labels = [
    ["门", "宅", "安"],
    ["业", "时", "愿"],
    ["祖", "思", "礼"],
  ];

  return (
    <div className="relative h-48 bg-[radial-gradient(circle_at_top,rgba(217,163,64,0.24),transparent_45%),linear-gradient(135deg,#15110b,#050505)]">
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute inset-0 flex items-center justify-center gap-4">
        {labels[index % labels.length].map((label) => (
          <div
            key={label}
            className="flex h-20 w-20 items-center justify-center rounded-full border border-amber-200/30 bg-amber-200/10 text-3xl text-amber-100"
          >
            {label}
          </div>
        ))}
      </div>
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