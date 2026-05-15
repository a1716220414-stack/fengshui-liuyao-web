import FengShuiForm from "@/components/fengshui/FengShuiForm";

export default function FengShuiPage() {
  return (
    <main className="min-h-screen bg-stone-950 px-6 py-16 text-stone-100">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
          Feng Shui / 风水
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          Feng Shui Analysis
        </h1>

        <h2 className="mt-4 text-2xl font-medium text-amber-100 md:text-3xl">
          家居与房间风水初步分析
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300">
          Submit your home layout, room information, contact method, and optional
          images to receive a preliminary bilingual Feng Shui report. This page
          is designed as the first lead-generation entry for overseas clients.
        </p>

        <p className="mt-4 max-w-3xl text-base leading-8 text-stone-400">
          你可以提交整体住宅信息，也可以只提交某一个房间的布局信息。若能上传户型图、房间实景图或指南针截图，后续将更适合进行深度付费分析。当前版本先实现本地报告生成和客户意向收集，下一步再接入数据库、文件上传和
          AI 辅助分析。
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h3 className="font-semibold text-white">
              1. Free Preliminary Reading
            </h3>
            <p className="mt-2 text-sm leading-6 text-stone-400">
              免费生成基础中英文报告，用于快速判断用户需求。
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h3 className="font-semibold text-white">
              2. Upload Plan or Photos
            </h3>
            <p className="mt-2 text-sm leading-6 text-stone-400">
              支持户型图、房间图、指南针截图，为后续深度分析做准备。
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h3 className="font-semibold text-white">
              3. Paid Consultation Lead
            </h3>
            <p className="mt-2 text-sm leading-6 text-stone-400">
              收集联系方式和付费意向，引导用户进行进一步咨询。
            </p>
          </div>
        </div>

        <FengShuiForm />
      </section>
    </main>
  );
}