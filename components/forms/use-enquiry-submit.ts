"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/site";

/**
 * The single submission path shared by the enquiry slide-over and the
 * /contact form: POST /api/enquiry, fall back to a prefilled WhatsApp
 * handoff when delivery isn't possible. Honeypot submissions pretend to
 * succeed and go nowhere.
 */
export type EnquiryData = {
  name: string;
  organisation?: string;
  email: string;
  phone?: string;
  service: string;
  budget?: string;
  message: string;
  /** honeypot — humans never see or fill this */
  company_website?: string;
};

export type SendState = "idle" | "sent" | "fallback";

export function useEnquirySubmit(source: "contact-page" | "slide-over") {
  const [state, setState] = useState<SendState>("idle");

  const submit = async (data: EnquiryData) => {
    if (data.company_website) {
      // spam trap tripped: report success, deliver nothing
      setState("sent");
      return;
    }
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source, page: window.location.pathname }),
      });
      const result = await res.json().catch(() => null);
      setState(res.ok && result?.ok ? "sent" : "fallback");
    } catch {
      setState("fallback");
    }
  };

  const waHref = (data: Partial<EnquiryData>) => {
    const text = encodeURIComponent(
      `Enquiry from ${data.name || "the website"}${data.organisation ? ` (${data.organisation})` : ""}: ${data.service || ""}${data.budget ? ` · ${data.budget}` : ""} — ${data.message || ""}`
    );
    return `${CONTACT.whatsapp}?text=${text}`;
  };

  return { state, submit, waHref };
}
