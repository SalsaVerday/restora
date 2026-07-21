import type { Metadata } from "next";
import { SetPasswordForm } from "@/components/portal/SetPasswordForm";

export const metadata: Metadata = { title: "Set your password" };
export const dynamic = "force-dynamic";

export default function SetPasswordPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-ink text-2xl font-semibold">
          Set your password
        </h1>
        <p className="text-muted mt-1 text-sm">
          Choose a password to finish setting up your account.
        </p>
      </div>
      <SetPasswordForm />
    </div>
  );
}
