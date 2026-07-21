import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/portal/LoginForm";

export const metadata: Metadata = { title: "Sign in" };
export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-ink text-2xl font-semibold">
          Client & coach login
        </h1>
        <p className="text-muted mt-1 text-sm">
          Sign in with your username to access your portal.
        </p>
      </div>

      <LoginForm next={next ?? "/portal"} />

      <p className="text-muted text-center text-sm">
        <Link
          href="/forgot-password"
          className="text-brand-600 hover:underline"
        >
          Forgot your password?
        </Link>
      </p>
    </div>
  );
}
