import Link from "next/link";

export default function AlipaySuccessPage({
  searchParams,
}: {
  searchParams: {
    out_trade_no?: string;
    trade_no?: string;
    total_amount?: string;
  };
}) {
  const outTradeNo = searchParams.out_trade_no || "";
  const tradeNo = searchParams.trade_no || "";
  const totalAmount = searchParams.total_amount || "";

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-amber-300/20 bg-white/[0.04] p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
          Alipay Payment / 支付宝支付
        </p>

        <h1 className="mt-4 text-3xl font-semibold">
          Payment submitted / 支付已提交
        </h1>

        <p className="mt-4 text-sm leading-7 text-zinc-400">
          If the payment was successful, the system will unlock the AI reading
          after receiving Alipay&apos;s server notification.
        </p>

        <p className="mt-3 text-sm leading-7 text-zinc-500">
          如果支付成功，系统会在收到支付宝服务器异步通知后解锁 AI 解读。
          请注意，真正可靠的支付状态以服务器通知为准，而不是当前返回页面。
        </p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5 text-sm text-zinc-300">
          <p>Out Trade No / 商户订单号：{outTradeNo || "—"}</p>
          <p className="mt-2">Trade No / 支付宝交易号：{tradeNo || "—"}</p>
          <p className="mt-2">Amount / 金额：{totalAmount || "—"}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/fengshui"
            className="rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
          >
            Back to Feng Shui / 返回风水页面
          </Link>

          <Link
            href="/liuyao"
            className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Back to Liu Yao / 返回六爻页面
          </Link>
        </div>
      </div>
    </main>
  );
}