# Alumbra Comares — Agent Playbook

This file tells you how to operate in this repository. Read it before starting any build milestone.

---

## Before You Write a Single Line of Code

Read these three files in order:

1. [`docs/style.md`](style.md) — design system. Every colour, font, spacing decision, and component pattern is here. Do not improvise.
2. Your assigned milestone file (e.g. `docs/milestones/m4.md`) — scope, tasks, definition of done, open questions.
3. [`assets/reference-docs/reference-content-in-text.md`](../assets/reference-docs/reference-content-in-text.md) — source content. Use this before inventing any copy.

If you are unsure whether something is in scope, it is not in scope.

---

## File Conventions

| What | Where |
|------|-------|
| Page entry point | `index.html` |
| Section partials | `sections/<section-name>.html` |
| CSS partials | `css/<topic>.css` (e.g. `css/hero.css`) |
| CSS entry point | `css/main.css` (imports all partials) |
| JavaScript | `js/<topic>.js` |
| Content (JSON) | `content/<section>.json` |
| Images and assets | `assets/images/` |
| Documentation | `docs/` |

**Section names** match the Spanish anchor IDs used in the site:
`hero`, `quienes-somos`, `por-que`, `equipo`, `servicios`, `eventos`, `testimonios`, `contacto`

---

## Section Partials Pattern

`index.html` does not contain section HTML directly. It loads partials at runtime:

```js
async function loadSection(id, path) {
  const res = await fetch(path);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}
```

Each milestone creates or modifies files in `sections/`. This keeps `index.html` stable and allows agents to work on sections in parallel without conflicts.

If M3 has not been implemented yet, raise this as a blocker before writing section HTML.

---

## Content Rules

- **No hardcoded copy in HTML.** All text strings come from `content/*.json`.
- Section partials fetch their own JSON on load, or `js/content-loader.js` injects them before rendering.
- Spanish strings are required. English and Catalan fields must exist in the JSON structure but may be `null`.
- If content is missing or unconfirmed, use a placeholder. Never invent specifics.

### Placeholder Convention

```json
{ "es": "__PLACEHOLDER__: descripción del servicio", "en": null, "ca": null }
```

Or for structured items:

```json
{ "title": { "es": "Precio" }, "value": "__PLACEHOLDER__", "placeholder": true }
```

Placeholders must be **visible** in the rendered page (styled in `--color-text-muted`, italic) so reviewers know what needs real content.

---

## Style Compliance Checklist

Before marking any task done, verify against `docs/style.md`:

- [ ] All colours use CSS custom properties from `css/tokens.css` — no hardcoded hex values
- [ ] Headings use Cormorant Garamond; body uses Nunito; quotes use Dancing Script
- [ ] No blue, purple, or cool grey anywhere
- [ ] No hardcoded copy in HTML — all strings from JSON
- [ ] Portrait images use organic oval masks (`border-radius` variation), not hard rectangles
- [ ] Botanical decorative elements use `aria-hidden="true"`
- [ ] All form fields have explicit `<label>` elements
- [ ] Focus states use `outline: 2px solid var(--color-focus)`
- [ ] Scroll animations respect `prefers-reduced-motion`
- [ ] Animations are no faster than 200ms

---

## Scope Discipline

Your milestone file defines your scope. If something is not listed in the tasks or PR scope sections of your milestone file, do not build it.

Scope creep signals to watch for:
- "While I'm here I'll also fix..." → stop
- Adding a section not in your milestone → stop
- Refactoring CSS from another milestone → stop
- Wiring up Formspree when your milestone doesn't include M9 → stop

If you discover a real problem outside your scope (a broken import, a missing token), note it in a comment or open question. Do not fix it unless it blocks your milestone from rendering.

---

## Definition of Done

A milestone is done when:

1. All tasks in the milestone file are checked off
2. The style compliance checklist above passes
3. The section renders without console errors in a browser
4. Mobile layout is verified (375px width minimum)
5. No hardcoded strings remain in HTML
6. Placeholder content is visible and clearly styled
7. The milestone file tasks are updated to reflect completion

Do not mark done speculatively. If you cannot verify in a browser, say so explicitly.

---

## Review Pass Instructions (Sonnet)

If you are running a review pass after a Haiku build pass:

1. Read `docs/style.md` fully before reviewing
2. Check the style compliance checklist above against the actual output files
3. Do not rewrite working code — patch only deviations from the spec
4. Be specific: "Line 42 of `css/hero.css` uses `#A0522D` directly — replace with `var(--color-terracotta)`"
5. Check for scope creep — remove anything outside the milestone's PR scope
6. Verify the definition of done above before approving

---

## Open Questions

If your milestone file contains open questions that are not resolved:

- If the question blocks implementation, stop and surface it to the human
- If the question does not block implementation, use a placeholder and note the question in a comment in the relevant file
- Do not resolve open questions by inventing answers

---

## Workflow Reference

This project uses the following agentic workflow phases:

| Phase | Milestones | Pattern |
|-------|------------|---------|
| A — Foundation | M1, M2, M3 | Sequential, human gate after each |
| B — Section build | M4–M8 | Parallel Haiku agents, Sonnet review pass |
| C — Remaining | M9, M10, M11 | Sequential Haiku agents |
| D — Deploy | M12 | Human-led |

Workflow scripts live in `.claude/workflows/`. Run them from Claude Code with the `Workflow` tool.
