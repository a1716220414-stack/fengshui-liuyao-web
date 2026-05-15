import Link from "next/link";

const navItems = [
  {
    label: "Home",
    zhLabel: "首页",
    href: "/",
  },
  {
    label: "Feng Shui",
    zhLabel: "风水",
    href: "/fengshui",
  },
  {
    label: "Liu Yao",
    zhLabel: "六爻",
    href: "/liuyao",
  },
  {
    label: "Services",
    zhLabel: "服务",
    href: "/services",
  },
  {
    label: "Contact",
    zhLabel: "联系",
    href: "/contact",
  },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/40 bg-amber-300/10 text-sm font-semibold text-amber-200">
            SY
          </div>

          <div>
            <p className="text-sm font-semibold tracking-wide text-white">
              SY Metaphysics
            </p>
            <p className="text-xs text-zinc-400">
              东方玄学 · Feng Shui · Liu Yao
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group text-sm text-zinc-300 transition hover:text-amber-200"
            >
              <span>{item.label}</span>
              <span className="ml-1 text-xs text-zinc-500 group-hover:text-amber-200">
                / {item.zhLabel}
              </span>
            </Link>
          ))}
        </nav>

        <Link
          href="/fengshui"
          className="rounded-full border border-amber-300/30 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-300/10"
        >
          Free Check / 免费检测
        </Link>
      </div>
    </header>
  );
}