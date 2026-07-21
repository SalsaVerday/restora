import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/** Brand wordmark: an original inline-SVG "pulse leaf" glyph + name. */
export function Logo({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "white";
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn(
        "font-display inline-flex items-center gap-2.5 text-xl font-bold tracking-tight",
        tone === "white" ? "text-white" : "text-ink",
        className,
      )}
    >
      <svg
        viewBox="0 0 32 32"
        className="size-8"
        role="img"
        aria-hidden
        fill="none"
      >
        <rect width="32" height="32" rx="9" className="fill-brand-600" />
        <path
          d="M7 17.5h4l2.2-5 3.4 9 2.4-5.5H25"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{site.name}</span>
    </Link>
  );
}
