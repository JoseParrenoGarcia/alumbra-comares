# M17 — Information Architecture Audit (Consolidated)

**Status:** decision document — no code, no markup, no implementation specs
**Date:** 2026-06-12
**Inputs read:** `docs/PRD.md`, `docs/plan.md`, `docs/milestones/m17.md`, `docs/research/m14-personas.md` (P1–P13), `docs/research/m14-audit-rubric.md` (23 criteria), `docs/research/scores/2026-06-11.md` (26/46), `docs/research/Alumbra_Comares_Best_Practice_Canvas.md`, `index.html`, `content/{services,faq,how-we-work,resources,team}.json`, `js/content-loader.js`
**Source documents merged:** `m17-opus-audit.md` (Sonnet/Opus pass, in-session) and the prior `m17-ia-audit.md` (independent pass). Areas of agreement are presented as recommendations; areas of divergence are flagged in §11 as open questions for founder brainstorming.
**Action required:** founder review and selection of one option; downstream milestones (M20, M25, M26, M27, M28) and the PRD §10 will be updated based on the choice.

---

## Executive Summary

The Alumbra Comares website has crossed a structural threshold. The homepage now stacks twelve sections — including list-bearing surfaces (FAQ, resources) that grow unboundedly, deep standalone topics (services, how-we-work, formación), and competing CTAs (events, testimonials, contact, brochure download). On a 375px mobile viewport the page spans somewhere between **17 and 28 full-screen heights** depending on how stacked padding and accordion expansion are counted. Both independent passes agree it is past the simple-landing threshold, even before English (M25) and Valencian (M26) multiply the surface.

**Recommendation: Option B — Hybrid.** Keep the homepage as a curated landing page with summary blocks, and split decision-heavy / trust-heavy content onto its own URLs. This is the only option that:

1. Serves all 13 personas at "good" or better — information-seekers (P2, P4, P7, P8, P11, P13) jump from "poor/mixed" to "excellent"; casual personas (P1, P5, P12) keep the homepage experience.
2. Makes M25/M26 incremental (page-by-page translation) instead of all-or-nothing.
3. Unlocks FAQ schema markup and per-page metadata for M20 SEO foundations.
4. Migrates incrementally — one PR per page, homepage continues to function during every step.
5. Preserves the founder JSON-editing model unchanged.
6. Continues a pattern the site already uses for `/privacidad.html` and `/cookies.html`.

The two source passes converge on Option B and on the same general split set (`/faq`, `/como-trabajamos`, `/servicios`, `/recursos`, with `/formacion` and `/contacto` later). They diverge on **the order of phases** and on whether to wait for content maturity (M15, M18) before splitting. Those divergences are captured in §11 as decisions for the founders.

---

## 1. Current State Assessment

### 1.1 Section inventory

The homepage currently renders twelve sections in this DOM order, loaded sequentially by `js/content-loader.js`:

| # | Section ID | Content type | Driver JSON | Cards/items |
|---|-----------|--------------|-------------|-------------|
| 1 | `hero` | Landing | `hero.json` | 1 hero block |
| 2 | `quienes-somos` | Brand | `philosophy.json` (partial) | 1 prose block |
| 3 | `por-que` | Brand | `why-alumbra.json` | 3 pillars |
| 4 | `equipo` | People | `team.json` | 3 midwife cards |
| 5 | `formacion` | Trust | `team.json` (extended) + `education.json` | 3 expanded cards |
| 6 | `servicios` | Offer | `services.json` | 7 service cards |
| 7 | `como-trabajamos` | Trust/safety | `how-we-work.json` | 6 blocks |
| 8 | `faq` | Reassurance | `faq.json` | 9 Q&A items |
| 9 | `eventos` | CTA | `events.json` | 2 event cards (placeholder dates) |
| 10 | `testimonios` | Social proof | `testimonials.json` | 2 placeholder cards |
| 11 | `recursos` | Library + CTA | `resources.json` + brochure block | 6 resources + 1 download card |
| 12 | `contacto` | Conversion | `contact.json` | Form + 2 channel links |

Two legal pages already sit outside this flow as separate URLs: `/privacidad.html`, `/cookies.html`. The site is therefore **already a small hybrid**, just without depth pages for the core visitor journeys.

### 1.2 Mobile scroll depth

Estimating from rendered content per section and current CSS (post-M32 mobile padding optimisation), the homepage on a 375px viewport spans roughly **17 full mobile screens** end-to-end (Opus pass), expanding to **26–30 screens** if FAQ accordions are opened and padding stacks fully (independent pass). Either number is more than twice the depth recommended for a single-page small-business site (8–10 screens typical; 6 screens ideal for a service business with a strong CTA above the fold).

The new mobile carousels (M32) help bound testimonials, events, and resources horizontally — without them, the page would be closer to 20–22 screens. **Carousels are a coping mechanism for too-much-content-per-page; they are not a substitute for fewer pages.**

### 1.3 Has the single-page structure crossed the threshold?

Yes. It is still technically usable, but **wayfinding and cognitive load** have become bigger problems than loading speed or implementation simplicity.

The complexity threshold is not the section count but the **sum of content beneath each section**. The threshold gets crossed when:

- a single section becomes long enough to need its own internal scroll context (FAQ, resources)
- two or more sections compete for the role of "primary CTA" (contact form, WhatsApp button, brochure download, event signup)
- a visitor cannot scan the whole page in under 90 seconds (P5, P12)
- the navigation cannot fit all sections without grouping or wrapping

The site has crossed the first three.

### 1.4 Homepage-summary content vs full standalone content

| Section | Belongs on homepage? | Belongs on its own page? |
|---------|---------------------|--------------------------|
| hero | yes | no (it IS the homepage entry) |
| quienes-somos | yes | no |
| por-que | yes | no |
| equipo | summary yes | optional `/equipo` later |
| formacion | summary yes (badges) | yes (full credential page) |
| servicios | summary yes (top 3–4) | yes (full `/servicios`) |
| como-trabajamos | summary yes (3 blocks) | yes (full `/como-trabajamos`) |
| faq | summary yes (top 5) | yes (full `/faq`, FAQ schema) |
| eventos | summary yes | optional, only if event volume grows |
| testimonios | yes | no |
| recursos | summary yes (top 3) | yes (full `/recursos`, future `/blog`) |
| contacto | yes (homepage primary CTA) | optional `/contacto` |

Six sections have a clear case for a dedicated page (servicios, formación, como-trabajamos, faq, recursos, contacto). Six belong only on the homepage (hero, quienes-somos, por-que, equipo, eventos, testimonios). **This is the structural argument for Option B.**

### 1.5 Navigation strain

The current nav has six visible labels — Quiénes Somos, Por Qué, Equipo, Servicios, Eventos, Contacto — for twelve homepage sections. **Five sections are unreachable from nav** without scrolling: formación, como-trabajamos, faq, testimonios, recursos.

Consequences:
- **Discovery failure** — a visitor who has not scrolled cannot see that FAQ, How We Work, or resources exist (rubric C13)
- **Direct linking failure** — a founder cannot post "see our FAQ" with a working in-context link
- **SEO failure** — search engines cannot weight content that is not nav-linked

Six items was correct for the M4 iteration with 4 sections. It is not correct for the current 12 sections. Either nav grows to ~8 items with grouping, or sections move to their own pages and nav labels become page links.

### 1.6 Baseline score interpretation

The 2026-06-11 scorecard is **26/46** — six points below the 32/46 threshold. Zero-scoring criteria cluster in two groups:

- **Trust cluster:** C5 (price), C12 (trauma), C15 (credentials), C17 (safety/transfer), C18 (free intro)
- **Contact cluster:** C7 (events), C19 (WhatsApp)

**None of these gaps are caused by IA.** They are content gaps — pricing not yet decided, credentials not yet collected, WhatsApp not yet implemented. M17 cannot fix the score directly. But the IA decision affects how easily each gap can be **closed in language**:

- C5 (price): on a single page, pricing must appear inline next to each service card — awkward for placeholders. On `/servicios`, pricing fits naturally in a per-service block with explanatory copy.
- C15 (credentials): a `/formacion` page allows colegiada numbers, association memberships, and per-midwife specialisms without overwhelming the homepage.
- C17 (safety): single-page como-trabajamos squeezes safety into one block (hww-03). A `/como-trabajamos` page can give safety its own H2 with full transfer-protocol explanation — directly addressing P7, P8, P9, P12.
- C18 (free intro): one-page can address this in the contact CTA; multi-page allows a dedicated "primera consulta gratuita" surface.

**The IA decision removes the structural ceiling on how content can be expressed; it does not substitute for the content work itself.**

---

## 2. Content Growth Projection

### 2.1 Roadmap pressure on IA

| Milestone | Status | Content volume / IA effect |
|-----------|--------|----------------------------|
| M15 — Services rewrite | planned | Longer descriptions, possible per-service detail content. 7 services × ~3× length = services section grows from ~280vh to ~700vh on mobile if kept inline. Pushes `servicios` toward its own page. |
| M16/M16A — WhatsApp | planned | Adds one CTA element to every page's contact prompts. No structural impact, but increases CTA density. |
| M20 — SEO foundations | planned | Per-page metadata, structured data. **Much easier under Option B/C than Option A.** Multi-page allows per-page title, description, og:image, JSON-LD per content type. |
| M21 — Content governance | planned | Editorial rules and changelog. Easier to govern separated content domains than one overloaded homepage. |
| M22 — Asset readiness | planned | Real photos for team, hero, services. Each photo adds ~10–30vh of section height on mobile when it lands. |
| M25 — English rollout | planned | **2× content surface.** Every `"en"` field gets populated. |
| M26 — Valencian rollout | planned | **3× content surface.** |
| Future blog/articles | not yet milestoned | **Unbounded.** Each post is a card on `/recursos` plus a full page. Volume grows monthly. |
| Future pricing tiers | not yet milestoned | Each service may carry 2–3 tiers. 7 services × 3 tiers = 21 price cards if listed inline. |
| Future downloadables | not yet milestoned | Each PDF is a card on `/recursos`. Volume grows. |

### 2.2 Bounded vs unbounded content

**Fixed-size sections** — never grow much:
- hero, quienes-somos, por-que, equipo (3 midwives), testimonios (curation-bounded; 4–8 cards realistic ceiling)

**Slowly-growing sections** — grow with content milestones, then stabilise:
- formación (~3–5 entries per midwife), servicios (7 → 10), como-trabajamos (6 → 8–10)

**Unbounded-growth sections** — grow indefinitely with use:
- faq (could reach 30–50 items in 2 years), eventos, recursos / future blog

**The unbounded sections are the ones that will break a single-page model first.**

### 2.3 12-month projection per option

| Option | 12-month homepage state |
|--------|-------------------------|
| A — Single-page | Grows from 17 mobile screens to **~28**. M15 fattens services, FAQ grows from 9 to 25, resources from 6 to 15. Contact form is at screen 28 of 28. No longer scannable. |
| B — Hybrid | Stable at **~12–14 screens** because faq, recursos, servicios, como-trabajamos move to their own pages with summary blocks of 3–5 items each. |
| C — Multi-page | Drops to **~5–6 screens** (hero + intro + team + 3 service teasers + contact CTA). Site has 8–12 distinct URLs. |

If the roadmap lands without structural change, the homepage becomes a long-form landing page + services catalog + safety explainer + mini-FAQ hub + events teaser + testimonial surface + resource directory + multilingual SEO compromise. Too broad for one URL.

---

## 3. Three IA Options — Detailed Comparison

### 3.1 Option summary

| Dimension | A — Single-page | B — Hybrid | C — Multi-page |
|-----------|----------------|------------|---------------|
| Homepage scroll depth (12mo) | 28 screens | 12–14 stable | 5–6 |
| Sections in nav | 5–6 anchors (5 hidden) | 5–6 page links | 6–7 with groups |
| Persona fit (avg) | 7/13 served well | **13/13 served well** | 9/13 served well |
| SEO surface | 1 URL | 5–7 URLs | 12+ URLs |
| Keyword targeting | Diluted | Focused per page | Most focused, risks thin content |
| FAQ schema benefit | Possible | **Canonical** | Canonical |
| Deep-link sharing | Anchor only | Page URLs | Page URLs |
| i18n at M25 | Single large task | Page-by-page | Largest, page-by-page |
| Translation rollout | All-or-nothing | **Incremental** | Incremental |
| Founder editing | Lowest burden | Low (same JSON model) | Medium |
| Content scaling (12mo) | Page becomes unmanageable | Stable, detail pages absorb growth | Stable, but page count grows |
| Implementation cost | Lowest | Medium | Highest |
| Migration shape | None needed | Phased (one PR per page) | Step-change |
| Risk of regression | None | Low (homepage stays during migration) | Medium (homepage rewrite) |
| Mobile experience | Long scroll dominates | Short focused pages + summary home | Shortest pages, most clicks |

### 3.2 Persona fit per option

`High` = option naturally supports the persona's main journey. `Medium` = can work with careful execution. `Low` = the structure itself creates friction.

| Persona | A | B | C |
|---------|---|---|---|
| P1 — First-time, 20w | Medium | **High** | Medium |
| P2 — Comparing options | Low | **High** | High |
| P3 — Co-parent | Medium | **High** | Medium |
| P4 — Postpartum urgent | Low | **High** | Medium |
| P5 — Event-curious | Medium | **High** | Medium |
| P6 — Low digital confidence | Low–Medium | **High** | Low–Medium |
| P7 — First-time home birth | Low | **High** | High |
| P8 — Repeat home birth | Medium | **High** | High |
| P9 — Trauma | Medium | **High** | Medium–High |
| P10 — English expat | Low | **High** | Medium |
| P11 — Expat from MW system | Low–Medium | **High** | High |
| P12 — Sceptical family | Medium | **High** | Medium |
| P13 — Professional referrer | Low | **High** | High |

**Net:** Option A serves casual personas (P1, P3, P5, P12) reasonably and information-seekers (P2, P7, P8, P11, P13) and urgent personas (P4) poorly. Option B serves all 13 at "good" or better — no persona is worse off than under A. Option C serves information-seekers excellently but adds friction for casual personas (P1, P3, P6, P12).

### 3.3 Option A — Stay single-page

**Structure:** Keep the twelve-section homepage. Reorder for narrative flow (e.g. move `servicios` before `equipo` to address C20). Add in-page anchor cross-links. Improve nav with sticky behaviour and a hamburger exposing 8–10 anchors on mobile.

**SEO:** Weakest. One URL competes with itself for "matrona privada Valencia" vs "parto en casa Valencia" vs "lactancia Valencia". Anchors are weak substitutes for canonical content pages. FAQ schema can technically be applied but the page is already competing with itself for ranking signal.

**i18n:** Three languages live on one URL. Toggle is JS-only. Risk: M25 becomes a 50–100-string translation task that has to land in one PR. No partial state.

**Internal linking:** All anchor-based. No SEO link equity. Cross-link from FAQ to contact is just `<a href="#contacto">`.

**Sitemap:** 3 URLs (`/`, `/privacidad.html`, `/cookies.html`).

**Maintenance:** Lowest. Founders edit one JSON per section. No URL routing, no per-page metadata, no slug decisions.

**Mobile UX:** Long scroll dominates. Persistent floating WhatsApp button (M16A) becomes essential — without it, contact is at screen 17 of 17.

**Implementation complexity:** Lowest. Nav reorganisation and section-order tweaks only.

### 3.4 Option B — Hybrid (recommended)

**Structure:** Homepage stays as a curated landing with summarised sections. High-intent / trust-heavy content splits to dedicated URLs:

- `/servicios` — full services with extended descriptions, pricing tiers, what's included
- `/como-trabajamos` — full How We Work / Safety with transfer protocols, eligibility
- `/faq` — full FAQ with FAQ schema markup
- `/recursos` — resources library and (future) blog index
- *(optional)* `/formacion` — credentials detail
- *(optional)* `/contacto` — dedicated contact page

Homepage carries summary blocks: top 3–4 services, top 5 FAQs, top 3 how-we-work blocks, top 3 resource teasers, with explicit "ver todos los servicios" / "ver más preguntas" / "ver biblioteca completa" links. **This continues the pattern the site already uses for `/privacidad.html` and `/cookies.html`** — extending it for content pages is a continuation, not a new architecture.

**SEO:** 5–7 canonical URLs in Spanish. Each carries its own `<title>`, meta description, OG tags, and JSON-LD. No keyword cannibalisation. FAQ schema at `/faq` is canonical and enables Google rich snippets. Deep-link sharing works (Instagram bio → `/recursos`, WhatsApp → `/faq#parto-en-casa`).

**i18n:** Subfolder per language (`/`, `/en/`, `/ca/`). `hreflang` tags on each page. **Translation page-by-page** — translate `/servicios` first (highest SEO value for P10, P11), then `/faq`, then `/como-trabajamos`. Site can have English `/servicios` while `/recursos` is still Spanish-only — degraded but not broken. M25 becomes 4–6 incremental PRs instead of one big-bang.

**Internal linking:** Becomes critical. Homepage summaries → detail pages. Cross-page links (`/servicios` → `/faq#parto-en-casa`, `/faq` → `/contacto`, `/como-trabajamos` → `/servicios#parto`). Footer link cluster covering every page.

**Sitemap:** 9 URLs Spanish + 9 English (post-M25) + 9 Valencian (post-M26) = 27 URLs at full rollout. Manageable.

**Maintenance:** Slightly higher than A but minimal day-to-day difference. Adding an FAQ: still edit `faq.json`; the FAQ now renders on both homepage summary and `/faq`. Single source of truth — one JSON file per content type. No new tooling, no CMS, no build step.

**Mobile UX:** Each detail page is short (5–10 mobile screens). Homepage stays at 12–14 screens. Page-to-page navigation is faster than long-scrolling on mobile.

**Implementation complexity:** Medium. Requires extending `content-loader.js` to handle per-page contexts, page-level HTML scaffolds for each split-off page, per-page metadata handling, nav update from anchors to page links, CSS migration to work in both summary and full views. **Naturally phased — one PR per split-off page; the site keeps working during migration.**

### 3.5 Option C — Full multi-page

**Structure:** Homepage becomes a true landing page (hero + intro + 3 service teasers + 1 strong CTA + footer). Every other section becomes its own URL — `/sobre-nosotras`, `/equipo`, `/formacion`, `/servicios`, `/servicios/<slug>`, `/como-trabajamos`, `/faq`, `/eventos`, `/recursos`, `/recursos/<slug>`, `/contacto`. 12+ URLs in Spanish, multiplied by language count.

**SEO:** Highest surface area. Per-service pages can rank for very specific long-tail Spanish queries — strongest SEO play. Risk of thin content pages if some don't have enough body copy to rank. Risk of crawl budget dilution.

**i18n:** Same `/en/`, `/ca/` pattern as Option B but with twice as many pages to translate. Workload highest.

**Internal linking:** Critical and abundant. Footer becomes an internal sitemap.

**Sitemap:** 12+ URLs Spanish × 3 languages = 36+ URLs.

**Maintenance:** Highest. Each page has its own metadata, OG tags, possibly its own JSON content. Adding a service: edit `services.json` AND remember the per-service page exists if applicable.

**Mobile UX:** Each page short (3–6 mobile screens). Risk of "click fatigue" — visitors who want a comprehensive overview have to make many clicks.

**Implementation complexity:** Highest. 8–12 new HTML scaffolds, per-page metadata, comprehensive nav (likely with drop-downs). **Cannot be incremental** — the homepage has to commit to becoming a landing page (lose all its content), which is a step-change.

---

## 4. Navigation Scalability

### 4.1 Current nav at 12 sections

The current nav has six labels for twelve sections. Five are unreachable from nav without scrolling. **This is already broken from a discovery perspective.**

### 4.2 Nav under each option

| Option | Recommended nav shape |
|--------|----------------------|
| A | Sticky nav, ~8 anchors. At 12 the nav wraps. Workable but cluttered. Persistent floating WhatsApp button (M16A) becomes mandatory. |
| B | Sticky page nav, 5–6 destinations: Inicio, Servicios, Cómo Trabajamos, FAQ, Recursos, Contacto. Equipo/Formación can live in homepage anchors and footer. Persistent WhatsApp on every page. |
| C | Sticky page nav with 6–7 page links, possibly with drop-downs ("Sobre nosotras" → Equipo / Formación). Risk: drop-downs on small touch devices can be fiddly. |

### 4.3 Secondary nav needs (under B or C)

- **Within `/recursos`:** Filter chips by category (Libros / Asociaciones / Podcasts / Online), or category-grouped sections.
- **Within `/servicios`:** Per-service anchor list at the top. Optionally per-service pages later.
- **Within `/faq`:** Category groupings ("Sobre el acompañamiento" / "Sobre el parto" / "Logística") if FAQ grows past 15 items.

### 4.4 Sticky nav

In all three options, a **sticky top nav** on desktop is now warranted. The page is too tall for visitors to scroll back up to navigate. On mobile, pair with the persistent floating WhatsApp button as the primary contact path.

---

## 5. Internal Linking Structure

### 5.1 Natural cross-link pairs

These pairings directly support persona journeys and rubric criteria.

| From | To | Why |
|------|----|----|
| services (parto) | how-we-work#safety | P7, P8 need safety info adjacent to the parto offering |
| services | faq | Service descriptions raise questions that FAQ answers |
| how-we-work | services | The "how" naturally leads to the "what" |
| how-we-work#safety | contact | Visitors who read about safety often want to ask about their case |
| equipo | formación | Personality (bio) → credentials (formal trust) |
| formación | services | Specialisms unlock services (Isabel UK training → English-speaking offer) |
| faq#parto-en-casa | services#parto | Reference back to canonical service description |
| recursos | services / faq | Curated resources for visitors who want depth |
| testimonios | services | Social proof per service |
| any page | contact | Ubiquitous primary CTA |

### 5.2 Criticality per option

| Cross-link | A | B | C |
|-----------|---|---|---|
| services ↔ faq | nice | **critical** | **critical** |
| services ↔ how-we-work | nice | **critical** | **critical** |
| how-we-work ↔ contact | nice | **critical** | **critical** |
| credentials ↔ services | nice | **critical** | **critical** |
| team ↔ credentials | nice | recommended | **critical** |
| faq items → relevant page | n/a (anchor) | **critical** | **critical** |
| any page → contact | nice | **critical** | **critical** |

### 5.3 Minimum internal linking set under Option B

- Homepage summary blocks → detail pages ("ver todas las preguntas", "ver todos los servicios", "ver biblioteca completa")
- Every detail page nav links back to homepage and forward to `/contacto`
- FAQ items cross-link to relevant detail pages: faq-04 (parto en casa) → `/servicios#parto`, faq-07 (complicaciones) → `/como-trabajamos#safety`
- Services page cross-links to FAQ for service-specific questions
- Como-trabajamos cross-links to Servicios for the actual offer
- Footer carries every page link

---

## 6. Sitemap and SEO

### 6.1 Sitemap entries per option

| Option | Spanish URLs | × 3 languages |
|--------|-------------|--------------|
| A | `/`, `/privacidad.html`, `/cookies.html` — 3 | 9 |
| B | `/`, `/servicios`, `/como-trabajamos`, `/faq`, `/recursos`, `/formacion`, `/contacto`, `/privacidad`, `/cookies` — 9 | 27 |
| C | 12+ | 36+ |

### 6.2 Best SEO surface for Spanish keywords

| Query | Best landing surface | A | B | C |
|-------|---------------------|---|---|---|
| "matrona privada Valencia" | Homepage `/` | dilute | clean | clean |
| "parto en casa Valencia" | `/servicios#parto` | poor (buried) | **strong** | strongest |
| "lactancia matrona Valencia" | `/servicios#lactancia` | poor | **strong** | strongest |
| "preguntas matrona Valencia" | `/faq` | weak (no own URL) | **strong** (FAQ schema) | strong |
| "preparación al parto Valencia" | `/servicios#talleres` or `/eventos` | poor | **strong** | strongest |
| "matrona inglés Valencia" | `/en/` | weak | **strong** | strong |
| "biblioteca recursos embarazo" | `/recursos` | poor | **strong** | strong |

Option B captures the major Spanish queries with focused pages without the thin-content risk of Option C.

### 6.3 FAQ schema markup

A standalone `/faq` page is the highest-ROI SEO move available. FAQ schema produces Google rich snippets (the dropdown FAQ in search results) and ranks for long-tail "¿qué incluye…?" / "¿hacéis…?" queries. The current FAQ has 9 items in plain Q&A form — structurally ready for schema. **Moving it to its own page is the structural unlock.**

The deeper reason: the current FAQ already acts like a decision-support surface (covering pricing, public/private care, home birth, geography, English-language care, complications, first contact), not a minor homepage appendix.

### 6.4 Multi-language URL structure

**Recommended: subfolder per language** — `/`, `/en/`, `/ca/`.

Reasons:
- Standard for static sites; works on GitHub Pages without routing magic
- Clean `hreflang` mapping: `/servicios` ↔ `/en/services` ↔ `/ca/serveis`
- Search engines treat each language as separately indexable
- No DNS work (vs subdomains)
- No JS dependency for language switching (vs query params)

Alternatives rejected:
- **Query param (`?lang=en`):** SEO-brittle, fragile cache behaviour, Google may treat as duplicate
- **Subdomain (`en.alumbra-comares.es`):** unnecessary operational overhead for a static GitHub Pages site
- **JS-only switcher on a single URL:** doesn't produce indexable English pages

### 6.5 Per-page metadata (Option B)

Each page needs:
- `<title>` — ~50–60 characters, keyword-leading
- `<meta name="description">` — ~150 characters
- `<meta property="og:title">`, `og:description`, `og:image`, `og:url`
- Canonical URL tag
- `hreflang` alternates for each language version
- Page-specific JSON-LD (`@type: Service` on `/servicios`, `@type: FAQPage` on `/faq`, `@type: LocalBusiness` on `/`)

This is M20 work, but Option B is the prerequisite.

---

## 7. i18n Implications

### 7.1 Current state

- Spanish content is present
- Every `"en"` and `"ca"` JSON field is `null`
- The language switcher is structural-only — clicking "EN" produces no translated content
- Baseline scorecard penalises this in C14 (1/2 — switch present but non-functional)

### 7.2 Per-option translation rollout

| Option | Translation rollout |
|--------|--------------------|
| A | Single large task — every JSON field across all 12 sections must be populated to ship English. No partial state. M25 becomes a 50–100-string PR. |
| B | **Page-by-page.** Translate `/servicios` first, then `/faq`, then `/como-trabajamos`. Site can have English `/servicios` while `/recursos` is still Spanish-only — degraded but not broken. M25 becomes 4–6 incremental PRs. |
| C | Same page-by-page approach as B, but with twice the page count. |

### 7.3 Switcher UX

Under Options B or C, the language switch should behave as a **whole-page switch**, not an in-page toggle:
- Avoids partial mixed-language states
- Matches the static-site model
- Makes shared URLs clearer
- Gives expat visitors a more trustworthy experience

### 7.4 What founders should commit to before M25

1. URL structure for languages (subfolder recommended)
2. Default language (Spanish)
3. Translation strategy (in-house or external)
4. Whether to translate all surfaces or prioritise high-impact ones (services + FAQ + contact = minimum viable English; others can follow)

Option B makes question 4 answerable incrementally. Option A forces an all-or-nothing answer.

---

## 8. Founder Editing Burden

The founders are the long-term editors. They are not developers. They edit content via the GitHub web editor or a local clone. The IA decision must respect that constraint.

### 8.1 Common edits per option

| Edit | A | B | C |
|------|---|---|---|
| Fix a typo | Edit JSON, refresh | Same | Same |
| Add an FAQ | Edit `faq.json`; appears on homepage | Edit `faq.json`; appears on homepage summary + `/faq` | Same as B |
| Add a service | Edit `services.json` | Same | Possibly new per-service page if slug pages exist |
| Add a resource | Edit `resources.json` | Same | Same |
| Update team bio | Edit `team.json` | Same | Same |
| Translate to English | Populate `"en"` fields across all JSON in one batch | Populate `"en"` fields page-by-page | Same as B but more pages |
| Add a new top-level page | Not applicable | Agent task, not founder | Agent task |

For day-to-day editorial work — typos, FAQ additions, content updates — **all three options have the same workflow.** Hybrid does not increase founder burden for editorial tasks.

### 8.2 Content drift risk (Option B/C)

Under Option B and C, the same content (e.g. service descriptions) appears on the homepage summary AND on `/servicios`. To avoid drift:
- **Single source of truth:** services.json is the only source. Both surfaces read from it.
- Homepage summary picks the first 3–4 services or a `featured: true` flag. Detail page renders all.
- Founder edits one place; both surfaces update.

This pattern is already used (events grid reads from `events.json` and renders all items). Extending to per-page summary/full views is a small loader-pattern change.

### 8.3 Tooling

No option requires a CMS, Markdown processor, or build step. Founders benefit from:
- A simple changelog convention in JSON files (M21)
- A short editorial guide (M21)
- Preview workflow: edit JSON locally → `python3 -m http.server 8080` → check before pushing

None of these are blocked by the IA decision.

---

## 9. Recommendation

### 9.1 Chosen direction

**Option B — Hybrid.** Single-page homepage + detail pages for depth content.

This is the only option that:
- serves all 13 personas at "good" or better
- makes M25 (English) and M26 (Valencian) incremental rather than all-or-nothing
- unlocks FAQ schema and per-page metadata for M20 SEO foundations
- keeps the homepage scannable while giving depth-seekers canonical URLs to bookmark
- migrates incrementally — homepage continues to function during every step
- preserves the founder editing model unchanged
- continues the pattern the site already uses for `/privacidad.html` and `/cookies.html`

### 9.2 Note on placeholders and content readiness

**Placeholder content is a temporary state, not a structural property of the site.** Current placeholders (pricing, credentials, transfer protocols, geographic coverage, event dates) exist because the build is happening without the founders co-located. They have committed to populating every surface once accessible. **The structural decision is independent of content readiness.** Detail pages can be split now and filled progressively. Phasing exists to reduce migration risk per PR, not to wait for content.

### 9.3 What stays on the homepage

- **Hero** — always
- **Quiénes somos** — short brand block
- **Por qué Alumbra** — 3 pillars
- **Equipo** — 3 midwife profiles (full bios + quotes)
- **Formación** — credential summary as expanded team cards (until optional `/formacion` split)
- **Servicios** — top 3–4 services as summary cards with "ver todos los servicios" link to `/servicios`
- **Cómo trabajamos** — top 3 blocks with "leer más" link to `/como-trabajamos`
- **FAQ** — top 5 questions with "ver todas las preguntas" link to `/faq`
- **Eventos** — full events listing (stays on homepage until volume warrants a page)
- **Testimonios** — full carousel
- **Recursos** — top 3 resources with "ver biblioteca completa" link to `/recursos`
- **Brochure download CTA** — keep as homepage element near recursos summary
- **Contacto** — full form + channels (homepage primary CTA)

The homepage drops from ~17 mobile screens to ~12–14.

### 9.4 Proposed page map

| URL | Primary content | Nav label | Status |
|-----|----------------|-----------|--------|
| `/` | Homepage with summary blocks | Inicio | Existing |
| `/servicios` | All services with extended descriptions, pricing, what's included | Servicios | Phase split |
| `/como-trabajamos` | Modelo, eligibility, safety, transfer protocols, public system relationship, primer contacto | Cómo Trabajamos | Phase split |
| `/faq` | All FAQ items with FAQ schema | FAQ / Preguntas | Phase split |
| `/recursos` | Full resources library with category filtering; future blog index | Recursos | Phase split |
| `/formacion` | Per-midwife credentials, registration numbers, training | Formación | Optional, later |
| `/contacto` | Contact form, all channels, hours | Contacto | Optional, low priority |
| `/equipo` | Full team profiles + bios + quotes | Equipo | Optional, deferred |
| `/privacidad.html` | Privacy policy | (footer) | Existing |
| `/cookies.html` | Cookie notice | (footer) | Existing |

Future expansion (post-M19):
- `/blog/<slug>.html` for individual articles when blog content starts
- `/servicios/<slug>.html` for per-service deep pages if M20 SEO research justifies them
- `/eventos.html` if event volume grows past 4–5 active events at any time

### 9.5 Proposed navigation structure

**Top nav (desktop and mobile, sticky on scroll):**
- Inicio — `/`
- Servicios — `/servicios.html` (after split) or `/#servicios` until then
- Cómo Trabajamos — `/como-trabajamos.html` (after split) or `/#como-trabajamos` until then
- FAQ — `/faq.html` (after split)
- Recursos — `/recursos.html` (after split)
- Contacto — `/#contacto` (homepage anchor) — anchor stays even after `/contacto.html` exists, because the homepage form is the primary conversion surface

**Footer:**
- Mirror of top nav
- Equipo, Formación (when separated)
- Privacidad, Cookies
- Instagram, Email
- Future: WhatsApp link (M16A), language switcher (M25)

**Mobile-only:** Persistent floating WhatsApp button (M16A) — bottom-right corner, present on every page.

### 9.6 Internal linking commitments (minimum)

- Homepage summary blocks → detail pages ("ver todas las preguntas", "ver todos los servicios", "ver biblioteca completa")
- Every detail page nav links back to homepage and forward to `/contacto`
- FAQ items cross-link to relevant detail pages: faq-04 → `/servicios#parto-en-casa`, faq-07 → `/como-trabajamos#safety`
- Services page cross-links to FAQ for service-specific questions
- Como-trabajamos cross-links to Servicios for the actual offer
- Footer carries every page link

### 9.7 Key risks and mitigations

| Risk | Mitigation |
|------|-----------|
| Content drift between homepage summary and detail page | Single source of truth (one JSON per content type); homepage filters/picks first N; detail page renders all |
| Migration introduces regressions | Phase one page at a time; keep homepage anchor working as fallback during each migration; test on every PR |
| Detail pages start with thin content (placeholder period) | **Not a structural risk.** Founders have committed to populating every surface once accessible. Detail pages can be split now and filled progressively. Where a page is intentionally early, label placeholder states honestly and keep the homepage summary strong so thin subpages don't carry the whole trust burden. |
| Per-page metadata becomes a maintenance burden | Centralise via a `meta.json` or per-page metadata block; make it part of the page scaffold |
| Nav becomes inconsistent between homepage anchors and detail-page links | Migrate nav once after first 1–2 splits land; commit to all-page-links navigation post-split |
| Founders find the multi-page model confusing | Editorial guide (M21) explains: "Spanish content goes here. Detail pages render the same JSON; you don't need to do anything different." |
| Multilingual expansion multiplies unfinished pages | Use a disciplined page set; do not create extra pages without clear user need |
| Homepage regrows into a second full site | Keep homepage sections intentionally summary-level; route depth material outward with explicit links |

### 9.8 Implications for downstream milestones

| Milestone | Implication |
|-----------|------------|
| **M15 — Services rewrite** | Either slot the `/servicios` split immediately after M15, or do the split as part of M15. Longer service descriptions fit a detail page better than homepage cards. (See §11 — divergence on order.) |
| **M16/M16A — WhatsApp** | Persistent floating button on every page. One CTA per surface. |
| **M20 — SEO foundations** | The `/faq` split should land before M20 to give the SEO milestone a real FAQ page to add schema markup to. M20 then handles per-page metadata, sitemap generation, and JSON-LD across all detail pages. |
| **M21 — Content governance** | Editorial guide must cover: how to add an FAQ (still just JSON), how the homepage summary picks items, what `featured: true` means if added. |
| **M22 — Asset readiness** | Per-page social cards (OG images). More image work, but each page can have its own visual identity. |
| **M25 — English rollout** | Translate page-by-page. Recommended order: `/`, `/servicios`, `/faq`, `/contacto` (minimum viable English) → then `/como-trabajamos`, `/recursos`. Whole-page switching, not in-page. |
| **M26 — Valencian rollout** | Same page-by-page approach. Lower priority than English given audience. |
| **M27 — Accessibility** | Per-page audit — cross-page nav consistency, focus order across sticky nav and page transitions, accordion behaviour on `/faq`, carousel/filter behaviour on `/recursos`. |
| **M28 — 404 and fallback pages** | Becomes essential under multi-page — direct entry to deeper URLs, shared links, and language paths all increase. |

### 9.9 What this means for M17 itself

M17 is a **decision** milestone. Output:
1. Founder approval of Option B (or counter)
2. Updated `docs/plan.md` introducing phased migration milestones
3. PRD update — §10 should reflect the hybrid direction (currently still says "single-page with anchored sections")
4. Editorial framing of what the homepage carries vs what splits off

M17 closes once the founders sign off. Implementation work happens in subsequent PRs.

---

## 10. Concluding Notes

### 10.1 What was assumed

- The founders care about both user experience and SEO discoverability for organic Spanish search.
- WhatsApp will become the primary contact channel post-M16/M16A. Every page must have a tappable WhatsApp CTA.
- Real credentials, pricing, and event dates will land in subsequent milestones. The IA decision must not be blocked on those, but must accommodate them.
- **Placeholder content is a temporary state.** The structural decision is not constrained by current content thinness — pages can be split structurally now and filled in subsequent content milestones.
- The site stays on GitHub Pages. No SSR, no SPA routing, no headless CMS.
- Founders will continue editing JSON via simple tooling, not a CMS dashboard.

### 10.2 What was NOT decided here (deferred)

- **Per-service slug pages** (`/servicios/parto-en-casa`, etc.) — defer until M20 SEO research shows whether long-tail Spanish queries justify them.
- **Blog vs articles in `/recursos`** — defer until founder content cadence is known. Current `/recursos` schema accommodates both with a `type` field.
- **Whether `/equipo` and `/contacto` get their own pages** — defer.
- **Sticky nav exact behaviour on mobile** — design detail for the migration PRs.
- **Specific OG image and metadata per page** — M20 work.

---

## 11. Open Questions for Founder Brainstorm

The two source audits agree on the recommendation (Option B) but diverge on a handful of judgement calls. These are the questions to discuss before finalising the migration plan:

### Q1 — Phased migration order

The two passes propose different orders for which pages to split first.

**Pass 1 (Opus session)** order:
1. `/faq` — highest SEO leverage, FAQ schema, lowest implementation risk
2. `/recursos` — already structured for it, supports future blog
3. `/servicios` — after M15 services rewrite
4. `/como-trabajamos` — addresses C17 safety/transfer
5. *(optional)* `/formacion` — after credentials are real
6. *(optional)* `/contacto` — low priority

**Pass 2 (independent)** order:
1. `/faq` — content already exists from M17A
2. `/como-trabajamos` — content already exists from M17B; safety/continuity is trust-critical
3. `/servicios` — strategically important, but can split shell first and let M15 deepen
4. `/recursos` — unbounded but many placeholder links currently
5. `/formacion` — valuable but depends on M18 placeholder population
6. `/contacto` — optional and late

**Where they agree:**
- `/faq` is Phase 1 (everyone agrees)
- `/formacion` and `/contacto` are last/optional
- `/servicios` should not block on M15 — the shell can be created first

**Where they diverge:**
- Pass 1 puts `/recursos` second (clean structural opportunity); Pass 2 puts `/como-trabajamos` second (highest trust value, content already mature)

**Question for founders:** Which trade-off matters more in the next 1–2 months?
- (a) Cleaning up homepage scroll depth fastest by splitting list-bearing surfaces (FAQ + recursos first)
- (b) Strengthening trust signals fastest by splitting safety-explainer surfaces (FAQ + como-trabajamos first)

Both options end at the same place after 4 phases. The difference is which gain shows up first.

### Q2 — Whether to wait for content (M15, M18) before structural splits

**Pass 1** treats content readiness as decoupled from IA: split now, fill progressively, accept honest placeholders.

**Pass 2** is more cautious: a thin subpage can hurt trust more than no subpage. Where content is still placeholder-heavy (M15 services, M18 credentials), it advises either waiting or being explicit about the placeholder framing.

**Where they agree:** the structural decision itself does not need to wait. The page architecture can be set up early.

**Where they diverge:** Pass 1 is more comfortable with thin shells; Pass 2 wants honest labelling and a strong homepage summary so thin subpages don't carry the trust burden alone.

**Question for founders:** When a page is split before its content is fully populated:
- (a) Show the page with placeholder fields clearly labelled (e.g. "Tarifas — pendientes de confirmar; contacta para información actualizada")
- (b) Hide individual placeholder rows and only render real content (page renders thinner but never shows `__PLACEHOLDER__`)
- (c) Don't split until content is ≥80% real (delay structural change until M15/M18 land)

### Q3 — Should the navigation rename happen all at once or incrementally?

Both passes agree that nav must change from anchors to page links once detail pages exist. They differ slightly on timing.

**Pass 1:** Migrate nav once after Phase 1 and 2 land; commit to all-page-links navigation post-Phase 2.

**Pass 2:** Each split-off page brings its own nav update; the site shifts page-by-page.

**Question for founders:**
- (a) Switch the whole nav to page links the moment the first detail page exists (cleaner for users; some links may scroll to homepage anchors during the transition)
- (b) Update one nav label per page split (more PRs, less consistent during transition)

### Q4 — Position of `/servicios` in the order

**Pass 1** says do `/servicios` after M15 (so the rewritten content lands on the new page).

**Pass 2** says split the shell first, then let M15 harden the content on the existing URL — so M15 doesn't have to also do an IA migration.

**Question for founders:**
- (a) M15 (services rewrite) and `/servicios` split happen together as one PR — coupled work
- (b) `/servicios` shell splits before M15 with current placeholder content; M15 lands later as a content-only PR on the new URL — decoupled work

### Q5 — Eventos and Testimonios on homepage forever?

Both passes leave events and testimonios on the homepage in v1. Both flag that if event volume becomes real, `/eventos` may need its own page.

**Question for founders:** What is the realistic event cadence? If you anticipate ≥1 event per month, `/eventos` becomes a Phase 5 candidate. If events stay sporadic (1 every quarter or less), homepage placement is fine.

### Q6 — Optional `/equipo` page

Both passes mark `/equipo` as deferred. The 3 midwife profiles work on the homepage. But P12 (sceptical family) and P13 (professional referrer) often want a bookmarkable team URL.

**Question for founders:** Is a dedicated `/equipo` page worth doing once `/formacion` exists? Or do they merge?
- (a) `/equipo` and `/formacion` stay merged as homepage sections forever
- (b) `/formacion` becomes a page; team stays on homepage
- (c) Both `/equipo` and `/formacion` become pages — `/equipo` carries the human story (bios, quotes), `/formacion` carries the formal credentials

---

## 12. Five-Bullet Summary

- **The homepage has crossed a structural threshold.** 12 sections, 17–28 mobile screens, 5 sections invisible from nav. Single-page is at its limit; English (M25) and Valencian (M26) rollouts will break it.
- **Recommendation: Option B (hybrid).** Keep the homepage as a curated landing with summary blocks. Split four surfaces onto their own URLs: `/faq`, plus three others — order TBD pending §11 Q1 brainstorm.
- **Persona fit improves uniformly.** Information-seekers (P2, P4, P7, P8, P11, P13) jump from "poor/mixed" to "high". Casual personas (P1, P5, P12) keep their current homepage experience. No persona is worse off.
- **i18n becomes incremental.** M25 English rollout becomes 4–6 small PRs (one per page) instead of an all-or-nothing translation of 12 sections. Same for M26 Valencian.
- **Migration is phased.** One PR per page. The homepage continues to function during each step. No big-bang rewrite, no regression risk. Six open questions in §11 to discuss before finalising the order.

---

*End of audit. Recommendation pending founder approval and answers to §11.*
