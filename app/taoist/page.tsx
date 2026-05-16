import Link from "next/link";

const ritualCategories = [
  {
    title: "Blessing & Peace Rituals",
    zhTitle: "祈福保安类",
    description:
      "For users who seek a ceremonial way to pray for peace, clarity, family harmony, career stability, study progress, or safe travel.",
    zhDescription:
      "适合希望通过传统仪式表达祈愿的用户，例如祈求平安、家庭和合、事业稳定、学业顺利、出行平安等。",
    items: [
      "General blessing request",
      "Career and study blessing",
      "Family peace and harmony",
      "Travel and annual peace prayer",
    ],
    zhItems: ["综合祈福", "事业与学业祈福", "家庭和合祈福", "出行与年度平安祈愿"],
  },
  {
    title: "Home Peace & Space Purification",
    zhTitle: "安宅净宅类",
    description:
      "For users who feel their home or room needs ceremonial purification, symbolic renewal, or a more settled atmosphere.",
    zhDescription:
      "适合新居入住、搬家之后、空间气场不安、居住体验不佳等情况，用于进行安宅、净宅和空间更新类需求咨询。",
    items: [
      "Home peace blessing",
      "Moving-in blessing",
      "Room or office purification inquiry",
      "Space renewal after major changes",
    ],
    zhItems: ["安宅祈福", "入宅祈安", "房间或办公室净宅咨询", "重大变化后的空间更新仪式咨询"],
  },
  {
    title: "Thanksgiving & Vow Fulfillment",
    zhTitle: "还愿酬神类",
    description:
      "For users who want to express gratitude, fulfill a vow, or arrange a ceremonial thanksgiving after a meaningful event.",
    zhDescription:
      "适合曾经许愿、祈愿之后希望表达感谢，或在重要事情完成后希望进行还愿、酬神、答谢类仪式咨询的用户。",
    items: [
      "Thanksgiving ritual inquiry",
      "Vow fulfillment arrangement",
      "Festival offering consultation",
      "Personal gratitude ceremony",
    ],
    zhItems: ["还愿咨询", "酬神安排咨询", "节日供奉咨询", "个人答谢仪式咨询"],
  },
  {
    title: "Memorial & Ancestor Remembrance",
    zhTitle: "追思祭祖类",
    description:
      "For users who need a respectful cultural way to remember ancestors, honor family lineage, or arrange memorial-related ritual support.",
    zhDescription:
      "适合希望以传统文化方式追思先人、表达孝思、祭祖纪念或安排追思类仪式咨询的用户。",
    items: [
      "Ancestor remembrance",
      "Memorial prayer inquiry",
      "Family lineage offering consultation",
      "Festival memorial arrangement",
    ],
    zhItems: ["祭祖追思", "追思祈愿咨询", "家族供奉咨询", "节日祭祀安排咨询"],
  },
  {
    title: "Consecration & Object Blessing",
    zhTitle: "开光加持类",
    description:
      "For users who want cultural consultation around consecration, symbolic blessing, or respectful handling of ritual objects.",
    zhDescription:
      "适合希望了解开光、加持、法物供奉、香火礼仪等文化流程的用户。具体操作应由具备相应传承和资质者承接。",
    items: [
      "Consecration inquiry",
      "Object blessing consultation",
      "Ritual object handling guidance",
      "Incense and offering etiquette",
    ],
    zhItems: ["开光咨询", "法物加持咨询", "法物安置与处理建议", "香火与供奉礼仪咨询"],
  },
  {
    title: "Date Selection & Ritual Planning",
    zhTitle: "择日与仪式规划",
    description:
      "For users who need help choosing an auspicious date or planning a culturally appropriate ritual process.",
    zhDescription:
      "适合搬家、开业、祭祀、祈福、还愿、安宅等事项前，咨询合适时间与仪式流程安排。",
    items: [
      "Auspicious date consultation",
      "Moving or opening date support",
      "Ritual preparation checklist",
      "Online-to-offline ritual planning",
    ],
    zhItems: ["择日咨询", "搬家或开业时间建议", "仪式准备清单", "线上咨询到线下法事规划"],
  },
];

const boundaries = [
  {
    title: "No guaranteed supernatural results",
    zhTitle: "不承诺确定性结果",
    text: "Ritual services are presented as cultural, symbolic, spiritual, and reflective support. They should not be described as guaranteed outcomes.",
    zhText:
      "法事与祈福服务应作为文化、象征、精神和反思层面的支持，不应宣传为保证灵验或必然改变结果。",
  },
  {
    title: "Qualified ritual work matters",
    zhTitle: "具体法事应由合格人员承接",
    text: "Actual Zhengyi ritual work should be handled by qualified and properly trained practitioners according to lineage, local practice, and applicable laws.",
    zhText:
      "具体正一道法事应由具备相应传承、训练和资质的人员根据法脉、当地习俗和法律要求承接。",
  },
  {
    title: "Not a substitute for professional advice",
    zhTitle: "不能替代专业意见",
    text: "Ritual or metaphysical consultation should not replace legal, medical, psychological, financial, or safety-related professional advice.",
    zhText:
      "法事、祈福和玄学咨询不能替代法律、医疗、心理、财务或安全相关专业意见。",
  },
];

const inquiryFields = [
  "Your purpose or concern / 你的主要诉求",
  "Preferred ritual type if known / 如果知道，可说明想咨询的法事类型",
  "Location and time zone / 所在地区与时区",
  "Whether this is for home, family, personal, business, or memorial matters / 是住宅、家庭、个人、事业还是追思相关事项",
  "Preferred contact method / 希望通过哪种方式联系",
];

export default function TaoistServicesPage() {
  return (
    <main className="min-h-screen bg-[#080706] text-stone-100">
      <section className="relative overflow-hidden px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(217,163,64,0.18),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(20,83,45,0.18),transparent_34%),linear-gradient(180deg,#080706_0%,#11100d_55%,#080706_100%)]" />
        <div className="absolute left-0 top-24 h-px w-full bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />

        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-200">
            Zhengyi Taoist Services / 正一道服务
          </p>

          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-7xl">
            Taoist ritual, blessing, and ceremonial consultation
          </h1>

          <h2 className="mt-6 text-3xl font-medium text-amber-100 md:text-5xl">
            斋醮科仪，祈福安宅
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-stone-300 md:text-lg">
            This page introduces Taoist ritual-related consultation directions,
            including blessing, home peace, thanksgiving, memorial, consecration,
            date selection, and ritual planning.
          </p>

          <p className="mt-4 max-w-3xl text-base leading-8 text-stone-500">
            本页用于介绍正一道相关法事与祈福服务方向，包括祈福、安宅、还愿、追思、开光、择日和仪式规划等。
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
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Ritual Directions / 法事方向"
            title="Common Taoist ritual service inquiries"
            zhTitle="常见正一道法事咨询方向"
            text="Different lineages and regions may use different names and procedures. The following categories are presented as consultation directions, not fixed promises."
            zhText="不同法脉与地区在名称和流程上可能不同。以下内容作为咨询方向展示，不作为固定承诺。"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {ritualCategories.map((category) => (
              <article
                key={category.title}
                className="rounded-[2rem] border border-white/10 bg-[#11100d] p-7 transition hover:-translate-y-1 hover:border-amber-200/40"
              >
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
                  {category.items.map((item, index) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/10 bg-black/20 p-4"
                    >
                      <p className="text-sm text-stone-300">{item}</p>
                      <p className="mt-2 text-xs leading-5 text-stone-500">
                        {category.zhItems[index]}
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
            eyebrow="Inquiry Preparation / 咨询准备"
            title="What to provide before asking for ritual support"
            zhTitle="法事咨询前建议准备"
            text="A clearer request helps determine whether the matter is suitable for Taoist ritual consultation and what type of support may be appropriate."
            zhText="诉求越清晰，越容易判断是否适合做法事咨询，以及更适合哪一类仪式或服务方向。"
          />

          <div className="mt-10 rounded-[2rem] border border-white/10 bg-[#11100d] p-7">
            <div className="grid gap-4 md:grid-cols-2">
              {inquiryFields.map((item) => (
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
            text="This website should collect and clarify ritual-related needs, but should not promise guaranteed outcomes."
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