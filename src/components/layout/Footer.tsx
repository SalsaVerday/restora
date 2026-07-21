import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-100 mt-auto">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="flex flex-col gap-4">
            <Logo tone="white" />
            <p className="text-brand-200 max-w-xs text-sm leading-relaxed">
              {site.description}
            </p>
            <div className="mt-2 flex gap-4">
              {site.footer.social.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="text-brand-200 text-sm transition-colors hover:text-white"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {site.footer.columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-brand-200 text-sm transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-brand-200 mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. An original demo clone —
            not affiliated with any real company.
          </p>
          <p>Made for pain relief, delivered from home.</p>
        </div>
      </Container>
    </footer>
  );
}
