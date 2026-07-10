# Beyond Home Limited — website

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion (LazyMotion) + Lenis.
Content lives in `lib/services.ts`, `lib/work.ts`, `lib/testimonials.ts`.
Client-facing task list: `HANDOFF.md`.

## Local development

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
```

## Production build

```bash
npm run build                # must finish with zero errors/warnings
npx next start -p 3000
```

## Environment variables

See `.env.example` for full comments.

| Variable | Purpose |
|---|---|
| `FORMSUBMIT_TARGET` | Enquiry delivery inbox or FormSubmit alias |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap, JSON-LD |

## Deploying to Vercel

1. Push this repository to GitHub and import it at vercel.com → **Add New →
   Project**. Framework auto-detects as Next.js; defaults are correct.
2. In **Project → Settings → Environment Variables**, add
   `FORMSUBMIT_TARGET`. `NEXT_PUBLIC_SITE_URL` can stay unset until the
   real domain is connected — the site falls back to Vercel's deployment
   URL so social previews and the sitemap work from day one. Set it to
   `https://beyondhome.com.ng` when the domain goes live.
3. Deploy. Verify the preview URL end to end before pointing the domain.
4. Connect the domain: **Project → Settings → Domains → Add** →
   `beyondhome.com.ng` (and `www.beyondhome.com.ng`, redirected to the apex).
   At the registrar's DNS panel:
   - Apex `beyondhome.com.ng`: `A` record → `76.76.21.21`
   - `www`: `CNAME` → `cname.vercel-dns.com`
   Vercel shows the exact records and validates them; certificates issue
   automatically once DNS propagates.

## Post-launch checklist

- [ ] **Activate FormSubmit**: submit the live contact form once, open the
      confirmation email FormSubmit sends to info@beyondhome.com.ng, click
      the activation link, then submit again and confirm the enquiry email
      arrives (check the table layout, the reply-to, and the
      "Submitted from" line). Optionally switch `FORMSUBMIT_TARGET` to the
      random alias FormSubmit issues after activation and redeploy.
- [ ] **Google Search Console**: add the domain property, verify via DNS,
      and submit `https://beyondhome.com.ng/sitemap.xml`.
- [ ] **Google Business Profile**: create/claim it with name, address and
      phone exactly as on the site (Beyond Home Limited · Ogba, Ikeja,
      Lagos · +234 806 010 7065) so local search signals agree.
- [ ] **Real-phone test over mobile data**: tap the tel: link (dialer opens
      with +234 806 010 7065), the WhatsApp links (chat opens with the
      prefilled text), and send one enquiry from the phone.
- [ ] Re-run Lighthouse (or PageSpeed Insights) against the live domain —
      lab numbers on real hosting are the ones that count.

## Notes for future work

- `/direction` and `/system` are internal reference pages (design direction
  and design system). They are excluded from the sitemap and robots-blocked,
  but reachable by URL. Delete their folders under `app/` if unwanted.
- Every image quality decision is documented in `lib/work.ts` (natural
  dimensions per asset; layouts cap display at ~1.3× source width).
- New client components that animate must import `m` from framer-motion
  (LazyMotion `domAnimation` is loaded globally); plain `motion` will throw.
