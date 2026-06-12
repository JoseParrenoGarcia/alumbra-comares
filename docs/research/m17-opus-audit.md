# M17 — Information Architecture Audit

**Author:** Claude (Opus 4.7, run in main session)
**Date:** 2026-06-12
**Inputs read:** PRD, plan.md, m17.md, m14-personas.md (P1–P13), m14-audit-rubric.md (23 criteria), 2026-06-11 scorecard (26/46), index.html, services.json, faq.json, how-we-work.json, resources.json, team.json, content-loader.js, Best Practice Canvas
**Status:** decision document — no code, no markup, no implementation specs
**Action required:** founder review and selection of one option; downstream milestones (M20, M25, M26, M27, M28) will follow from the choice

---

## Executive Summary

The Alumbra Comares website has crossed a structural threshold. What started as a single-page brochure now carries twelve sections, two of which (FAQ and resources) are list-bearing surfaces that grow unboundedly, three of which (services, how-we-work, formación) are deep standalone topics, and four of which (events, testimonials, contact, brochure download) are functional CTAs competing for attention. The current single-page model still works, but it is at the edge of what scrolling can comfortably carry, and three known forces will push it past that edge inside the next two milestones: the English rollout (M25) doubles every section's content; the Valencian rollout (M26) triples it; and the unbounded surfaces (resources, future blog) compound monthly.

The recommendation, developed in detail below, is **Option B — hybrid**: keep the homepage as a curated landing page with summarised sections, but split four surfaces onto their own pages in this order: `/faq`, `/recursos`, `/servicios`, `/como-trabajamos`. The remaining sections (hero, philosophy, why-alumbra, team, formación, events, testimonials, contact) stay on the homepage as polished summaries with explicit "ver más" links to the detail pages where applicable. This is the only option that:

1. Preserves the warmth and scannability of the single-page experience for first-time visitors (P1, P5, P6, P12)
2. Gives information-seeking visitors (P2, P7, P8, P11, P13) deep canonical URLs they can bookmark, share, and link to
3. Halves the per-language translation surface that M25 and M26 must populate
4. Unlocks FAQ schema markup and per-page metadata for the SEO foundations work in M20
5. Avoids a big-bang rebuild — each split is one PR, and the homepage continues to function during migration
6. Keeps the founder editing model unchanged: edit a JSON file, refresh the browser, no build step

The rest of this document defends that recommendation against the two alternatives (stay single-page, full multi-page), grounds every claim in the personas and rubric, and proposes a phased migration path with concrete milestone implications.

---

## 1. Current State Assessment

### 1.1 Section inventory

The homepage currently renders twelve sections in this DOM order, loaded sequentially by `js/content-loader.js`:

| # | Section ID | Content type | Driver JSON | Cards/items |
|---|-----------|--------------|-------------|-------------|
| 1 | `hero` | Landing | `hero.json` | 1 (hero block) |
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

Twelve sections is not, by itself, a problem. The complexity threshold is not the number of sections but the **sum of content beneath each section**. The threshold gets crossed when:

- a single section becomes long enough that it needs its own internal scroll context (FAQ, resources)
- two or more sections compete for the role of "primary CTA" (contact form, WhatsApp button, brochure download, event signup)
- a visitor cannot scan the whole page in under 90 seconds (P5, P12 use case)
- the navigation cannot fit all sections without grouping or wrapping

The site has crossed the first three of these. The fourth is partially crossed — the desktop nav still fits five anchor labels, but the actual section count is 12, meaning seven sections (formación, como-trabajamos, faq, eventos, testimonios, recursos) are **invisible from the top-of-page nav**. A visitor who has not scrolled cannot know that an FAQ exists.

### 1.2 Estimated mobile scroll depth

Estimating from the rendered content per section and current CSS (post-M32 mobile padding optimisation), the homepage on a 375px iPhone-class viewport spans approximately:

| Section | Approx. height (mobile) | Cumulative |
|---------|------------------------|------------|
| hero | 100vh (full screen) | 1.0 |
| quienes-somos | 60vh | 1.6 |
| por-que | 90vh | 2.5 |
| equipo | 200vh (3 cards stacked) | 4.5 |
| formacion | 180vh | 6.3 |
| servicios | 280vh (7 cards) | 9.1 |
| como-trabajamos | 160vh (6 blocks) | 10.7 |
| faq | 120vh (9 expandable) | 11.9 |
| eventos | 80vh | 12.7 |
| testimonios | 100vh (carousel) | 13.7 |
| recursos | 100vh (carousel) + 60vh (brochure) | 15.3 |
| contacto | 140vh | 16.7 |

Roughly **17 full mobile screens** end-to-end. This is twice the depth recommended for a single-page small-business site (8–10 screens is typical; 6 screens is ideal for a service business with a strong CTA above the fold). Scroll fatigue is real on this page even before more content lands.

The new mobile carousels (M32) help bound the testimonials, events, and resources sections horizontally — without them, the page would be closer to 20–22 mobile screens. Carousels are a coping mechanism for too-much-content-per-page; they are not a substitute for fewer pages.

### 1.3 Homepage-summary content vs full standalone content

Classifying each section by intrinsic content shape:

| Section | Content shape | Belongs on homepage? | Belongs on its own page? |
|---------|---------------|----------------------|--------------------------|
| hero | Anchor — must be on homepage | yes | no (it IS the homepage entry) |
| quienes-somos | Summary prose — natural homepage block | yes | no |
| por-que | Three pillars — summary block | yes | no |
| equipo | Three named profiles — summary works, but profiles deserve detail | summary yes | optional /equipo with full bios |
| formacion | Credential matrix per midwife — list-bearing | summary yes (badges) | yes (full credential page) |
| servicios | 7-item list of distinct offers — list-bearing | summary yes (top 3–4) | yes (full /servicios) |
| como-trabajamos | 6 dense prose blocks — guide content | summary yes (3 blocks) | yes (full /como-trabajamos) |
| faq | 9 Q&A pairs, growing — list-bearing, indexable | summary yes (top 5) | yes (full /faq, FAQ schema) |
| eventos | Time-bound list — currently placeholder | summary yes | optional, only if event volume grows |
| testimonios | Quote cards — social proof | yes (homepage primary use) | no |
| recursos | Library — grows unboundedly | summary yes (top 3) | yes (full /recursos, future /blog) |
| contacto | Form + channels | yes (homepage primary CTA) | yes (also `/contacto` for direct nav) |

Six sections (servicios, formación, como-trabajamos, faq, recursos, contacto) have a clear case for a dedicated page. Six (hero, quienes-somos, por-que, equipo, eventos, testimonios) belong only on the homepage. This split is the structural argument for Option B.

### 1.4 Navigation strain

The current nav has five visible labels: Quiénes Somos, Por Qué, Equipo, Servicios, Eventos, Contacto (six items, but the desktop top nav and the mobile overlay both render the same six links). Of the twelve homepage sections, **six are unreachable from the nav** at the top of the page: formación, como-trabajamos, faq, testimonios, recursos.

This has three consequences:

- **Discovery failure.** A visitor who has not yet scrolled cannot see that FAQ, How We Work, or resources exist (rubric C13 — low digital confidence usable).
- **Direct linking failure.** A founder cannot post "see our FAQ" with a working in-context link from Instagram or WhatsApp.
- **SEO failure.** Search engines cannot weight content that is not nav-linked. From a Spanish-keyword discovery perspective ("preguntas frecuentes matrona Valencia", "parto en casa Valencia"), buried sections get crawled but not ranked.

The 5–6 item nav was correct for the M4 iteration with 4 sections. It is no longer correct for the M19 iteration with 12 sections. **Either nav grows to ~8 items** (some grouped as "Sobre nosotras" / "Servicios" / "Recursos") **or** sections move to their own pages and nav labels become page links.

### 1.5 Baseline score interpretation

The 2026-06-11 scorecard sits at **26/46** — six points below the 32/46 pass threshold. The criteria scoring zero are concentrated in two clusters:

- **Trust cluster:** C5 (price), C12 (trauma), C15 (credentials), C17 (safety/transfer), C18 (free intro)
- **Contact cluster:** C7 (events), C19 (WhatsApp)

Important: **none of these gaps are caused by the IA**. They are all content gaps — pricing not yet decided, credentials not yet collected, WhatsApp not yet implemented (M16 pending). M17 cannot fix the score directly. But the IA decision affects how easily each gap can be **closed in language**. Specifically:

- C5 (price): on a single page, pricing must appear inline next to each service card, which is awkward for placeholders. On a `/servicios` detail page, pricing fits naturally in a per-service block with explanatory copy.
- C15 (credentials): single-page formación works, but a `/formacion` page allows colegiada numbers, association memberships, and per-midwife specialism statements without overwhelming the homepage.
- C17 (safety): single-page como-trabajamos squeezes safety into one block (hww-03). A `/como-trabajamos` page can give safety its own H2 with full transfer protocol explanation — directly addressing P7, P8, P9, P12.
- C18 (free intro): one-page can address this in the contact CTA. Multi-page allows a dedicated "primera consulta gratuita" page or section.

So the IA decision is not a substitute for the content work, but it removes the structural ceiling on how that content can be expressed.

---

## 2. Content Growth Projection

### 2.1 Pending milestones that change content volume

Reading the plan in order:

| Milestone | Status | Content volume impact |
|-----------|--------|----------------------|
| M15 — Services rewrite | planned | Service descriptions get longer (current ~2 sentences each → likely 4–6 sentences each). Possible per-service detail content (what's included, duration, how often). 7 services × ~3× length ≈ services section grows from ~280vh to ~700vh on mobile if kept inline. |
| M16/M16A — WhatsApp | planned | Adds one CTA element across every section's contact prompts. No structural impact, but increases CTA density. |
| M20 — SEO foundations | planned | Per-page metadata, structured data. **This milestone is much easier under Option B/C than under Option A.** Single-page metadata is one set of meta tags for the whole site; multi-page allows per-page title, description, og:image, and JSON-LD for FAQ/services/team. |
| M21 — Content governance | planned | Editorial rules and changelog. No content volume change, but governance is harder when one JSON file (e.g. faq.json) grows past 20 items. |
| M22 — Asset readiness | planned | Real photos for team, hero, services. Each photo adds ~10–30vh of section height on mobile when it lands. |
| M25 — English rollout | planned | **2× content surface.** Every `"en"` field gets populated. Current page becomes 2× heavier on language-toggle. |
| M26 — Valencian rollout | planned | **3× content surface.** Every `"ca"` field gets populated. |
| Future blog/articles | not yet milestoned | **Unbounded.** Each post is a card on `/recursos` and a full page or modal. Volume grows monthly. |
| Future pricing tiers | not yet milestoned | Each service may carry 2–3 price tiers (e.g. "consulta puntual" / "paquete completo" / "atención al parto"). 7 services × 3 tiers = 21 price cards if listed inline. |
| Future downloadables | not yet milestoned | Each PDF is a card on `/recursos` and a download CTA. Volume grows. |

### 2.2 Content shape: bounded vs unbounded

Sections fall into three growth profiles:

**Fixed-size sections** (will never grow much, regardless of milestones):
- hero — 1 hero block, always
- quienes-somos — 1 prose paragraph
- por-que — 3 pillars (the brand frame is fixed)
- equipo — 3 midwives (the team is the team)
- testimonios — bounded by curation; 4–8 cards is the realistic ceiling

**Slowly-growing sections** (grow with content milestones, then stabilise):
- formación — bounded by team size × credential count; ~3–5 entries per midwife
- servicios — grows from 7 to maybe 10 services as the offer expands; then stable
- como-trabajamos — grows from 6 blocks to maybe 8–10 as safety/scope/eligibility get articulated; then stable

**Unbounded-growth sections** (grow indefinitely with use):
- faq — every founder question generates 1–3 FAQ items; could reach 30–50 items in 2 years
- eventos — grows with cadence (1 per month? 2 per quarter? unknown)
- recursos — grows indefinitely as new books, podcasts, articles, downloadables are added

The unbounded sections are the ones that will break a single-page model first.

### 2.3 What the homepage looks like in 12 months under each option

A back-of-envelope projection assuming all planned milestones land:

**Option A (stay single-page):** Homepage grows from 17 mobile screens to **~28 mobile screens** in 12 months (M15 fattens services, M22 adds image weight, FAQ grows from 9 to 25 items, resources from 6 to 15 items). At that point, scroll fatigue dominates and the contact form is at screen 28 of 28. The page is no longer scannable in under 90 seconds.

**Option B (hybrid):** Homepage stays at **~12–14 mobile screens** because faq, recursos, servicios, and como-trabajamos move to their own pages with summary blocks of 3–5 items each on the homepage. Detail pages each carry 5–10 mobile screens of content but are scoped to one topic.

**Option C (full multi-page):** Homepage drops to **~5–6 mobile screens** (hero + intro + team + 3 service teasers + contact CTA). Every other section becomes a dedicated page. Content volume per page is small and focused, but the site overall has 8–10 distinct URLs.

A founder trying to pick between these should ask: *do I want my visitors to see everything in one scroll, or to choose what to dig into?* The answer differs by persona — covered in §3.3.

---

## 3. Three IA Options — Detailed Comparison

### 3.1 Option A — Stay single-page (anchor-based)

#### Structure
Keep the current twelve-section single-page. Reorder for narrative flow if needed (e.g. move `servicios` before `equipo` to address the C20 finding from the baseline scorecard). Add in-page anchor jumps between related sections (e.g. a "ver preguntas frecuentes" link inside the services section that scrolls to `#faq`). Improve nav UX — likely a sticky top nav on desktop and a hamburger that exposes all 8–10 anchors on mobile.

#### Navigation model
- **Top nav:** 5–6 anchor labels covering primary sections (Equipo, Servicios, Cómo Trabajamos, FAQ, Recursos, Contacto). The current 5 labels expand to ~8 to give every major section a nav handle.
- **Mobile:** Hamburger overlay with full anchor list. Persistent floating WhatsApp button (when M16/M16A lands) for instant contact.
- **Footer:** Same anchors mirrored, plus legal links.

#### Persona fit (single-page anchor)

| Persona | Fit | Why |
|---------|-----|-----|
| P1 — First-time, 20w | **Good** | Casual scrolling matches her mode of exploration. She wants to absorb the brand, not navigate. |
| P2 — Comparing options | **Poor** | She wants to compare service-by-service across providers. A long scroll makes side-by-side comparison harder than a `/servicios` page she can bookmark. |
| P3 — Co-parent | **OK** | He'll skim. Single-page works if the services section is reachable in 1–2 anchor jumps. |
| P4 — Postpartum urgent | **Poor** | She doesn't want to scroll. She wants a contact button and confirmation that postpartum is offered. Anchor jump to contact is fine, but she'd be better served by a `/postparto` or `/lactancia` page. |
| P5 — Event-curious | **OK** | Anchor to events works if events are populated. |
| P6 — Low digital confidence | **Mixed** | Long scroll is intimidating. But if the nav and contact button are clear, she can succeed. |
| P7 — First-time home birth | **Poor** | She wants depth on home birth, transfer protocols, safety. A summary block in services + safety block in como-trabajamos is too thin for her decision. |
| P8 — Repeat home birth | **Poor** | High standards. She wants a canonical home-birth page she can evaluate against her last provider. |
| P9 — Trauma | **Mixed** | She'll read carefully. Single-page works if trauma-acknowledging language is present (currently a C12 score of 0). |
| P10 — English expat | **Mixed** | Once English content lands (M25), single-page in English works but the language switcher must be flawless. |
| P11 — Expat from MW system | **Poor** | She'll evaluate scope and continuity in detail. Wants depth pages. |
| P12 — Sceptical family | **Mixed** | She'll do a 30-second scan. Single-page hero + summary works for the scan. |
| P13 — Professional referrer | **Poor** | He needs to verify credentials and scope quickly. A `/equipo` or `/formacion` page he can bookmark and refer to is far better than scrolling past brand content. |

**Net:** Option A serves casual/exploratory personas (P1, P3, P5, P12) well. It serves information-seeking personas (P2, P7, P8, P11, P13) and urgent personas (P4) poorly.

#### SEO implications
- One canonical URL — the homepage carries every signal.
- One `<title>`, one meta description, one set of OG tags. Cannot optimise per topic.
- FAQ schema can still be applied via JSON-LD on the homepage, but the FAQ section competes with every other section for keyword authority.
- Spanish keyword authority is **diluted** across topics. "Matrona privada Valencia" competes for the same page authority as "parto en casa Valencia" and "lactancia Valencia". Each query fights every other query for ranking signal.
- Structured data: limited to `@type: LocalBusiness` and `@type: FAQPage` on a single URL.
- **No deep-link sharing.** Posts on Instagram or WhatsApp ("read our home birth section!") link to `/#servicios` or `/#faq`, which scrolls but does not change the page context — works, but is fragile.

#### i18n implications
- Three languages live on one URL. Toggle is JS-only — switching `es` → `en` re-paints the same page.
- URL structure: query param (`?lang=en`) or anchor hack (`/#en`), or a separate `/en/index.html` that mirrors `/index.html`.
- Search engines will crawl the same URL in three languages — needs `hreflang` tags on the single URL pointing to language alternates.
- **Translation workload at M25:** every JSON `"en"` field must be populated. With 12 sections of content, this is a single large translation task — manageable, but no halfway state. The site is either bilingual or it isn't.

#### Internal linking
- All linking is anchor-based (`#servicios`, `#faq`).
- Anchor links work for in-page navigation but produce no SEO link equity.
- A "from FAQ to contact" cross-link is just `<a href="#contacto">`.

#### Sitemap
- `sitemap.xml` lists 3 URLs: `/`, `/privacidad.html`, `/cookies.html`.
- The crawler sees one main URL with 12 sections.

#### Maintenance burden
- **Lowest of the three options.** Founders edit one JSON per section. No URL routing, no per-page metadata, no slug decisions.
- One `index.html`, one `main.css`, one bundle of section partials.
- Adding an FAQ: edit `faq.json`. Refresh. Done.

#### Mobile UX
- Long scroll is the dominant UX pattern. Carousels (M32) help bound horizontal-list sections.
- Nav-overlay mobile menu can fit all anchors.
- Persistent WhatsApp button (M16A) becomes essential — without it, contact is at screen 17 of 17.

#### Implementation complexity
- **Lowest.** Requires only nav reorganisation and section-order tweaks. No new files, no routing.

---

### 3.2 Option B — Hybrid (homepage + detail pages)

#### Structure
Homepage stays as a curated landing page with summarised sections. Four to six surfaces split off into dedicated URLs:

- `/servicios` — full services detail page with extended descriptions, pricing tiers, what's included
- `/como-trabajamos` — full How We Work / Safety page with safety protocols, eligibility, transfer language
- `/faq` — full FAQ page with FAQ schema markup
- `/recursos` — resources library and (future) blog index
- *(optional)* `/formacion` — credentials detail page
- *(optional)* `/contacto` — dedicated contact page

The homepage carries summary blocks: top 3–4 services, top 5 FAQs, 3 how-we-work blocks, 3 resource teasers, with explicit "ver todos los servicios" / "ver más preguntas" / "ver biblioteca completa" links to the detail pages.

The legal pages (`/privacidad.html`, `/cookies.html`) already follow this pattern — extending it for content pages is a continuation, not a new architecture.

#### Navigation model
- **Top nav:** 5–6 page links (Equipo, Servicios, Cómo Trabajamos, FAQ, Recursos, Contacto) plus an "Inicio" anchor.
- **Mobile:** Hamburger overlay with full page list, plus persistent WhatsApp button.
- **Footer:** Mirrors top nav, plus legal links and Instagram.
- **In-page nav (within detail pages):** A simple "volver al inicio" link or a small breadcrumb (Inicio › Servicios). For longer detail pages (e.g. /servicios with 7 services), an in-page table-of-contents or anchor list at the top.

#### Persona fit (hybrid)

| Persona | Fit | Why |
|---------|-----|-----|
| P1 — First-time, 20w | **Good** | Homepage gives her the warm overview. She can dig into `/servicios` or `/faq` when she wants more. |
| P2 — Comparing options | **Excellent** | `/servicios` is a canonical comparison page she can bookmark, share, and re-visit. |
| P3 — Co-parent | **Good** | Homepage answers "what is this?" The `/servicios` page answers "what would we be paying for?". |
| P4 — Postpartum urgent | **Excellent** | She can land directly on `/servicios#postparto` from a referrer's link, see postpartum + lactation as first-class, and tap WhatsApp. |
| P5 — Event-curious | **OK** | Events stays on homepage. If event volume grows, splits into `/eventos`. |
| P6 — Low digital confidence | **Good** | Nav becomes simpler ("Servicios", "Contacto" are clearer than "#servicios anchor"). She follows page links, which match her mental model. |
| P7 — First-time home birth | **Excellent** | `/servicios#parto` and `/como-trabajamos` (with safety detail) are the canonical pages she needs to evaluate. |
| P8 — Repeat home birth | **Excellent** | She can drill into `/como-trabajamos` and read transfer protocols, eligibility, continuity. Bookmarkable. |
| P9 — Trauma | **Good** | `/como-trabajamos` can devote a full block to "qué pasa si tu experiencia anterior fue difícil" — language that doesn't fit naturally on a homepage but lives well on a depth page. |
| P10 — English expat | **Good** | English rollout (M25) translates one page at a time. She can land on `/en/servicios` directly from a Google search. |
| P11 — Expat from MW system | **Excellent** | Wants depth, scope, continuity, language. Detail pages give her all of it. |
| P12 — Sceptical family | **Good** | Homepage 30-second scan is intact. If she wants to verify, she clicks through to `/formacion` or `/como-trabajamos`. |
| P13 — Professional referrer | **Excellent** | A `/formacion` or `/equipo` page with colegiada numbers, scope, insurance is exactly what he needs. Bookmarkable, referenceable. |

**Net:** Option B serves all 13 personas at "good" or better. The information-seeking personas (P2, P4, P7, P8, P11, P13) jump from "poor/mixed" under Option A to "excellent" here. Casual personas (P1, P5, P12) keep their homepage experience. **No persona is worse off.**

#### SEO implications
- **5–7 canonical URLs.** Each carries its own `<title>`, meta description, OG tags, and JSON-LD.
- Spanish keyword distribution: `/servicios` ranks for "matrona privada Valencia servicios"; `/faq` for "matrona Valencia preguntas"; `/como-trabajamos#parto-en-casa` for "parto en casa Valencia"; `/recursos` for "recursos embarazo parto Valencia". **No keyword cannibalisation.**
- FAQ schema markup at `/faq` is canonical and gives Google rich snippets. The FAQ page can rank for long-tail Spanish questions ("¿qué incluye el acompañamiento al parto?") that the homepage cannot.
- LocalBusiness schema stays on `/`. Service schema (`@type: Service`) goes on `/servicios`. Person schema for each midwife goes on `/equipo` or `/formacion`.
- **Deep-link sharing works:** Instagram bio can carry `/recursos`, WhatsApp messages can link to `/faq#parto-en-casa`, referrers can send a colleague to `/formacion`.
- Sitemap entries: ~7 URLs in Spanish + their language variants.

#### i18n implications
- **URL structure recommended:** subfolder per language — `/`, `/en/`, `/ca/`. This is the standard for static sites and works on GitHub Pages without any routing magic. Each language gets its own `index.html`, `servicios.html`, `faq.html`, etc.
- `hreflang` tags on each page point to language alternates: `/servicios.html` ↔ `/en/services.html` ↔ `/ca/serveis.html`.
- **Translation workload at M25:** can be done **page-by-page**. Translate `/servicios` first, then `/faq`, then `/como-trabajamos`, etc. The site can have English `/servicios` while `/recursos` is still Spanish-only — degraded but not broken. This is the major i18n advantage of hybrid.
- Language switcher behaviour: clicking "EN" on `/servicios` should land on `/en/services`. If that page does not exist yet, fall back to `/en/` (homepage).
- Founder editing under multi-lang: still one JSON file per section, but `"en"` and `"ca"` fields populate over time.

#### Internal linking
- **Becomes critical.** The hybrid model relies on:
  - Homepage section summaries → "ver todos los servicios" linking to `/servicios`
  - Cross-page links: `/servicios` → `/faq#parto-en-casa`, `/faq` → `/contacto`, `/como-trabajamos` → `/servicios#parto`, `/recursos` → `/blog/<slug>` (future)
  - Footer link cluster covering every page
- Internal linking is also where SEO equity flows between pages. Without it, each page is an island.
- Minimum cross-link set:
  - Every detail page links back to the homepage in the nav and back to the contact page in the CTA
  - Services links to FAQ for service-specific questions
  - Como-trabajamos links to Servicios for the actual offer
  - Formación links to Equipo for the human story
  - FAQ items cross-link to the relevant detail page (e.g. faq-04 "¿Hacéis partos en casa?" links to `/servicios#parto-en-casa`)

#### Sitemap
- Spanish: `/`, `/servicios.html`, `/como-trabajamos.html`, `/faq.html`, `/recursos.html`, `/formacion.html`, `/contacto.html`, `/privacidad.html`, `/cookies.html` — 9 URLs.
- English (post-M25): mirror under `/en/` — another 9.
- Valencian (post-M26): mirror under `/ca/` — another 9.
- Total at full multi-language rollout: 27 URLs. Manageable, well-bounded.

#### Maintenance burden
- **Slightly higher than Option A**, but not by much.
- Adding an FAQ: still edit `faq.json`. The FAQ now renders on both the homepage summary and `/faq`. The summary code picks the first 5; the page picks all of them.
- Adding a resource: edit `resources.json`. Same logic.
- Adding a new page (e.g. a new pricing page later): one new `<page>.html` scaffold + one new entry in nav + one new sitemap entry. Founder probably doesn't do this; an agent does.
- **No new tooling.** No CMS, no build step. Pages still load JSON via `content-loader.js` extended to handle per-page contexts.
- The complexity that founders absorb is essentially zero. The complexity that agents and contributors absorb is one-time (build the per-page loader pattern once).

#### Mobile UX
- Each detail page is short and focused (5–10 mobile screens).
- Homepage stays at ~12–14 mobile screens.
- Page-to-page navigation is faster than long-scrolling on mobile (tap nav → land at top of focused page).
- Persistent WhatsApp button works on every page.

#### Implementation complexity
- **Medium.** Requires:
  - Extending `content-loader.js` to handle per-page contexts (or one loader per page)
  - Creating page-level HTML scaffolds for each split-off page
  - Adding `<title>` and meta tag handling per page (could be JSON-driven via a new `meta.json` or per-page metadata block)
  - Updating nav to use page links instead of anchors
  - Migrating section CSS to work both on homepage summary blocks and full detail pages

The migration is naturally phased — one PR per split-off page. The site keeps working during migration.

---

### 3.3 Option C — Full multi-page

#### Structure
The homepage becomes a true landing page: hero + intro paragraph + 3 service teasers + 1 strong CTA + footer. Every other section becomes its own URL:

- `/` — landing page (hero + brief intro + 3-card teaser + CTA)
- `/sobre-nosotras` — quienes-somos + por-que (combined brand page)
- `/equipo` — full team profiles
- `/formacion` — credentials and education
- `/servicios` — services detail
- `/servicios/<slug>` — per-service deep pages (optional)
- `/como-trabajamos` — how we work / safety
- `/faq` — full FAQ
- `/eventos` — events listing
- `/recursos` — resources library
- `/recursos/<slug>` — individual posts/articles (future blog)
- `/contacto` — contact page
- `/privacidad`, `/cookies` — existing legal pages

12+ URLs in Spanish, multiplied by language count.

#### Navigation model
- **Top nav:** 6–7 page links — possibly with grouped drop-downs ("Sobre nosotras" → Equipo / Formación; "Servicios" → Servicios / Cómo Trabajamos / FAQ).
- **Mobile:** Hamburger overlay with full page tree, possibly two-level.
- **Footer:** Comprehensive sitemap-style footer with link clusters.

#### Persona fit (full multi-page)

| Persona | Fit | Why |
|---------|-----|-----|
| P1 — First-time, 20w | **Mixed** | Landing page is too thin for her exploratory mood. She has to click through to feel the brand. Higher friction than Option A or B. |
| P2 — Comparing options | **Excellent** | Every comparison surface is its own bookmarkable page. |
| P3 — Co-parent | **Mixed** | He'll click through if curious, but a thin landing might lose him. |
| P4 — Postpartum urgent | **Excellent** | Lands on `/servicios#postparto`, taps WhatsApp. |
| P5 — Event-curious | **Good** | `/eventos` is a clear entry point. |
| P6 — Low digital confidence | **Mixed** | Multi-page nav is harder for her than scroll. She has to understand "click to next page" rather than "scroll down". Not a deal-breaker, but not ideal. |
| P7 — First-time home birth | **Excellent** | Per-service detail pages give her the depth she needs. |
| P8 — Repeat home birth | **Excellent** | Same. |
| P9 — Trauma | **Good** | Dedicated pages allow trauma-aware language without disrupting other content. |
| P10 — English expat | **Good** | English rollout per page; lands on a translated page directly. |
| P11 — Expat from MW system | **Excellent** | Detailed pages match her expectation of how a midwife site should be structured. |
| P12 — Sceptical family | **Mixed** | The thin landing page doesn't give her the 30-second scan she needs. She'd have to click into pages to evaluate. Adds friction. |
| P13 — Professional referrer | **Excellent** | He gets canonical pages he can bookmark and reference. |

**Net:** Option C serves information-seekers excellently, but **costs casual personas (P1, P3, P6, P12) some friction**. It also carries higher implementation cost without proportionally better outcomes than Option B.

#### SEO implications
- **Highest SEO surface area.** ~12 canonical URLs in Spanish, each with focused keyword targeting.
- Risk of **thin content pages** if some pages don't have enough body copy to rank (e.g. `/eventos` when events are sparse, `/sobre-nosotras` if it's just a brand statement).
- Per-service pages (`/servicios/parto-en-casa`, `/servicios/lactancia`) can rank for very specific long-tail Spanish queries — this is the strongest SEO play of the three options.
- Risk of **crawl budget dilution** — every page must be high-quality. Low-traffic pages drag down the site's authority.
- Sitemap: 12+ URLs × 3 languages = 36+ URLs.

#### i18n implications
- Same `/en/`, `/ca/` subfolder pattern as Option B, but with twice as many pages to translate.
- Translation workload is highest. Page-by-page is still possible, but the scope is 2× Option B.
- Language switcher complexity: same per-page mapping logic.

#### Internal linking
- **Critical and abundant.** Every page must link to multiple related pages — services to FAQ to contact to formación, etc.
- Without strong internal linking, full multi-page becomes a set of isolated pages with no SEO equity flow.
- Footer becomes an internal sitemap.

#### Sitemap
- ~12 URLs in Spanish (more if per-service pages added) × 3 languages = 36+ URLs.

#### Maintenance burden
- **Highest of the three options.**
- Adding a service: edit `services.json` AND remember that the per-service page (`/servicios/<slug>`) exists if applicable. Possibly create a new page if a new service slug appears.
- Each page has its own metadata, OG tags, possibly its own JSON content.
- Founders editing JSON works for content updates, but adding/removing pages requires structural changes that they shouldn't do alone.
- Risk of inconsistent content across pages if they share the same source data and one drifts.

#### Mobile UX
- Each page is short (3–6 mobile screens). Fast to load and scan.
- Page transitions are noticeable on mobile (full-page reload unless SPA routing is added — out of scope for static).
- Risk of "click fatigue" — visitors who want a comprehensive overview have to make many clicks.

#### Implementation complexity
- **Highest.** Requires:
  - 8–12 new HTML scaffolds
  - Per-page metadata
  - Per-page content loader logic
  - Comprehensive nav structure (likely with drop-downs)
  - Strong cross-linking discipline
  - Per-service or per-resource slug routing if those are added
- The migration cannot be incremental in the same way Option B can — the homepage has to commit to becoming a landing page (lose all its content), which is a step-change rather than a phased approach.

---

### 3.4 Option comparison summary

| Dimension | A — Single-page | B — Hybrid | C — Multi-page |
|-----------|----------------|------------|---------------|
| Homepage scroll depth | Grows to 28 screens | Stable at 12–14 | Drops to 5–6 |
| Sections in nav | 5–6 anchors (6 hidden) | 5–6 page links | 6–7 with groups |
| Persona fit (avg) | 7/13 served well | **13/13 served well** | 9/13 served well |
| SEO surface | 1 URL | 5–7 URLs | 12+ URLs |
| Keyword targeting | Diluted | Focused per page | Most focused, but risks thin content |
| FAQ schema benefit | Possible | **Canonical** | Canonical |
| Deep-link sharing | Anchor only | Page URLs | Page URLs |
| i18n workload at M25 | Single large task | Page-by-page | Largest, page-by-page |
| Translation rollout | All-or-nothing | **Incremental** | Incremental |
| Founder editing | Lowest burden | Low burden (same JSON model) | Medium burden |
| Content scaling (12mo) | Page becomes unmanageable | Stable, detail pages absorb growth | Stable, but page count grows |
| Implementation cost | Lowest | Medium | Highest |
| Migration shape | None needed | Phased (one PR per page) | Step-change |
| Risk of regression | None | Low (homepage stays during migration) | Medium (homepage rewrite) |
| Mobile experience | Long scroll dominates | Short focused pages + summary home | Shortest pages, most clicks |
| Maintenance over 12mo | Hardest (single file too large) | Stable | Hardest (most files to keep consistent) |

---

## 4. Navigation Scalability

### 4.1 Current nav at 12 sections

The current nav has 5–6 anchor labels for 12 sections. Six sections (formación, como-trabajamos, faq, testimonios, recursos) are unreachable from the top of the page without scrolling. This is already broken from a discovery perspective.

### 4.2 Nav under each option

**Option A nav:**
- Desktop: ~8 anchors. At ~12 the nav wraps. Workable but cluttered.
- Mobile: hamburger overlay with full anchor list — works fine.
- Persistent floating WhatsApp button (M16A) becomes mandatory.

**Option B nav (recommended):**
- Desktop: 5–6 page links — Equipo, Servicios, Cómo Trabajamos, FAQ, Recursos, Contacto.
- Mobile: hamburger with same 5–6 page links.
- Persistent WhatsApp on every page.
- In-page anchors only on the homepage (for the summary blocks).
- Within longer detail pages (e.g. `/servicios` with 7 services), an in-page table-of-contents linking to anchors `#embarazo`, `#parto`, `#postparto` is helpful for power users (P2).

**Option C nav:**
- Desktop: 6–7 page links, possibly with drop-downs ("Sobre nosotras" → Equipo / Formación).
- Mobile: two-level hamburger.
- Risk: drop-downs on small touch devices can be fiddly.

### 4.3 Secondary nav needs

Under Option B and C:
- **Within `/recursos`:** Filter chips by category (Libros / Asociaciones / Podcasts / Online), or category-grouped sections.
- **Within `/servicios`:** Per-service anchor list at the top. Optionally per-service pages later.
- **Within `/faq`:** Category groupings ("Sobre el acompañamiento" / "Sobre el parto" / "Logística") if FAQ grows past 15 items.

### 4.4 Sticky nav recommendation

In all three options, a **sticky top nav** on desktop is now warranted. The page is too tall for visitors to scroll back up to navigate. On mobile, the existing top bar already disappears on scroll — consider keeping it sticky, or pair with a persistent floating WhatsApp button as the primary mobile contact path.

---

## 5. Internal Linking Structure

### 5.1 Natural cross-link pairs

Mapping content relationships that exist in the current JSON:

| From | To | Why |
|------|----|----|
| services (parto) | how-we-work#safety | Home birth seekers (P7, P8) need safety info adjacent to the parto offering |
| services | faq | Service descriptions raise questions that FAQ already answers |
| how-we-work | services | The "how" naturally leads to the "what" |
| how-we-work#safety | contact | Visitors who read about safety often want to ask about their specific case |
| equipo | formación | Personality (bio) links to credentials (formal trust) |
| formación | services | Specialisms unlock specific services (Isabel UK training → English-speaking offer) |
| faq#parto-en-casa | services#parto | Reference back to canonical service description |
| recursos | services / faq | Curated resources for visitors who want depth |
| testimonios | services | Social proof per service |
| any page | contact | Ubiquitous primary CTA |

### 5.2 Criticality per option

| Cross-link | A | B | C |
|-----------|---|---|---|
| services ↔ faq | nice | **critical** | **critical** |
| services ↔ how-we-work | nice | **critical** | **critical** |
| how-we-work ↔ contact | nice | recommended | **critical** |
| equipo ↔ formación | nice | recommended | **critical** |
| faq items → relevant page | n/a (anchor) | **critical** | **critical** |
| any page → contact | nice | **critical** | **critical** |

Under Option A, cross-links are nice-to-have anchors. Under Option B and C, they are how SEO equity and user journeys flow between pages.

### 5.3 Minimum internal linking set (Option B)

- Every detail page has nav back to homepage
- Every detail page has a contact CTA at the bottom
- Footer carries every page link
- Homepage summary blocks each link to their detail page
- FAQ items cross-link to detail pages where applicable (faq-04 → /servicios#parto-en-casa, faq-07 → /como-trabajamos#safety)
- Resources library entries cross-link to relevant FAQ or services where applicable

---

## 6. Sitemap and SEO

### 6.1 Sitemap entries per option

**Option A:**
- `/`, `/privacidad.html`, `/cookies.html` — 3 URLs

**Option B (recommended):**
- `/`, `/servicios.html`, `/como-trabajamos.html`, `/faq.html`, `/recursos.html`, `/formacion.html`, `/contacto.html`, `/privacidad.html`, `/cookies.html` — 9 URLs Spanish
- × 3 languages at full rollout = 27 URLs

**Option C:**
- 12+ URLs Spanish
- × 3 languages = 36+ URLs

### 6.2 Best SEO surface for Spanish keywords

Target queries for private midwifery in Valencia (estimated by intent, not by exact volume — actual SEO research is part of M20):

| Query | Best landing surface | Option ranking |
|-------|---------------------|----------------|
| "matrona privada Valencia" | Homepage / | A: dilute · B: clean · C: clean |
| "parto en casa Valencia" | /servicios#parto or /servicios/parto-en-casa | A: poor (buried) · B: **strong** · C: strongest |
| "lactancia matrona Valencia" | /servicios#lactancia | A: poor · B: **strong** · C: strongest |
| "preguntas matrona Valencia" | /faq | A: weak (no own URL) · B: **strong** (FAQ schema) · C: strong |
| "preparación al parto Valencia" | /servicios#talleres or /eventos | A: poor · B: **strong** · C: strongest |
| "matrona inglés Valencia" | /en/ or page mentioning English | A: weak · B: **strong** · C: strong |
| "biblioteca recursos embarazo" | /recursos | A: poor · B: **strong** · C: strong |

Option B captures the major Spanish queries with focused pages without the thin-content risk of Option C.

### 6.3 FAQ schema markup

The FAQ as standalone page (`/faq`) is the highest-ROI SEO move available to this site. FAQ schema produces Google rich snippets (the dropdown FAQ in search results) and ranks for long-tail "¿qué incluye…?" / "¿hacéis…?" queries. The current FAQ section already has 9 items in plain Q&A form — it is structurally ready for FAQ schema. Moving it to its own page is the structural unlock.

Under Option A, FAQ schema can technically be applied to the FAQ section JSON-LD on the homepage, but the page is already competing with itself for ranking signal. Under Option B, `/faq` is canonical for FAQ-type queries and the homepage stays clean.

### 6.4 Multi-language URL structure

**Recommended: subfolder per language** — `/`, `/en/`, `/ca/`.

Reasons:
- Standard for static sites; works on GitHub Pages without routing
- Clean `hreflang` mapping: `/servicios` ↔ `/en/services` ↔ `/ca/serveis`
- Search engines treat each language as a separate indexable URL
- No subdomain DNS work (vs `en.alumbra-comares.es`)
- No reliance on JS for language switching (vs `?lang=en`)

Alternatives considered and rejected:
- **Query param (`?lang=en`):** SEO-brittle, fragile cache behaviour, Google may treat as duplicate
- **Subdomain (`en.alumbra-comares.es`):** requires DNS work, fragments analytics, splits domain authority
- **Language-switcher in JS only on a single URL:** doesn't produce indexable English pages, fails for SEO

### 6.5 Per-page metadata

Under Option B, each page needs:
- `<title>` — ~50–60 characters, keyword-leading
- `<meta name="description">` — ~150 characters
- `<meta property="og:title">`, `og:description`, `og:image`, `og:url`
- Canonical URL tag
- `hreflang` alternates for each language version
- Page-specific JSON-LD where applicable (`@type: Service` on `/servicios`, `@type: FAQPage` on `/faq`, `@type: LocalBusiness` on `/`)

This is M20 work, but Option B is the prerequisite for it.

---

## 7. i18n Implications

### 7.1 Current state

- Spanish-only content; every `"en"` and `"ca"` field in every JSON is `null`
- The language switcher in the nav is structural-only — clicking "EN" produces no translated content
- Baseline scorecard penalises this in C14 (1/2, partial — switch present but non-functional)

### 7.2 Per-option translation rollout

**Option A — single-page:**
- Translation is a single large task. Every JSON field across all 12 sections must be populated to ship English.
- No partial state — the site is either bilingual or it isn't.
- Risk: M25 becomes a 50–100-string translation task that has to land in one PR.
- Language switcher behaviour: re-paint the same URL with English content (JS toggle). Search engines can't index two language versions of one URL cleanly without `hreflang` and ideally separate URLs.

**Option B — hybrid (recommended):**
- Translation is page-by-page. Translate `/servicios` first (highest SEO value for English-seeking expat personas P10, P11), then `/faq`, then `/como-trabajamos`, etc.
- Site can have English `/servicios` while `/recursos` is still Spanish-only — degraded but not broken.
- Language switcher behaviour: clicking "EN" on `/servicios` lands on `/en/services`. If that page doesn't exist yet, fall back to `/en/` or display a "coming soon" notice.
- M25 becomes 4–6 incremental PRs instead of one big-bang.

**Option C — full multi-page:**
- Same page-by-page approach as Option B, but with twice the page count.
- Translation workload is highest.

### 7.3 Founder editing under multi-language

Whichever option is chosen:
- Each JSON field has `es`, `en`, `ca` slots.
- Founder edits Spanish freely. English and Valencian fields are populated by translators (or the founder if bilingual) at M25/M26.
- Placeholder convention: `null` for "not yet translated" — distinguishable from `__PLACEHOLDER__` (content not yet decided).

### 7.4 Switcher UX implications

| Option | Switcher behaviour |
|--------|-------------------|
| A | JS-only re-paint of same URL. Risk: address bar doesn't change, refresh resets to default lang. |
| B | Page-level language alternates. Click "EN" → `/en/<same-page>`. Standard, clean. |
| C | Same as B. |

### 7.5 What the founders should commit to before M25

The founders must decide before M25:
1. URL structure for languages (subfolder recommended)
2. Default language (Spanish)
3. Translation strategy: in-house or external translator
4. Whether to translate all surfaces or prioritise high-impact ones (services + FAQ + contact = minimum viable English; others can follow)

Option B makes question 4 answerable incrementally. Option A forces an all-or-nothing answer.

---

## 8. Founder Editing Burden

The founders are the long-term editors. They are not developers. They edit content via the GitHub web editor or a local clone. The IA decision must respect that constraint.

### 8.1 Common edits and how they look per option

| Edit | A — Single-page | B — Hybrid | C — Multi-page |
|------|----------------|------------|---------------|
| Fix a typo in a service description | Edit `services.json`, refresh | Same | Same |
| Add an FAQ | Edit `faq.json`, item appears on homepage section + (B/C) on `/faq` | Same | Same |
| Add a new service | Edit `services.json` | Edit `services.json`; if per-service slug pages exist (C), create new page scaffold | Possibly new page scaffold + nav entry |
| Add a new resource (book, podcast) | Edit `resources.json` | Same | Same |
| Add a new event | Edit `events.json` | Same | Same |
| Update team bio | Edit `team.json` | Same | Same |
| Fix pricing | Edit `services.json` price field | Same | Same |
| Translate a page to English | Populate `"en"` fields across all JSON in one batch | Populate `"en"` fields for one page's worth of JSON at a time | Same as B but more pages |
| Add a new page (e.g. /pricing) | Not applicable (or: add a new section) | Add a new page scaffold + nav entry — agent task, not founder | Same as B |

For the day-to-day edits that founders actually make (typos, FAQ additions, content updates), **all three options have the same workflow.** The hybrid model does not increase founder burden for editorial work.

The founder burden differs only for **structural changes** (adding a new top-level page, adding a new content type). Those are agent tasks regardless of IA choice.

### 8.2 Risk of content drift across pages

Under Option B and C, the same content (e.g. service descriptions) may appear on the homepage summary AND on `/servicios`. To avoid drift:
- **Single source of truth:** services.json is the only source. Both the homepage and `/servicios` read from it.
- The homepage summary picks the first 3–4 services or a `featured: true` flag. The full page renders all.
- Founder edits one place; both surfaces update.

This pattern is already used in the current code (the events grid reads from events.json and renders all items). Extending it to per-page summary/full views is a small loader-pattern change.

### 8.3 Tooling for content updates

Whichever option is chosen, the founders benefit from:
- A simple changelog convention in JSON files (added in M21)
- A short editorial guide (in M21) with examples of good and bad copy
- A preview workflow: edit JSON locally → `python3 -m http.server 8080` → check before pushing

None of these are blocked by the IA decision. They are M21 work.

---

## 9. Recommendation

### 9.1 Chosen direction

**Option B — Hybrid: single-page homepage + detail pages for depth content.**

This is the only option that:
- serves all 13 personas at "good" or better (Option A loses information-seekers; Option C loses casual personas)
- makes M25 (English) and M26 (Valencian) incremental rather than all-or-nothing
- unlocks FAQ schema and per-page metadata for M20 SEO foundations
- keeps the homepage scannable in 90 seconds while giving depth-seekers canonical URLs to bookmark
- migrates incrementally — the homepage continues to function during every step
- preserves the founder editing model unchanged

### 9.2 Phased migration order

**Note on content readiness:** The phased order below is about **implementation risk and SEO leverage**, not content volume. Several surfaces currently carry placeholders (pricing, credentials, transfer protocols, geographic coverage) because the founders are not yet co-located with the build process. They have committed to populating every surface once accessible. Detail pages can therefore be split now and filled progressively — the structural decision is independent of content readiness. Phasing exists to reduce migration risk per PR, not to wait for content.

The pages to split off, in order of priority:

| Phase | Page | Why this order | Estimated milestone |
|-------|------|---------------|---------------------|
| 1 | `/faq` | Highest SEO leverage (FAQ schema), already 9 ready items, lowest implementation risk (the FAQ HTML scaffold is already minimal) | M20a or new M17.1 |
| 2 | `/recursos` | Already structured for it (carousel + grid pattern works as a full-page list), supports future blog growth, Spanish keyword opportunity | M17.2 |
| 3 | `/servicios` | Highest content value, supports M15 services rewrite (longer descriptions fit better on a dedicated page), addresses C5 (price) more naturally | M17.3 (after M15) |
| 4 | `/como-trabajamos` | Addresses C17 (safety/transfer) gap directly — gives transfer protocol language room to breathe; serves P7, P8, P9, P12 | M17.4 |
| 5 (optional) | `/formacion` | Addresses C15 (credentials) and C21 (referrer-friendly); priority depends on whether real credentials get collected (M18 follow-up) | M17.5 (later) |
| 6 (optional) | `/contacto` | Useful as a direct-link target ("contacta con nosotras" in Instagram bio) but the homepage already has the form. Lower priority. | optional |

### 9.3 What stays on the homepage

- **Hero** — always
- **Quiénes somos** — short brand block
- **Por qué Alumbra** — 3 pillars
- **Equipo** — 3 midwife profiles (full bios + quotes)
- **Formación** — credential summary as expanded team cards (until M17.5 splits into `/formacion`)
- **Servicios** — top 3–4 services as summary cards with "ver todos los servicios" linking to `/servicios`
- **Cómo trabajamos** — top 3 blocks (modelo, para quién es, primer contacto) with "leer más" linking to `/como-trabajamos`
- **FAQ** — top 5 most common questions with "ver todas las preguntas" linking to `/faq`
- **Eventos** — full events listing (eventos stay on homepage until volume warrants a page)
- **Testimonios** — full carousel
- **Recursos** — top 3 resources with "ver biblioteca completa" linking to `/recursos`
- **Brochure download CTA** — keep as homepage element near recursos summary
- **Contacto** — full form + channels (homepage primary CTA)

The homepage drops from 17 mobile screens to roughly 13–14 — still long, but every block earns its place.

### 9.4 Proposed page map

| URL | Primary content | Nav label | Notes |
|-----|----------------|-----------|-------|
| `/` | Homepage with summary blocks | Inicio | Always the first nav entry on detail pages |
| `/equipo.html` | Full team profiles + bios + quotes | Equipo | Optional split — could stay on homepage. Decision deferred. |
| `/servicios.html` | All 7+ services with extended descriptions, pricing, what's included | Servicios | Phase 3 |
| `/como-trabajamos.html` | Modelo, eligibility, safety, transfer protocols, public system relationship, primer contacto | Cómo Trabajamos | Phase 4 |
| `/faq.html` | All FAQ items with FAQ schema | Preguntas | Phase 1 |
| `/recursos.html` | Full resources library with category filtering | Recursos | Phase 2 |
| `/formacion.html` | Per-midwife credentials, registration numbers, training | (optional) Formación | Phase 5 |
| `/contacto.html` | Contact form, all channels, hours | Contacto | Optional, low priority |
| `/privacidad.html` | Privacy policy | (footer only) | Existing |
| `/cookies.html` | Cookie notice | (footer only) | Existing |

Future expansion (post-M19):
- `/blog/<slug>.html` for individual articles when blog content starts
- `/servicios/<slug>.html` for per-service deep pages if SEO research (M20) suggests this is worth the long-tail Spanish keywords
- `/eventos.html` if event volume grows past 4–5 active events at any time

### 9.5 Proposed navigation structure

**Top nav (desktop and mobile, sticky on scroll):**
- Inicio — `/`
- Equipo — `/#equipo` (homepage anchor) until Phase 5; then `/equipo.html`
- Servicios — `/servicios.html` (Phase 3+) or `/#servicios` until then
- Cómo Trabajamos — `/como-trabajamos.html` (Phase 4+) or `/#como-trabajamos` until then
- Preguntas — `/faq.html` (Phase 1+)
- Recursos — `/recursos.html` (Phase 2+)
- Contacto — `/#contacto` (homepage anchor) — anchor stays even after `/contacto.html` exists, because the homepage form is the primary conversion surface

**Footer:**
- Mirror of top nav
- Legal links: Privacidad, Cookies
- Instagram, Email
- Future: WhatsApp link (M16A)
- Future: language switcher (M25)

**Mobile-only:**
- Persistent floating WhatsApp button (M16A) — bottom-right corner, present on every page

### 9.6 Internal linking commitments

Minimum cross-link set the migration must establish:

- Homepage summary blocks → detail pages ("ver todas las preguntas", "ver todos los servicios", "ver biblioteca completa")
- Every detail page nav links back to homepage and forward to /contacto
- FAQ items cross-link to relevant detail pages: faq-04 (parto en casa) → /servicios#parto, faq-07 (complicaciones) → /como-trabajamos#safety
- Services page cross-links to FAQ for service-specific questions
- Como-trabajamos cross-links to Servicios for the actual offer
- Footer carries every page link

### 9.7 Key risks and tradeoffs

| Risk | Mitigation |
|------|-----------|
| Content drift between homepage summary and detail page | Single source of truth (one JSON file per content type); homepage filters/picks first N; detail page renders all |
| Migration introduces regressions | Phase one page at a time; keep homepage anchor working as fallback during each migration; test on every PR |
| Detail pages start with thin content (placeholder period) | **Not a structural risk.** Current placeholders reflect that the founders are not yet co-located with the build; they have committed to populating every surface once accessible. Detail pages can be split now and filled progressively. The structural decision is independent of content readiness. |
| Per-page metadata becomes a maintenance burden | Centralise via a `meta.json` or per-page metadata block; make it part of the page scaffold, not per-deploy work |
| Nav becomes inconsistent between homepage anchors and detail-page links | Migrate nav once after Phase 1 and 2 land; commit to all-page-links navigation post-Phase 2 |
| Founders find the multi-page model confusing | Editorial guide (M21) explains: "Spanish content goes here. Detail pages render the same JSON; you don't need to do anything different." |

### 9.8 Implications for downstream milestones

| Milestone | Implication |
|-----------|------------|
| **M15 — Services rewrite** | Slot Phase 3 (`/servicios` split) immediately after M15, or do the split as part of M15. Longer service descriptions fit a detail page better than homepage cards. |
| **M16/M16A — WhatsApp** | Persistent floating button on every page (homepage + detail pages). Keep one CTA per surface to avoid CTA pollution. |
| **M20 — SEO foundations** | Phase 1 (`/faq`) should land before M20 to give the SEO milestone a real FAQ page to add schema markup to. M20 then handles per-page metadata, sitemap generation, and JSON-LD across all detail pages. |
| **M21 — Content governance** | Editorial guide must cover: how to add an FAQ (still just JSON), how the homepage summary picks items, what `featured: true` means if added. |
| **M22 — Asset readiness** | Per-page social cards (OG images) per detail page. More image work, but each page can have its own visual identity. |
| **M25 — English rollout** | Translate page-by-page. Recommended order: `/`, `/servicios`, `/faq`, `/contacto` (minimum viable English) → then `/como-trabajamos`, `/recursos`. |
| **M26 — Valencian rollout** | Same page-by-page approach. Lower priority than English given audience. |
| **M27 — Accessibility** | Per-page audit. Each detail page audited independently. |
| **M28 — 404 pages** | Becomes essential under multi-page — direct links from old anchors must redirect or 404 cleanly. |

### 9.9 What this means for M17 itself

M17 is a **decision** milestone. It does not ship a code change. The output of this audit is:
1. A founder approval of Option B
2. A revised plan (`docs/plan.md`) introducing M17.1 through M17.4 as the phased migration milestones
3. An editorial framing of what the homepage carries vs what splits off

M17 closes once the founders sign off on the recommendation. The implementation work is M17.1–M17.4 in subsequent PRs.

---

## 10. Concluding Notes

### 10.1 What was assumed

- The founders care about both user experience and SEO discoverability for organic Spanish search.
- WhatsApp will become the primary contact channel post-M16/M16A. The implication: every page must have a tappable WhatsApp CTA.
- Real credentials, pricing, and event dates will land in subsequent milestones. The IA decision must not be blocked on those, but must accommodate them when they arrive.
- **Placeholder content is a temporary state, not a structural property of the site.** The current placeholders (pricing, credentials, transfer protocols, geographic coverage, event dates) exist because the build is happening without the founders in the room. Once they are accessible, every surface is expected to be populated with real content. The IA decision is therefore not constrained by current content thinness — pages can be split structurally now and filled in subsequent content milestones.
- The site stays on GitHub Pages for the foreseeable future. No SSR, no SPA routing, no headless CMS.
- Founders will continue editing JSON via simple tooling, not a CMS dashboard.

### 10.2 What was NOT decided here

- **Per-service slug pages** (`/servicios/parto-en-casa`, etc.) — defer until M20 SEO research shows whether long-tail Spanish queries justify them.
- **Blog vs articles in `/recursos`** — defer until founder content cadence is known. The current `/recursos` schema accommodates both with a `type` field.
- **Whether `/equipo` and `/contacto` get their own pages** — defer; they work on the homepage.
- **Sticky nav exact behaviour on mobile** — design detail for the migration PRs.
- **Specific OG image and metadata per page** — M20 work.

### 10.3 What founders should review

The single decision required from the founders: **approve Option B as the IA direction, or counter with a different option.**

If approved:
- Plan.md should add M17.1, M17.2, M17.3, M17.4 as phased migration milestones
- M15 (services rewrite) should be revisited to include the `/servicios` page split
- M20 (SEO) should be revisited to depend on Phase 1 (`/faq`) landing first

If countered:
- Option A: accept that the homepage will pass 25 mobile screens within 12 months and contact will be at the bottom
- Option C: commit to the higher implementation cost and the homepage rewrite

### 10.4 Five-bullet summary

- **The homepage has crossed a structural threshold.** 12 sections, 17 mobile screens, six sections invisible from nav. Single-page is at its limit and English/Valencian rollouts will break it.
- **Recommendation: Option B (hybrid).** Keep the homepage as a curated landing with summary blocks. Split four surfaces onto their own URLs in this order: `/faq`, `/recursos`, `/servicios`, `/como-trabajamos`.
- **Persona fit improves uniformly.** Information-seekers (P2, P4, P7, P8, P11, P13) jump from "poor/mixed" to "excellent". Casual personas (P1, P5, P12) keep their current homepage experience. No persona is worse off.
- **i18n becomes incremental.** M25 English rollout becomes 4–6 small PRs (one per page) instead of an all-or-nothing translation of 12 sections.
- **Migration is phased.** One PR per page. The homepage continues to function during each step. No big-bang rewrite, no regression risk.

---

*End of audit. Recommendation pending founder approval.*

