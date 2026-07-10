/**
 * Testimonials ship EMPTY on purpose. The homepage section renders only
 * when this array has entries — no placeholder quotes, ever.
 * Add real, attributed quotes here when the client supplies them:
 * { quote: "…", name: "Full Name", role: "Title", company: "Company" }
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const TESTIMONIALS: Testimonial[] = [];
