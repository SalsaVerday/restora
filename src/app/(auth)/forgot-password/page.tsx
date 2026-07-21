import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "@/components/portal/ForgotPasswordForm";

export const metadata: Metadata = { title: "Reset password" };
export const dynamic = "force-dynamic";

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-ink text-2xl font-semibold">
          Reset your password
        </h1>
        <p className="text-muted mt-1 text-sm">
          Enter your username and we&apos;ll email a reset link.
        </p>
      </div>
      <ForgotPasswordForm />
      <p className="text-muted text-center text-sm">
        <Link href="/login" className="text-brand-600 hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
