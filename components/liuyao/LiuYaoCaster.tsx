"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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

type CastingPhase =
  | "idle"
  | "ready"
  | "shaking"
  | "poured"
  | "recording"
  | "completed";

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

function getPhaseText(phase: CastingPhase, currentStep: number) {
  if (phase === "idle") {
    return "Enter your question and start the ritual. / 输入问题后开始起卦。";
  }

  if (phase === "ready") {
    return `Line ${currentStep}: press and hold to shake the shell. / 第 ${currentStep} 爻：按住按钮开始摇动。`;
  }

  if (phase === "shaking") {
    return `Line ${currentStep}: keep shaking, then release to pour the coins. / 第 ${currentStep} 爻：持续摇动，松开后倒出铜钱。`;
  }

  if (phase === "poured") {
    return `Line ${currentStep}: coins are revealed. Confirm and record this line. / 第 ${currentStep} 爻：铜钱已落定，请确认记录此爻。`;
  }

  if (phase === "recording") {
    return `Recording line ${currentStep}... / 正在记录第 ${currentStep} 爻。`;
  }

  return "Casting completed. / 六爻起卦完成。";
}

export default function LiuYaoCaster() {
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("career");
  const [lines, setLines] = useState<LiuYaoLine[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [castingPhase, setCastingPhase] = useState<CastingPhase>("idle");
  const [currentCoins, setCurrentCoins] = useState<CoinVisual[]>([]);
  const [previewLine, setPreviewLine] = useState<LiuYaoLine | null>(null);
  const [shakePower, setShakePower] = useState(0);
  const [notice, setNotice] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [isRequestingAi, setIsRequestingAi] = useState(false);

  const shakeIntervalRef = useRef<number | null>(null);
  const shakeStartTimeRef = useRef<number>(0);

  const result = useMemo(() => buildHexagramResult(lines), [lines]);

  useEffect(() => {
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

  function handleStartRitual() {
    if (!question.trim()) {
      setNotice("Please enter a focused question first. / 请先输入一个具体问题。");
      return;
    }

    clearShakeInterval();

    setLines([]);
    setCurrentStep(1);
    setCastingPhase("ready");
    setCurrentCoins([]);
    setPreviewLine(null);
    setShakePower(0);
    setNotice(
      "Ritual started. Complete each line manually. / 起卦开始，请逐爻完成。",
    );
    setAiMessage("");
    vibrate(80);
  }

  function handleShakeStart() {
    if (castingPhase !== "ready") {
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
    if (castingPhase !== "shaking") {
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
    if (castingPhase !== "shaking") {
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
    setNotice(`Line ${currentStep} recorded. Continue to the next line. / 第 ${currentStep} 爻已记录，请继续下一爻。`);
  }

  function handleReset() {
    clearShakeInterval();
    setLines([]);
    setCurrentStep(0);
    setCastingPhase("idle");
    setCurrentCoins([]);
    setPreviewLine(null);
    setShakePower(0);
    setNotice("");
    setAiMessage("");
  }

  async function handlePaidAiReading() {
    if (!result) {
      setAiMessage("Please cast a hexagram first. / 请先完成起卦。");
      return;
    }

    try {
      setIsRequestingAi(true);
      setAiMessage("");

      const response = await fetch("/api/liuyao-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          questionType,
          primaryHexagram: result.primary,
          changedHexagram: result.changed,
          changingPositions: result.changingPositions,
        }),
      });

      const data = await response.json();

      setAiMessage(
        data.message ||
          "AI interpretation is a paid feature. / AI 解卦为付费功能。",
      );
    } catch {
      setAiMessage(
        "Unable to connect to the AI reading interface. / 暂时无法连接 AI 解卦接口。",
      );
    } finally {
      setIsRequestingAi(false);
    }
  }

  const isRitualStarted = castingPhase !== "idle";
  const canShake = castingPhase === "ready";
  const canRecord = castingPhase === "poured" && previewLine;

  return (
    <section className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
          Casting / 起卦
        </p>

        <h2 className="mt-3 text-2xl font-semibold text-white">
          Ask a question and cast six lines manually
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          这一版不再自动完成六爻，而是由用户逐爻按住摇动、松开倒出、确认记录，更接近真实起卦体验。
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
              disabled={isRitualStarted && castingPhase !== "completed"}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Example: Should I accept this job opportunity?"
              rows={4}
              className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-300/60 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div>
            <label className="mb-2 block">
              <span className="block text-sm font-medium text-zinc-100">
                Question Type
              </span>
              <span className="block text-xs text-zinc-500">问题类型</span>
            </label>

            <select
              value={questionType}
              disabled={isRitualStarted && castingPhase !== "completed"}
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

          <div className="grid gap-3 md:grid-cols-2">
            <button
              type="button"
              onClick={handleStartRitual}
              disabled={castingPhase !== "idle" && castingPhase !== "completed"}
              className="rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {castingPhase === "completed"
                ? "Cast Again / 重新起卦"
                : "Start Ritual / 开始起卦"}
            </button>

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
              Manual Ritual Mode / 手动起卦模式
            </h3>
            <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-400">
              <p>1. Start the ritual after entering one focused question.</p>
              <p>2. For each line, press and hold the golden shaking button.</p>
              <p>3. Release the button to pour out three coins.</p>
              <p>4. Confirm and record the line, then continue to the next one.</p>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-500">
              <p>1. 先输入一个具体问题，再开始起卦。</p>
              <p>2. 每一爻都需要按住金色按钮进行摇动。</p>
              <p>3. 松开按钮后，系统倒出三枚铜钱。</p>
              <p>4. 确认记录此爻，再进入下一爻。</p>
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
                    此卦无动爻，暂以本卦作为主要参考。后续深度解卦可以结合所问之事、时间、用神和世应进一步判断。
                  </p>
                </>
              )}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <h3 className="text-xl font-semibold text-white">
                Paid AI Interpretation / 付费 AI 解卦
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                AI interpretation is designed as a paid feature. It can later be
                connected to Stripe, PayPal, or another payment system before
                returning a full reading.
              </p>

              <p className="mt-3 text-sm leading-7 text-zinc-500">
                AI 解卦建议作为付费功能。后续可以接入 Stripe、PayPal 或其他支付系统，完成支付后再返回完整解卦内容。
              </p>

              <button
                type="button"
                onClick={handlePaidAiReading}
                disabled={isRequestingAi}
                className="mt-5 rounded-full border border-amber-300/30 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-300/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isRequestingAi
                  ? "Checking access... / 正在检测权限..."
                  : "Unlock AI Reading / 付费解锁 AI 解卦"}
              </button>

              {aiMessage ? (
                <div className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-7 text-amber-100">
                  {aiMessage}
                </div>
              ) : null}
            </div>

            <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
              <h3 className="text-xl font-semibold text-amber-100">
                Consult a Diviner / 咨询卦师
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-300">
                For deeper Liu Yao interpretation, you can contact a diviner
                with your question, casting result, and background information.
              </p>

              <p className="mt-3 text-sm leading-7 text-zinc-500">
                如果需要更深入的六爻判断，可以联系卦师，提供所问之事、卦象结果和事情背景，进一步分析用神、世应、动爻、变卦和建议。
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
              >
                Contact for Deeper Reading / 联系深入解卦
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-6 text-center">
            <p className="text-sm leading-7 text-zinc-500">
              Complete six lines to generate the hexagram.
              <br />
              完成六爻摇卦后，这里会显示本卦、变卦和动爻。
            </p>
          </div>
        )}
      </div>
    </section>
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
            Manual Tortoise Shell Casting / 手动龟壳摇卦
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

          {(phase === "ready" || phase === "shaking") && (
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
              Enter your question and start the ritual.
              <br />
              输入问题后点击开始起卦。
            </p>
          </div>
        ) : null}

        {phase === "ready" ? (
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
            <button
              type="button"
              onPointerUp={onShakeEnd}
              onPointerLeave={onShakeEnd}
              onPointerCancel={onShakeCancel}
              className="w-full rounded-full bg-amber-300 px-6 py-4 text-sm font-semibold text-black shadow-lg shadow-amber-950/40"
            >
              Release to pour coins / 松开倒出铜钱
            </button>

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

            <button
              type="button"
              onClick={onRecordLine}
              disabled={!canRecord}
              className="mt-3 rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-black transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Record this line / 记录此爻
            </button>
          </div>
        ) : null}
      </div>

      {notice ? (
        <div className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm leading-6 text-amber-100">
          {notice}
        </div>
      ) : null}

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <StepBadge
          active={phase === "ready"}
          title="入壳"
          en="Ready"
        />
        <StepBadge
          active={phase === "shaking"}
          title="摇动"
          en="Hold"
        />
        <StepBadge
          active={phase === "poured"}
          title="落钱"
          en="Reveal"
        />
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