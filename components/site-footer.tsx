import Link from "next/link";
import { SectionShell } from "@/components/ui";
import { CobraLogo } from "@/components/cobra-logo";

export function SiteFooter() {
  return (
    <footer className="section-divider relative pb-10 pt-8">
      <SectionShell>
        <div className="flex flex-col gap-8 border-t border-white/6 pt-8 text-sm text-white/45 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <CobraLogo variant="icon" className="w-14 shrink-0" />
              <div>
                <p className="display-font text-2xl italic leading-none text-white">
                  <span className="text-white">Cobra </span>
                  <span className="text-venom">Grip</span>
                </p>
                <p className="eyebrow-font mt-1 text-[10px] text-white/45">Grip that bites back</p>
              </div>
            </div>
            <p className="mt-3 max-w-md leading-7">
              Premium hardware for grip and electric crews who need speed, repeatability, and confidence on set.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-white/56">
            <Link href="/products" className="transition hover:text-venom">
              Products
            </Link>
            <Link href="/shipping" className="transition hover:text-venom">
              Shipping
            </Link>
            <Link href="/returns" className="transition hover:text-venom">
              Returns
            </Link>
            <Link href="/#signup" className="transition hover:text-venom">
              Early Access
            </Link>
            <Link href="/privacy" className="transition hover:text-venom">
              Privacy
            </Link>
          </div>
        </div>
      </SectionShell>
    </footer>
  );
}
