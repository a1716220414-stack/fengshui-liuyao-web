import Link from "next/link";

const servicePlans = [
  {
    name: "Free Preliminary Reading",
    zhName: "免费初步分析",
    price: "Free",
    zhPrice: "免费",
    description:
      "A quick bilingual Feng Shui orientation based on basic home or room information.",
    zhDescription:
      "根据基础住宅或房间信息生成中英文初步风水分析，用于快速了解问题方向。",
    features: [
      "Basic home or room layout check",
      "Bilingual preliminary report",
      "Entrance, bedroom, kitchen, bathroom overview",
      "Suitable for first-time users",
    ],
    zhFeatures: [
      "基础住宅或房间格局检测",
      "中英文初步报告",
      "入户门、卧室、厨房、卫生间概览",
      "适合首次体验用户",
    ],
    href: "/fengshui",
    button: "Start Free Check / 开始免费检测",
  },
  {
    name: "Floor Plan Review",
    zhName: "户型图深度分析",
    price: "Custom Quote",
    zhPrice: "定制报价",
    description:
      "A deeper review based on your floor plan, room photos, compass direction, and main concern.",
    zhDescription:
      "基于户型图、房间照片、指南针朝向和主要问题进行更深入的格局分析。",
    features: [
      "Review of floor plan and room relationship",
      "Room-by-room Feng Shui suggestions",
      "Practical layout adjustment advice",
      "Suitable for home, apartment, or rental rooms",
    ],
    zhFeatures: [
      "分析户型图与房间关系",
      "逐房间风水建议",
      "实用布局调整建议",
      "适合住宅、公寓或租住房间",
    ],
    href: "/contact",
    button: "Ask for Review / 咨询分析",
  },
  {
    name: "One-on-One Consultation",
    zhName: "一对一咨询",
    price: "Custom Quote",
    zhPrice: "定制报价",
    description:
      "Personalized consultation for home, business, room layout, timing, or specific life concerns.",
    zhDescription:
      "针对住宅、商业空间、房间布局、时机选择或具体人生问题进行个性化咨询。",
    features: [
      "Personalized Feng Shui discussion",
      "Support for uploaded images and documents",
      "Follow-up through preferred contact method",
      "Suitable for serious paid consultation leads",
    ],
    zhFeatures: [
      "个性化风水讨论",
      "支持图片和文件资料",
      "通过用户偏好的联系方式跟进",
      "适合高意向付费咨询用户",
    ],
    href: "/contact",
    button: "Contact for Consultation / 联系咨询",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
          Services / 服务
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          Feng Shui & Metaphysics Services
        </h1>

        <h2 className="mt-4 text-2xl font-medium text-amber-100 md:text-3xl">
          风水与东方玄学咨询服务
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
          Start with a free preliminary reading, then choose a deeper review if
          you want more specific advice based on your floor plan, room photos,
          and personal concerns.
        </p>

        <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-400">
          你可以先通过免费检测了解大致方向。如果需要更具体的格局判断、房间布局建议或一对一咨询，可以进一步提交户型图、实景照片和主要问题。
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {servicePlans.map((plan) => (
            <article
              key={plan.name}
              className="flex flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6"
            >
              <div>
                <p className="text-sm text-amber-200">{plan.price}</p>
                <p className="mt-1 text-xs text-zinc-500">{plan.zhPrice}</p>

                <h3 className="mt-5 text-2xl font-semibold text-white">
                  {plan.name}
                </h3>
                <p className="mt-1 text-lg text-amber-100">{plan.zhName}</p>

                <p className="mt-5 text-sm leading-7 text-zinc-300">
                  {plan.description}
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {plan.zhDescription}
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={feature} className="rounded-xl bg-black/20 p-3">
                    <p className="text-sm text-zinc-300">• {feature}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {plan.zhFeatures[index]}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href={plan.href}
                className="mt-8 rounded-full bg-amber-300 px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-amber-200"
              >
                {plan.button}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-[1.5rem] border border-amber-300/20 bg-amber-300/10 p-6">
          <h3 className="text-xl font-semibold text-amber-100">
            Important Note / 重要说明
          </h3>
          <p className="mt-4 text-sm leading-7 text-zinc-300">
            Feng Shui and metaphysics services are provided for cultural,
            lifestyle, reflective, and spatial guidance. They should not be
            understood as guaranteed predictions or replacements for legal,
            medical, financial, or professional advice.
          </p>
          <p className="mt-3 text-sm leading-7 text-zinc-500">
            本网站提供的风水和玄学服务主要用于文化体验、生活方式参考、空间调整和个人反思，不构成确定性承诺，也不能替代法律、医疗、财务或其他专业意见。
          </p>
        </div>
      </section>
    </main>
  );
}