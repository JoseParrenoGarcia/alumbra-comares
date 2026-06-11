---
name: score-site
description: >
  Score the Alumbra Comares website against the full 23-criterion audit rubric.
  Use when: running a milestone audit, checking site readiness before a PR merge,
  verifying content completeness after a build milestone, producing a structured
  scorecard for the PR description, assessing which areas need work before the
  next milestone, checking persona coverage gaps, auditing content JSON for
  placeholders, reviewing whether all 13 visitor personas are served.
  Trigger phrases: "score the site", "run the audit", "audit rubric", "scorecard",
  "how does the site score", "check site against rubric", "milestone audit",
  "content audit", "persona audit".
  What it does: reads index.html and all content JSON files under content/, scores
  each of the 23 rubric criteria (0/1/2), and writes a dated report to
  docs/research/scores/ with a criterion table and persona coverage summary.
  Exclusions: does not test deployed performance, CSS rendering, or analytics.
  Does not compare two milestones (each run is a standalone snapshot). Does not
  check JavaScript behaviour.
argument-hint: "[milestone-id]"
allowed-tools: Read Write Bash
model: claude-sonnet-4-6
effort: medium
paths: "index.html,content/**"
---

# score-site

Score the Alumbra Comares site against the full audit rubric and output a structured report.

## Workflow

### Step 1 — Read the site files

Read these files before scoring anything. Do not score from memory or prior context.
Read both `index.html` and the content JSON files — neither alone is sufficient. WhatsApp link format (`wa.me/`) and `aria-label` attributes only appear in HTML; service descriptions and placeholder flags only appear in JSON.

```
index.html
content/services.json
content/team.json
content/contact.json
content/events.json
content/hero.json
content/why-alumbra.json
content/philosophy.json
content/footer.json
content/testimonials.json
content/site.json
```

Also check: `docs/research/m14-audit-rubric.md` (the rubric) — see `references/rubric.md` for the pointer.

### Step 2 — Apply scoring rules

For each content field read:
- If the value is `__PLACEHOLDER__` or the field has `"placeholder": true` → treat as **missing** (score 0, not 1)
- If a JSON field is `null` (e.g. `"en": null`) → treat as **not yet implemented** (score 0 for that language, 1 if other language content is present and the criterion does not require that language)
- HTML structure present + JSON content = `__PLACEHOLDER__` → **does not pass**. The criterion requires actual content.

### Step 3 — Score each criterion

Work through C1–C23 in order. For each:
1. State what you observed (one sentence max)
2. Assign 0, 1, or 2

Use the rubric definitions:
- **2** — passes clearly, visitor need met without friction
- **1** — partial, need addressed but with gaps
- **0** — fails, need not met

#### C1 — Services understandable without prior knowledge
Check: `content/services.json` items[].description.es — is each description a plain sentence a non-expert can understand? Service name alone = 0.

#### C2 — Postpartum and lactation visible as first-class services
Check: `content/services.json` — does "Seguimiento del Posparto" or equivalent appear as a top-level item, not buried? Is lactation explicitly named?

#### C3 — Team named, credentialed, and human
Check: `content/team.json` members[] — do all three (Isabel, Alicia, Leticia) have name + role + bio? Is image field a real path or `__PLACEHOLDER__`?

#### C4 — Contact reachable in two taps or less
Check: `index.html` for nav structure and persistent contact elements. Check `content/contact.json` channels[]. Is there a direct phone or WhatsApp in the nav or a sticky element?

#### C5 — Price or price range visible
Check: `content/services.json` items[].price — are any amounts not `__PLACEHOLDER__`? Is there any pricing signal in descriptions?

#### C6 — Public system relationship clear
Check: `content/services.json` descriptions and `content/why-alumbra.json` — is there any text explaining complementarity with the hospital/public pathway?

#### C7 — Events discoverable and actionable
Check: `content/events.json` items[] — are dates real (not `__PLACEHOLDER__`)? Is there a sign-up or notify route? A section heading with placeholder dates scores 0.

#### C8 — Copy inclusive of partners and co-parents
Check: `content/services.json` descriptions and `content/philosophy.json` — does any copy mention "paternidad", "parejas", "familias", or the partner role explicitly?

#### C9 — Usable on mid-range mobile
Check: `index.html` for viewport meta tag, `aria-label` on nav-toggle, mobile menu structure. Note: full render testing is outside scope; score based on structural signals.

#### C10 — Low-pressure first step identified
Check: `content/hero.json` cta_primary/cta_secondary and `content/contact.json` subheading — does any CTA explicitly frame contact as low-commitment or exploratory?

#### C11 — Home birth surfaced as explicit service
Check: `content/services.json` — does "parto domiciliario" appear in a service title or description with scope? Mention in a description alongside other options scores 1.

#### C12 — Previous trauma addressed
Check: `content/philosophy.json` body, `content/team.json` bios — does any copy acknowledge prior difficult experiences, trauma, or the need for a different birth experience?

#### C13 — Low digital confidence usable
Check: `index.html` nav labels, aria-labels on interactive elements (nav-toggle, lang-select, close button). Plain Spanish labels in nav = signal of usability.

#### C14 — English or language switch present
Check: `index.html` for lang selector element. Check `content/hero.json` and `content/services.json` for `"en"` fields — if all are `null`, the switch is structural only (score 1, not 2).

#### C15 — Professional legitimacy signalled
Check: `content/team.json` bios for colegiada numbers, association names, insurance, or named accreditations. "Matrona" title alone = 0.

#### C16 — Reads as collective, not solo-voice
Check: `index.html` hero section and headings. Check `content/team.json` — do all three members have equal weight? Is "nosotras" or equivalent used in headings?

#### C17 — Safety and transfer plan addressed
Check: `content/services.json` descriptions (especially "Atención al Parto" and "parto domiciliario") and `content/philosophy.json` — is there any safety or transfer language?

#### C18 — Free or no-commitment intro contact offered
Check: `content/contact.json` subheading and `content/hero.json` cta copy — does any element name a free first meeting, call, or explicitly no-commitment contact?

#### C19 — WhatsApp available as dedicated channel
Check: `index.html` for `wa.me/` link. Check `content/contact.json` channels[] for a WhatsApp entry. Phone number as text only = 1. No WhatsApp reference = 0.

#### C20 — Homepage narrative sequence correct
Check: `index.html` section order. Expected: hero → services/pathways → philosophy → team → contact. Note any major sequence violations.

#### C21 — Useful to referring health professionals
Check: `content/services.json` and `content/team.json` — can a GP confirm services, qualifications, and contact in one scroll? No dedicated referral section needed.

#### C22 — Tone warm and evidence-grounded
Check: `content/philosophy.json` body and `content/hero.json` subheadline. Look for: plain warm language + scientific evidence reference. Red flags: vague mystical language, cold clinical lists, or fear-based copy.

#### C23 — Legible to family referrers
Check: `index.html` hero section copy and nav labels. Can a casual browser grasp within 30 seconds who Alumbra Comares are, what they do, and how they differ from the public system?

---

### Step 4 — Write the report file

Write the report to `docs/research/scores/YYYY-MM-DD.md` (use today's date). Each run is an independent snapshot — do not diff against prior runs. If the directory does not exist, create it.

If a milestone ID was passed as an argument (e.g. `/score-site M15`), use `$ARGUMENTS` as the "Milestone audited" value. If no argument was passed, write the most recently completed milestone from `docs/plan.md`.

Use this exact format:

```markdown
## Site Audit Scorecard — Alumbra Comares

**Milestone audited:** $ARGUMENTS (or most recent complete milestone)
**Date:** YYYY-MM-DD
**Auditor:** [agent or human name]

| Criterion | Score | Personas affected | Finding | Why it matters | Proposed fix |
|-----------|-------|-------------------|---------|----------------|--------------|
| C1 — Services understandable | /2 | P1, P2, P7 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C2 — Postpartum/lactation visible | /2 | P3, P5 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C3 — Team named and credentialed | /2 | P1, P2, P8, P9 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C4 — Contact reachable in two taps | /2 | P4, P6, P7 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C5 — Price visible | /2 | P2, P11 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C6 — Public system relationship clear | /2 | P1, P12 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C7 — Events discoverable | /2 | P1, P3 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C8 — Co-parent inclusive copy | /2 | P5, P6 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C9 — Mobile usable | /2 | P4, P6 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C10 — Low-pressure first step | /2 | P1, P9 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C11 — Home birth surfaced | /2 | P7, P8, P11 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C12 — Previous trauma addressed | /2 | P9 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C13 — Low digital confidence usable | /2 | P3, P6 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C14 — English / language switch | /2 | P10, P11 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C15 — Professional legitimacy | /2 | P9, P11, P13 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C16 — Collective, not solo-voice | /2 | P1, P2 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C17 — Safety and transfer plan | /2 | P7, P8, P9, P12 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C18 — Free intro contact offered | /2 | P1, P9, P10 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C19 — WhatsApp contact available | /2 | P4, P6, P7 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C20 — Homepage narrative sequence | /2 | P1, P2 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C21 — Useful to referring professionals | /2 | P13 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C22 — Tone warm and grounded | /2 | P9, P12 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| C23 — Legible to family referrers | /2 | P12 | [one-line observation] | [one sentence] | [one sentence or "none needed"] |
| **Total** | **/46** | | | | |

**Pass threshold:** 32/46

### Persona coverage summary

For each persona: list the criteria that apply to them, sum their scores, and note the single biggest unmet need.

| Persona | Criteria that apply | Score | Max | Biggest gap |
|---------|---------------------|-------|-----|-------------|
| P1 — First-time pregnancy | C1, C2, C6, C7, C10, C16, C20 | | /14 | [one sentence] |
| P2 — Considering private midwifery | C1, C5, C15, C16, C20 | | /10 | [one sentence] |
| P3 — Postpartum / new mother | C2, C7, C13 | | /6 | [one sentence] |
| P4 — Mobile-first / low bandwidth | C4, C9, C19 | | /6 | [one sentence] |
| P5 — Pregnant with partner involved | C2, C8 | | /4 | [one sentence] |
| P6 — Rural or isolated | C4, C8, C9, C13, C19 | | /10 | [one sentence] |
| P7 — First-time home birth | C4, C11, C17, C19 | | /8 | [one sentence] |
| P8 — Repeat home birth | C3, C11, C17 | | /6 | [one sentence] |
| P9 — Traumatic prior birth | C3, C10, C12, C15, C17, C18, C22 | | /14 | [one sentence] |
| P10 — English-speaking expat | C14, C18 | | /4 | [one sentence] |
| P11 — Expat from midwife-led system | C5, C11, C14, C15 | | /8 | [one sentence] |
| P12 — Sceptical family member | C6, C17, C22, C23 | | /8 | [one sentence] |
| P13 — Professional referrer | C15, C21 | | /4 | [one sentence] |

### 3 Lowest-Scoring Areas (prioritised)

1. **[Criterion name]** (score: N/2 · personas: PX, PY) — [one sentence: what is missing and what to add]
2. **[Criterion name]** (score: N/2 · personas: PX, PY) — [one sentence: what is missing and what to add]
3. **[Criterion name]** (score: N/2 · personas: PX, PY) — [one sentence: what is missing and what to add]
```

After writing the file, print the file path to the terminal so the agent or human knows where to find it.

---

## Gotchas

- **`__PLACEHOLDER__` in JSON = score 0, not 1.** A placeholder is missing content, not partial content. Do not award partial credit for structural presence alone.
- **HTML present + JSON placeholder = fail.** If the HTML section exists but the content JSON field is `__PLACEHOLDER__`, the criterion does not pass. Both must be present and real.
- **`null` language fields.** `"en": null` means the English translation is not implemented. If the criterion requires English (C14), this is relevant. For Spanish-only criteria, null English fields are not penalised.
- **Phone number ≠ WhatsApp.** A phone number displayed as text in contact.json does not satisfy C19. The `wa.me/` link format in HTML is the pass signal for C19 = 2.
- **Collective voice check.** Check that no single midwife's name dominates the hero or primary CTA. All three names should appear with roughly equal presence in team.json.
- **Events section.** Workshop titles and descriptions in events.json are real content. But if `"date": "__PLACEHOLDER__"` and `"placeholder": true` are set, the event is not actionable — score 0 for C7.
- **Tone criterion (C22).** This is a qualitative judgement. Read the philosophy.json body and hero subheadline together. If they are warm and evidence-grounded, score 2. If only one of those qualities is present, score 1.
- **Do not infer content from CSS or JS.** Only score what is present in HTML structure and content JSON. Do not assume a section renders its JSON content correctly without reading both.

---

## References

- Rubric: see `references/rubric.md` → `docs/research/m14-audit-rubric.md`
- Personas: see `references/personas.md` → `docs/research/m14-personas.md`
- Canvas: see `references/canvas.md` → `docs/research/Alumbra_Comares_Best_Practice_Canvas.md`
