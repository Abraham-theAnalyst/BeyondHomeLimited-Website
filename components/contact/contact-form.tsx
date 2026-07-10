"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { m, useReducedMotion } from "framer-motion";
import { Input, Select, Textarea } from "@/components/ui/field";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { useEnquirySubmit } from "@/components/forms/use-enquiry-submit";
import { SERVICES } from "@/lib/services";

const BUDGETS = [
  "Under ₦500k",
  "₦500k–₦2m",
  "₦2m–₦10m",
  "₦10m+",
  "Not sure yet",
];

const schema = z.object({
  name: z.string().min(2, "Tell us who to reply to."),
  organisation: z.string().optional(),
  email: z.string().email("That email doesn't look right. Check the format."),
  phone: z.string().optional(),
  service: z.string().min(1, "Pick the service closest to your project."),
  budget: z.string().optional(),
  message: z
    .string()
    .min(10, "A sentence or two about the project helps us reply usefully."),
  company_website: z.string().optional(), // honeypot
});

type FormData = z.infer<typeof schema>;

/** The /contact centrepiece — same submission path as the enquiry panel. */
export function ContactForm() {
  const reduce = useReducedMotion();
  const { state, submit, waHref } = useEnquirySubmit("contact-page");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onBlur" });

  if (state === "sent") {
    return (
      <m.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        aria-live="polite"
        className="max-w-xl"
      >
        <div className="mb-6 h-px w-16 bg-gold" />
        <p className="type-display text-display-md text-paper">
          Sent. We reply within one working day.
        </p>
        <p className="mt-4 max-w-[48ch] text-body-lg text-mist">
          Your message is with the team in Ogba. If the project is urgent,
          WhatsApp reaches us fastest.
        </p>
      </m.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((data) => submit(data))}
      noValidate
      className="grid max-w-3xl gap-6 sm:grid-cols-2"
    >
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
        <option value="Other">Other</option>
      </Select>
      <Select
        label="Budget"
        defaultValue=""
        hint="A range is enough; it shapes the recommendation."
        error={errors.budget?.message}
        {...register("budget")}
      >
        <option value="" disabled>
          Choose a range
        </option>
        {BUDGETS.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </Select>
      <div className="sm:col-span-2">
        <Textarea
          label="About the project"
          required
          rows={5}
          placeholder="What are we putting up, and where?"
          hint="Location and timeline help us quote accurately."
          error={errors.message?.message}
          {...register("message")}
        />
      </div>

      {/* honeypot — hidden from people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company_website")}
        />
      </div>

      <div className="sm:col-span-2">
        <MagneticButton asSubmit disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send the brief"}
        </MagneticButton>
        {state === "fallback" && (
          <p className="mt-4 text-sm text-mist" role="alert">
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
      </div>
    </form>
  );
}
