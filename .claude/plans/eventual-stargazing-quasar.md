# Plan: Wire M17 IA audit decisions into PRD, plan.md, and milestones

## Context

The M17 IA audit (`docs/research/m17-ia-audit.md`) is complete and all founder decisions are resolved (2026-06-12). The recommendation is Option B — hybrid IA: keep the homepage as a curated landing page and split four content surfaces onto their own pages in this order:

1. `/faq` (M17.1)
2. `/como-trabajamos` (M17.2)
3. `/servicios` coupled with M15 services rewrite (M17.3 + M15 as one PR)
4. `/recursos` (M17.4)
5. `/formacion` optional later (M17.5)
6. `/contacto` optional, low priority

Additional decisions:
- Nav switches all at once to page links after M17.1 + M17.2 land
- Placeholders shown with honest user-friendly labels (not raw `__PLACEHOLDER__` strings)
- Events stay on homepage (sporadic cadence); testimonios stays on homepage
- Team bios stay on homepage; `/formacion` becomes its own page when credentials are real

None of these changes are wired into the live documents yet. This plan covers exactly what to change and where.

---

## Files to change

### 1. `docs/PRD.md`

**§10 — Information Architecture**

Replace entire §10. Current text says "single-page with anchored sections" and defers multi-page to "revisit later". New text should:

- State the decision: Option B hybrid IA is the chosen direction as of M17
- Describe the homepage as a curated landing page with summary blocks + "ver más" links to detail pages
- List the agreed page map:
  - `/` — homepage with summary blocks (hero, philosophy, why-alumbra, equipo, formación summary, servicios top 3–4, cómo-trabajamos top 3, faq top 5, eventos, testimonios, recursos top 3, brochure CTA, contacto)
  - `/faq` — full FAQ with FAQ schema
  - `/como-trabajamos` — full How We Work / Safety
  - `/servicios` — full services with extended descriptions and pricing
  - `/recursos` — resources library and future blog index
  - `/formacion` — credentials page (optional, when real content is ready)
  - `/privacidad.html`, `/cookies.html` — existing legal pages (footer-only)
- State nav direction: sticky top nav, 5–6 page links (Inicio, Servicios, Cómo Trabajamos, FAQ, Recursos, Contacto); switches from anchors to page links all at once after M17.1 + M17.2 land
- State language URL structure: subfolder per language (`/`, `/en/`, `/ca/`)
- State placeholder policy: placeholder fields shown with honest user-friendly labels (e.g. "pendientes de confirmar"), not raw `__PLACEHOLDER__` strings
- State what stays on homepage permanently: hero, quienes-somos, por-que, equipo, eventos, testimonios, contacto form
- Note: events stay on homepage (sporadic cadence); no `/eventos` page planned

**§15 — Open Product Questions**

Remove "final single-page vs multi-page decision" — resolved. Leave all other items.

---

### 2. `docs/plan.md`

**Milestone table changes (in order):**

1. Mark M17 status as `complete`
2. Mark M15 status as `superseded` with note "folded into M17.3"
3. Insert five new rows after M17 and before M20:

| Milestone | Title | Status | PR Scope |
|-----------|-------|--------|----------|
| M17.1 | `/faq` standalone page | planned | Split FAQ to its own page with FAQ schema; homepage keeps 5-item summary |
| M17.2 | `/como-trabajamos` standalone page + nav switch | planned | Split How We Work/Safety; switch nav from anchors to page links (all at once) |
| M17.3 | `/servicios` page + services content rewrite (M15 merged) | planned | Services rewrite + page split as one PR |
| M17.4 | `/recursos` standalone page | planned | Split resources library; homepage keeps 3-item summary + brochure CTA |
| M17.5 | `/formacion` standalone page | planned | Optional — split credentials page once real credentials are populated |

**Backlog ordering logic paragraph:**

Update to explain that M17.1–M17.5 are the phased IA migration implementing the hybrid structure decided in M17. The ordering is: FAQ first (SEO leverage + content already mature), Cómo Trabajamos second (trust signals + content ready from M17B), Servicios third (coupled with M15 rewrite so new content lands directly on the new page), Recursos fourth (unbounded growth surface), Formación optional when credentials are real.

---

### 3. `docs/milestones/m17.md`

Mark as complete. Add at top:

```
**Status: complete.** Decision: Option B hybrid IA. All founder questions resolved 2026-06-12.
Audit: `docs/research/m17-ia-audit.md`
Implementation: M17.1 through M17.5
```

Check off all task items. Replace Open Questions section with: "All questions resolved — see `docs/research/m17-ia-audit.md` §11."

---

### 4. `docs/milestones/m15.md`

Add at top:

```
> **Status: superseded by M17.3.** The services content rewrite has been merged into M17.3
> (`docs/milestones/m17.3.md`), which combines the /servicios page split and content rewrite
> as a single PR. This file is preserved for reference only.
```

---

### 5. New milestone files to create

#### `docs/milestones/m17.1.md`

**Goal:** Split `/faq` to its own page. Homepage keeps a 5-item FAQ summary with "ver todas las preguntas" link.

**Dependencies:** M17 complete ✓

**PR scope:**
- New `faq.html` (top-level page scaffold, not section partial)
- `js/content-loader.js` extended: full FAQ list on `/faq.html`, 5-item summary on homepage
- FAQ schema JSON-LD (`@type: FAQPage`) added to `/faq.html`
- Per-page `<title>`, meta description, og tags for `/faq.html`
- Homepage `sections/faq.html` becomes summary-only (top 5 items + "ver todas" link)
- No nav change in this PR (nav switches in M17.2)
- Placeholder answers shown as honest labels, not raw `__PLACEHOLDER__` strings

**Definition of done:**
- `/faq.html` renders all FAQ items; placeholder answers shown with friendly copy
- Homepage renders top 5 FAQ items with link to `/faq.html`
- FAQ schema JSON-LD is present and valid on `/faq.html`
- Nav unchanged in this PR

---

#### `docs/milestones/m17.2.md`

**Goal:** Split `/como-trabajamos` to its own page. Homepage keeps 3-block summary. Switch full nav from anchor links to page links (all at once in this PR).

**Dependencies:** M17.1 complete

**PR scope:**
- New `como-trabajamos.html` (top-level page scaffold)
- `js/content-loader.js` extended: full 6-block rendering on `/como-trabajamos.html`, 3-block summary on homepage
- Per-page `<title>`, meta description, og tags for `/como-trabajamos.html`
- Homepage `sections/como-trabajamos.html` becomes 3-block summary with "leer más" link
- **Nav update (all at once):** `index.html` nav switches from anchors to page links for both desktop nav and mobile hamburger: Inicio `/`, Servicios `/servicios.html`, Cómo Trabajamos `/como-trabajamos.html`, FAQ `/faq.html`, Recursos `/recursos.html`, Contacto `/#contacto`
- Internal cross-links: `/como-trabajamos.html` → `/#contacto`; `/faq.html` FAQ item faq-07 → `/como-trabajamos.html#safety`

**Definition of done:**
- `/como-trabajamos.html` renders all 6 blocks with honest placeholder labels
- Homepage renders top 3 blocks with link
- Nav is page-link-based on homepage and both new pages
- Cross-links between FAQ and como-trabajamos are in place

---

#### `docs/milestones/m17.3.md`

**Goal:** Split `/servicios` to its own page AND rewrite service content (M15 scope merged). Homepage keeps 3–4 service summary cards with "ver todos los servicios" link.

**Dependencies:** M17.2 complete

**Note:** This milestone absorbs M15. M15 in plan.md is marked superseded.

**PR scope:**
- New `servicios.html` (top-level page scaffold)
- `content/services.json` rewritten: plain warm Spanish, structured subfields (short summary, who it is for, what it includes, placeholder pricing note shown as "Precio a consultar — contacta para información actualizada")
- `js/content-loader.js` extended: full service list on `/servicios.html`, 3–4 featured cards on homepage
- Per-service anchor IDs in `/servicios.html` for deep-linking (`#parto-en-casa`, `#postparto`, `#lactancia`, etc.)
- `@type: Service` JSON-LD on `/servicios.html`
- Per-page `<title>`, meta description, og tags for `/servicios.html`
- Homepage `sections/servicios.html` becomes summary with 3–4 featured/first cards and link to full page
- Internal cross-links: `/servicios.html` → `/faq.html` for service-specific questions; `/servicios.html` → `/#contacto`

**Definition of done:**
- `/servicios.html` renders all services with rewritten copy; each service has a distinct anchor ID
- Pricing shown as "Precio a consultar — contacta para información actualizada"
- Homepage renders 3–4 summary cards with link
- Cross-links to FAQ and contact in place
- Human review of Spanish copy before merge

---

#### `docs/milestones/m17.4.md`

**Goal:** Split `/recursos` to its own page. Homepage keeps 3-item summary with "ver biblioteca completa" link. Brochure download CTA stays on homepage only.

**Dependencies:** M17.3 complete

**PR scope:**
- New `recursos.html` (top-level page scaffold)
- `js/content-loader.js` extended: full resource list with category grouping on `/recursos.html`, 3-item summary on homepage
- Category grouping on `/recursos.html` (Libros / Asociaciones / Podcasts / Online)
- Per-page `<title>`, meta description, og tags for `/recursos.html`
- Homepage `sections/recursos.html` becomes 3-item summary with link; brochure CTA stays in homepage section
- Internal cross-links: `/recursos.html` → related `/servicios.html` and `/faq.html` where relevant

**Definition of done:**
- `/recursos.html` renders all resource items with category grouping
- Homepage renders 3 items with link
- Brochure CTA remains on homepage only (not on `/recursos.html`)
- Nav entry for Recursos already present from M17.2

---

#### `docs/milestones/m17.5.md`

**Goal (optional):** Split `/formacion` to its own page once real credential data is populated by the founders.

**Dependencies:** M17.4 complete; real credential data confirmed in `content/team.json` (registration numbers, insurance, training fields — no `__PLACEHOLDER__` values)

**PR scope:**
- New `formacion.html` (top-level page scaffold)
- `js/content-loader.js` extended for per-page formacion context
- Per-page `<title>`, meta description, og tags for `/formacion.html`
- Homepage `sections/formacion.html` becomes credential-badge summary
- Footer nav gains Formación link
- Internal cross-links: `/formacion.html` → `/servicios.html`; `/equipo` section on homepage links to `/formacion.html`

**Note:** Do not spawn this milestone until the founders have confirmed real credentials are ready. The formacion section stays on the homepage as expanded team cards until then.

**Definition of done:**
- `/formacion.html` renders real (non-placeholder) credentials for all three midwives
- Each midwife has at minimum a registration number and one named credential
- No `__PLACEHOLDER__` values render on the page

---

## Verification checklist

After all changes are made:

- [ ] `docs/PRD.md` §10 describes hybrid IA, not single-page deferred
- [ ] `docs/PRD.md` §15 no longer lists "single-page vs multi-page" as open
- [ ] `docs/plan.md` shows M17 complete, M15 superseded, M17.1–M17.5 in table
- [ ] `docs/plan.md` backlog ordering logic reflects hybrid decision
- [ ] `docs/milestones/m17.md` shows complete status, tasks checked off, open questions resolved
- [ ] `docs/milestones/m15.md` has superseded note pointing to M17.3
- [ ] `docs/milestones/m17.1.md` through `m17.5.md` exist with clear scope, deps, DoD
- [ ] No milestone file references "single-page" as current/future state
