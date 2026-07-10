import { MessageCircle, Phone } from "lucide-react";

/**
 * Mobile sticky conversion bar — Call · WhatsApp, thumb-reachable,
 * phones only. Content above gets clearance from the footer's mobile
 * bottom padding; forms keep their own spacing.
 */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-[var(--hairline)] bg-ink/95 backdrop-blur-sm md:hidden">
      <a
        href="tel:+2348060107065"
        className="flex min-h-14 items-center justify-center gap-2.5 text-sm font-medium text-paper"
      >
        <Phone size={15} aria-hidden className="text-gold" />
        Call
      </a>
      <a
        href="https://wa.me/2348060107065"
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-14 items-center justify-center gap-2.5 border-l border-[var(--hairline)] text-sm font-medium text-paper"
      >
        <MessageCircle size={15} aria-hidden className="text-gold" />
        WhatsApp
      </a>
    </div>
  );
}
