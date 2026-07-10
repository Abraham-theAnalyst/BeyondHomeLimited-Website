"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Select, Textarea } from "@/components/ui/field";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { useEnquirySubmit } from "@/components/forms/use-enquiry-submit";
import { SERVICES } from "@/lib/services";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const schema = z.object({
  name: z.string().min(2, "Tell us who to reply to."),
  organisation: z.string().optional(),
  email: z.string().email("That email doesn't look right. Check the format."),
  phone: z.string().optional(),
  service: z.string().min(1, "Pick the service closest to your project."),
  message: z
    .string()
    .min(10, "A sentence or two about the project helps us reply usefully."),
});

type FormData = z.infer<typeof schema>;

/**
 * Slide-over enquiry panel: reachable from the nav at any scroll depth.
 * Focus-trapped, Esc to close, body scroll locked. Submissions go through
 * /api/enquiry; if that can't deliver, a prefilled WhatsApp handoff appears.
 */
export function EnquiryPanel({
  open,
  onClose,
  defaultService,
}: {
  open: boolean;
  onClose: () => void;
  /** Service title to pre-select (from a service page's CTA). */
  defaultService?: string;
}) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const { state, submit, waHref } = useEnquirySubmit("slide-over");
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onBlur" });

  // Pre-select the service when opened from a service page CTA
  useEffect(() => {
    if (open && defaultService) {
      setValue("service", defaultService, { shouldValidate: false });
    }
  }, [open, defaultService, setValue]);

  // Scroll lock + Esc + focus trap
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const panel = panelRef.current;
    const focusables = () =>
      panel?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) ?? [];
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const els = [...focusables()];
        if (els.length === 0) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const onSubmit = (data: FormData) => submit(data);

  return (
    <AnimatePresence>
      {open && (
        <>
          <m.button
            aria-label="Close enquiry panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-[2px]"
          />
          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Start a project"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full flex-col overflow-y-auto border-l border-[var(--hairline)] bg-ink sm:max-w-lg"
          >
            <div className="flex items-center justify-between px-6 py-5 md:px-10">
              <p className="type-eyebrow">Start a project</p>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-11 w-11 items-center justify-center text-smoke transition-colors duration-fast ease-expo hover:text-gold"
              >
                <X size={18} />
              </button>
            </div>

            <div className="rule flex-1 px-6 py-8 md:px-10">
              {state === "sent" ? (
                <div aria-live="polite">
                  <div className="mb-6 h-px w-16 bg-gold" />
                  <p className="type-display text-display-md text-paper">
                    Sent. We reply within one working day.
                  </p>
                  <p className="mt-4 max-w-[45ch] text-body text-mist">
                    Your enquiry is with the team in Ogba. If it&apos;s urgent,
                    WhatsApp reaches us fastest.
                  </p>
                </div>
              ) : (
                <>
                  <p className="type-display text-display-md text-paper">
                    Tell us about the project.
                  </p>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="mt-8 grid gap-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Input
                        label="Name"
                        required
                        autoComplete="name"
                        error={errors.name?.message}
                        {...register("name")}
                      />
                      <Input
                        label="Organisation"
                        autoComplete="organization"
                        error={errors.organisation?.message}
                        {...register("organisation")}
                      />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Input
                        label="Email"
                        type="email"
                        required
                        autoComplete="email"
                        error={errors.email?.message}
                        {...register("email")}
                      />
                      <Input
                        label="Phone"
                        type="tel"
                        autoComplete="tel"
                        error={errors.phone?.message}
                        {...register("phone")}
                      />
                    </div>
                    <Select
                      label="Service"
                      required
                      defaultValue=""
                      error={errors.service?.message}
                      {...register("service")}
                    >
                      <option value="" disabled>
                        Choose a service
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s.slug} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </Select>
                    <Textarea
                      label="About the project"
                      required
                      rows={4}
                      placeholder="What are we putting up, and where?"
                      error={errors.message?.message}
                      {...register("message")}
                    />
                    <div>
                      <MagneticButton asSubmit disabled={isSubmitting}>
                        {isSubmitting ? "Sending…" : "Send enquiry"}
                      </MagneticButton>
                    </div>
                    {state === "fallback" && (
                      <p className="text-sm text-mist" role="alert">
                        The form couldn&apos;t reach our inbox just now.{" "}
                        <a
                          href={waHref(getValues())}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline text-gold"
                        >
                          Send it by WhatsApp instead
                        </a>
                        , with your message prefilled.
                      </p>
                    )}
                  </form>
                </>
              )}
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
