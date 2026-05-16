import { Suspense } from "react";
import AlipaySuccessClient from "./AlipaySuccessClient";

export default function AlipaySuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black px-6 py-16 text-white">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-amber-300/20 bg-white/[0.04] p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
              Alipay Payment / 支付宝支付
            </p>
            <h1 className="mt-4 text-3xl font-semibold">
              Loading payment result... / 正在读取支付结果...
            </h1>
          </div>
        </main>
      }
    >
      <AlipaySuccessClient />
    </Suspense>
  );
}