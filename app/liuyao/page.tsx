import LiuYaoCaster from "@/components/liuyao/LiuYaoCaster";

export default function LiuYaoPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
          Liu Yao / 六爻
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          Liu Yao Divination
        </h1>

        <h2 className="mt-4 text-2xl font-medium text-amber-100 md:text-3xl">
          六爻占问与铜钱起卦
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
          Ask a focused question, simulate a six-line coin casting process, and
          receive the primary hexagram, changed hexagram, and changing lines.
        </p>

        <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-400">
          输入一个具体问题，系统会模拟三枚铜钱摇卦，依次生成六爻，并展示本卦、变卦和动爻。当前版本先完成起卦与卦象展示，后续再扩展纳甲排盘、六亲六神、世应、用神和深度解卦。
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h3 className="font-semibold text-white">1. Ask One Question</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              建议一卦一问，问题越具体，后续解读越有方向。
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h3 className="font-semibold text-white">2. Cast Six Lines</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              系统模拟铜钱法，从初爻到上爻依次生成六爻。
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h3 className="font-semibold text-white">3. Paid Reading</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              AI 解卦和卦师深度分析作为付费服务入口。
            </p>
          </div>
        </div>

        <LiuYaoCaster />
      </section>
    </main>
  );
}