import { cn } from "@/lib/cn";

/**
 * Placeholder "trusted by" logo row. These are fictional wordmarks rendered as
 * text so the clone ships no third-party trademarks.
 */
export function LogoCloud({
  logos,
  className,
}: {
  logos: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-10 gap-y-6",
        className,
      )}
    >
      {logos.map((logo) => (
        <span
          key={logo}
          className="font-display text-muted/70 text-lg font-semibold tracking-tight"
        >
          {logo}
        </span>
      ))}
    </div>
  );
}
