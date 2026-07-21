import { cn } from "@/lib/cn";

/** Big-number metric used in the stat band. */
export function StatCard({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="font-display text-brand-600 text-4xl font-bold tracking-tight sm:text-5xl">
        {value}
      </div>
      <div className="text-muted text-sm leading-snug">{label}</div>
    </div>
  );
}
