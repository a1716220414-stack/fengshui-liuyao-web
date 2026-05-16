import Link from "next/link";
import { contactInfo } from "@/data/contact";

const contactMethods = [
  {
    title: "WeChat",
    zhTitle: "微信",
    value: contactInfo.wechatId,
    note: "Recommended for Chinese communication and follow-up consultation.",
    zhNote: "适合中文沟通、后续咨询和发送图片资料。",
  },
  {
    title: "Instagram",
    zhTitle: "Instagram",
    value: contactInfo.instagramUrl,
    href: contactInfo.instagramUrl,
    note: "Suitable for overseas users and casual first contact.",
    zhNote: "适合海外用户初步联系和日常沟通。",
  },
  {
    title: "X / Twitter",
    zhTitle: "X / Twitter",
    value: contactInfo.xUrl,
    href: contactInfo.xUrl,
    note: "Suitable for quick inquiry and public profile verification.",
    zhNote: "适合快速咨询，也便于用户确认账号真实性。",
  },
  {
    title: "Email",
    zhTitle: "邮箱",
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
    note: "Suitable for detailed background, floor plans, and consultation records.",
    zhNote: "适合发送详细背景、户型资料和咨询记录。",
  },
];

const inquiryTypes = [
  {
    title: "Feng Shui Consultation",
    zhTitle: "风水咨询",
    text: "Best for home, apartment, room, office, floor plan, bedroom, kitchen, main door, and layout concerns.",
    zhText:
      "适合住宅、公寓、房间、办公室、户型图、卧室、厨房、入户门和空间格局相关问题。",
    href: "/fengshui",
    button: "Submit Feng Shui Form / 提交风水表单",
  },
  {
    title: "Liu Yao Reading",
    zhTitle: "六爻解卦",
    text: "Best for one focused question about career, relationship, money, timing, decision, or uncertainty.",
    zhText:
      "适合针对事业、感情、财务、时机、选择和不确定事项提出一个明确问题。",
    href: "/liuyao",
    button: "Cast Liu Yao Hexagram / 开始六爻起卦",
  },
  {
    title: "Taoist Ritual Inquiry",
    zhTitle: "正一道法事咨询",
    text: "Best for blessing, home peace, thanksgiving, memorial, consecration, date selection, and ritual planning.",
    zhText:
      "适合祈福、安宅、还愿、追思、开光、择日和仪式规划等相关需求。",
    href: "/taoist",
    button: "View Taoist Services / 查看正一道服务",
  },
];

const messageTemplate = [
  "1. Service type / 咨询类型：Feng Shui / Liu Yao / Taoist ritual",
  "2. Main question / 主要问题：",
  "3. Your location and time zone / 所在地区与时区：",
  "4. Preferred language / 沟通语言：English / 中文",
  "5. Background notes / 背景说明：",
  "6. Photos or floor plan if needed / 如有需要可发送图片或户型图：",
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#080706] text-stone-100">
      <section className="relative overflow-hidden px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(217,163,64,0.18),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(20,83,45,0.18),transparent_34%),linear-gradient(180deg,#080706_0%,#11100d_55%,#080706_100%)]" />
        <div className="absolute left-0 top-24 h-px w-full bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />

        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-200">
            Contact / 联系咨询
          </p>

          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-7xl">
            Add a contact method and continue the consultation
          </h1>

          <h2 className="mt-6 text-3xl font-medium text-amber-100 md:text-5xl">
            先加联系方式，再细看其事
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-stone-300 md:text-lg">
            Most Feng Shui, Liu Yao, and Taoist ritual inquiries require
            follow-up communication, background details, images, time zone, and
            clarification before deeper consultation.
          </p>

          <p className="mt-4 max-w-3xl text-base leading-8 text-stone-500">
            风水、六爻和正一道法事相关服务，通常需要进一步沟通背景、图片、时区、具体诉求和服务范围，因此建议先添加联系方式。
          </p>

          <div className="mt-8 rounded-[1.5rem] border border-amber-200/20 bg-amber-200/10 p-5">
            <p className="text-sm leading-7 text-amber-100">
              {contactInfo.responseTime}
            </p>
            <p className="mt-2 text-sm leading-7 text-stone-500">
              For faster response, please send your service type, question,
              location, time zone, and preferred language.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Contact Methods / 联系方式"
            title="Choose the way that is easiest for you"
            zhTitle="选择你最方便的联系方式"
            text="You can contact us through WeChat, Instagram, X, or Email. For image-heavy consultation, WeChat or Email is usually easier."
            zhText="你可以通过微信、Instagram、X 或邮箱联系。若需要发送户型图、房间照片或详细背景，微信和邮箱通常更方便。"
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {contactMethods.map((method) => (
              <article
                key={method.title}
                className="rounded-[1.75rem] border border-white/10 bg-[#11100d] p-6"
              >
                <h3 className="text-2xl font-semibold text-white">
                  {method.title}
                </h3>

                <p className="mt-2 text-xl text-amber-100">
                  {method.zhTitle}
                </p>

                <p className="mt-5 break-all rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-stone-300">
                  {method.value}
                </p>

                <p className="mt-4 text-sm leading-7 text-stone-400">
                  {method.note}
                </p>

                <p className="mt-2 text-sm leading-7 text-stone-500">
                  {method.zhNote}
                </p>

                {method.href ? (
                  <a
                    href={method.href}
                    target={method.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={method.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    className="mt-5 inline-flex rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
                  >
                    Open / 打开
                  </a>
                ) : (
                  <div className="mt-5 inline-flex rounded-full border border-amber-200/30 px-5 py-3 text-sm font-semibold text-amber-100">
                    Copy from this page / 请复制该联系方式
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-amber-200/10 bg-[#0d0b08] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Start from the right page / 从正确入口开始"
            title="Send the right information from the beginning"
            zhTitle="先选入口，再补资料"
            text="Using the correct page before contacting us helps organize your request and makes follow-up easier."
            zhText="在添加联系方式前，先通过对应页面提交基础信息，可以让后续沟通更高效。"
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {inquiryTypes.map((item) => (
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

                <Link
                  href={item.href}
                  className="mt-6 inline-flex rounded-full border border-amber-200/40 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-200/10"
                >
                  {item.button}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Message Template / 咨询模板"
            title="You can copy this message when contacting us"
            zhTitle="联系时可以直接复制这段模板"
            text="A structured message reduces repeated communication and helps us understand your request quickly."
            zhText="结构化信息可以减少反复沟通，也方便我们快速判断你的需求。"
          />

          <div className="mt-10 rounded-[2rem] border border-white/10 bg-[#11100d] p-7">
            <div className="space-y-3">
              {messageTemplate.map((line) => (
                <p
                  key={line}
                  className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-stone-300"
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-7 rounded-[1.5rem] border border-amber-200/20 bg-amber-200/10 p-5">
              <p className="text-sm leading-7 text-amber-100">
                Suggested first message:
              </p>
              <p className="mt-3 text-sm leading-7 text-stone-300">
                {contactInfo.shortMessage}
              </p>
              <p className="mt-3 text-sm leading-7 text-stone-500">
                建议首次联系时说明：你想咨询风水、六爻还是正一道法事，以及你的主要问题。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 pt-6">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-amber-200/20 bg-[radial-gradient(circle_at_top,rgba(217,163,64,0.18),rgba(255,255,255,0.03)_45%,rgba(0,0,0,0.28)_100%)] p-8 text-center md:p-12">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
            Ready / 可以开始
          </p>

          <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">
            Add contact first, then we can go deeper
          </h2>

          <p className="mt-4 text-3xl text-amber-100 md:text-4xl">
            先通其意，再论其法
          </p>

          <p className="mt-6 text-sm leading-7 text-stone-400">
            Many metaphysics services require follow-up. Add a contact method
            and send your basic background to continue.
          </p>

          <p className="mt-3 text-sm leading-7 text-stone-500">
            多数玄学服务都需要后续沟通。请先添加联系方式，并发送基础背景信息。
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