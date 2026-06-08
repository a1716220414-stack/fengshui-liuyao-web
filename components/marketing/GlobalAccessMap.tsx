"use client";

import { useEffect, useMemo, useState } from "react";

type Region = {
  id: string;
  city: string;
  label: string;
  zhLabel: string;
  x: number;
  y: number;
  timezone: string;
  note: string;
  zhNote: string;
  services: string[];
};

const regions: Region[] = [
  {
    id: "los-angeles",
    city: "Los Angeles",
    label: "North America",
    zhLabel: "北美",
    x: 190,
    y: 210,
    timezone: "America/Los_Angeles",
    note: "English-first inquiries, floor plan review, and PayPal checkout.",
    zhNote: "适合英文咨询、户型图初判和 PayPal 支付用户。",
    services: ["Feng Shui", "Liu Yao", "PayPal"],
  },
  {
    id: "new-york",
    city: "New York",
    label: "US East",
    zhLabel: "美国东部",
    x: 295,
    y: 205,
    timezone: "America/New_York",
    note: "Fast bilingual entry for users asking from US evening hours.",
    zhNote: "适合美国晚间访问的中英文双语咨询用户。",
    services: ["Feng Shui", "Liu Yao"],
  },
  {
    id: "london",
    city: "London",
    label: "Europe",
    zhLabel: "欧洲",
    x: 480,
    y: 180,
    timezone: "Europe/London",
    note: "European users can start with free reading before deeper review.",
    zhNote: "欧洲用户可先免费初判，再申请深度分析。",
    services: ["Free Check", "Consultation"],
  },
  {
    id: "dubai",
    city: "Dubai",
    label: "Middle East",
    zhLabel: "中东",
    x: 575,
    y: 260,
    timezone: "Asia/Dubai",
    note: "Useful for home, office, relocation, and timing questions.",
    zhNote: "适合住宅、办公室、搬迁和时机类问题。",
    services: ["Home", "Office", "Timing"],
  },
  {
    id: "singapore",
    city: "Singapore",
    label: "Southeast Asia",
    zhLabel: "东南亚",
    x: 690,
    y: 330,
    timezone: "Asia/Singapore",
    note: "Chinese and English communication for overseas Asian users.",
    zhNote: "适合海外华人及东南亚中英文用户。",
    services: ["中文", "English", "Alipay"],
  },
  {
    id: "hong-kong",
    city: "Hong Kong",
    label: "East Asia",
    zhLabel: "东亚",
    x: 725,
    y: 275,
    timezone: "Asia/Hong_Kong",
    note: "Close to the site's operating timezone and Chinese service flow.",
    zhNote: "接近网站运营时区，适合中文服务流程。",
    services: ["Feng Shui", "Liu Yao", "Taoist"],
  },
  {
    id: "sydney",
    city: "Sydney",
    label: "Oceania",
    zhLabel: "大洋洲",
    x: 810,
    y: 405,
    timezone: "Australia/Sydney",
    note: "Supports overseas users who need asynchronous consultation.",
    zhNote: "适合需要异步沟通的澳洲及大洋洲用户。",
    services: ["Async", "Photos", "Reports"],
  },
  {
    id: "sao-paulo",
    city: "Sao Paulo",
    label: "South America",
    zhLabel: "南美",
    x: 360,
    y: 390,
    timezone: "America/Sao_Paulo",
    note: "Global access remains available even across large time differences.",
    zhNote: "跨大时差地区也可通过网站提交资料。",
    services: ["Global", "Email", "Reports"],
  },
];

const serviceHubs = [
  { label: "Free readings", value: "24/7", zh: "免费入口" },
  { label: "Languages", value: "EN / 中文", zh: "双语服务" },
  { label: "Payments", value: "PayPal / Alipay", zh: "海外支付" },
];

function formatTime(timezone: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: timezone,
  }).format(new Date());
}

function getVisitorRegion(timezone: string) {
  if (timezone.includes("America")) return "Americas / 美洲";
  if (timezone.includes("Europe")) return "Europe / 欧洲";
  if (timezone.includes("Africa")) return "Africa / 非洲";
  if (timezone.includes("Australia") || timezone.includes("Pacific")) {
    return "Oceania / 大洋洲";
  }
  if (timezone.includes("Asia")) return "Asia / 亚洲";
  return "Global / 全球";
}

export default function GlobalAccessMap() {
  const [selectedId, setSelectedId] = useState("hong-kong");
  const [viewerTimezone, setViewerTimezone] = useState("Asia/Hong_Kong");
  const [, setClockTick] = useState(0);

  useEffect(() => {
    const resolved = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (resolved) {
      setViewerTimezone(resolved);

      const matchingRegion = regions.find(
        (region) => region.timezone === resolved,
      );

      if (matchingRegion) {
        setSelectedId(matchingRegion.id);
      }
    }

    const interval = window.setInterval(() => {
      setClockTick((value) => value + 1);
    }, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  const selectedRegion = useMemo(
    () => regions.find((region) => region.id === selectedId) ?? regions[0],
    [selectedId],
  );

  const viewerTime = formatTime(viewerTimezone);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">
              Global Access / 全球访问
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">
              A living map for overseas consultation
            </h2>

            <p className="mt-5 text-base leading-8 text-stone-300">
              The site is built for users across time zones: free Feng Shui and
              Liu Yao entry points stay open at all hours, while deeper
              consultation can continue through email, Instagram, X, WeChat,
              PayPal, or Alipay.
            </p>

            <p className="mt-4 text-base leading-8 text-stone-500">
              这个动态地图用于展示全球访问与咨询覆盖：海外用户可以先免费体验，
              再根据所在时区、语言和支付方式继续深度风水、六爻或正一道服务。
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {serviceHubs.map((item) => (
                <div
                  key={item.label}
                  className="border border-white/10 bg-white/[0.04] p-4"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
                    {item.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-amber-100">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs text-stone-500">{item.zh}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 border border-emerald-300/20 bg-emerald-300/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">
                Your current access signal / 当前访问识别
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {getVisitorRegion(viewerTimezone)}
              </p>
              <p className="mt-1 text-sm text-stone-400">
                {viewerTimezone} · {viewerTime}
              </p>
            </div>
          </div>

          <div className="border border-amber-200/15 bg-[#0f0d09] p-4 shadow-2xl shadow-black/30">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-amber-200">
                  Live Coverage Map
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  Dynamic service points, route lines, and regional local time
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-2 border border-emerald-300/30 bg-emerald-300/10 px-3 py-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-200" />
                <span className="text-xs font-medium text-emerald-100">
                  Online / 可访问
                </span>
              </div>
            </div>

            <div className="relative mt-4 overflow-hidden border border-white/10 bg-[#080706]">
              <svg
                viewBox="0 0 1000 520"
                role="img"
                aria-label="Global access map for SY Metaphysics"
                className="h-auto w-full"
              >
                <defs>
                  <linearGradient id="mapLand" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3f3a2b" />
                    <stop offset="100%" stopColor="#18150f" />
                  </linearGradient>
                  <linearGradient id="routeGlow" x1="0" x2="1">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.15" />
                    <stop offset="50%" stopColor="#34d399" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.15" />
                  </linearGradient>
                </defs>

                <rect width="1000" height="520" fill="#070604" />
                {Array.from({ length: 11 }).map((_, index) => (
                  <line
                    key={`v-${index}`}
                    x1={index * 100}
                    x2={index * 100}
                    y1="0"
                    y2="520"
                    stroke="#ffffff"
                    strokeOpacity="0.05"
                  />
                ))}
                {Array.from({ length: 7 }).map((_, index) => (
                  <line
                    key={`h-${index}`}
                    x1="0"
                    x2="1000"
                    y1={index * 86}
                    y2={index * 86}
                    stroke="#ffffff"
                    strokeOpacity="0.05"
                  />
                ))}

                <path
                  d="M120 150 L230 115 L330 150 L360 220 L295 265 L210 250 L130 215 Z"
                  fill="url(#mapLand)"
                  stroke="#fcd34d"
                  strokeOpacity="0.14"
                />
                <path
                  d="M310 300 L395 325 L430 420 L370 480 L310 430 L275 350 Z"
                  fill="url(#mapLand)"
                  stroke="#fcd34d"
                  strokeOpacity="0.14"
                />
                <path
                  d="M455 140 L560 120 L635 165 L610 225 L505 220 L435 185 Z"
                  fill="url(#mapLand)"
                  stroke="#fcd34d"
                  strokeOpacity="0.14"
                />
                <path
                  d="M530 230 L625 230 L680 310 L645 405 L555 390 L515 310 Z"
                  fill="url(#mapLand)"
                  stroke="#fcd34d"
                  strokeOpacity="0.14"
                />
                <path
                  d="M620 145 L790 125 L895 195 L835 305 L700 310 L610 235 Z"
                  fill="url(#mapLand)"
                  stroke="#fcd34d"
                  strokeOpacity="0.14"
                />
                <path
                  d="M760 350 L850 370 L890 440 L825 470 L735 425 Z"
                  fill="url(#mapLand)"
                  stroke="#fcd34d"
                  strokeOpacity="0.14"
                />

                {regions
                  .filter((region) => region.id !== "hong-kong")
                  .map((region, index) => (
                    <path
                      key={`route-${region.id}`}
                      d={`M725 275 Q ${(725 + region.x) / 2} ${
                        Math.min(region.y, 275) - 90 - index * 2
                      } ${region.x} ${region.y}`}
                      fill="none"
                      stroke="url(#routeGlow)"
                      strokeDasharray="8 10"
                      strokeWidth="2"
                      className="global-map-route"
                    />
                  ))}

                {regions.map((region, index) => {
                  const selected = region.id === selectedRegion.id;
                  return (
                    <g key={region.id}>
                      <circle
                        cx={region.x}
                        cy={region.y}
                        r={selected ? 24 : 17}
                        fill={selected ? "#fbbf24" : "#34d399"}
                        opacity="0.1"
                        className="global-map-pulse"
                        style={{ animationDelay: `${index * 0.18}s` }}
                      />
                      <circle
                        cx={region.x}
                        cy={region.y}
                        r={selected ? 8 : 6}
                        fill={selected ? "#fbbf24" : "#34d399"}
                        stroke="#fff7ed"
                        strokeOpacity="0.7"
                        strokeWidth="1.5"
                      />
                      <text
                        x={region.x + 12}
                        y={region.y - 10}
                        fill={selected ? "#fde68a" : "#d1d5db"}
                        fontSize="18"
                        fontWeight={selected ? 700 : 500}
                      >
                        {region.city}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-3 left-3 right-3 grid gap-2 md:grid-cols-3">
                {regions.slice(0, 3).map((region) => (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() => setSelectedId(region.id)}
                    className="border border-white/10 bg-black/60 px-3 py-2 text-left text-xs text-stone-300 backdrop-blur transition hover:border-amber-200/40 hover:text-amber-100"
                  >
                    {region.label} · {formatTime(region.timezone)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="border border-amber-200/15 bg-amber-200/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-amber-200">
                  Selected Region
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  {selectedRegion.city}
                </h3>
                <p className="mt-1 text-sm text-amber-100">
                  {selectedRegion.label} / {selectedRegion.zhLabel}
                </p>
                <p className="mt-3 text-sm leading-6 text-stone-300">
                  {selectedRegion.note}
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-500">
                  {selectedRegion.zhNote}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {regions.slice(3).map((region) => (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() => setSelectedId(region.id)}
                    className={`border p-3 text-left transition ${
                      selectedRegion.id === region.id
                        ? "border-amber-200/50 bg-amber-200/10"
                        : "border-white/10 bg-white/[0.03] hover:border-emerald-200/30"
                    }`}
                  >
                    <p className="text-sm font-semibold text-white">
                      {region.city}
                    </p>
                    <p className="mt-1 text-xs text-stone-500">
                      {region.label} · {formatTime(region.timezone)}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {region.services.map((service) => (
                        <span
                          key={service}
                          className="border border-emerald-300/20 px-2 py-1 text-[10px] text-emerald-100"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
