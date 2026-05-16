"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import LiuYaoBasicReadingCard from "@/components/reports/LiuYaoBasicReadingCard";
import AIReadingCard from "@/components/reports/AIReadingCard";
import { generateLiuYaoBasicReading } from "@/lib/liuyao-reading";
import {
  CoinSide,
  LiuYaoLine,
  buildHexagramResult,
  castLine,
  getCoinLabel,
  getLinePositionName,
} from "@/lib/liuyao";


const questionTypes = [
  { value: "career", label: "Career / 事业工作" },
  { value: "relationship", label: "Relationship / 感情关系" },
  { value: "wealth", label: "Wealth / 财务资源" },
  { value: "health", label: "Health / 健康状态" },
  { value: "decision", label: "Decision / 选择决策" },
  { value: "custom", label: "Custom / 其他问题" },
];

const genderOptions = [
  { value: "not_specified", label: "Prefer not to say / 不透露" },
  { value: "male", label: "Male / 男" },
  { value: "female", label: "Female / 女" },
  { value: "other", label: "Other / 其他" },
];

const divinationModes = [
  { value: "coin", label: "Coin Casting / 铜钱摇卦" },
  { value: "manual_hexagram", label: "Manual Hexagram / 手动选卦" },
];

const castingMethods = [
  { value: "manual", label: "Manual Shake / 手动摇卦" },
  { value: "auto", label: "Auto Simulation / 自动模拟" },
];

const timeModes = [
  { value: "auto", label: "Use Current Time / 使用当前时间" },
  { value: "manual", label: "Manual Time / 手动调整时间" },
];

const manualLineOptions = [
  {
    value: 6,
    label: "6 · Old Yin / 老阴 · 阴爻动",
    shortLabel: "老阴",
  },
  {
    value: 7,
    label: "7 · Young Yang / 少阳 · 阳爻静",
    shortLabel: "少阳",
  },
  {
    value: 8,
    label: "8 · Young Yin / 少阴 · 阴爻静",
    shortLabel: "少阴",
  },
  {
    value: 9,
    label: "9 · Old Yang / 老阳 · 阳爻动",
    shortLabel: "老阳",
  },
];

type CastingPhase =
  | "idle"
  | "ready"
  | "shaking"
  | "poured"
  | "recording"
  | "completed";

type DivinationMode = "coin" | "manual_hexagram";
type CastingMethod = "manual" | "auto";
type TimeMode = "auto" | "manual";

type CoinVisual = {
  id: number;
  side: CoinSide;
  x: number;
  y: number;
  rotate: number;
};

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildCoinVisuals(coins: CoinSide[]): CoinVisual[] {
  const positions = [
    { x: -76, y: 38, rotate: -18 },
    { x: 0, y: 68, rotate: 12 },
    { x: 78, y: 40, rotate: 28 },
  ];

  return coins.map((side, index) => ({
    id: index + 1,
    side,
    ...positions[index],
  }));
}

function formatLocalDateTimeInput(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function getGenderLabel(value: string) {
  return (
    genderOptions.find((item) => item.value === value)?.label ??
    "Prefer not to say / 不透露"
  );
}

function getManualLineLabel(sum: number) {
  return (
    manualLineOptions.find((item) => item.value === sum)?.shortLabel ??
    "未知"
  );
}

function getPhaseText(phase: CastingPhase, currentStep: number) {
  if (phase === "idle") {
    return "Enter your question and choose a casting method. / 输入问题并选择起卦方式。";
  }

  if (phase === "ready") {
    return `Line ${currentStep}: ready to cast. / 第 ${currentStep} 爻：准备起爻。`;
  }

  if (phase === "shaking") {
    return `Line ${currentStep}: shaking the shell. / 第 ${currentStep} 爻：正在摇动龟壳。`;
  }

  if (phase === "poured") {
    return `Line ${currentStep}: coins are revealed. / 第 ${currentStep} 爻：铜钱已落定。`;
  }

  if (phase === "recording") {
    return `Recording line ${currentStep}... / 正在记录第 ${currentStep} 爻。`;
  }

  return "Casting completed. / 六爻起卦完成。";
}

function buildManualLine(position: number, sum: number): LiuYaoLine {
  if (sum === 6) {
    return {
      position,
      coins: ["tails", "tails", "tails"],
      sum,
      yinYang: "yin",
      changing: true,
      lineName: "Old Yin",
      lineNameZh: "老阴",
      symbol: "⚋",
    };
  }

  if (sum === 7) {
    return {
      position,
      coins: ["heads", "tails", "tails"],
      sum,
      yinYang: "yang",
      changing: false,
      lineName: "Young Yang",
      lineNameZh: "少阳",
      symbol: "⚊",
    };
  }

  if (sum === 8) {
    return {
      position,
      coins: ["heads", "heads", "tails"],
      sum,
      yinYang: "yin",
      changing: false,
      lineName: "Young Yin",
      lineNameZh: "少阴",
      symbol: "⚋",
    };
  }

  return {
    position,
    coins: ["heads", "heads", "heads"],
    sum: 9,
    yinYang: "yang",
    changing: true,
    lineName: "Old Yang",
    lineNameZh: "老阳",
    symbol: "⚊",
  };
}

export default function LiuYaoCaster() {
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("career");
  const [seekerGender, setSeekerGender] = useState("not_specified");

  const [aiReading, setAiReading] = useState("");
  const [aiError, setAiError] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const [timeMode, setTimeMode] = useState<TimeMode>("auto");
  const [castTimeLocal, setCastTimeLocal] = useState("");
  const [timezone, setTimezone] = useState("");

  const [divinationMode, setDivinationMode] =
    useState<DivinationMode>("coin");
  const [castingMethod, setCastingMethod] = useState<CastingMethod>("manual");

  const [manualLineSums, setManualLineSums] = useState<number[]>([
    7, 8, 7, 8, 7, 8,
  ]);

  const [lines, setLines] = useState<LiuYaoLine[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [castingPhase, setCastingPhase] = useState<CastingPhase>("idle");
  const [currentCoins, setCurrentCoins] = useState<CoinVisual[]>([]);
  const [previewLine, setPreviewLine] = useState<LiuYaoLine | null>(null);
  const [shakePower, setShakePower] = useState(0);
  const [notice, setNotice] = useState("");

  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadWechat, setLeadWechat] = useState("");
  const [leadXAccount, setLeadXAccount] = useState("");
  const [leadInstagram, setLeadInstagram] = useState("");
  const [leadPreferredContact, setLeadPreferredContact] = useState("email");
  const [leadPaidInterest, setLeadPaidInterest] = useState("Interested");
  const [leadNotes, setLeadNotes] = useState("");
  const [leadError, setLeadError] = useState("");
  const [leadSuccess, setLeadSuccess] = useState("");
  const [isSavingLead, setIsSavingLead] = useState(false);

  const shakeIntervalRef = useRef<number | null>(null);
  const shakeStartTimeRef = useRef<number>(0);

  const result = useMemo(() => buildHexagramResult(lines), [lines]);
  const basicReading = useMemo(() => {
    if (!result) {
      return null;
    }

    return generateLiuYaoBasicReading({
      question,
      questionType,
      seekerGender,
      castTimeLocal,
      timezone,
      primaryHexagram: {
        number: result.primary.number,
        name: result.primary.name,
        nameZh: result.primary.nameZh,
      },
      changedHexagram: {
        number: result.changed.number,
        name: result.changed.name,
        nameZh: result.changed.nameZh,
      },
      hasChangingLines: result.hasChangingLines,
      changingPositions: result.changingPositions,
      lines,
    });
  }, [
    result,
    question,
    questionType,
    seekerGender,
    castTimeLocal,
    timezone,
    lines,
  ]);

  useEffect(() => {
    setCastTimeLocal((prev) => prev || formatLocalDateTimeInput());

    try {
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone || "");
    } catch {
      setTimezone("");
    }

    return () => {
      clearShakeInterval();
    };
  }, []);

  function clearShakeInterval() {
    if (shakeIntervalRef.current !== null) {
      window.clearInterval(shakeIntervalRef.current);
      shakeIntervalRef.current = null;
    }
  }

  function vibrate(pattern: number | number[]) {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  }

  function clearCastingResult() {
    clearShakeInterval();
    setLines([]);
    setCurrentStep(0);
    setCastingPhase("idle");
    setCurrentCoins([]);
    setPreviewLine(null);
    setShakePower(0);
    setNotice("");
    setAiReading("");
    setAiError("");
    setLeadError("");
    setLeadSuccess("");
  }

  function getEffectiveCastTime() {
    if (timeMode === "auto") {
      const now = formatLocalDateTimeInput();
      setCastTimeLocal(now);
      return now;
    }

    const manualTime = castTimeLocal || formatLocalDateTimeInput();
    setCastTimeLocal(manualTime);
    return manualTime;
  }

  function handleTimeModeChange(value: string) {
    const nextMode = value as TimeMode;
    setTimeMode(nextMode);

    if (nextMode === "auto") {
      setCastTimeLocal(formatLocalDateTimeInput());
    } else {
      setCastTimeLocal((prev) => prev || formatLocalDateTimeInput());
    }
  }

  function handleDivinationModeChange(value: string) {
    clearCastingResult();
    setDivinationMode(value as DivinationMode);
  }

  function handleCastingMethodChange(value: string) {
    clearCastingResult();
    setCastingMethod(value as CastingMethod);
  }

  function handleManualLineChange(position: number, value: string) {
    const nextSum = Number(value);

    setManualLineSums((prev) =>
      prev.map((sum, index) => (index === position - 1 ? nextSum : sum)),
    );
  }

  async function handleStartRitual() {
    if (!question.trim()) {
      setNotice("Please enter a focused question first. / 请先输入一个具体问题。");
      return;
    }

    getEffectiveCastTime();
    clearShakeInterval();

    setLines([]);
    setCurrentStep(1);
    setCastingPhase("ready");
    setCurrentCoins([]);
    setPreviewLine(null);
    setShakePower(0);
    setAiReading("");
    setAiError("");
    setLeadError("");
    setLeadSuccess("");

    if (castingMethod === "auto") {
      await runAutoCasting();
      return;
    }

    setNotice(
      "Manual casting started. Complete each line manually. / 手动起卦开始，请逐爻完成。",
    );
    vibrate(80);
  }

  async function runAutoCasting() {
    setNotice("Auto simulation started. / 自动模拟起卦开始。");
    vibrate(80);

    for (let position = 1; position <= 6; position += 1) {
      setCurrentStep(position);
      setPreviewLine(null);
      setCurrentCoins([]);
      setShakePower(0);

      setCastingPhase("ready");
      await wait(300);

      setCastingPhase("shaking");

      for (let power = 0; power <= 100; power += 20) {
        setShakePower(power);
        await wait(120);
      }

      const nextLine = castLine(position);
      const coinVisuals = buildCoinVisuals(nextLine.coins);

      setPreviewLine(nextLine);
      setCurrentCoins(coinVisuals);
      setCastingPhase("poured");
      await wait(700);

      setCastingPhase("recording");
      await wait(350);

      setLines((prev) => [...prev, nextLine]);
      await wait(250);
    }

    setCurrentStep(0);
    setCastingPhase("completed");
    setPreviewLine(null);
    setCurrentCoins([]);
    setShakePower(0);
    setNotice("Auto casting completed. / 自动起卦完成。");
    vibrate([120, 60, 120]);
  }

  function handleApplyManualHexagram() {
    if (!question.trim()) {
      setNotice("Please enter a focused question first. / 请先输入一个具体问题。");
      return;
    }

    getEffectiveCastTime();
    clearShakeInterval();

    const manualLines = manualLineSums.map((sum, index) =>
      buildManualLine(index + 1, sum),
    );

    setLines(manualLines);
    setCurrentStep(0);
    setCastingPhase("completed");
    setCurrentCoins([]);
    setPreviewLine(null);
    setShakePower(0);
    setAiReading("");
    setAiError("");
    setLeadError("");
    setLeadSuccess("");
    setNotice("Manual hexagram has been applied. / 手动卦象已生成。");
    vibrate([100, 50, 100]);
  }

  function handleShakeStart() {
    if (castingPhase !== "ready" || castingMethod !== "manual") {
      return;
    }

    setNotice("");
    setShakePower(0);
    setCurrentCoins([]);
    setPreviewLine(null);
    setCastingPhase("shaking");
    shakeStartTimeRef.current = Date.now();

    clearShakeInterval();

    shakeIntervalRef.current = window.setInterval(() => {
      setShakePower((prev) => Math.min(prev + 6, 100));
    }, 80);

    vibrate([40, 40, 40]);
  }

  function handleShakeEnd() {
    if (castingPhase !== "shaking" || castingMethod !== "manual") {
      return;
    }

    clearShakeInterval();

    const elapsed = Date.now() - shakeStartTimeRef.current;

    if (elapsed < 800 || shakePower < 35) {
      setCastingPhase("ready");
      setShakePower(0);
      setNotice(
        "Shake a little longer before releasing. / 请按住稍微多摇一会儿再松开。",
      );
      return;
    }

    const nextLine = castLine(currentStep);
    const coinVisuals = buildCoinVisuals(nextLine.coins);

    setPreviewLine(nextLine);
    setCurrentCoins(coinVisuals);
    setCastingPhase("poured");
    setNotice("Coins revealed. Confirm this line. / 铜钱已落定，请确认此爻。");
    vibrate([80, 40, 80]);
  }

  function handleShakeCancel() {
    if (castingPhase !== "shaking" || castingMethod !== "manual") {
      return;
    }

    clearShakeInterval();
    setCastingPhase("ready");
    setShakePower(0);
    setNotice("Shake cancelled. Try again. / 本次摇动取消，请重新摇此爻。");
  }

  async function handleRecordLine() {
    if (!previewLine || castingPhase !== "poured") {
      return;
    }

    setCastingPhase("recording");
    setNotice("");
    await wait(350);

    setLines((prev) => [...prev, previewLine]);

    if (currentStep >= 6) {
      setCurrentStep(0);
      setCastingPhase("completed");
      setPreviewLine(null);
      setCurrentCoins([]);
      setShakePower(0);
      setNotice("Hexagram completed. / 六爻已成卦。");
      vibrate([120, 60, 120]);
      return;
    }

    setCurrentStep((prev) => prev + 1);
    setCastingPhase("ready");
    setPreviewLine(null);
    setCurrentCoins([]);
    setShakePower(0);
    setNotice(
      `Line ${currentStep} recorded. Continue to the next line. / 第 ${currentStep} 爻已记录，请继续下一爻。`,
    );
  }

  function handleReset() {
    clearCastingResult();

    if (timeMode === "auto") {
      setCastTimeLocal(formatLocalDateTimeInput());
    }
  }

  async function handlePayAndUnlockAIReading() {
    if (!result) {
      setAiError("Please cast a hexagram first. / 请先完成起卦。");
      return;
    }

    setAiError("");
    setAiReading("");
    setIsGeneratingAI(true);

    try {
      const aiRequestBody = {
        serviceType: "liuyao",
        question,
        questionType,
        seekerGender,
        castTimeLocal,
        timezone,
        primaryHexagram: {
          number: result.primary.number,
          name: result.primary.name,
          nameZh: result.primary.nameZh,
        },
        changedHexagram: {
          number: result.changed.number,
          name: result.changed.name,
          nameZh: result.changed.nameZh,
        },
        hasChangingLines: result.hasChangingLines,
        changingPositions: result.changingPositions,
        lines,
        freeReading: basicReading,
      };

      const response = await fetch("/api/alipay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceType: "liuyao",
          customer: {
            name: leadName,
            email: leadEmail,
            wechat: leadWechat,
            xAccount: leadXAccount,
            instagram: leadInstagram,
          },
          requestPayload: aiRequestBody,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Failed to create payment order.");
      }

      window.localStorage.setItem(
        `sy-ai-reading-payload:${data.providerOrderId}`,
        JSON.stringify({
          serviceType: "liuyao",
          aiRequestBody,
        }),
      );

      window.localStorage.setItem(
        "sy-ai-last-provider-order-id",
        data.providerOrderId,
      );

      window.location.href = data.payUrl;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to create payment order.";

      setAiError(message);
      setIsGeneratingAI(false);
    }
  }

  async function handleSaveLiuYaoLead() {
    if (!result) {
      setLeadError("Please complete the hexagram casting first. / 请先完成起卦。");
      return;
    }

    const hasAnyContact =
      leadEmail.trim() ||
      leadWechat.trim() ||
      leadXAccount.trim() ||
      leadInstagram.trim();

    if (!hasAnyContact) {
      setLeadError(
        "Please provide at least one contact method. / 请至少填写一种联系方式。",
      );
      return;
    }

    if (leadEmail.trim() && !leadEmail.includes("@")) {
      setLeadError("Please enter a valid email address. / 请填写有效邮箱。");
      return;
    }

    try {
      setIsSavingLead(true);
      setLeadError("");
      setLeadSuccess("");

      const response = await fetch("/api/liuyao-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          wechat: leadWechat,
          xAccount: leadXAccount,
          instagram: leadInstagram,
          preferredContactMethod: leadPreferredContact,

          seekerGender,
          question,
          questionType,
          castTimeLocal,
          timezone,

          primaryHexagram: `${result.primary.number} ${result.primary.nameZh}`,
          changedHexagram: result.hasChangingLines
            ? `${result.changed.number} ${result.changed.nameZh}`
            : "No changing hexagram / 无变卦",
          changingLines: result.hasChangingLines
            ? result.changingPositions
                .map((position) => getLinePositionName(position))
                .join("、")
            : "No changing lines / 无动爻",

          lineResults: lines.map((line) => ({
            position: line.position,
            positionName: getLinePositionName(line.position),
            coins: line.coins,
            sum: line.sum,
            yinYang: line.yinYang,
            changing: line.changing,
            lineName: line.lineName,
            lineNameZh: line.lineNameZh,
          })),

          paidReadingInterest: leadPaidInterest,
          notes: leadNotes,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Failed to submit request.");
      }

      setLeadSuccess(
        "Your consultation request has been received. We will follow up through your preferred contact method. / 你的咨询需求已提交，我们会根据你选择的联系方式跟进。",
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to submit request. / 提交失败。";

      setLeadError(message);
    } finally {
      setIsSavingLead(false);
    }
  }

  const isCastingLocked =
    castingPhase !== "idle" && castingPhase !== "completed";
  const canShake =
    divinationMode === "coin" &&
    castingMethod === "manual" &&
    castingPhase === "ready";
  const canRecord = castingPhase === "poured" && previewLine;

  return (
    <section className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
          Casting / 起卦
        </p>

        <h2 className="mt-3 text-2xl font-semibold text-white">
          Ask a question and cast six lines
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          支持铜钱摇卦、自动模拟、手动摇卦，也支持直接手动选择六爻卦象。起卦时间可使用当前时间，也可手动调整。
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block">
              <span className="block text-sm font-medium text-zinc-100">
                Question
              </span>
              <span className="block text-xs text-zinc-500">
                所问之事，建议一卦一问
              </span>
            </label>

            <textarea
              value={question}
              disabled={isCastingLocked}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Example: Should I accept this job opportunity?"
              rows={4}
              className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-300/60 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block">
                <span className="block text-sm font-medium text-zinc-100">
                  Question Type
                </span>
                <span className="block text-xs text-zinc-500">问题类型</span>
              </label>

              <select
                value={questionType}
                disabled={isCastingLocked}
                onChange={(event) => setQuestionType(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {questionTypes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block">
                <span className="block text-sm font-medium text-zinc-100">
                  Gender
                </span>
                <span className="block text-xs text-zinc-500">
                  问事人性别，可选择不透露
                </span>
              </label>

              <select
                value={seekerGender}
                disabled={isCastingLocked}
                onChange={(event) => setSeekerGender(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {genderOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block">
                <span className="block text-sm font-medium text-zinc-100">
                  Time Setting
                </span>
                <span className="block text-xs text-zinc-500">
                  起卦时间设置
                </span>
              </label>

              <select
                value={timeMode}
                disabled={isCastingLocked}
                onChange={(event) => handleTimeModeChange(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {timeModes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block">
                <span className="block text-sm font-medium text-zinc-100">
                  Casting Time
                </span>
                <span className="block text-xs text-zinc-500">
                  自动当前时间，或切换为手动调整
                </span>
              </label>

              <input
                type="datetime-local"
                value={castTimeLocal}
                disabled={isCastingLocked || timeMode === "auto"}
                onChange={(event) => setCastTimeLocal(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                {timezone ? <span>Time zone / 时区：{timezone}</span> : null}

                <button
                  type="button"
                  disabled={isCastingLocked}
                  onClick={() => setCastTimeLocal(formatLocalDateTimeInput())}
                  className="text-amber-200 transition hover:text-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Refresh now / 刷新当前时间
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block">
                <span className="block text-sm font-medium text-zinc-100">
                  Divination Mode
                </span>
                <span className="block text-xs text-zinc-500">
                  起卦方式
                </span>
              </label>

              <select
                value={divinationMode}
                disabled={isCastingLocked}
                onChange={(event) =>
                  handleDivinationModeChange(event.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {divinationModes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {divinationMode === "coin" ? (
              <div>
                <label className="mb-2 block">
                  <span className="block text-sm font-medium text-zinc-100">
                    Casting Method
                  </span>
                  <span className="block text-xs text-zinc-500">
                    铜钱摇卦模式
                  </span>
                </label>

                <select
                  value={castingMethod}
                  disabled={isCastingLocked}
                  onChange={(event) =>
                    handleCastingMethodChange(event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {castingMethods.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="rounded-xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
                手动选卦适合用户已经线下起卦，或希望直接录入已有卦象。
              </div>
            )}
          </div>

          {divinationMode === "manual_hexagram" ? (
            <ManualHexagramSelector
              manualLineSums={manualLineSums}
              disabled={isCastingLocked}
              onChangeLine={handleManualLineChange}
            />
          ) : null}

          <div className="grid gap-3 md:grid-cols-2">
            {divinationMode === "coin" ? (
              <button
                type="button"
                onClick={handleStartRitual}
                disabled={isCastingLocked}
                className="rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {castingMethod === "auto"
                  ? "Start Auto Simulation / 开始自动模拟"
                  : "Start Manual Casting / 开始手动摇卦"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleApplyManualHexagram}
                disabled={isCastingLocked}
                className="rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Apply Manual Hexagram / 生成手动卦象
              </button>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Reset / 重置
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <h3 className="font-semibold text-white">
              Mode Explanation / 模式说明
            </h3>

            <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-400">
              <p>
                Manual Shake: press and hold for each line, then release and
                record.
              </p>
              <p>
                Auto Simulation: the system automatically simulates the six-line
                coin casting process.
              </p>
              <p>
                Manual Hexagram: directly select six lines from bottom to top.
              </p>
            </div>

            <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-500">
              <p>手动摇卦：每一爻按住摇动，松开倒出，确认记录。</p>
              <p>自动模拟：系统自动完成六次铜钱摇卦动画。</p>
              <p>手动选卦：直接从初爻到上爻选择六爻类型。</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
          Hexagram / 卦象
        </p>

        <h2 className="mt-3 text-2xl font-semibold text-white">
          Casting Result
        </h2>

        <CastingStage
          phase={castingPhase}
          currentStep={currentStep}
          coins={currentCoins}
          previewLine={previewLine}
          completedCount={lines.length}
          shakePower={shakePower}
          notice={notice}
          canShake={canShake}
          canRecord={Boolean(canRecord)}
          divinationMode={divinationMode}
          castingMethod={castingMethod}
          onShakeStart={handleShakeStart}
          onShakeEnd={handleShakeEnd}
          onShakeCancel={handleShakeCancel}
          onRecordLine={handleRecordLine}
        />

        <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white">
                Six Lines / 六爻成卦
              </h3>
              <p className="mt-1 text-xs text-zinc-500">
                Lines are displayed from top to bottom, but generated from
                bottom to top.
              </p>
            </div>

            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-500">
              {lines.length}/6
            </span>
          </div>

          <div className="mx-auto flex max-w-md flex-col-reverse gap-3">
            {[1, 2, 3, 4, 5, 6].map((position) => {
              const line = lines.find((item) => item.position === position);

              return (
                <HexagramLine
                  key={position}
                  position={position}
                  line={line}
                  isActive={currentStep === position && castingPhase !== "idle"}
                />
              );
            })}
          </div>

          <div className="mt-6 space-y-3">
            {lines.map((line) => (
              <LineDetail key={line.position} line={line} />
            ))}
          </div>
        </div>

        {result ? (
          <div className="mt-6 space-y-5">
            <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
              <h3 className="text-xl font-semibold text-amber-100">
                本卦：第 {result.primary.number} 卦 ·{" "}
                {result.primary.nameZh}
              </h3>

              <p className="mt-2 text-sm text-zinc-300">
                {result.primary.name} · {result.primary.upper.nameZh}
                上{result.primary.lower.nameZh}下
              </p>

              <p className="mt-3 text-sm leading-7 text-zinc-500">
                上卦：{result.primary.upper.symbol}{" "}
                {result.primary.upper.image}；下卦：
                {result.primary.lower.symbol} {result.primary.lower.image}
              </p>

              <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-zinc-400">
                <p>
                  Divination Mode / 起卦方式：
                  {divinationMode === "coin"
                    ? castingMethod === "auto"
                      ? "Coin Casting - Auto Simulation / 铜钱自动模拟"
                      : "Coin Casting - Manual Shake / 铜钱手动摇卦"
                    : "Manual Hexagram / 手动选卦"}
                </p>
                <p>Gender / 性别：{getGenderLabel(seekerGender)}</p>
                <p>
                  Casting Time / 起卦时间：
                  {castTimeLocal || "Not recorded / 未记录"}
                </p>
                {timezone ? <p>Time Zone / 时区：{timezone}</p> : null}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              {result.hasChangingLines ? (
                <>
                  <h3 className="text-xl font-semibold text-white">
                    变卦：第 {result.changed.number} 卦 ·{" "}
                    {result.changed.nameZh}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-300">
                    {result.changed.name} · {result.changed.upper.nameZh}
                    上{result.changed.lower.nameZh}下
                  </p>

                  <p className="mt-3 text-sm leading-7 text-zinc-500">
                    动爻：
                    {result.changingPositions
                      .map((position) => getLinePositionName(position))
                      .join("、")}
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-white">
                    No changing lines / 无动爻
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-500">
                    此卦无动爻，暂以本卦作为主要参考。后续深度解卦可以结合所问之事、起卦时间、用神和世应进一步判断。
                  </p>
                </>
              )}
            </div>

            {basicReading ? (
              <LiuYaoBasicReadingCard reading={basicReading} />
            ) : null}

            <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-emerald-200">
                AI Interpretation / AI 解读
              </p>

              <h3 className="mt-4 text-xl font-semibold text-white">
                Pay to unlock a preliminary Liu Yao AI reading
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                After Alipay payment is completed, the system will verify the
                paid order and generate a preliminary AI interpretation of the
                primary hexagram, changed hexagram, changing lines, and the
                tendency of the question.
              </p>

              <p className="mt-3 text-sm leading-7 text-zinc-500">
                支付宝支付成功后，系统会验证订单状态并自动生成六爻 AI 初步解读。该结果仍属于初步层级，不会替代人工细断。
              </p>

              <button
                type="button"
                onClick={handlePayAndUnlockAIReading}
                disabled={isGeneratingAI}
                className="mt-5 rounded-full bg-emerald-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isGeneratingAI
                  ? "Creating Payment Order... / 正在创建支付订单..."
                  : "Pay and Unlock Liu Yao AI Reading / 支付解锁六爻 AI 解读"}
              </button>
            </div>

            {aiError ? (
              <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {aiError}
              </div>
            ) : null}

            {aiReading ? (
              <AIReadingCard
                title="Liu Yao AI Preliminary Interpretation"
                zhTitle="六爻 AI 初步解读"
                reading={aiReading}
              />
            ) : null}

            <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
              <h3 className="text-xl font-semibold text-amber-100">
                Request Deeper Liu Yao Reading / 申请深度六爻解卦
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-300">
                Submit your contact information and background notes. We can
                follow up with deeper analysis of useful god, self/responding
                line, changing lines, and practical advice.
              </p>

              <p className="mt-3 text-sm leading-7 text-zinc-500">
                如果需要更深入的六爻判断，可以提交联系方式和事情背景。后续可进一步分析用神、世应、动爻、变卦以及具体建议。
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <input
                  value={leadName}
                  onChange={(event) => setLeadName(event.target.value)}
                  placeholder="Name / 称呼"
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-amber-300/60"
                />

                <select
                  value={leadPreferredContact}
                  onChange={(event) =>
                    setLeadPreferredContact(event.target.value)
                  }
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/60"
                >
                  <option value="email">Email / 邮箱</option>
                  <option value="wechat">WeChat / 微信</option>
                  <option value="x">X / Twitter</option>
                  <option value="instagram">Instagram</option>
                </select>

                <input
                  value={leadEmail}
                  onChange={(event) => setLeadEmail(event.target.value)}
                  placeholder="Email"
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-amber-300/60"
                />

                <input
                  value={leadWechat}
                  onChange={(event) => setLeadWechat(event.target.value)}
                  placeholder="WeChat"
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-amber-300/60"
                />

                <input
                  value={leadXAccount}
                  onChange={(event) => setLeadXAccount(event.target.value)}
                  placeholder="X / Twitter"
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-amber-300/60"
                />

                <input
                  value={leadInstagram}
                  onChange={(event) => setLeadInstagram(event.target.value)}
                  placeholder="Instagram"
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-amber-300/60"
                />
              </div>

              <select
                value={leadPaidInterest}
                onChange={(event) => setLeadPaidInterest(event.target.value)}
                className="mt-4 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/60"
              >
                <option value="Interested">
                  Interested in paid deeper reading / 有付费深度解卦意向
                </option>
                <option value="Maybe later">Maybe later / 以后再考虑</option>
                <option value="Free only">
                  Free result only / 只看免费结果
                </option>
              </select>

              <textarea
                value={leadNotes}
                onChange={(event) => setLeadNotes(event.target.value)}
                placeholder="Background notes / 事情背景补充，例如时间、目前状态、你最关心的判断点"
                rows={4}
                className="mt-4 w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-amber-300/60"
              />

              {leadError ? (
                <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {leadError}
                </div>
              ) : null}

              {leadSuccess ? (
                <div className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  {leadSuccess}
                </div>
              ) : null}

              <button
                type="button"
                onClick={handleSaveLiuYaoLead}
                disabled={isSavingLead}
                className="mt-5 inline-flex rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSavingLead
                  ? "Submitting... / 正在提交..."
                  : "Submit Reading Request / 提交深度解卦需求"}
              </button>
            </div>

            <Link
              href="/contact"
              className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact Page / 联系页面
            </Link>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-6 text-center">
            <p className="text-sm leading-7 text-zinc-500">
              Complete six lines to generate the hexagram.
              <br />
              完成六爻后，这里会显示本卦、变卦、动爻和深度解卦申请入口。
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function ManualHexagramSelector({
  manualLineSums,
  disabled,
  onChangeLine,
}: {
  manualLineSums: number[];
  disabled: boolean;
  onChangeLine: (position: number, value: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <h3 className="font-semibold text-white">
        Manual Hexagram Selection / 手动选择六爻
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        请从下往上选择六爻：初爻、二爻、三爻、四爻、五爻、上爻。
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {[1, 2, 3, 4, 5, 6].map((position) => (
          <div
            key={position}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <label className="mb-2 block text-sm text-zinc-300">
              {getLinePositionName(position)} / Line {position}
            </label>

            <select
              value={manualLineSums[position - 1]}
              disabled={disabled}
              onChange={(event) => onChangeLine(position, event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/60 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {manualLineOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <p className="mt-2 text-xs text-amber-200">
              当前：{getManualLineLabel(manualLineSums[position - 1])}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CastingStage({
  phase,
  currentStep,
  coins,
  previewLine,
  completedCount,
  shakePower,
  notice,
  canShake,
  canRecord,
  divinationMode,
  castingMethod,
  onShakeStart,
  onShakeEnd,
  onShakeCancel,
  onRecordLine,
}: {
  phase: CastingPhase;
  currentStep: number;
  coins: CoinVisual[];
  previewLine: LiuYaoLine | null;
  completedCount: number;
  shakePower: number;
  notice: string;
  canShake: boolean;
  canRecord: boolean;
  divinationMode: DivinationMode;
  castingMethod: CastingMethod;
  onShakeStart: () => void;
  onShakeEnd: () => void;
  onShakeCancel: () => void;
  onRecordLine: () => void;
}) {
  const phaseText = getPhaseText(phase, currentStep);
  const shellIsShaking = phase === "shaking";
  const shellIsPoured = phase === "poured" || phase === "recording";

  return (
    <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.10),transparent_38%),rgba(255,255,255,0.04)] p-6">
      <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h3 className="font-semibold text-white">
            Casting Stage / 起卦过程
          </h3>
          <p className="mt-1 text-sm text-zinc-500">{phaseText}</p>
        </div>

        <div className="rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-400">
          Completed / 已成爻：{completedCount}/6
        </div>
      </div>

      <div className="relative mx-auto h-[360px] max-w-xl rounded-[1.5rem] border border-white/10 bg-black/30">
        <div className="absolute left-1/2 top-8 h-16 w-40 -translate-x-1/2 rounded-full border border-amber-200/20 bg-amber-300/10 blur-2xl" />

        <div
          className={[
            "absolute left-1/2 top-16 h-32 w-56 -translate-x-1/2 rounded-[55%_55%_42%_42%] border border-amber-300/30 bg-[radial-gradient(circle_at_50%_30%,rgba(251,191,36,0.35),rgba(120,53,15,0.45)_45%,rgba(39,39,42,0.85)_100%)] shadow-2xl shadow-black transition-all duration-300",
            shellIsShaking ? "animate-bounce" : "",
            shellIsPoured ? "rotate-[-16deg] translate-y-2" : "",
          ].join(" ")}
        >
          <div className="absolute inset-4 rounded-[55%_55%_42%_42%] border border-black/30" />
          <div className="absolute left-1/2 top-9 h-12 w-32 -translate-x-1/2 rounded-full border border-black/30 bg-black/20" />

          {divinationMode === "coin" &&
            (phase === "ready" || phase === "shaking") && (
              <div className="absolute left-1/2 top-12 flex -translate-x-1/2 gap-2">
                {[0, 1, 2].map((coin) => (
                  <div
                    key={coin}
                    className={[
                      "h-9 w-9 rounded-full border border-amber-100/60 bg-amber-300 text-center text-xs font-bold leading-9 text-black shadow-lg shadow-black/40",
                      phase === "shaking" ? "animate-ping" : "",
                    ].join(" ")}
                    style={{
                      animationDelay: `${coin * 120}ms`,
                    }}
                  >
                    钱
                  </div>
                ))}
              </div>
            )}
        </div>

        <div className="absolute bottom-8 left-1/2 h-20 w-72 -translate-x-1/2 rounded-[50%] border border-white/10 bg-black/30" />

        {shellIsPoured &&
          coins.map((coin) => (
            <Coin key={coin.id} coin={coin} revealed={phase === "poured"} />
          ))}

        {phase === "idle" ? (
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <p className="max-w-sm text-center text-sm leading-7 text-zinc-500">
              Choose a casting mode and start.
              <br />
              选择起卦模式后开始。
            </p>
          </div>
        ) : null}

        {phase === "ready" &&
        divinationMode === "coin" &&
        castingMethod === "manual" ? (
          <div className="absolute bottom-5 left-1/2 w-[90%] -translate-x-1/2">
            <button
              type="button"
              onPointerDown={onShakeStart}
              onPointerUp={onShakeEnd}
              onPointerLeave={onShakeCancel}
              onPointerCancel={onShakeCancel}
              disabled={!canShake}
              className="w-full rounded-full bg-amber-300 px-6 py-4 text-sm font-semibold text-black shadow-lg shadow-amber-950/40 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Press and hold to shake / 按住摇动第 {currentStep} 爻
            </button>
          </div>
        ) : null}

        {phase === "shaking" ? (
          <div className="absolute bottom-5 left-1/2 w-[90%] -translate-x-1/2">
            {castingMethod === "manual" ? (
              <button
                type="button"
                onPointerUp={onShakeEnd}
                onPointerLeave={onShakeEnd}
                onPointerCancel={onShakeCancel}
                className="w-full rounded-full bg-amber-300 px-6 py-4 text-sm font-semibold text-black shadow-lg shadow-amber-950/40"
              >
                Release to pour coins / 松开倒出铜钱
              </button>
            ) : (
              <div className="w-full rounded-full bg-amber-300 px-6 py-4 text-center text-sm font-semibold text-black shadow-lg shadow-amber-950/40">
                Auto shaking... / 自动摇动中...
              </div>
            )}

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-amber-300 transition-all"
                style={{
                  width: `${shakePower}%`,
                }}
              />
            </div>

            <p className="mt-2 text-center text-xs text-zinc-500">
              Shake energy / 摇动感：{shakePower}%
            </p>
          </div>
        ) : null}

        {phase === "poured" && previewLine ? (
          <div className="absolute bottom-5 left-1/2 w-[90%] -translate-x-1/2 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-center">
            <p className="text-sm text-amber-100">
              {getLinePositionName(previewLine.position)} ·{" "}
              {previewLine.lineName} / {previewLine.lineNameZh}
              {previewLine.changing ? " · 动爻" : ""}
            </p>

            {castingMethod === "manual" ? (
              <button
                type="button"
                onClick={onRecordLine}
                disabled={!canRecord}
                className="mt-3 rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-black transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Record this line / 记录此爻
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      {notice ? (
        <div className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm leading-6 text-amber-100">
          {notice}
        </div>
      ) : null}

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <StepBadge active={phase === "ready"} title="准备" en="Ready" />
        <StepBadge active={phase === "shaking"} title="摇动" en="Shake" />
        <StepBadge active={phase === "poured"} title="落钱" en="Reveal" />
        <StepBadge
          active={phase === "recording" || phase === "completed"}
          title="成爻"
          en="Record"
        />
      </div>
    </div>
  );
}

function StepBadge({
  active,
  title,
  en,
}: {
  active: boolean;
  title: string;
  en: string;
}) {
  return (
    <div
      className={[
        "rounded-xl border px-4 py-3 text-center text-sm transition",
        active
          ? "border-amber-300/50 bg-amber-300/10 text-amber-100"
          : "border-white/10 bg-black/20 text-zinc-500",
      ].join(" ")}
    >
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-xs opacity-70">{en}</p>
    </div>
  );
}

function Coin({
  coin,
  revealed,
}: {
  coin: CoinVisual;
  revealed: boolean;
}) {
  return (
    <div
      className={[
        "absolute left-1/2 top-1/2 flex h-14 w-14 items-center justify-center rounded-full border border-amber-100/70 bg-[radial-gradient(circle_at_35%_30%,#fde68a,#f59e0b_55%,#92400e)] text-sm font-bold text-black shadow-xl shadow-black/50 transition-all duration-700",
        revealed ? "scale-100 opacity-100" : "scale-75 opacity-80",
      ].join(" ")}
      style={{
        transform: `translate(calc(-50% + ${coin.x}px), calc(-50% + ${coin.y}px)) rotate(${coin.rotate}deg)`,
      }}
    >
      <span>{coin.side === "heads" ? "正" : "背"}</span>
    </div>
  );
}

function HexagramLine({
  position,
  line,
  isActive,
}: {
  position: number;
  line?: LiuYaoLine;
  isActive: boolean;
}) {
  const isYang = line?.yinYang === "yang";

  return (
    <div className="flex items-center gap-4">
      <span className="w-12 text-right text-xs text-zinc-500">
        {getLinePositionName(position)}
      </span>

      <div
        className={[
          "flex h-8 flex-1 items-center justify-center rounded-xl border px-4 transition",
          isActive
            ? "border-amber-300/60 bg-amber-300/10"
            : "border-white/10 bg-black/20",
        ].join(" ")}
      >
        {!line ? (
          <div className="h-1 w-full rounded-full bg-white/10" />
        ) : isYang ? (
          <div className="h-2 w-full rounded-full bg-amber-200" />
        ) : (
          <div className="flex w-full gap-8">
            <div className="h-2 flex-1 rounded-full bg-amber-200" />
            <div className="h-2 flex-1 rounded-full bg-amber-200" />
          </div>
        )}
      </div>

      <span className="w-12 text-xs text-amber-200">
        {line?.changing ? "动" : ""}
      </span>
    </div>
  );
}

function LineDetail({ line }: { line: LiuYaoLine }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm">
      <div className="flex flex-wrap items-center gap-2 text-zinc-300">
        <span className="text-amber-200">
          {getLinePositionName(line.position)}
        </span>
        <span>{line.lineName}</span>
        <span>/</span>
        <span>{line.lineNameZh}</span>
        <span className="text-zinc-500">sum: {line.sum}</span>
        {line.changing ? (
          <span className="rounded-full bg-amber-300/10 px-2 py-1 text-xs text-amber-100">
            changing / 动爻
          </span>
        ) : null}
      </div>

      <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-500">
        {line.coins.map((coin, index) => (
          <span
            key={`${line.position}-${index}-${coin}`}
            className="rounded-full border border-white/10 px-2 py-1"
          >
            {getCoinLabel(coin)}
          </span>
        ))}
      </div>
    </div>
  );
}