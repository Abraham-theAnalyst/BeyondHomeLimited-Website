import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry";

/**
 * Enquiry pipeline. The browser posts here only — the destination address
 * never appears in client code — and Zod + the honeypot run before anything
 * leaves the server. Valid submissions forward to FormSubmit's AJAX
 * endpoint; any failure (missing env, upstream error, rate limit) logs the
 * full submission server-side so no lead is lost, and the client shows the
 * WhatsApp handoff instead of a raw error.
 *
 * Env: FORMSUBMIT_TARGET — raw inbox or FormSubmit alias (see .env.example).
 */

// Sensible per-IP throttle: 5 submissions per 10 minutes. In-memory is
// fine at this traffic level; a redeploy simply resets the window.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // bound memory on long-lived servers
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const raw = await request.json().catch(() => null);
  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const data = parsed.data;

  // Honeypot tripped: report success, deliver nothing, log nothing.
  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    console.warn("[enquiry] rate-limited submission", JSON.stringify(data));
    return NextResponse.json({ ok: false, fallback: true });
  }

  const submittedFrom = `${data.page || "unknown page"} (${
    data.source === "slide-over" ? "enquiry slide-over" : "contact page"
  })`;

  const target = process.env.FORMSUBMIT_TARGET;
  if (!target) {
    // Never lose a lead: the full submission lands in the server log.
    console.error("[enquiry] FORMSUBMIT_TARGET missing — submission logged:",
      JSON.stringify({ ...data, submittedFrom }));
    return NextResponse.json({ ok: false, fallback: true });
  }

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${target}`, {
      method: "POST",
      // if FormSubmit is unreachable, fail fast to the WhatsApp fallback
      // instead of pinning the visitor on "Sending…"
      signal: AbortSignal.timeout(8000),
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `New Enquiry — ${data.service} — ${data.name}`,
        _template: "table",
        _captcha: "false",
        _replyto: data.email,
        name: data.name,
        organisation: data.organisation || "",
        email: data.email,
        phone: data.phone || "",
        service: data.service,
        budget: data.budget || "",
        message: data.message,
        "Submitted from": submittedFrom,
      }),
    });
    const body = await res.json().catch(() => null);
    if (!res.ok || body?.success === "false" || body?.success === false) {
      throw new Error(`formsubmit ${res.status}: ${JSON.stringify(body)}`);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(
      "[enquiry] delivery failed — submission logged:",
      JSON.stringify({ ...data, submittedFrom }),
      err
    );
    return NextResponse.json({ ok: false, fallback: true });
  }
}
