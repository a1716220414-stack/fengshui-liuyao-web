"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactInfo } from "@/data/contact";
import { useState } from "react";

type ServiceKey = "fengshui" | "liuyao" | "taoist" | "services";

const serviceCopy: Record<
  ServiceKey,
  {
    eyebrow: string;
    title: string;
    zhTitle: string;
    description: string;
    zhDescription: string;
    primaryAction: string;
    secondaryAction: string;
    checklist: string[];
    zhChecklist: string[];
    accent: "amber" | "emerald";
  }
> = {
  fengshui: {
    eyebrow: "Continue Feng Shui Consultation / 继续风水咨询",
    title: "Send your floor plan or room photos for deeper review",
    zhTitle: "发送户型图或房间照片，继续深度分析",
    description:
      "A preliminary Feng Shui form can show the general direction, but deeper review usually needs floor plans, room photos, facing direction, and your main concern.",
    zhDescription:
      "基础风水表单可以判断大致方向，但深度分析通常需要户型图、房间照片、朝向信息和你的主要问题。",
    primaryAction: "Add contact for Feng Shui review / 加联系方式看风水",
    secondaryAction: "Open Feng Shui form / 打开风水表单",
    checklist: [
      "Floor plan or simple room layout",
      "Photos of main door, bedroom, kitchen, or target room",
      "Facing direction if known",
      "Main concern: wealth, health, sleep, relationship, career, or family",
    ],
    zhChecklist: [
      "户型图或简单房间布局",
      "入户门、卧室、厨房或目标房间照片",
      "如果知道房屋朝向，可以一并提供",
      "主要问题：财运、健康、睡眠、感情、事业或家庭关系",
    ],
    accent: "amber",
  },
  liuyao: {
    eyebrow: "Continue Liu Yao Reading / 继续六爻解卦",
    title: "Send your question and hexagram for deeper interpretation",
    zhTitle: "发送问题与卦象，继续深度解卦",
    description:
      "The free Liu Yao result shows the primary hexagram, changed hexagram, and changing lines. A deeper reading can discuss useful god, self/responding line, timing, and practical advice.",
    zhDescription:
      "免费六爻结果会展示本卦、变卦和动爻。深度解卦可以进一步分析用神、世应、时机和具体建议。",
    primaryAction: "Add contact for Liu Yao reading / 加联系方式解卦",
    secondaryAction: "Open Liu Yao casting / 打开六爻起卦",
    checklist: [
      "One focused question",
      "Casting time and time zone",
      "Gender selection if you are comfortable providing it",
      "Background notes and current situation",
    ],
    zhChecklist: [
      "一个明确具体的问题",
      "起卦时间与所在时区",
      "如果愿意，可提供问事人性别",
      "事情背景和目前状态",
    ],
    accent: "amber",
  },
  taoist: {
    eyebrow: "Continue Taoist Ritual Inquiry / 继续正一道服务咨询",
    title: "Describe your ritual, blessing, or ceremonial need",
    zhTitle: "说明你的法事、祈福或仪式需求",
    description:
      "Taoist ritual-related requests usually need clarification of purpose, location, time zone, family or personal context, and whether offline support is required.",
    zhDescription:
      "正一道法事相关需求通常需要先明确诉求、所在地区、时区、家庭或个人背景，以及是否需要线下支持。",
    primaryAction: "Add contact for Taoist inquiry / 加联系方式咨询法事",
    secondaryAction: "Open Taoist services / 打开正一道服务",
    checklist: [
      "Purpose: blessing, home peace, thanksgiving, memorial, consecration, or date selection",
      "Location and time zone",
      "Whether the matter is personal, family, home, business, or memorial related",
      "Preferred language and contact method",
    ],
    zhChecklist: [
      "诉求：祈福、安宅、还愿、追思、开光或择日",
      "所在地区与时区",
      "事项属于个人、家庭、住宅、事业还是追思相关",
      "沟通语言与优先联系方式",
    ],
    accent: "emerald",
  },
  services: {
    eyebrow: "Not sure which service fits? / 不确定选哪项服务？",
    title: "Send your situation first, then choose the right path",
    zhTitle: "先说明情况，再判断适合哪类服务",
    description:
      "If you are not sure whether your request belongs to Feng Shui, Liu Yao, or Taoist ritual consultation, contact us first with a short description.",
    zhDescription:
      "如果你不确定自己的需求属于风水、六爻还是正一道法事咨询，可以先发送简短背景，我们再帮你判断适合哪条路径。",
    primaryAction: "Add contact and describe your request / 加联系方式说明需求",
    secondaryAction: "View all services / 查看全部服务",
    checklist: [
      "What happened or what you want to ask",
      "Your preferred service if known",
      "Your location and time zone",
      "Preferred contact method",
    ],
    zhChecklist: [
      "发生了什么，或者你想问什么",
      "如果知道，可说明倾向的服务类型",
      "所在地区与时区",
      "优先联系方式",
    ],
    accent: "amber",
  },
};

function getServiceKey(pathname: string | null): ServiceKey | null {
  if (!pathname) return null;

  if (pathname.startsWith("/fengshui")) return "fengshui";
  if (pathname.startsWith("/liuyao")) return "liuyao";
  if (pathname.startsWith("/taoist")) return "taoist";
  if (pathname.startsWith("/services")) return "services";

  return null;
}

function getSecondaryHref(serviceKey: ServiceKey) {
  if (serviceKey === "fengshui") return "/fengshui";
  if (serviceKey === "liuyao") return "/liuyao";
  if (serviceKey === "taoist") return "/taoist";
  return "/services";
}

export default function ServiceContactSection() {
  const pathname = usePathname();
  const serviceKey = getServiceKey(pathname);
  const [copied, setCopied] = useState("");

  if (!serviceKey) {
    return null;
  }

  const copy = serviceCopy[serviceKey];
  const isEmerald = copy.accent === "emerald";

  async function copyWechat() {
    try {
      await navigator.clipboard.writeText(contactInfo.wechatId);
      setCopied("wechat");
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("");
    }
  }

  return (
    <section className="bg-[#080706] px-6 py-16 text-stone-100">
      <div
        className={[
          "mx-auto max-w-6xl overflow-hidden rounded-[2rem] border p-0",
          isEmerald
            ? "border-emerald-200/20 bg-emerald-200/5"
            : "border-amber-200/20 bg-amber-200/5",
        ].join(" ")}
      >
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-7 md:p-10">
            <p
              className={[
                "text-sm uppercase tracking-[0.3em]",
                isEmerald ? "text-emerald-200" : "text-amber-200",
              ].join(" ")}
            >
              {copy.eyebrow}
            </p>

            <h2 className="mt-5 text-3xl font-semibold leading-tight text-white md:text-5xl">
              {copy.title}
            </h2>

            <p
              className={[
                "mt-4 text-2xl md:text-3xl",
                isEmerald ? "text-emerald-100" : "text-amber-100",
              ].join(" ")}
            >
              {copy.zhTitle}
            </p>

            <p className="mt-6 text-sm leading-7 text-stone-300">
              {copy.description}
            </p>

            <p className="mt-3 text-sm leading-7 text-stone-500">
              {copy.zhDescription}
            </p>

            <div className="mt-8 grid gap-3 md:grid-cols-2">
              <button
                type="button"
                onClick={copyWechat}
                className={[
                  "rounded-full px-6 py-4 text-sm font-semibold text-black transition",
                  isEmerald
                    ? "bg-emerald-300 hover:bg-emerald-200"
                    : "bg-amber-300 hover:bg-amber-200",
                ].join(" ")}
              >
                {copied === "wechat"
                  ? "WeChat copied / 微信已复制"
                  : copy.primaryAction}
              </button>

              <Link
                href={getSecondaryHref(serviceKey)}
                className={[
                  "rounded-full border px-6 py-4 text-center text-sm font-semibold transition",
                  isEmerald
                    ? "border-emerald-200/40 text-emerald-100 hover:bg-emerald-200/10"
                    : "border-amber-200/40 text-amber-100 hover:bg-amber-200/10",
                ].join(" ")}
              >
                {copy.secondaryAction}
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <a
                href={contactInfo.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-center text-sm text-stone-300 transition hover:bg-white/10"
              >
                Instagram
              </a>

              <a
                href={contactInfo.xUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-center text-sm text-stone-300 transition hover:bg-white/10"
              >
                X / Twitter
              </a>

              <a
                href={`mailto:${contactInfo.email}`}
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-center text-sm text-stone-300 transition hover:bg-white/10"
              >
                Email
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 bg-black/20 p-7 md:p-10 lg:border-l lg:border-t-0">
            <h3 className="text-xl font-semibold text-white">
              What to send first / 首次联系建议发送
            </h3>

            <div className="mt-6 space-y-3">
              {copy.checklist.map((item, index) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="text-sm leading-6 text-stone-300">{item}</p>
                  <p className="mt-1 text-xs leading-5 text-stone-500">
                    {copy.zhChecklist[index]}
                  </p>
                </div>
              ))}
            </div>

            <div
              className={[
                "mt-6 rounded-xl border p-4",
                isEmerald
                  ? "border-emerald-200/20 bg-emerald-200/10"
                  : "border-amber-200/20 bg-amber-200/10",
              ].join(" ")}
            >
              <p
                className={[
                  "text-sm leading-7",
                  isEmerald ? "text-emerald-100" : "text-amber-100",
                ].join(" ")}
              >
                {contactInfo.responseTime}
              </p>

              <p className="mt-2 text-xs leading-6 text-stone-500">
                First message template / 首次联系模板：
              </p>

              <p className="mt-2 text-sm leading-7 text-stone-300">
                {contactInfo.shortMessage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}