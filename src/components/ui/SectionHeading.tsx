import { cn } from "@/lib/cn";

/** Small uppercase label that sits above a section title. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-brand-500 inline-block text-sm font-semibold tracking-wider uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Standard section header: eyebrow + title + optional lead paragraph. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "mx-auto max-w-2xl items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="font-display text-ink text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {lead ? (
        <p className="text-muted max-w-2xl text-lg leading-relaxed">{lead}</p>
      ) : null}
    </div>
  );
}
