"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// Form stack (RHF + Zod) loads only when someone opens the panel.
const EnquiryPanel = dynamic(
  () => import("@/components/chrome/enquiry-panel").then((m) => m.EnquiryPanel),
  { ssr: false }
);

const NAV = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryMounted, setEnquiryMounted] = useState(false);
  const [preselect, setPreselect] = useState<string | undefined>(undefined);
  const openEnquiry = () => {
    setEnquiryMounted(true);
    setEnquiryOpen(true);
  };
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Any page can open the enquiry panel by dispatching this event;
  // detail.service (a title from lib/services.ts) pre-selects the service.
  useEffect(() => {
    const onEnquiry = (e: Event) => {
      const detail = (e as CustomEvent<{ service?: string }>).detail;
      setPreselect(detail?.service);
      setEnquiryMounted(true);
      setEnquiryOpen(true);
    };
    window.addEventListener("bh:enquiry", onEnquiry);
    return () => window.removeEventListener("bh:enquiry", onEnquiry);
  }, []);

  // Lock scroll + close on Escape while the overlay menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* keyboard users: jump past the chrome */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[80] -translate-y-24 bg-paper px-5 py-3 text-sm font-semibold text-ink transition-transform duration-fast ease-expo focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-base ease-expo",
          scrolled && !open
            ? "border-b border-[var(--hairline)] bg-ink/95 backdrop-blur-sm"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="container-site flex h-16 items-center justify-between md:h-20">
          <Link href="/" aria-label="Beyond Home — home" className="relative z-50">
            <Image
              src="/assets/logo-wordmark.png"
              alt="beyondhome"
              width={150}
              height={34}
              priority
              className="h-6 w-auto md:h-7"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-underline text-sm font-medium text-mist hover:text-paper"
              >
                {item.label}
              </Link>
            ))}
            {/* Understated: ghost outline in the chrome; opens the enquiry
                slide-over so a visitor can enquire from any scroll depth */}
            <button
              onClick={openEnquiry}
              className="inline-flex min-h-10 cursor-pointer items-center border border-[var(--hairline)] px-6 text-[0.8125rem] font-semibold tracking-wide text-paper transition-colors duration-fast ease-expo hover:border-gold hover:text-gold"
            >
              Start a project
            </button>
          </nav>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-50 flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="relative block h-[10px] w-6">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-full bg-paper transition-transform duration-fast ease-expo",
                  open && "top-1/2 -translate-y-1/2 rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-px w-full bg-paper transition-transform duration-fast ease-expo",
                  open && "bottom-auto top-1/2 -translate-y-1/2 -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Full-screen overlay menu — oversized editorial type */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-ink md:hidden"
          >
            <nav
              aria-label="Menu"
              className="container-site flex flex-1 flex-col justify-center gap-2"
            >
              {NAV.map((item, i) => (
                <div key={item.href} className="overflow-hidden py-1">
                  <m.div
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="type-display block text-display-lg text-paper"
                    >
                      {item.label}
                    </Link>
                  </m.div>
                </div>
              ))}
            </nav>
            <m.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="container-site rule flex flex-wrap items-center justify-between gap-4 py-6"
            >
              <button
                onClick={() => {
                  setOpen(false);
                  openEnquiry();
                }}
                className="link-underline cursor-pointer text-sm font-medium text-gold"
              >
                Start a project
              </button>
              <p className="font-mono text-caption uppercase tracking-[0.18em] text-smoke">
                Ogba · Ikeja · Lagos
              </p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {enquiryMounted && (
        <EnquiryPanel
          open={enquiryOpen}
          defaultService={preselect}
          onClose={() => setEnquiryOpen(false)}
        />
      )}
    </>
  );
}
