# M17 — Information Architecture Audit (External Agent Prompt)

Copy-paste the block below into GPT, Codex, Claude, or another agent of choice. The agent must have read access to the local repository at `/Users/joseparreno/Documents/GitHub/alumbra-comares`.

---

## Prompt to paste

You are working in a static website repository at `/Users/joseparreno/Documents/GitHub/alumbra-comares`.

Your task is to produce the **M17 Information Architecture (IA) Audit** for the Alumbra Comares website. This is a **decision and planning document only** — no code, no implementation specs, no markup. The output must give the founders and future agents enough detail to make a confident IA decision and understand the consequences of each path.

### Project context

Alumbra Comares is a private midwife collective serving Valencia, Spain. The website is a static HTML/CSS/JavaScript single-page site with content stored in JSON files under `content/`. The HTML templates are bare scaffolds; `js/content-loader.js` reads JSON and injects content at page load. There is no build step. The site is hosted on GitHub Pages.

The current homepage is a single page with anchor-based navigation. As of mid-2026, twelve sections are stacked vertically:

```
hero → quienes-somos → por-que → equipo → formacion → servicios →
como-trabajamos → faq → eventos → testimonios → recursos → contacto
```

Two legal pages already exist as separate URLs: `/privacidad.html` and `/cookies.html`. They are linked from the footer.

Current content state:
- All copy is Spanish only; every `"en"` field in the JSON is `null`. English rollout is planned in M25, Valencian/Catalan in M26.
- Pricing fields are all `__PLACEHOLDER__` — the founders have not yet committed prices.
- Team registration numbers, insurance, and credentials are all `__PLACEHOLDER__`.
- A baseline scoring run produced **26/46 (below the 32/46 threshold)** — see `docs/research/scores/2026-06-11.md`.

### Required reading (read all before forming conclusions)

Read these files in order. The audit must be grounded in their actual content.

1. `docs/PRD.md` — product goals, non-goals, language strategy, IA section (§10)
2. `docs/plan.md` — full milestone roadmap including pending milestones (M15, M20–M31)
3. `docs/milestones/m17.md` — the audit's own task spec
4. `docs/research/m14-personas.md` — 13 visitor personas (P1–P13) with needs, fears, and contact preferences
5. `docs/research/m14-audit-rubric.md` — 23-criterion rubric with persona coverage matrix
6. `docs/research/scores/2026-06-11.md` — most recent scorecard run (the baseline)
7. `docs/research/Alumbra_Comares_Best_Practice_Canvas.md` — benchmark synthesis
8. `index.html` — current section order and DOM structure
9. `content/services.json`, `content/faq.json`, `content/how-we-work.json`, `content/resources.json`, `content/team.json` — current content state
10. `js/content-loader.js` — to understand how each section is loaded and how a multi-page split would interact with the loader

### What the audit must cover

The output is a single Markdown document. Use H2/H3 headings, comparison tables, and bullet lists. Every claim should be defensible from the source files.

#### 1. Current state assessment
- How many sections does the homepage have? Estimated scroll depth on a 375px mobile viewport (number of full-screen heights).
- Is the single-page structure still cognitively manageable? Has it crossed a complexity threshold?
- Which sections are "homepage-summary" content (short, intro-style) vs "full standalone" content (deep, list-heavy, deserves its own surface)?
- Does the current 5-item anchor nav still scale to 12 sections?

#### 2. Content growth projection
Project content volume forward against the pending roadmap:
- M15 — services rewrite (likely longer descriptions, possible service detail pages)
- M20 — SEO foundations (per-page metadata, structured data)
- M21 — content governance (editorial rules, changelog discipline)
- M22 — assets and media audit (images, alt text, social cards)
- M25 — English rollout
- M26 — Valencian rollout
- Future blog posts, pricing tiers, more downloadables, more events
- Which content types grow unboundedly (resources/blog, events) vs stay fixed (team, philosophy)?
- If all planned content lands, what does the homepage look like?

#### 3. Three IA options — detailed comparison

For each option, cover all of these dimensions:
- structure description
- proposed navigation model
- how it serves each of the 13 personas' journeys (a brief table mapping persona → option fit)
- SEO implications (page-level metadata, FAQ schema, indexable URLs, anchor links vs canonical pages)
- i18n implications for ES → EN → CA rollout — URL structure, content routing, switcher behaviour
- internal linking needs
- sitemap.xml needs
- maintenance burden for non-technical founders editing JSON
- mobile UX implications
- implementation complexity estimate (high/medium/low) relative to the current codebase

The three options:

**Option A — Stay single-page**
Keep the anchor-based homepage. Optimise section order and add in-page cross-links. Improve nav UX (sticky? grouped? collapsible?).

**Option B — Hybrid: single-page homepage + detail pages for depth content**
Homepage stays as a summary/landing page. Some sections get their own URLs. Consider candidates:
- `/servicios` — services detail page
- `/como-trabajamos` — full How We Work / Safety page
- `/faq` — full FAQ page (FAQ schema benefit)
- `/formacion` — credentials and education detail
- `/recursos` — resources library / blog index
- `/blog/<slug>` — individual posts (future)
- `/contacto` — possibly its own page

The legal pages (`/privacidad`, `/cookies`) already follow this pattern.

**Option C — Full multi-page**
Homepage is a true landing page (hero + above-fold intro + CTAs only). Every major section gets its own URL.

#### 4. Navigation scalability
- Does the current 5-item anchor nav still scale at 12 sections?
- Nav shape under each option (drop-downs? section groups? sticky? hamburger-only?)
- Secondary nav needs (within `/recursos` listing, within `/servicios` detail page)

#### 5. Internal linking structure
- Which content pairs naturally need cross-links?
  - services ↔ FAQ
  - services ↔ how-we-work
  - how-we-work ↔ contact
  - credentials ↔ services
  - team ↔ credentials
  - resources ↔ services / FAQ
- Under which options are these cross-links critical vs nice-to-have?
- Minimum internal linking structure for good SEO and persona-journey flow.

#### 6. Sitemap and SEO
- Sitemap entries under each option.
- Which option gives the best SEO surface for Spanish keywords relevant to private midwifery in Valencia? (consider: "matrona privada Valencia", "parto en casa Valencia", "lactancia matrona Valencia", "preparación al parto Valencia")
- FAQ as standalone page — is FAQ schema markup worth the structural change?
- How does multi-language affect URL structure: `/en/`, `/ca/` subfolders vs `?lang=en` query vs `en.alumbra-comares.es` subdomain?

#### 7. i18n implications
- Current state: Spanish-only content; every `"en"` and `"ca"` field is `null`. The language switcher is structural-only.
- Under each IA option, what does the URL structure and content routing look like for multi-language?
- Which option makes M25 (English rollout) and M26 (Valencian rollout) easiest without a full rebuild?
- Are there language-switcher UX implications per option (in-page toggle vs whole-page reload)?

#### 8. Founder editing burden
- The founders are not developers. They edit JSON files via the GitHub web editor or a local clone.
- Under each option, what does it take to update a service description, add an FAQ, post a new resource, or fix a typo?
- Does any option require new tooling (a CMS, Markdown processor, build step)?

#### 9. Recommendation
- One recommended direction with a clear, opinionated rationale.
- If Option B (hybrid): an ordered list of which pages to split off first, with a why-now/why-later argument for each. Pages to keep on the homepage.
- A proposed page map: URL → primary content → nav label.
- A proposed navigation structure (top nav + footer nav + sticky behaviour).
- Key risks and tradeoffs of the recommended option.
- Implications for pending milestones M20 (SEO), M25 (English), M26 (Valencian), M27 (accessibility), M28 (404 / fallback pages).

### Output

Write the audit to `docs/research/m17-ia-audit.md`. Do not edit any other file. Do not produce code, HTML, CSS, or JS.

Aim for **depth over brevity** — this is a durable decision artifact that will inform multiple downstream milestones. A non-technical founder must be able to read the recommendation and act on it confidently. Use tables for option comparisons. Use bullet lists for findings.

After writing the file, output the file path and a 5-bullet summary of the key findings.

### Constraints

- No implementation code, no markup, no CSS, no JS examples.
- Do not redesign the site visually in this audit.
- Do not propose new content; assess the existing content and project its growth.
- Every recommendation must reference at least one persona, one rubric criterion, or one concrete content example from the JSON files. No generic web advice.
- If the audit recommends a multi-page structure, propose a phased migration path — not a big-bang rewrite.

---

## Notes for Jose (not part of the prompt)

- Paste the block above (everything between the two `---` markers) into the external agent.
- The agent needs read access to the repo. If using ChatGPT with Codex or Claude with file access, point it at the repo root.
- Expected runtime: 10–20 minutes for a thorough output.
- After the audit lands at `docs/research/m17-ia-audit.md`, review with the founders before acting on any restructuring milestone (M20 onwards).
