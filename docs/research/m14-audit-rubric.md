# M14 — Website Audit Rubric: Alumbra Comares

A reusable evaluation template. Apply after any milestone that changes visible content, layout, or contact flows. Score each criterion and note what you observed — not just what the score is.

---

## How to Score

| Score | Meaning |
|-------|---------|
| 2 | Passes clearly. A visitor with this need would find what they need without friction. |
| 1 | Partial. The need is addressed but with gaps — unclear language, buried content, or missing detail. |
| 0 | Fails. The need is not met or the content actively creates confusion. |

Total possible: 46 points (23 criteria × 2).

A score below 32 warrants a review before moving to the next milestone.

---

## Criteria

### C1 — Services are understandable without prior knowledge

**Persona(s):** P1, P3, P6  
**What to check:** Can a visitor with no experience of private midwifery understand what each service involves — what happens, roughly how often, and where? Service names alone do not pass. At least one sentence of plain description per service is required.

| Score | Observation |
|-------|-------------|
| | |

---

### C2 — Postpartum and lactation are visible as first-class services

**Persona(s):** P4  
**What to check:** Postpartum and lactation services appear in the main services section, not only as sub-items under pregnancy content. A visitor arriving in a postpartum crisis can find these without scrolling through pregnancy-focused content first.

| Score | Observation |
|-------|-------------|
| | |

---

### C3 — Team is named, credentialed, and human

**Persona(s):** P1, P2, P3, P9, P11  
**What to check:** Isabel, Alicia, and Leticia each appear with their name, a photo or strong visual presence, and at least one credential or specialist area. A visitor can distinguish the three midwives from each other. Generic "our team" copy without individual profiles does not pass.

| Score | Observation |
|-------|-------------|
| | |

---

### C4 — Contact is reachable in two taps or less from anywhere on the site

**Persona(s):** P4, P6  
**What to check:** A WhatsApp button and/or phone number is accessible from the main navigation or a persistent element. A visitor on mobile can reach a contact action without returning to a specific page. Check for `wa.me/` link format in HTML or contact JSON. Test on a phone-sized viewport.

| Score | Observation |
|-------|-------------|
| | |

---

### C5 — Price or price range is visible for at least one service

**Persona(s):** P2, P11  
**What to check:** At least one service shows a price, price range, or a clear signal about cost ("from X euros", "paquetes desde X"). A site with no pricing information at all scores 0. A site with "contact us for pricing" scores 1 only if it is paired with a low-friction contact route. Check both HTML and services.json — a price field with `__PLACEHOLDER__` counts as missing.

| Score | Observation |
|-------|-------------|
| | |

---

### C6 — The site explains how private care relates to the public system

**Persona(s):** P1, P3, P11  
**What to check:** Somewhere on the site — in services, FAQ, or a "how we work" section — it is made clear that private midwife accompaniment complements rather than replaces the public hospital pathway. A first-time parent can answer the question "do I have to leave my hospital?" without asking.

| Score | Observation |
|-------|-------------|
| | |

---

### C7 — Events and workshops are discoverable and actionable

**Persona(s):** P5  
**What to check:** There is a section or page for events/workshops. If events are active, dates and a sign-up or contact route are visible. If no events are currently running, a follow or notify option exists. A "coming soon" with no further action scores 0. Event dates of `__PLACEHOLDER__` in events.json count as missing.

| Score | Observation |
|-------|-------------|
| | |

---

### C8 — Copy is inclusive of partners and co-parents

**Persona(s):** P3  
**What to check:** Service descriptions and the team page do not address only "mamás". At least one service or section explicitly mentions partners, co-parents, or the birth partner role. Language like "familias", "parejas", or equivalent signals that partners are part of the offering.

| Score | Observation |
|-------|-------------|
| | |

---

### C9 — The site is usable on a mid-range mobile with slow connection

**Persona(s):** P6  
**What to check:** Core content — who they are, what services exist, and how to contact them — is accessible on a 360px-wide viewport without horizontal scroll. Images load without blocking the page. The contact button is tappable (44px minimum touch target). Test with browser devtools mobile emulation.

| Score | Observation |
|-------|-------------|
| | |

---

### C10 — A new visitor can identify a low-pressure first step

**Persona(s):** P1, P5, P6  
**What to check:** At least one CTA on the page frames contact as low-commitment — "cuéntanos tu situación", "escríbenos sin compromiso", or equivalent. A visitor who is curious but not ready to book should not feel that the only option is to make a formal appointment request.

| Score | Observation |
|-------|-------------|
| | |

---

### C11 — Home birth is surfaced as an explicit service option

**Persona(s):** P7, P8  
**What to check:** Home birth (parto domiciliario) appears in the services section with at least a one-sentence description of scope. A visitor searching specifically for this service can confirm it is offered without contacting first. Check services.json descriptions and HTML.

| Score | Observation |
|-------|-------------|
| | |

---

### C12 — The site addresses visitors arriving after a previous birth trauma

**Persona(s):** P9  
**What to check:** Somewhere — in services, philosophy, team bios, or copy — there is language that acknowledges previous difficult birth experiences and frames the team's approach in terms of respect, safety, and personalised accompaniment. A visitor with trauma history should feel seen, not just sold to.

| Score | Observation |
|-------|-------------|
| | |

---

### C13 — The site is navigable for a visitor with low digital confidence

**Persona(s):** P6, P12  
**What to check:** Navigation is simple and labelled in plain Spanish. No jargon in menu labels. Mobile menu works and closes correctly. `aria-label` attributes are present on interactive elements (check HTML: nav-toggle, lang-select, close buttons). A non-technical visitor referred by a doctor can find contact options without confusion.

| Score | Observation |
|-------|-------------|
| | |

---

### C14 — The site has English-language content or a visible language switch

**Persona(s):** P10, P11  
**What to check:** A language selector exists and is visible. Switching to English produces translated content — not null fields. Check content JSON: if all `en` fields are `null`, the language switch is structural only and scores 1. If there is no selector at all, score 0.

| Score | Observation |
|-------|-------------|
| | |

---

### C15 — Professional legitimacy is signalled in team profiles

**Persona(s):** P2, P9, P11, P13  
**What to check:** At least one team member's bio or the about section includes a colegiada number, professional association membership, insurance reference, or a named accreditation. "Matrona" as a job title alone does not pass — a referring professional or cautious parent needs formal credentials to confirm competence.

| Score | Observation |
|-------|-------------|
| | |

---

### C16 — The site reads as a collective, not a solo founder

**Persona(s):** P2, P7, P8, P12  
**What to check:** The homepage and key sections foreground all three midwives, not a single face or voice. Headings use "nosotras", "nuestro equipo", or equivalent plural framing. No single midwife dominates the hero section or primary CTA. Check index.html and team.json.

| Score | Observation |
|-------|-------------|
| | |

---

### C17 — Safety and transfer plan are addressed

**Persona(s):** P7, P8, P9  
**What to check:** The site addresses what happens in an emergency or transfer for home birth clients — at minimum a brief statement that safety protocols exist or a reference to eligibility criteria. Absence of any safety language scores 0 for home-birth-seeking visitors. This can appear in services, FAQ, or philosophy.

| Score | Observation |
|-------|-------------|
| | |

---

### C18 — A free or no-commitment intro contact is offered

**Persona(s):** P1, P2, P9, P10  
**What to check:** The contact section or a CTA offers a first meeting, introductory call, or equivalent at no cost or commitment. "Contacta con nosotras" alone is not enough — the offer must frame the contact as exploratory and safe. Check contact.json and CTA copy in hero.json.

| Score | Observation |
|-------|-------------|
| | |

---

### C19 — WhatsApp is available as a dedicated contact channel

**Persona(s):** P4, P6, P7  
**What to check:** A WhatsApp CTA using the `wa.me/` link format is present in the contact section or as a persistent element. A phone number displayed as text without a `wa.me/` link scores 1 (partial). No WhatsApp reference at all scores 0. Check both HTML and contact.json.

| Score | Observation |
|-------|-------------|
| | |

---

### C20 — Homepage narrative sequence follows the recommended flow

**Persona(s):** P1, P2, P6  
**What to check:** Page sections roughly follow: hero → pathways/services preview → philosophy → team → contact/first step → trust layer → CTA. Exact order need not match, but services, team, and contact should all appear before the footer. Check section order in index.html.

| Score | Observation |
|-------|-------------|
| | |

---

### C21 — The site is useful to referring health professionals

**Persona(s):** P13  
**What to check:** A GP, gynaecologist, or paediatrician landing on the site can quickly confirm: (a) what services are offered, (b) who the team is and their qualifications, (c) how to contact or refer a patient. No dedicated referral section is required, but the information must be findable within one scroll.

| Score | Observation |
|-------|-------------|
| | |

---

### C22 — Tone is warm and evidence-grounded, not vague-mystical or clinical

**Persona(s):** P2, P9, P11  
**What to check:** Body copy uses plain, warm language grounded in evidence and respect. Avoid scoring this harshly on philosophy, but check: does the overall site read as calm and grounded? Red flags: excessive spiritual or wellness-only language without practical grounding; or conversely, cold clinical lists. Check philosophy.json body and hero.json subheadline.

| Score | Observation |
|-------|-------------|
| | |

---

### C23 — Influential non-primary visitors (family referrers) can understand the offering quickly

**Persona(s):** P12  
**What to check:** A parent or in-law looking at the site on behalf of a pregnant relative can grasp within 30 seconds: who Alumbra Comares are, what they do, and how they differ from the public system. The hero section and navigation labels alone should achieve this for a casual browser.

| Score | Observation |
|-------|-------------|
| | |

---

## Persona Coverage Matrix

This matrix shows which criteria address each persona's core needs. A persona with fewer than 2 criteria is under-served.

| Criterion | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | P11 | P12 | P13 |
|-----------|----|----|----|----|----|----|----|----|----|----|-----|-----|-----|
| C1 — Services understandable | ✓ | | ✓ | | | ✓ | | | | | | | |
| C2 — Postpartum/lactation visible | | | | ✓ | | | | | | | | | |
| C3 — Team named and credentialed | ✓ | ✓ | ✓ | | | | | | ✓ | | ✓ | | |
| C4 — Contact reachable in two taps | | | | ✓ | | ✓ | | | | | | | |
| C5 — Price visible | | ✓ | | | | | | | | | ✓ | | |
| C6 — Public system relationship clear | ✓ | | ✓ | | | | | | | | ✓ | | |
| C7 — Events discoverable | | | | | ✓ | | | | | | | | |
| C8 — Co-parent inclusive copy | | | ✓ | | | | | | | | | | |
| C9 — Mobile usable | | | | | | ✓ | | | | | | | |
| C10 — Low-pressure first step | ✓ | | | | ✓ | ✓ | | | | | | | |
| C11 — Home birth surfaced | | | | | | | ✓ | ✓ | | | | | |
| C12 — Previous trauma addressed | | | | | | | | | ✓ | | | | |
| C13 — Low digital confidence usable | | | | | | ✓ | | | | | | ✓ | |
| C14 — English or language switch | | | | | | | | | | ✓ | ✓ | | |
| C15 — Professional legitimacy | | ✓ | | | | | | | ✓ | | ✓ | | ✓ |
| C16 — Collective, not solo-voice | | ✓ | | | | | ✓ | ✓ | | | | ✓ | |
| C17 — Safety and transfer plan | | | | | | | ✓ | ✓ | ✓ | | | | |
| C18 — Free intro contact offered | ✓ | ✓ | | | | | | | ✓ | ✓ | | | |
| C19 — WhatsApp contact available | | | | ✓ | | ✓ | ✓ | | | | | | |
| C20 — Homepage narrative sequence | ✓ | ✓ | | | | ✓ | | | | | | | |
| C21 — Useful to referring professionals | | | | | | | | | | | | | ✓ |
| C22 — Tone warm and grounded | | ✓ | | | | | | | ✓ | | ✓ | | |
| C23 — Legible to family referrers | | | | | | | | | | | | ✓ | |

**Persona totals (number of criteria that address each):**
P1: 5 | P2: 7 | P3: 4 | P4: 3 | P5: 3 | P6: 7 | P7: 4 | P8: 4 | P9: 6 | P10: 3 | P11: 6 | P12: 4 | P13: 3

---

## Scoring Summary Template

Copy and fill this in when running an audit.

```
Milestone audited: M__
Date: YYYY-MM-DD
Auditor:

C1  — Services understandable:                    /2
C2  — Postpartum / lactation visible:             /2
C3  — Team named and credentialed:                /2
C4  — Contact reachable in two taps:              /2
C5  — Price visible:                              /2
C6  — Public system relationship clear:           /2
C7  — Events discoverable:                        /2
C8  — Copy inclusive of co-parents:               /2
C9  — Mobile usable:                              /2
C10 — Low-pressure first step:                    /2
C11 — Home birth surfaced:                        /2
C12 — Previous trauma addressed:                  /2
C13 — Low digital confidence usable:              /2
C14 — English / language switch present:          /2
C15 — Professional legitimacy signalled:          /2
C16 — Collective, not solo-voice:                 /2
C17 — Safety and transfer plan addressed:         /2
C18 — Free intro contact offered:                 /2
C19 — WhatsApp contact available:                 /2
C20 — Homepage narrative sequence:                /2
C21 — Useful to referring professionals:          /2
C22 — Tone warm and grounded:                     /2
C23 — Legible to family referrers:                /2

Total: /46

Summary of gaps:
-
-

Recommended actions before next milestone:
-
-
```

---

## Notes on Maintenance

- Add a criterion if a new persona is confirmed through real visitor research.
- Retire a criterion only if the underlying persona need no longer applies to the site's audience.
- Do not change scoring thresholds between milestones — consistency is what makes the rubric useful over time.
- This rubric evaluates the visitor experience, not the code. Run it by looking at the deployed site, not the source.
- The fail threshold (32/46) represents 70% of the maximum score, consistent with the original threshold ratio (14/20 = 70%).
