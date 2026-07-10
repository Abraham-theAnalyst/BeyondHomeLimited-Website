"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { m, useReducedMotion } from "framer-motion";
import { Input, Select, Textarea } from "@/components/ui/field";
import { MagneticButton } from "@/components/motion/magnetic-button";

const schema = z.object({
  name: z.string().min(2, "Tell us who to reply to."),
  email: z.string().email("That email doesn't look right. Check the format."),
  service: z.string().min(1, "Pick the service closest to your project."),
  message: z
    .string()
    .min(10, "A sentence or two about the project helps us reply usefully."),
});

type FormData = z.infer<typeof schema>;

const SERVICES = [
  "Billboards & OOH",
  "Building wraps",
  "Vehicle & fleet branding",
  "Signage & neon",
  "Branded interiors",
  "Large-format print",
];

export function DemoForm() {
  const [sent, setSent] = useState(false);
  const reduce = useReducedMotion();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onBlur" });

  const onSubmit = async () => {
    // Demo only — the production form posts to FormSubmit with a WhatsApp fallback.
    await new Promise((r) => setTimeout(r, 700));
    setSent(true);
  };

  if (sent) {
    return (
      <m.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        aria-live="polite"
        className="max-w-xl"
      >
        <div className="mb-6 h-px w-16 bg-gold" />
        <p className="type-display text-display-sm text-paper">
          Message received.
        </p>
        <p className="mt-4 max-w-[50ch] text-body text-mist">
          On the live site this is where we confirm your quote request and
          reply within one working day. This system-page demo stops here and
          sends nothing.
        </p>
        <p className="mt-6 font-mono text-caption uppercase tracking-[0.18em] text-smoke">
          Demo — production form posts via FormSubmit
        </p>
      </m.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid max-w-2xl gap-6 sm:grid-cols-2"
    >
      <Input
        label="Name"
        required
        autoComplete="name"
        placeholder="Adaeze Okafor"
        error={errors.name?.message}
        {...register("name")}
      />
      <Input
        label="Email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@company.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <div className="sm:col-span-2">
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
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </div>
      <div className="sm:col-span-2">
        <Textarea
          label="About the project"
          required
          placeholder="What are we putting up, and where?"
          hint="Location and timeline help us quote accurately."
          error={errors.message?.message}
          {...register("message")}
        />
      </div>
      <div className="sm:col-span-2">
        <MagneticButton asSubmit disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Request a quote"}
        </MagneticButton>
      </div>
    </form>
  );
}
