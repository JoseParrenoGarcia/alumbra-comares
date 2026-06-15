# Plan: M29 — Simplification Refactor

## Context

The codebase has grown across 17+ milestones to 10 HTML files, 22 CSS files, and 6 JS files. The product surface is now stable and content-frozen — this is the right window to clean up accumulated debt before M30 (tests) and M31 (framework decision) become harder because of the mess.

Three categories of debt identified in the audit:

1. **Copy-paste duplication** — 61-line nav block in 8 of 10 HTML files; identical `.page-cta` HTML in 6 files.
2. **CSS noise** — ~168 lines of `.reveal`/`.visible` animation rules duplicated across 8 component CSS files. The canonical base rule already lives in `utilities.css`.
3. **God file** — `content-loader.js` is 750 lines, 32 functions, no section organization. Hard to navigate and extend.

**Hard constraint from user:** No behavior changes. No new features. Current pages, content, and flow must be identical after the refactor.

---

## Audit Findings (measured)

### HTML
- 10 HTML files total in root
- 8 files share an identical 61-line nav block (all except `privacidad.html` / `cookies.html` which have a simpler 29-line nav without dropdowns)
- 6 files have identical `.page-cta` block: `eventos.html`, `servicios.html`, `formacion.html`, `recursos.html`, `como-trabajamos.html`, `faq.html`
- `index.html` nav uses `#hash` same-page anchors. All other pages use `index.html#hash` external anchors.

### CSS
- 22 CSS files, 3,001 total lines
- `css/utilities.css` defines the canonical `.reveal`, `.reveal.visible`, and `@media (prefers-reduced-motion)` rules
- 7 component CSS files (`brochure.css`, `events.css`, `formacion.css`, `how-we-work.css`, `recursos.css`, `services.css`, `testimonials.css`) re-declare identical rules scoped to their own component selectors — adds no net behavior, only noise

### JS
- `content-loader.js`: 750 lines, 32 functions, no grouping or ordering logic
- Functions fall into 5 natural groups: utilities, page detection, homepage populators, standalone-page populators, init
- Other JS files are small and well-scoped (11–117 lines each)

---

## Implementation Plan

### Task 1 — Remove duplicate `.reveal` CSS

**Files:** `css/brochure.css`, `css/events.css`, `css/formacion.css`, `css/how-we-work.css`, `css/recursos.css`, `css/services.css`, `css/testimonials.css`

In each file, find and delete any block of the form:
```css
.{anything}.reveal { opacity: 0; transform: translateY(...); transition: ...; }
.{anything}.reveal.visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .{anything}.reveal { ... } }
```

The base rules in `css/utilities.css` cover all `.reveal` elements already. The component-scoped re-declarations are dead weight.

**Expected result:** ~168 lines removed. Zero visual change.

---

### Task 2 — Reorganize `content-loader.js`

**File:** `js/content-loader.js`

Rearrange existing functions into 5 labeled sections with section-divider comments. No logic changes — same functions, same behavior.

Section order:
```
// ── Utilities ──────────────────────────────────────────────────────
// loadJSON, loadSection, channelIcon, getFriendlyPlaceholder,
// getFriendlyAnswer, renderFriendlyAnswer

// ── Page detection ─────────────────────────────────────────────────
// isHomepage, isFaqPage, isComoTrabajamosPage, isRecursosPage,
// isFormacionPage, isEventosPage, isServiciosPage

// ── Homepage section populators ────────────────────────────────────
// populateTeam, populateServices, populateEvents, populateTestimonials,
// populateContact, populateFormacion, populateResources,
// populateHowWeWork, populateFaq, populatePageLinks,
// populatePageLinksSecondary

// ── Standalone page populators ─────────────────────────────────────
// populateServiciosPage, populateFaqPage, populateHowWeWorkPage,
// populateRecursosPage, populateFormacionPage, populateEventosPage

// ── Init ────────────────────────────────────────────────────────────
// DOMContentLoaded dispatcher
```

Also add `injectPageCta()` to the Utilities section (see Task 4).

**Expected result:** Same ~750 lines, dramatically more navigable.

---

### Task 3 — Nav injection via `nav.js`

**Modified:** `js/nav.js` + 7 HTML files

Add `injectNav()` to `nav.js`. The function writes the full 61-line nav HTML template into a one-line placeholder on DOMContentLoaded, before any existing scroll/toggle logic runs (so event listeners attach to the injected elements).

The injected template uses `index.html#hash` anchors throughout — this is correct for all non-homepage pages.

**`nav.js` change:** Add `injectNav()` function at the top; call it as the first thing in DOMContentLoaded.

**HTML files to simplify** (replace full `<nav>` block with one line):
- `eventos.html`, `servicios.html`, `formacion.html`, `recursos.html`, `como-trabajamos.html`, `faq.html`, `404.html`

Replace the entire `<nav class="nav">...</nav>` block with:
```html
<nav class="nav" id="main-nav"></nav>
```

**Leave unchanged:** `index.html` (has unique same-page anchors), `privacidad.html`, `cookies.html` (simpler 29-line nav, no dropdowns — not worth templating).

**Expected result:** Each of the 7 HTML files loses ~58 lines. One place to maintain nav markup.

---

### Task 4 — `.page-cta` injection via `content-loader.js`

**Modified:** `js/content-loader.js` + 6 HTML files

Add `injectPageCta()` to the Utilities section of `content-loader.js`:
```js
function injectPageCta() {
  const el = document.getElementById('page-cta-placeholder');
  if (!el) return;
  el.outerHTML = `
    <section class="page-cta">
      <h2>¿Tienes más preguntas?</h2>
      <p>Estamos aquí para ayudarte. Ponte en contacto con nosotras sin compromiso.</p>
      <a href="index.html#contacto" class="btn btn-primary">Contáctanos</a>
    </section>`;
}
```

Call `injectPageCta()` in the Init section whenever a standalone page is detected (alongside the existing populate calls).

**HTML files to simplify** (replace `.page-cta` block with one line):
- `eventos.html`, `servicios.html`, `formacion.html`, `recursos.html`, `como-trabajamos.html`, `faq.html`

Replace the 5-line `.page-cta` block with:
```html
<div id="page-cta-placeholder"></div>
```

**Expected result:** 6 HTML files each lose 4 lines. CTA copy is maintained in one place.

---

## What We Are NOT Doing

- **Footer extraction** — Footer renders without JS. Extracting it risks silent failure. Copy-paste is fine.
- **CSS file consolidation** — 22 files mapping 1:1 to components is organized, not sprawl. Don't merge.
- **ES modules / build tooling** — No build step. Adding one is M31.
- **`?v=2` removal** — Not broken. Keep it. Add a note to `docs/playbook.md`: "bump the `?v=N` suffix on local asset URLs when deploying changes that need cache invalidation."
- **`privacidad.html` / `cookies.html` nav** — Simpler nav intentionally. Leave static.

---

## Files Modified

| File | Change |
|------|--------|
| `js/nav.js` | Add `injectNav()` with full nav HTML template |
| `js/content-loader.js` | Reorganize into 5 sections; add `injectPageCta()` |
| `css/brochure.css` | Remove duplicate `.reveal` rules |
| `css/events.css` | Remove duplicate `.reveal` rules |
| `css/formacion.css` | Remove duplicate `.reveal` rules |
| `css/how-we-work.css` | Remove duplicate `.reveal` rules |
| `css/recursos.css` | Remove duplicate `.reveal` rules |
| `css/services.css` | Remove duplicate `.reveal` rules |
| `css/testimonials.css` | Remove duplicate `.reveal` rules |
| `eventos.html` | Nav placeholder; `.page-cta` placeholder |
| `servicios.html` | Nav placeholder; `.page-cta` placeholder |
| `formacion.html` | Nav placeholder; `.page-cta` placeholder |
| `recursos.html` | Nav placeholder; `.page-cta` placeholder |
| `como-trabajamos.html` | Nav placeholder; `.page-cta` placeholder |
| `faq.html` | Nav placeholder; `.page-cta` placeholder |
| `404.html` | Nav placeholder only |
| `docs/milestones/m29.md` | Rewrite with these tasks and DoD |
| `docs/playbook.md` | Add `?v=N` versioning note |

**Not modified:** `index.html`, `privacidad.html`, `cookies.html`, `css/utilities.css`, all content JSON files.

---

## Order of Execution

1. **Task 1** — CSS cleanup (isolated, zero HTML/JS impact, easy to verify)
2. **Task 2** — `content-loader.js` reorganize + add `injectPageCta()` stub
3. **Task 4** — `.page-cta` injection (small scope, quick test)
4. **Task 3** — Nav injection (widest HTML impact, test last in isolation)
5. Update `docs/milestones/m29.md` and `docs/playbook.md`

---

## Verification

On localhost after all tasks:

1. `python3 -m http.server 8000`
2. Every page: nav renders, dropdowns open, mobile overlay toggles
3. `index.html`: nav still works with `#hash` same-page scrolling (unchanged)
4. `privacidad.html`, `cookies.html`: simpler nav unchanged
5. All 6 standalone pages: `.page-cta` renders with correct copy and button
6. All pages: `.reveal` animations fire on scroll
7. Browser console: zero errors on every page
8. Page transitions: clicking nav links still animates between pages

---

## Resolution (after Codex review)

Changes agreed after independent Codex audit:

- **Task 1 (CSS):** tightened — delete only byte-identical duplicates, preserve component-specific stagger/override rules
- **Task 2 (content-loader.js):** expanded — reorganize AND remove verified dead code + audit `sections/` orphans
- **Task 3 (nav):** kept, with two explicit nav variant constants; add stale-link fix for `privacidad.html` / `cookies.html`
- **Task 4 (.page-cta injection):** dropped — 5-line duplication not worth adding more responsibility to `content-loader.js`
- **Execution order changed** to: Task 2 → Task 1 → Task 3 (Codex recommendation)
- **Known debt documented:** `reveal.js` / `content-loader.js` coupling noted in PR notes, not fixed in M29

See `docs/milestones/m29.md` for the authoritative updated spec.

---

## Codex review (independent M29 audit, archived)

### Independent audit summary

- HTML duplication is real, but the split is more specific than the draft says:
  - 7 pages share the same dropdown nav pattern with `index.html#...` home links: `404.html`, `faq.html`, `como-trabajamos.html`, `servicios.html`, `formacion.html`, `recursos.html`, `eventos.html`
  - `index.html` has the same structural nav but with same-page `#...` anchors
  - `privacidad.html` and `cookies.html` use a different older flat nav
- 6 pages share the same static `.page-cta` block exactly: `faq.html`, `como-trabajamos.html`, `servicios.html`, `formacion.html`, `recursos.html`, `eventos.html`
- CSS duplication around `.reveal` is real across `brochure.css`, `events.css`, `formacion.css`, `how-we-work.css`, `recursos.css`, `services.css`, and `testimonials.css`
- `js/content-loader.js` is still the main complexity hotspot at 749 lines
- There is dead/orphaned code not called out in the draft:
  - Unused functions remain in `content-loader.js`: `populateEvents()`, `populateHowWeWork()`, `populateFaq()`, `populateFormacion()`, `populateResources()`
  - Unused homepage-split partials still exist under `sections/`: `como-trabajamos.html`, `eventos.html`, `faq.html`, `formacion.html`, `quote-band.html`, `recursos.html`
  - Some early content JSON files appear to have drifted out of runtime use: `content/hero.json`, `content/footer.json`, `content/philosophy.json`, `content/site.json`, `content/why-alumbra.json`
- There is also stale duplicated nav content on the legal pages: both `privacidad.html` and `cookies.html` still link to `index.html#eventos`, but that homepage anchor no longer exists

### Task 1 - Remove duplicate `.reveal` CSS

Agree, with one caution.

Why I agree:

- Most of these blocks are direct duplicates of the base `.reveal` rules in `css/utilities.css`
- Removing them simplifies the CSS without changing intent
- This is exactly the kind of low-risk duplication cleanup M29 should prefer

Cautions / options:

- Keep the non-duplicate parts such as stagger rules in `services.css` and hover-related reduced-motion rules in files like `events.css`
- Verify whether `.formacion-members .reveal` and `.recursos-grid .reveal` are truly redundant in computed output before deleting, but they look redundant from source

Recommendation:

- Proceed

### Task 2 - Reorganize `content-loader.js`

Mostly agree, but I think the task is underspecified.

Why I agree:

- The file is currently hard to scan
- Grouping by utilities, page detection, homepage populators, standalone populators, and init/dispatch is sensible
- Moving init/dispatch to the end will make the file much easier to reason about

Where I disagree:

- "Rearrange only" is too timid for M29 if we already know there is dead code
- Reordering alone improves readability, but it does not reduce the actual maintenance surface enough

Better options:

- Expand this task to include deletion of clearly unused functions and a short dead-artifact inventory in the PR notes
- Consider replacing the long `if / else if` init chain with a small page-dispatch table only if it remains behavior-identical and readable
- If `injectPageCta()` stays in scope, do not bury it inside the god file without first deciding whether CTA injection belongs in JS at all

Recommendation:

- Proceed, but broaden the task from pure reordering to "reorder + remove verified dead code"

### Task 3 - Nav injection via `nav.js`

Partial agreement. I agree with the problem, but I disagree with the chosen shape.

Why I agree:

- The 7-page duplicated nav is the largest repeated HTML block in the repo
- The `index.html` variant and the subpage variant are structurally similar enough that centralizing them is reasonable

Why I disagree:

- Putting HTML generation into `nav.js` mixes rendering and behavior in a file that is currently behavior-only
- That is simplification in one dimension and added coupling in another
- If this is done with template strings inside JS, content changes to nav labels and links become harder to review than plain HTML
- The current `nav.js` assumes the nav already exists and binds listeners immediately during deferred script execution; the plan mentions DOMContentLoaded injection, but that means the file has to be restructured carefully so binding happens after injection

Risks not fully acknowledged in the draft:

- Two nav variants still exist, not one: homepage-anchor nav and subpage-home-link nav
- The legal pages are excluded from templating, but they already contain stale links; excluding them preserves duplicated drift
- If the injected nav is built in JS strings, it becomes easier for behavior and markup to evolve together accidentally

Better options:

- Best lightweight option: keep `nav.js` behavior-only and load a shared nav partial into a placeholder using a small dedicated injector
- Acceptable option: if JS injection is preferred, split data/markup from behavior inside `nav.js` and make the two nav variants explicit (`home` and `subpage`)
- Conservative option: template the 7 duplicated pages but leave `index.html`, `privacidad.html`, and `cookies.html` static only if the legal pages are explicitly audited and corrected in the same milestone

Recommendation:

- Keep nav centralization in scope, but do not automatically use `nav.js` as the renderer just because it already exists

### Task 4 - `.page-cta` injection via `content-loader.js`

Disagree as currently proposed.

Why I disagree:

- The duplication here is only 5 lines across 6 pages, which is much smaller and less risky than the nav duplication
- Injecting a static CTA from `content-loader.js` adds more responsibility to the already largest JS file
- This moves simple HTML into JS strings, which is not obviously "simpler" in a no-build static repo

Better options:

- Option 1: leave the CTA duplicated and spend the complexity budget elsewhere
- Option 2: if deduplication is still desired, load a shared static partial rather than injecting HTML from `content-loader.js`
- Option 3: centralize only after the nav and dead-code cleanup land cleanly and only if reviewers still feel the duplication cost is material

Recommendation:

- Drop this task from the initial M29 plan unless there is a strong reason to centralize it

### Missing from the plan

1. Dead code removal

- The draft does not mention verified-unused functions in `content-loader.js`
- M29 should explicitly include removal of code paths left behind by the M17 split milestones

2. Orphaned partial and content-file audit

- Several `sections/*.html` files look orphaned after the standalone-page migration
- Several content JSON files appear no longer wired into runtime rendering
- Even if they are not deleted in M29, the plan should inventory them and decide whether they are legacy assets or active architecture

3. Stale nav-content audit on excluded pages

- `privacidad.html` and `cookies.html` are excluded from templating, but they already contain outdated `#eventos` links
- If those pages stay static, the plan should still require a consistency audit for their navs

4. Reveal/content-loader coupling

- `reveal.js` observes `.reveal` elements only on DOMContentLoaded, while many reveal elements are created later by `content-loader.js`
- The current workaround is manual `revealSection()` calls from `content-loader.js`
- That coupling is worth documenting as either acceptable technical debt or a simplification target

5. Scope boundary for legacy JSON-driven rules

- The milestone says to preserve the JSON-driven content rules, but the live repo already has drift between those rules and actual rendering in some sections
- The plan should explicitly state whether M29 is only simplifying implementation, or whether it is also allowed to clean up legacy content wiring and unused JSON

### Ordering critique

I would not run the current order exactly as written.

Recommended order:

1. Task 2 first, but expanded to include a dead-code and orphaned-artifact inventory
2. Task 1 second, because it is low-risk cleanup once the audit is clear
3. Task 3 third, because nav centralization is the highest-value structural change and should happen with a cleaner picture of variants and exclusions
4. Task 4 last only if it still feels worth doing after the earlier cleanup; otherwise drop it

Why:

- The repo first needs a clear map of what is still live
- CSS duplication cleanup is safer once we know which selectors and components are still truly active
- Nav centralization is a real simplification target
- CTA injection is optional and should not consume complexity budget before higher-value cleanup lands

### One-line verdict

This is safe to hand to a strong coding agent only after adding tighter guard-rails: explicit dead-code scope, an explicit decision on whether JS should render shared HTML, and a call on whether CTA deduplication is in or out.
