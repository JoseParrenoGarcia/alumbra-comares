# Alumbra Comares — Delivery Plan

## Index

| Milestone | Title | Status | PR Scope |
|-----------|-------|--------|----------|
| [M1](m1.md) | Project foundations and style review | complete | Style doc, plan files, repo structure |
| [M2](m2.md) | JSON content model | complete | Content files for all sections |
| [M3](m3.md) | HTML/CSS scaffold — structure and design system | complete | Base HTML, CSS tokens, fonts, layout shell |
| [M4](m4.md) | Hero, nav, and footer | complete | Top and bottom of page |
| [M5](m5.md) | Philosophy, Why Alumbra, and pillars sections | complete | Brand story sections |
| [M6](m6.md) | Meet the midwives section | complete | Three profile cards |
| [M7](m7.md) | Services section | complete | Service cards with placeholders |
| [M8](m8.md) | Events section | complete | Event cards with placeholder data |
| [M9](m9.md) | Contact section and form | complete | Form + contact channels, Formspree |
| [M10](m10.md) | Testimonials and brochure placeholders | complete | Placeholder blocks |
| [M11](m11.md) | Privacy and cookie pages | complete | Lightweight draft legal pages |
| [M12](m12.md) | GitHub Pages deployment | pending | Deploy config, final checks |
| [M13](m13.md) | External website benchmark audit | planned | Research pack + benchmark synthesis |
| [M14](m14.md) | Persona audit framework | planned | Reusable personas + audit rubric |
| [M15](m15.md) | Services content review and rewrite | planned | Clearer service explanations in content JSON |
| [M16](m16.md) | WhatsApp / Telegram feasibility review | planned | Contact-channel recommendation and implementation brief |
| [M17](m17.md) | Information architecture audit | planned | Single-page vs multi-page recommendation |
| [M18](m18.md) | Education and credentials section | planned | Trust-building content block or page |
| [M19](m19.md) | Resources library / blog | planned | Recommended materials section or page |
| [M20](m20.md) | SEO foundations and metadata system | planned | Metadata, keyword decisions, JSON-driven SEO fields |
| [M21](m21.md) | Content governance system | planned | Editorial rules, schemas, and change workflow |
| [M22](m22.md) | Asset readiness and media audit | planned | Images, rights, alt text, compression, and social assets |
| [M23](m23.md) | Cookie notice audit and rewrite | planned | Right-sized cookie language after deployment audit |
| [M24](m24.md) | Privacy policy audit and rewrite | planned | Right-sized privacy language after deployment audit |
| [M25](m25.md) | English rollout | planned | English content + real language switcher |
| [M26](m26.md) | Valencian rollout | planned | Valencian content + extended i18n support |
| [M27](m27.md) | Accessibility audit and remediation | planned | Keyboard, screen-reader, motion, and contrast pass |
| [M28](m28.md) | 404 and fallback pages | planned | Not-found UX for multi-page and direct-link access |
| [M29](m29.md) | Simplification refactor | planned | Codebase cleanup for clarity and maintainability |
| [M30](m30.md) | Frontend regression tests | planned | Test coverage for core static-site behavior |
| [M31](m31.md) | React migration audit | planned | Recommendation on staying static vs migrating |

## Backlog (post-v0)

The backlog items have been converted into ordered milestones `M13` through `M31`.

Ordering logic:

- `M12` stays next because deployment is the current unfinished core milestone and several audits depend on the live site.
- `M13` to `M17` are discovery and product-shaping milestones. They help us decide messaging, contact channels, and whether the current single-page IA should remain in place before we add more content.
- `M18` to `M22` are content, asset, and findability groundwork built on top of those earlier decisions.
- `M23` and `M24` revisit legal copy only after deployment and contact-channel choices are known.
- `M25` and `M26` delay full translation rollout until content structure, SEO fields, assets, and legal wording are more stable.
- `M27` and `M28` harden usability and routing once the site has likely grown beyond the original single-page shape.
- `M29` to `M31` are technical hardening and architecture review after the product surface is more mature.

Audit milestones are intentionally not Haiku-led by default. Where external research is needed, the milestone file includes a human-run prompt so results from ChatGPT, Claude, Grok, or another provider can be pasted back into the repo workflow.

## Design Reference

All build milestones (M3–M12) must follow [`docs/style.md`](style.md).

## Source Material

All content milestones (M2–M10) draw from [`assets/reference-docs/reference-content-in-text.md`](../assets/reference-docs/reference-content-in-text.md).

## Principles

- Build mobile-first
- Placeholders are valid where real content is missing
- Spanish at launch, content model supports English and Valenciano for future activation
- Each milestone is one atomic PR — reviewable independently
- M6 onwards: sequential builds only — all section milestones touch `index.html` and conflict when run in parallel
- Do not harden implementation decisions that block future iterations
