"use client";

import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Editorial form language: visible mono labels, transparent fields on a
 * hairline baseline, gold focus, semantic error red used for validation
 * only. No boxes, no rounded corners, no default component-library look.
 */

const fieldBase = cn(
  "w-full appearance-none rounded-none bg-transparent py-3 text-body text-paper",
  "border-0 border-b border-[var(--hairline)] outline-none",
  "placeholder:text-smoke/60",
  "transition-colors duration-fast ease-expo",
  "hover:border-smoke focus:border-gold",
  "aria-invalid:border-error"
);

function FieldShell({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="group/field">
      <label
        htmlFor={id}
        className="mb-1 block font-mono text-caption uppercase tracking-[0.18em] text-smoke"
      >
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-gold">
            *
          </span>
        )}
      </label>
      {children}
      <div className="mt-2 min-h-5 text-sm">
        {error ? (
          <p role="alert" className="text-error">
            {error}
          </p>
        ) : hint ? (
          <p className="text-smoke">{hint}</p>
        ) : null}
      </div>
    </div>
  );
}

type BaseProps = {
  label: string;
  error?: string;
  hint?: string;
};

export const Input = forwardRef<
  HTMLInputElement,
  BaseProps & InputHTMLAttributes<HTMLInputElement>
>(function Input({ label, error, hint, id, required, className, ...rest }, ref) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldShell id={fieldId} label={label} required={required} error={error} hint={hint}>
      <input
        ref={ref}
        id={fieldId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn(fieldBase, className)}
        {...rest}
      />
    </FieldShell>
  );
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea(
  { label, error, hint, id, required, className, rows = 4, ...rest },
  ref
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldShell id={fieldId} label={label} required={required} error={error} hint={hint}>
      <textarea
        ref={ref}
        id={fieldId}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        className={cn(fieldBase, "resize-none", className)}
        {...rest}
      />
    </FieldShell>
  );
});

export const Select = forwardRef<
  HTMLSelectElement,
  BaseProps & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }
>(function Select(
  { label, error, hint, id, required, className, children, ...rest },
  ref
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldShell id={fieldId} label={label} required={required} error={error} hint={hint}>
      <div className="relative">
        <select
          ref={ref}
          id={fieldId}
          required={required}
          aria-invalid={error ? true : undefined}
          className={cn(fieldBase, "cursor-pointer pr-8 [&>option]:bg-coal", className)}
          {...rest}
        >
          {children}
        </select>
        <ChevronDown
          size={16}
          aria-hidden
          className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-smoke"
        />
      </div>
    </FieldShell>
  );
});
