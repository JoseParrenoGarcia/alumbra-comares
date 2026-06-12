# M17 Information Architecture Audit — Alumbra Comares

## Scope and grounding

This document evaluates whether Alumbra Comares should remain a single-page site or evolve into a small multi-page structure as the current roadmap lands.

It is grounded in:

- `docs/PRD.md`, especially the v0 single-page recommendation and the note that IA should be revisited if services, safety guidance, FAQs, or resources grow
- `docs/plan.md`, especially the pending milestones from `M15` through `M31`
- `docs/milestones/m17.md`
- `docs/research/m14-personas.md` and `docs/research/m14-audit-rubric.md`
- `docs/research/scores/2026-06-11.md`
- `docs/research/Alumbra_Comares_Best_Practice_Canvas.md`
- `index.html`
- `content/services.json`, `content/faq.json`, `content/how-we-work.json`, `content/resources.json`, `content/team.json`
- `js/content-loader.js`

## 1. Current State Assessment

### Current footprint

The current homepage stacks 12 content sections in this order:

`hero → quienes-somos → por-que → equipo → formacion → servicios → como-trabajamos → faq → eventos → testimonios → recursos → contacto`

Two legal pages already sit outside that flow as separate URLs:

- `/privacidad.html`
- `/cookies.html`

This matters because the site is no longer a pure one-page concept. It is already a small hybrid structure, just without depth pages for the core visitor journeys.

### Mobile scroll depth estimate

On a `375px` mobile viewport, the current homepage is roughly **26 to 30 full-screen heights** before a visitor reaches the footer. If several FAQ items are opened, it grows further.

Why this estimate is defensible:

- Mobile section padding alone contributes substantial vertical distance: most sections use `3rem` top and bottom padding.
- The page includes several repeated-card sections that are tall on mobile:
  - `equipo` has 3 long bios
  - `formacion` has 3 member cards with multiple subsections
  - `servicios` has 7 service cards
  - `como-trabajamos` has 6 blocks
  - `faq` has 9 accordion items
  - `recursos` has 6 resource cards plus a brochure card
- The hero section itself has a mobile `min-height` of `60vh`.

### Has the single-page structure crossed the complexity threshold?

Yes. It is still technically usable, but it has crossed the threshold where **wayfinding and cognitive load** become bigger problems than loading speed or implementation simplicity.

Key reasons:

- The homepage now contains multiple content types with different user intents: trust-building, service evaluation, safety clarification, reference material, events, testimonials, and contact.
- Several sections are already page-like in depth, not summary-like:
  - `content/services.json` contains 7 service cards and is expected to grow again in `M15`
  - `content/how-we-work.json` contains 6 explanatory blocks
  - `content/faq.json` contains 9 questions, including public-system, safety, geography, English-language, and first-contact issues
  - `content/resources.json` already behaves like a library, not a homepage teaser
- The current scorecard is `26/46`, below the `32/46` threshold. The weakest areas include pricing visibility, credentials, safety clarity, WhatsApp reachability, and homepage sequence. Those are trust and journey problems, not just copy problems.

### Homepage-summary vs full-standalone content

| Section | Current role | Assessment |
|---------|--------------|------------|
| `hero` | landing | Homepage-summary. This should stay on the homepage. |
| `quienes-somos` / philosophy | positioning | Homepage-summary. It works best as a concise framing layer. |
| `por-que` | brand rationale | Homepage-summary. Useful, but not strong enough to justify its own page. |
| `equipo` | trust | Borderline. The current bios are long enough to support a standalone team surface later, but a homepage preview is still useful. |
| `formacion` | credentials | Full-standalone candidate. P2, P12, and P13 need this as a trust-verification surface. |
| `servicios` | evaluation | Full-standalone candidate now; strong standalone need after `M15`. |
| `como-trabajamos` | safety and care model | Full-standalone candidate now. This directly serves P1, P7, P8, P9, P11, P12, and P13. |
| `faq` | anxiety reduction | Full-standalone candidate now. It already contains answers tied to C6, C17, C18, and language concerns. |
| `eventos` | community | Homepage-summary for now, but can become standalone if event volume becomes real. |
| `testimonios` | proof | Homepage-summary for now. It is still placeholder-level. |
| `recursos` | education / library | Full-standalone candidate. This is the clearest unbounded content type besides blog posts. |
| `contacto` | conversion | Homepage-summary now; optional standalone later if campaigns or multilingual routing justify it. |

### Navigation scalability

The current anchor navigation does **not** scale cleanly anymore.

Important correction from the live code:

- The current desktop and mobile nav exposes **6** anchor links, not 5: `Quiénes Somos`, `Por Qué`, `Equipo`, `Servicios`, `Eventos`, `Contacto`.
- The homepage itself contains **12** sections.

Consequences:

- Half of the page stack is not directly navigable from the primary nav:
  - `formacion`
  - `como-trabajamos`
  - `faq`
  - `testimonios`
  - `recursos`
- Visitors must discover those sections by scrolling rather than by intent.
- That is particularly weak for:
  - P4 and P6, who need fast contact and low-friction navigation
  - P7, P8, P9, P12, and P13, who need explicit safety and credibility material
  - P10 and P11, who need direct orientation and explanation rather than narrative wandering

## 2. Content Growth Projection

### Roadmap pressure on IA

| Milestone | Expected growth | IA effect |
|-----------|-----------------|-----------|
| `M15` Services rewrite | Longer service descriptions, clearer scope, likely package logic and stronger comparison language | Pushes `servicios` toward its own destination page |
| `M20` SEO foundations | Page-level metadata, structured data, keyword decisions | Makes single-URL anchor-only SEO much weaker relative to page-based targets |
| `M21` Content governance | Editorial rules and changelog discipline | Easier to govern separated content domains than one overloaded homepage |
| `M22` Asset readiness | Real team photos, alt text, social cards, media ownership | Increases trust depth, especially for team and services |
| `M25` English rollout | Full English content | Multiplying one overloaded homepage into three long versions is harder to maintain |
| `M26` Valencian rollout | Third language layer | Further increases routing, metadata, and editing burden |
| future blog posts | Unbounded | Strong argument for a resources/blog index |
| future pricing tiers | Semi-bounded but detail-heavy | Stronger case for a service detail page |
| more downloadables | Unbounded | Better on a resources surface than on the homepage |
| more events | Unbounded / seasonal | Better as a list or archive than as a permanent homepage block |

### Bounded vs unbounded content

**Likely bounded or slow-growth content**

- hero
- philosophy
- brand rationale
- team identity
- contact framing
- legal pages

**Likely unbounded or expansion-prone content**

- resources / blog
- events
- FAQ
- services, if package logic, pricing tiers, or service-specific CTAs are added
- credentials, if registrations, associations, insurance, and training are fully populated in `M18`

### If all planned content lands, what does the homepage become?

If the roadmap lands without structural change, the homepage becomes:

- a long-form landing page
- a services catalog
- a safety explainer
- a mini-FAQ hub
- an events teaser
- a testimonial surface
- a resource directory
- a multilingual SEO compromise

That combination is too broad for one URL if the goal is clarity for P1, P2, P7, P10, P11, P12, and P13.

## 3. IA Options — Detailed Comparison

### Summary comparison

| Dimension | Option A — Stay single-page | Option B — Hybrid | Option C — Full multi-page |
|-----------|-----------------------------|-------------------|----------------------------|
| Structure | One long homepage plus legal pages | Homepage as summary plus depth pages for high-intent content | Homepage as light landing page, most major sections moved to their own URLs |
| Best for | Simplicity, low maintenance, fast edits | Balanced trust, SEO, and manageable operations | Maximum page-level SEO and separation |
| Biggest weakness | Cognitive overload, limited SEO surface, nav strain | Requires page decisions and disciplined cross-linking | Highest complexity for current content maturity |
| SEO surface | Weakest | Strong | Strongest in theory |
| Mobile UX | Long-scroll fatigue | Best balance | More page loads, more navigation work |
| Founder editing burden | Lowest short-term | Moderate | Highest |
| i18n readiness | Weak | Best balance | Operationally heavy |
| Complexity vs current codebase | Low | Medium | High |

### Persona fit matrix

`High` means the option naturally supports the persona's main journey. `Medium` means it can work with careful execution. `Low` means the structure itself creates friction.

| Persona | Option A | Option B | Option C |
|---------|----------|----------|----------|
| P1 First-time parent | Medium. Warm narrative helps, but key answers are buried. | High. Homepage can reassure first, then route to services, FAQ, and how-we-work. | Medium. Clearer destinations, but more decision-making upfront. |
| P2 Comparing options | Low-Medium. One URL makes comparison harder; no page-level service landing. | High. Service and credential depth can support side-by-side evaluation. | High. Strong comparison potential, but heavier to maintain. |
| P3 Co-parent | Medium. Plain explanations can work, but long scroll reduces practical clarity. | High. Service and FAQ pages can explain value and role clearly. | Medium. Works if navigation stays simple. |
| P4 Postpartum urgency | Low. Postpartum is still one section among many. | High. Direct route to services or contact reduces time-to-action. | Medium. Useful if postpartum page exists, but more taps. |
| P5 Event-curious visitor | Medium. Events section is easy to preview but weak for updates. | High. Homepage teaser plus events/resources surface fits this journey. | Medium. A separate events page helps only if event volume becomes real. |
| P6 Low digital confidence | Low-Medium. Long-scroll and hidden trust sections are a burden. | High. Shorter homepage plus visible contact and a few clear destinations is best. | Low-Medium. Too many pages can feel like homework. |
| P7 First-time home birth | Low. Safety and transfer information should not depend on scrolling. | High. How-we-work and FAQ can answer trust questions directly. | High. Strong if safety pages are excellent, but complexity rises. |
| P8 Repeat home birth | Medium. She can dig, but current structure feels broad rather than specialist. | High. Direct depth pages signal maturity without overbuilding. | High. Clear depth is good, but may exceed current operational readiness. |
| P9 Prior trauma | Medium. Tone is warm, but trust and safety material compete with everything else. | High. Dedicated safety and FAQ surfaces reduce emotional uncertainty. | Medium-High. Could work well, but only if navigation stays humane. |
| P10 English-speaking expat | Low. One long page times three languages is fragile. | High. Language folders plus page-level routing are clearer. | Medium. Structurally clean but operationally expensive. |
| P11 Expat from midwife-led system | Low-Medium. Needs service-system explanation and continuity clarity quickly. | High. Hybrid lets the homepage orient and depth pages explain the Spanish context. | High. Strong in theory, but large maintenance burden. |
| P12 Influential family member | Medium. Can be persuaded, but credibility content is not directly discoverable. | High. Credentials and safety can be linked explicitly. | High. Separate trust pages help, but only if they stay concise. |
| P13 Professional referrer | Low. Credentials and scope should not require a full homepage read. | High. Credentials, services, and scope can each have linkable surfaces. | High. Best fit for referrers, but may be too heavy for the broader audience. |

### Option A — Stay Single-Page

#### Structure description

Keep the homepage as the primary experience. Reorder sections, improve anchor navigation, and use stronger in-page cross-links.

#### Proposed navigation model

- sticky anchor nav
- possible grouped or shortened mobile nav
- in-page cross-links from hero and service cards to FAQ, safety, and contact

#### Strengths

- Lowest implementation complexity
- Lowest editing burden for founders
- Preserves the original PRD's v0 simplicity
- Works reasonably well for P1 and P5 if the homepage is tightly curated

#### Weaknesses

- The current page has already exceeded “simple landing page” scale
- One URL must serve service evaluation, safety reassurance, expat orientation, resources, events, and contact
- `M20` SEO would be constrained because page-level metadata, schema targeting, and keyword landing pages remain limited
- `M25` and `M26` would create very long translated versions of the same page
- Navigation is already underspecified: the live nav exposes 6 links for a 12-section stack

#### SEO implications

- Weakest option for high-intent keywords like:
  - `matrona privada Valencia`
  - `parto en casa Valencia`
  - `lactancia matrona Valencia`
  - `preparación al parto Valencia`
- Anchor links are useful for UX but weaker than canonical content pages for search intent
- FAQ schema can still exist technically, but the FAQ has less standalone relevance as a search destination

#### i18n implications

- Simplest file count, but hardest reading experience
- A language switch would likely reload the whole homepage anyway, because the content is not currently complete in English or Valencian
- Three long homepages increase translation drift risk

#### Maintenance burden

- Easiest for typo fixes
- Still simple for founders to edit JSON
- Harder to keep coherent as sections grow at different rates

#### Mobile UX

- Biggest weakness
- Long-scroll fatigue matters most for P4, P6, and P7

#### Implementation complexity

- Low

### Option B — Hybrid: homepage plus detail pages

#### Structure description

Keep the homepage as an emotional landing page and route high-intent or trust-heavy content to dedicated pages. This extends the pattern the site already uses for `/privacidad.html` and `/cookies.html`.

#### Proposed navigation model

- homepage remains the first entry point
- top nav shifts from many anchors to a small set of destinations
- homepage sections become shorter summaries with clear “learn more” links
- cross-links connect services, FAQ, safety, credentials, resources, and contact

#### Strengths

- Best balance for the current roadmap
- Preserves warmth and narrative on the homepage for P1, P5, and P6
- Creates linkable trust and decision pages for P2, P7, P8, P9, P10, P11, P12, and P13
- Gives `M20` a credible SEO surface without requiring a full architectural rewrite
- Contains growth in unbounded areas like resources and future blog posts
- Fits the current placeholder/prototype phase well: page shells can be separated now and deepened later as founder review catches up

#### Weaknesses

- Requires editorial discipline so the homepage stays summary-level instead of regrowing into a second full site
- Needs stronger internal linking rules than Option A
- Slightly more maintenance than a pure single page

#### SEO implications

- Strong enough for page-level metadata and structured data
- `/faq` can become a canonical anxiety-reduction and schema target
- `/servicios` can target high-intent local search
- `/recursos` can absorb future posts and downloadable materials without bloating the homepage

#### i18n implications

- Best balance for `M25` and `M26`
- Language folders and page-by-page routing are more manageable than one giant translated homepage
- Still feasible without a build step if content remains domain-based and page count stays disciplined

#### Maintenance burden

- Moderate
- Founders can still edit one JSON domain at a time
- Easier governance than keeping every content type in a single homepage narrative

#### Mobile UX

- Strongest overall
- Homepage becomes shorter and better paced
- Visitors can go deeper only when ready

#### Implementation complexity

- Medium
- The current architecture already loads each section independently in `js/content-loader.js`, so a phased migration is materially easier than a big-bang rewrite

### Option C — Full multi-page

#### Structure description

Homepage becomes a true landing page with only hero, short intro, short service preview, trust signals, and CTAs. Most major content areas move to dedicated pages.

#### Proposed navigation model

- page-based top nav only
- homepage acts mostly as routing
- major content types each get their own canonical page

#### Strengths

- Clearest content separation
- Strongest theoretical SEO surface
- Best for professional referrers and explicit service landing pages

#### Weaknesses

- Overbuilt for current content maturity
- Several current areas are still placeholder-heavy:
  - service pricing
  - registrations and insurance
  - resource links
  - event dates
  - testimonials
- Founder editing burden rises sharply
- Page count will multiply again under `M25` and `M26`

#### SEO implications

- Strongest in theory
- Only worth it if the team is ready to maintain many high-quality pages, not thin shells

#### i18n implications

- Clean routing structure
- Highest operational load: every language multiplies every page and every metadata set

#### Maintenance burden

- Highest
- Still possible without a CMS, but this is the option most likely to push the project toward tooling pressure later

#### Mobile UX

- Better than Option A for scroll depth
- Worse than Option B if the nav becomes too page-heavy for P6

#### Implementation complexity

- High

## 4. Navigation Scalability

### Does the current anchor nav still scale?

No.

Why:

- It already omits several trust-critical sections from primary navigation
- It asks visitors to remember where content lives in a long narrative stack
- It does not reflect the actual decision journey from the rubric:
  - services clarity (`C1`, `C11`)
  - public-system explanation (`C6`)
  - safety and transfer logic (`C17`)
  - low-friction contact (`C4`, `C19`)
  - professional legitimacy (`C15`, `C21`)

### Nav shape under each option

| Option | Recommended nav shape |
|--------|-----------------------|
| A | Keep sticky nav, reduce anchor choices to the most important destinations, and add in-page cross-links. Still a compromise. |
| B | Sticky page nav with a small set of top-level destinations: Home, Servicios, Cómo trabajamos, FAQ, Recursos, Contacto. Team/credentials can live in footer nav and homepage trust CTAs. |
| C | Sticky page nav with page-based labels only. Requires strong information scent and a very disciplined menu. |

### Secondary nav needs

Under Option B or C, secondary navigation becomes useful in two places:

- `Servicios`
  - life-stage grouping or service-family grouping
  - direct links to FAQ and contact
- `Recursos`
  - filtering or grouping by category when volume grows

No secondary nav is required yet for testimonials or events because those areas are still shallow.

## 5. Internal Linking Structure

### Natural cross-link pairs

These pairings are not optional fluff. They directly support persona journeys and rubric criteria.

| Pair | Why it matters |
|------|----------------|
| services ↔ FAQ | P1 and P2 often understand the offer only after anxiety questions are answered. |
| services ↔ how-we-work | P7, P8, P9, P11, P12, and P13 need scope plus safety together. |
| how-we-work ↔ contact | P1 and P9 need reassurance before taking the first step. |
| credentials ↔ services | P2 and P13 evaluate legitimacy in the context of what is being offered. |
| team ↔ credentials | P12 and P13 need “who are they?” and “are they qualified?” close together. |
| resources ↔ services / FAQ | Resources help P1, P5, P10, and P11 stay engaged without forcing immediate contact. |

### Critical vs nice-to-have by option

| Link type | Option A | Option B | Option C |
|-----------|----------|----------|----------|
| services ↔ FAQ | Critical | Critical | Critical |
| services ↔ how-we-work | Critical | Critical | Critical |
| how-we-work ↔ contact | Critical | Critical | Critical |
| credentials ↔ services | Nice-to-have but beneficial | Critical | Critical |
| team ↔ credentials | Nice-to-have | Critical | Critical |
| resources ↔ services / FAQ | Nice-to-have | Important | Important |

### Minimum internal linking structure for good flow

Minimum recommended structure under the preferred hybrid path:

- Homepage service previews link to `/servicios`
- Homepage trust preview links to `/como-trabajamos` and `/faq`
- `/servicios` links to `/faq` and `/contacto`
- `/como-trabajamos` links to `/faq` and `/contacto`
- `/faq` links back to relevant service or contact decisions
- `/formacion` links to relevant services and to contact
- `/recursos` links to related services and FAQs where relevant

## 6. Sitemap and SEO

### Sitemap entries by option

| Option | Core sitemap entries |
|--------|----------------------|
| A | `/`, `/privacidad.html`, `/cookies.html` |
| B | `/`, `/servicios`, `/como-trabajamos`, `/faq`, `/recursos`, `/formacion` if split, plus legal pages, later `/blog/<slug>` and `404.html` |
| C | `/`, one URL per major content area, legal pages, later blog/resource detail pages, and language variants |

### Which option gives the best SEO surface?

**Option B** is the best overall SEO direction for this project.

Why not A:

- one page must target too many intents
- anchors are weak substitutes for service landing pages
- FAQ and safety content are harder to use as canonical search entries

Why not C:

- it creates the most SEO surface, but also the most risk of thin or placeholder pages
- several current surfaces are not mature enough yet to justify standalone indexable pages

Why B wins:

- `/servicios` can target high-intent service searches
- `/faq` can capture anxiety-driven search and support FAQ schema
- `/como-trabajamos` can support trust, safety, and “how does this fit with the public system?” questions
- `/recursos` can grow naturally into an index for future articles or downloads

### FAQ as a standalone page

A standalone FAQ page is worth the structural change under the hybrid model.

Reasoning:

- The current `content/faq.json` already covers:
  - timing of contact
  - pricing uncertainty
  - public/private care relationship
  - home birth
  - geographic reach
  - English-language care
  - complications and transfer
  - birth support scope
  - first contact
- Those questions directly address P1, P2, P7, P10, and P11
- The scorecard already shows missing clarity in public-system explanation, safety, and first-step reassurance

The schema benefit is real, but the stronger reason is that the FAQ already acts like a decision-support surface, not a minor homepage appendix.

### Multi-language URL structure

For this stack, the best direction is:

- Spanish at root
- English under `/en/`
- Valencian/Catalan under `/ca/`

Avoid:

- `?lang=en`
  - weaker for SEO and sharing
- subdomains like `en.alumbra-comares.es`
  - unnecessary operational overhead for a static GitHub Pages site

## 7. i18n Implications

### Current state

- Spanish content is present
- English fields are structurally present but `null`
- Valencian/Catalan is not yet populated
- the current language switch is mostly structural, not functional

### Option-by-option i18n impact

| Option | URL/routing impact | Practical translation impact |
|--------|--------------------|------------------------------|
| A | Simplest file map, but each language version becomes a very long page | Highest risk of inconsistent section translation and weak page-level targeting |
| B | Clean language folders plus a small set of important pages | Best balance for phased translation and per-page metadata |
| C | Cleanest pure routing model | Largest translation matrix and highest operational burden |

### Which option makes `M25` and `M26` easiest without a rebuild?

Option B.

It allows:

- page-by-page rollout
- clearer language switching behavior
- separate metadata and social previews
- less pressure to translate an entire oversized homepage before value appears

### Language-switcher UX implications

Under Options B or C, the language switch should behave as a **whole-page switch**, not an in-page toggle.

Why:

- avoids partial mixed-language states
- matches the static-site model
- makes shared URLs clearer
- gives expat visitors a more trustworthy experience

## 8. Founder Editing Burden

The founders edit JSON via GitHub or a local clone. That makes structure simplicity important.

### Real editing tasks by option

| Task | Option A | Option B | Option C |
|------|----------|----------|----------|
| Update a service description | Edit `content/services.json`; homepage changes immediately | Edit the same content domain; clearer because services have their own destination | Likely edit service preview plus service page content and metadata |
| Add an FAQ | Append to `content/faq.json`; homepage grows longer | Append to `content/faq.json`; FAQ page absorbs growth cleanly | Same as B, but homepage teaser and multi-page checks increase |
| Post a new resource | Append to `content/resources.json`; homepage grows noisier | Append to `content/resources.json`; resources page takes the growth | Same as B, but with more page relationships and metadata |
| Fix a typo | Very easy | Easy | Easy but more places to check |

### Tooling implications

No option requires a CMS, Markdown processor, or build step immediately.

However:

- Option A keeps tooling simple but editorially overloaded
- Option B stays within the current lightweight architecture
- Option C is the option most likely to create pressure for stronger tooling later

## 9. Recommendation

### Recommended direction

**Choose Option B: hybrid IA.**

This is the best fit for the current project stage because it preserves the warm homepage that serves P1 and P6 while creating direct, linkable depth pages for the trust and decision questions raised by P2, P7, P8, P9, P10, P11, P12, and P13.

One important nuance: because this site is still a placeholder/prototype rather than a fully validated production site, the structural split does **not** need to wait for final copy maturity in every case. It is reasonable to create the page architecture early, use honest placeholder states where needed, and then deepen each page as founder feedback catches up. In other words, **IA separation and content completion do not have to be the same milestone**.

This recommendation is also the cleanest response to the evidence set:

- the benchmark canvas explicitly recommends a hybrid shape
- the current nav already fails to expose the full content surface
- the roadmap adds more page-worthy material, not less
- the current scorecard gaps are mostly trust, clarity, and contact-flow gaps that benefit from dedicated destinations

### Ordered split sequence for a phased migration

#### 1. `/faq`

Why now:

- `M17A` is complete
- the content already exists and is one of the strongest anxiety-reduction surfaces
- it directly supports P1, P2, P7, P10, and P11
- it addresses scorecard gaps around clarity, first contact, and public/private care framing

#### 2. `/como-trabajamos`

Why now:

- `M17B` is complete
- safety, continuity, public-system relationship, and first-contact behavior are trust-critical
- this directly supports C6, C17, C18, C21 and the needs of P7, P8, P9, P12, and P13

#### 3. `/servicios`

Why next, not first:

- it is strategically important for SEO and comparison
- but `M15` is still pending, and current service copy still has placeholder-level pricing and limited scope detail
- if the team already knows this page will exist, it is still reasonable to split it structurally before `M15`, then use `M15` to deepen the content and trust detail on that page
- once `M15` lands, this becomes the main high-intent search page

#### 4. `/recursos`

Why later:

- the content type is unbounded and clearly page-worthy
- but many current resource links are still placeholders
- if the team prefers a cleaner homepage immediately, this can still be split earlier as a light library shell and expanded once there is a stable initial library or the first blog/article cadence

#### 5. `/formacion`

Why later:

- strategically valuable for P2, P12, and P13
- but current `content/team.json` still contains placeholder registration, insurance, credentials, and training fields
- if the team wants the architecture in place now, this can exist earlier as a trust page shell, but it should not be treated as a fully persuasive proof surface until those fields are real enough to act as proof rather than scaffolding

#### 6. `/contacto`

Why optional and late:

- the homepage should still offer a strong first-step CTA
- a separate contact page is useful later for campaigns, ads, multilingual flows, or professional referrals
- it is not the first structural priority

### Pages to keep on the homepage

The homepage should keep concise versions of:

- hero
- philosophy
- why Alumbra
- team preview
- services preview
- trust preview linking to FAQ and how-we-work
- testimonial preview
- final CTA / contact entry

### Proposed page map

| URL | Primary content | Suggested nav label |
|-----|-----------------|---------------------|
| `/` | Emotional landing page, short philosophy, team preview, service pathways, trust previews, CTA | Inicio |
| `/servicios` | Service families, scope, package logic, pricing direction, next steps | Servicios |
| `/como-trabajamos` | Continuity model, safety, transfer logic, public-system relationship, first contact | Cómo trabajamos |
| `/faq` | Anxiety-reduction FAQ, including pricing, timing, home birth, English, geography, transfer | FAQ |
| `/recursos` | Curated resources, downloads, future blog index | Recursos |
| `/formacion` | Credentials, registrations, training, insurance, languages | Formación |
| `/privacidad.html` | Privacy policy | Privacidad |
| `/cookies.html` | Cookie policy | Cookies |

### Proposed navigation structure

Top nav:

- Inicio
- Servicios
- Cómo trabajamos
- FAQ
- Recursos
- Contacto

Footer nav:

- Formación
- Equipo or Nosotras if later separated
- Privacidad
- Cookies
- Instagram
- Email

Sticky behavior:

- keep sticky nav
- add a persistent low-friction contact action once `M16` clarifies channel direction, because C4 and C19 are still weak in the current scorecard

### Key risks and tradeoffs

#### Risk 1: the homepage regrows into a second full site

Mitigation:

- keep homepage sections intentionally summary-level
- route depth material outward with explicit links

#### Risk 2: service page quality lags behind the IA change

Mitigation:

- separate the page shell whenever it helps the prototype become clearer
- treat `M15` as the content-hardening milestone that makes the page persuasive, not the only moment when the URL may exist

#### Risk 3: trust pages split too early and feel thin

Mitigation:

- split only the areas already matured by `M17A`, `M17B`, `M18`, and `M19`
- where a page is intentionally early, label placeholder states honestly and keep the homepage summary strong so thin subpages do not carry the whole trust burden

#### Risk 4: multilingual expansion multiplies unfinished pages

Mitigation:

- use a disciplined page set
- do not create extra pages without clear user need

### Implications for later milestones

#### `M20` SEO foundations

Should plan around:

- page-level metadata
- page-level keyword targeting
- FAQ schema on `/faq`
- structured internal linking between services, FAQ, safety, and contact
- sitemap entries beyond the homepage

#### `M25` English rollout

Should target:

- `/en/` language folder structure
- full-page switching, not partial in-page switching
- priority translation of Home, Servicios, Cómo trabajamos, FAQ, and Contacto

#### `M26` Valencian rollout

Should follow the same structure as English rather than inventing a second routing model.

#### `M27` Accessibility

Must audit:

- cross-page navigation consistency
- focus order across sticky nav and page transitions
- accordion behavior on `/faq`
- any carousel or filter behavior on `/recursos`

#### `M28` 404 / fallback pages

Becomes more important under the hybrid path because direct entry to deeper URLs, shared links, and future language paths all increase.

## Final conclusion

Alumbra Comares should not jump from the current homepage to a full multi-page site all at once. But it should also not keep treating the homepage as the only meaningful destination.

The evidence points to a **hybrid structure**:

- keep the homepage warm, short, and confidence-building
- move decision-heavy and trust-heavy content to dedicated pages in phases
- split `FAQ` and `Cómo trabajamos` first
- split `Servicios` next, with the option to create the page shell before `M15` and use `M15` to harden it
- let `Recursos` and `Formación` follow, or create their shells earlier if that makes homepage cleanup easier during the prototype phase

That path best serves the current personas, the benchmark findings, the current content state, and the upcoming SEO and multilingual milestones without forcing a heavy rebuild.
