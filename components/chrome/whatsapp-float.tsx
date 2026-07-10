"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";

/**
 * Floating WhatsApp entry — a minimal dark pill that slips in after the
 * visitor has scrolled past the first screen. Desktop/tablet: bottom-right.
 * On phones it yields to the sticky conversion bar (hidden below md).
 */
export function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <m.a
          href="https://wa.me/2348060107065"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Beyond Home on WhatsApp"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-30 hidden min-h-12 items-center gap-2.5 border border-[var(--hairline)] bg-coal/95 px-5 text-sm font-medium text-paper backdrop-blur-sm transition-colors duration-fast ease-expo hover:border-gold md:flex"
        >
          <MessageCircle size={16} aria-hidden className="text-gold" />
          WhatsApp
        </m.a>
      )}
    </AnimatePresence>
  );
}
