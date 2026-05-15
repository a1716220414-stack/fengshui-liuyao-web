import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-8 text-center text-sm text-zinc-500">
      <div className="mx-auto max-w-6xl">
        <p>
          © 2026 SY Metaphysics. Feng Shui and divination services are provided
          for cultural, lifestyle, and reflective guidance.
        </p>

        <p className="mt-2">
          本网站内容用于文化体验、生活方式建议与个人反思参考，不构成确定性承诺。
        </p>

        <div className="mt-4 flex justify-center gap-5">
          <Link href="/services" className="hover:text-amber-200">
            Services / 服务
          </Link>
          <Link href="/contact" className="hover:text-amber-200">
            Contact / 联系
          </Link>
          <Link href="/privacy" className="hover:text-amber-200">
            Privacy / 隐私
          </Link>
        </div>
      </div>
    </footer>
  );
}