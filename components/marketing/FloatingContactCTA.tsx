"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactInfo } from "@/data/contact";
import { useState } from "react";

export default function FloatingContactCTA() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState("");
  const shouldLiftContact =
    pathname?.startsWith("/liuyao") ||
    pathname?.startsWith("/fengshui") ||
    pathname?.startsWith("/payment");

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  async function copyText(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("");
    }
  }

  return (
    <div
      className={[
        "fixed right-5 z-50 flex flex-col items-end gap-3",
        shouldLiftContact
          ? "bottom-24 md:bottom-5"
          : "bottom-5",
      ].join(" ")}
    >
      {isOpen ? (
        <div className="w-[min(92vw,360px)] rounded-[1.5rem] border border-amber-200/25 bg-[#11100d]/95 p-5 text-stone-100 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-amber-200">
                Contact / 联系
              </p>

              <h3 className="mt-2 text-lg font-semibold text-white">
                Talk to SY Metaphysics
              </h3>

              <p className="mt-1 text-sm text-amber-100">
                加联系方式，继续深度咨询
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-white/10 px-3 py-1 text-sm text-stone-400 transition hover:bg-white/10 hover:text-white"
            >
              ×
            </button>
          </div>

          <p className="mt-4 text-sm leading-7 text-stone-400">
            For Feng Shui, Liu Yao, or Taoist ritual consultation, send your
            question and preferred contact method.
          </p>

          <p className="mt-2 text-sm leading-7 text-stone-500">
            风水、六爻、正一道法事相关需求，都可以先加联系方式说明情况。
          </p>

          <div className="mt-5 space-y-3">
            <button
              type="button"
              onClick={() => copyText(contactInfo.wechatId, "WeChat")}
              className="flex w-full items-center justify-between rounded-xl border border-amber-200/20 bg-amber-200/10 px-4 py-3 text-left text-sm transition hover:bg-amber-200/15"
            >
              <span>
                <span className="block font-medium text-amber-100">
                  WeChat / 微信
                </span>
                <span className="block text-xs text-stone-500">
                  {contactInfo.wechatId}
                </span>
              </span>
              <span className="text-xs text-stone-400">
                {copied === "WeChat" ? "Copied 已复制" : "Copy 复制"}
              </span>
            </button>

            <a
              href={contactInfo.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm transition hover:bg-white/10"
            >
              <span className="block font-medium text-white">Instagram</span>
              <span className="block break-all text-xs text-stone-500">
                {contactInfo.instagramUrl}
              </span>
            </a>

            <a
              href={contactInfo.xUrl}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm transition hover:bg-white/10"
            >
              <span className="block font-medium text-white">X / Twitter</span>
              <span className="block break-all text-xs text-stone-500">
                {contactInfo.xUrl}
              </span>
            </a>

            <a
              href={`mailto:${contactInfo.email}?subject=SY Metaphysics Consultation&body=${encodeURIComponent(
                contactInfo.shortMessage,
              )}`}
              className="block rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm transition hover:bg-white/10"
            >
              <span className="block font-medium text-white">Email / 邮箱</span>
              <span className="block break-all text-xs text-stone-500">
                {contactInfo.email}
              </span>
            </a>
          </div>

          <div className="mt-5 rounded-xl border border-emerald-200/20 bg-emerald-200/10 p-4">
            <p className="text-sm leading-7 text-emerald-100">
              {contactInfo.responseTime}
            </p>
            <p className="mt-1 text-xs leading-6 text-stone-500">
              Please include your service type, question, time zone, and basic
              background. / 请说明咨询类型、问题、时区和基本背景。
            </p>
          </div>

          <Link
            href="/contact"
            className="mt-4 inline-flex w-full justify-center rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
          >
            Open Contact Page / 打开联系页面
          </Link>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-full bg-amber-300 px-5 py-4 text-sm font-semibold text-black shadow-2xl shadow-black/40 transition hover:bg-amber-200"
      >
        Contact / 加联系方式
      </button>
    </div>
  );
}
