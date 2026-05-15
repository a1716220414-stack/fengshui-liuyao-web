import Link from "next/link";

const contactMethods = [
  {
    title: "Free Feng Shui Form",
    zhTitle: "免费风水表单",
    description:
      "Submit your home or room information and receive a preliminary report.",
    zhDescription:
      "提交住宅或房间信息，获得一份基础风水分析报告。",
    value: "/fengshui",
    href: "/fengshui",
  },
  {
    title: "Email",
    zhTitle: "邮箱",
    description:
      "Use email for detailed floor plans, room photos, and longer consultation requests.",
    zhDescription:
      "适合发送户型图、房间照片和较详细的咨询需求。",
    value: "your-email@example.com",
    href: "mailto:your-email@example.com",
  },
  {
    title: "Social Media",
    zhTitle: "社交平台",
    description:
      "You may also leave your WeChat, X, or Instagram account in the Feng Shui form.",
    zhDescription:
      "你也可以在风水表单中留下 WeChat、X 或 Instagram 账号。",
    value: "WeChat / X / Instagram",
    href: "/fengshui",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-neutral-100">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
          Contact / 联系
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          Contact for Consultation
        </h1>

        <h2 className="mt-4 text-2xl font-medium text-amber-100 md:text-3xl">
          联系咨询与提交资料
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-300">
          For a more accurate Feng Shui reading, please provide your floor plan,
          room photos, compass direction, and your main concern. You can start
          with the free form first.
        </p>

        <p className="mt-4 max-w-3xl text-base leading-8 text-neutral-400">
          如果希望获得更准确的风水分析，建议提供户型图、房间实景图、指南针朝向以及你最关心的问题。你可以先从免费表单开始提交。
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {contactMethods.map((method) => (
            <Link
              key={method.title}
              href={method.href}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-amber-300/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-2xl font-semibold text-white">
                {method.title}
              </h3>
              <p className="mt-1 text-lg text-amber-100">{method.zhTitle}</p>

              <p className="mt-5 text-sm leading-7 text-neutral-300">
                {method.description}
              </p>
              <p className="mt-3 text-sm leading-7 text-neutral-500">
                {method.zhDescription}
              </p>

              <p className="mt-6 break-all text-sm font-semibold text-amber-200">
                {method.value}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
          <h3 className="text-xl font-semibold text-white">
            What to prepare / 建议准备资料
          </h3>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-black/20 p-5">
              <p className="font-medium text-amber-100">For whole-home reading</p>
              <p className="mt-2 text-sm leading-7 text-neutral-400">
                Floor plan, entrance photo, bedroom photo, kitchen and bathroom
                location, facing direction, and main concern.
              </p>
              <p className="mt-2 text-sm leading-7 text-neutral-500">
                整体住宅分析建议准备：户型图、入户门照片、卧室照片、厨房和卫生间位置、房屋朝向以及主要问题。
              </p>
            </div>

            <div className="rounded-2xl bg-black/20 p-5">
              <p className="font-medium text-amber-100">For room-level reading</p>
              <p className="mt-2 text-sm leading-7 text-neutral-400">
                Clear photos from the room entrance, bed or desk position,
                window and mirror position, and the purpose of the room.
              </p>
              <p className="mt-2 text-sm leading-7 text-neutral-500">
                单个房间分析建议准备：从门口拍摄的清晰照片、床或书桌位置、窗户和镜子位置以及房间用途。
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}