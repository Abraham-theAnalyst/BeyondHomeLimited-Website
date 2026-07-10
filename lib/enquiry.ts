import { z } from "zod";

/**
 * One enquiry schema, validated in the browser (React Hook Form) and again
 * on the server (/api/enquiry) before anything is forwarded to FormSubmit.
 */
export const enquirySchema = z.object({
  name: z.string().min(2, "Tell us who to reply to.").max(200),
  organisation: z.string().max(200).optional(),
  email: z
    .string()
    .email("That email doesn't look right. Check the format.")
    .max(320),
  phone: z.string().max(40).optional(),
  service: z.string().min(1, "Pick the service closest to your project.").max(100),
  budget: z.string().max(40).optional(),
  message: z
    .string()
    .min(10, "A sentence or two about the project helps us reply usefully.")
    .max(5000),
  /** honeypot — humans never see or fill this */
  company_website: z.string().max(500).optional(),
  /** where the submission came from, for the email's "Submitted from" line */
  source: z.enum(["contact-page", "slide-over"]).optional(),
  page: z.string().max(300).optional(),
});

export type EnquiryData = z.infer<typeof enquirySchema>;
