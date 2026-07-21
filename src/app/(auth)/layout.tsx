import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="from-brand-50 flex min-h-full flex-col items-center justify-center bg-gradient-to-b to-[var(--background)] px-5 py-12">
      <div className="mb-8">
        <Logo />
      </div>
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        {children}
      </div>
      <Link href="/" className="text-muted hover:text-brand-600 mt-6 text-sm">
        ← Back to site
      </Link>
    </div>
  );
}
