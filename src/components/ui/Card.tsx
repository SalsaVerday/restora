import { cn } from "@/lib/cn";

/** Soft rounded surface used throughout the marketing pages. */
export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5",
        className,
      )}
    >
      {children}
    </div>
  );
}
