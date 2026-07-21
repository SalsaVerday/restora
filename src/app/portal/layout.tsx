import { requireProfile } from "@/lib/auth";
import { PortalHeader } from "@/components/portal/PortalHeader";

export const dynamic = "force-dynamic";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireProfile();

  return (
    <div className="flex min-h-full flex-col">
      <PortalHeader profile={profile} />
      <main className="flex-1 py-10">{children}</main>
    </div>
  );
}
