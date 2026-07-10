# Beyond Home website — what we need from you

This is the working list of things only Beyond Home can supply. The site is
built and works today; each item below either unlocks a feature that is
waiting, or replaces a stand-in with the real thing. Nothing on this list
blocks you from looking at the site right now.

---

## Before launch

**1. Click the FormSubmit activation email (important).**
The contact form and the "Start a project" panel send enquiries to
info@beyondhome.com.ng through a free service called FormSubmit. The first
time the form is used, FormSubmit sends a confirmation email to that inbox.
**Someone must open that email and click the link inside it once.** Until
then, no enquiries arrive by email. (Visitors are never stranded — if email
delivery fails for any reason, the site offers them a one-tap WhatsApp
message instead.)

**2. Confirm the website address.**
Everything is set up for **beyondhome.com.ng**. If the site will live at a
different address, tell us before launch.

**3. Logo files and permission for client names.**
The site lists the brands you have worked with as text: Unilever, MTN,
Konga, Heritage Bank, Dell, Martell, The Macallan, FMN, Orijin, Travelbeta,
Planet Projects and AMG. Text is the safe default. If you want their logos
shown instead, we need the logo files plus your written confirmation that
each brand is happy to appear.

**4. Social media addresses.**
The Facebook, Instagram, LinkedIn and X links in the footer and on the
contact page currently go nowhere. Send the exact web addresses for the
profiles you actually run, and we will wire them up. WhatsApp already works.

**5. Business hours.**
The contact page currently shows "Monday to Friday, 9:00 to 17:00" marked
as unconfirmed. Tell us the real hours.

**6. A high-resolution photo of the CEO.**
The portrait of O'Lekan Oladimeji on the About page came out of a PDF and
is small. It looks fine at the size we show it, but a proper photo (the
original file from whoever took it, not a WhatsApp forward) would let us
show it larger.

---

## Soon after launch

**7. Results for the case studies.**
Each of the seven project pages has a hidden "Results" section that appears
automatically once we have real numbers. For every project we need the
year it ran, and any outcome you can stand behind. The projects waiting:

- Golden Penny building wrap (Abuja) — year, outcome
- The Macallan building wrap (Abuja) — year, outcome
- Orijin tank and LED tower — year, outcome
- Goodlife Magik fleet — year, number of trucks if known, outcome
- Closeup tricycle and wall graphic — year, outcome
- Savana gantry billboard — year, outcome
- Bigi neon counter — year, outcome

"Outcome" can be anything true and specific: footfall, sales lift during
the campaign, how long the placement ran, repeat bookings. We will not
publish anything we cannot attribute.

**8. Two or three client testimonials.**
Real quotes with the person's name, job title and company, plus their
permission to publish. The testimonials section is already designed and
appears the moment the first real quote goes in. We will never use
invented quotes.

**9. Original project photography and footage.**
Most work photos on the site were rescued from your company profile PDF,
so they are small. Original photos from phones or cameras (sent as files,
not through WhatsApp, which shrinks them) would sharpen the whole site.
Same for any drone or install footage.

**10. Team photos.**
The six team members on the About page currently show as initials. A
simple set of portraits (same wall, same light, phone camera is fine)
would replace them.

**11. APCON / OAAN membership.**
If Beyond Home holds these or any other memberships or certifications,
send the details and we will add them to the About page. They are left off
until confirmed.

---

## How to change the words on the site

All the site's content lives in three plain-text files. Anyone comfortable
editing a text file can update them; the site rebuilds automatically when
changes are published.

- **`lib/services.ts`** — the six services: names, descriptions,
  deliverables.
- **`lib/work.ts`** — the case studies: titles, story text, years, results,
  quotes.
- **`lib/testimonials.ts`** — testimonials. Starts empty on purpose.

**A worked example.** Say The Macallan project ran in 2023 and you want the
year to show. Open `lib/work.ts`, find the Macallan entry, and change:

```
year: null,
```

to:

```
year: "2023",
```

Save, publish, done — the year appears on the case study page. Adding a
result works the same way: change `results: null` to

```
results: ["Ran for six months over Ahmadu Bello Way"],
```

and the Results section appears with that line in it. If in doubt, send us
the facts and we will make the edit.
