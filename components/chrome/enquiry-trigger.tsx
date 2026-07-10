"use client";

import { MagneticButton } from "@/components/motion/magnetic-button";
import type { ReactNode } from "react";

/**
 * Opens the header's enquiry slide-over from anywhere on the page via a
 * window event — no prop drilling through server components.
 * Pass `service` (a title from lib/services.ts) to pre-select it.
 */
export function EnquiryTrigger({
  children,
  service,
}: {
  children: ReactNode;
  service?: string;
}) {
  return (
    <MagneticButton
      onClick={() =>
        window.dispatchEvent(new CustomEvent("bh:enquiry", { detail: { service } }))
      }
    >
      {children}
    </MagneticButton>
  );
}
