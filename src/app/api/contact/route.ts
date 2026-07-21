import { NextResponse } from "next/server";

/**
 * Contact form handler.
 *
 * Starts as a validated no-op that logs the submission server-side. To actually
 * deliver messages, wire an email provider here (e.g. Resend) using an API key
 * stored as a Vercel environment variable — see README for the snippet.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const firstName = String(body.firstName ?? "").trim();
  const email = String(body.email ?? "").trim();

  if (!firstName || !email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address" },
      { status: 400 },
    );
  }

  // Replace this with real delivery (email/CRM). For now, record it in logs.
  console.log("[contact] new submission:", {
    firstName,
    lastName: body.lastName,
    email,
    company: body.company,
    type: body.type,
    message: body.message,
  });

  return NextResponse.json({ ok: true });
}
