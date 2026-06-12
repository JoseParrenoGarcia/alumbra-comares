# Alumbra Comares — Delivery Plan

## Index

| Milestone | Title | Status | PR Scope |
|-----------|-------|--------|----------|
| [M1](milestones/m1.md) | Project foundations and style review | complete | Style doc, plan files, repo structure |
| [M2](milestones/m2.md) | JSON content model | complete | Content files for all sections |
| [M3](milestones/m3.md) | HTML/CSS scaffold — structure and design system | complete | Base HTML, CSS tokens, fonts, layout shell |
| [M4](milestones/m4.md) | Hero, nav, and footer | complete | Top and bottom of page |
| [M5](milestones/m5.md) | Philosophy, Why Alumbra, and pillars sections | complete | Brand story sections |
| [M6](milestones/m6.md) | Meet the midwives section | complete | Three profile cards |
| [M7](milestones/m7.md) | Services section | complete | Service cards with placeholders |
| [M8](milestones/m8.md) | Events section | complete | Event cards with placeholder data |
| [M9](milestones/m9.md) | Contact section and form | complete | Form + contact channels, Formspree |
| [M10](milestones/m10.md) | Testimonials and brochure placeholders | complete | Placeholder blocks |
| [M11](milestones/m11.md) | Privacy and cookie pages | complete | Lightweight draft legal pages |
| [M12](milestones/m12.md) | GitHub Pages deployment | complete | Deploy config, final checks |
| [M13](milestones/m13.md) | External website benchmark audit | complete | Research pack + benchmark synthesis |
| [M14](milestones/m14.md) | Persona audit framework | complete | Reusable personas + audit rubric |
| [M14B](milestones/m14b.md) | Site scoring skill | planned | Executable skill that scores any site iteration against all 13 personas and canvas |
| [M15](milestones/m15.md) | Services content review and rewrite | planned | Clearer service explanations in content JSON |
| [M16](milestones/m16.md) | WhatsApp / Telegram feasibility review | planned | Contact-channel recommendation and implementation brief |
| [M16A](milestones/m16a.md) | WhatsApp contact implementation | planned | Add WhatsApp CTA to contact section (depends on M16 approval) |
| [M17A](milestones/m17a.md) | FAQ surface | complete | Anxiety-reducing FAQs for services, pricing, safety, and logistics |
| [M17B](milestones/m17b.md) | How We Work / Safety page | complete | Eligibility, boundaries, transfers, and practical care model |
| [M18](milestones/m18.md) | Education and credentials section | planned | Trust-building content block or page |
| [M19](milestones/m19.md) | Resources library / blog | planned | Recommended materials section or page |
| [M17](milestones/m17.md) | Information architecture audit | planned | Single-page vs multi-page recommendation — run after M17A, M17B, M18, M19 are in place |
| [M20](milestones/m20.md) | SEO foundations and metadata system | planned | Metadata, keyword decisions, JSON-driven SEO fields |
| [M21](milestones/m21.md) | Content governance system | planned | Editorial rules, schemas, and change workflow |
| [M22](milestones/m22.md) | Asset readiness and media audit | planned | Images, rights, alt text, compression, and social assets |
| [M23](milestones/m23.md) | Cookie notice audit and rewrite | planned | Right-sized cookie language after deployment audit |
| [M24](milestones/m24.md) | Privacy policy audit and rewrite | planned | Right-sized privacy language after deployment audit |
| [M25](milestones/m25.md) | English rollout | planned | English content + real language switcher |
| [M26](milestones/m26.md) | Valencian rollout | planned | Valencian content + extended i18n support |
| [M27](milestones/m27.md) | Accessibility audit and remediation | planned | Keyboard, screen-reader, motion, and contrast pass |
| [M28](milestones/m28.md) | 404 and fallback pages | planned | Not-found UX for multi-page and direct-link access |
| [M29](milestones/m29.md) | Simplification refactor | planned | Codebase cleanup for clarity and maintainability |
| [M30](milestones/m30.md) | Frontend regression tests | planned | Test coverage for core static-site behavior |
| [M31](milestones/m31.md) | React migration audit | planned | Recommendation on staying static vs migrating |
| [M32](milestones/m32.md) | Mobile UX pass — section sizing and carousels | planned | Right-size large mobile sections; add carousels for testimonials and events |

## Backlog (post-v0)

The backlog items have been converted into ordered milestones `M13` through `M31`, with inserted trust milestones `M17A` and `M17B`.

Ordering logic:

- `M12` is complete, and several later audits depend on the live site now being available publicly.
- `M13` to `M17` are discovery and product-shaping milestones. They help us decide messaging, contact channels, and whether the current single-page IA should remain in place before we add more content.
- `M17A` and `M17B` were added after the benchmark report because FAQ clarity and explicit safety boundaries emerged as core trust surfaces, not optional extras.
- `M18` to `M22` are content, asset, and findability groundwork built on top of those earlier decisions.
- `M23` and `M24` revisit legal copy only after deployment and contact-channel choices are known.
- `M25` and `M26` delay full translation rollout until content structure, SEO fields, assets, and legal wording are more stable.
- `M27` and `M28` harden usability and routing once the site has likely grown beyond the original single-page shape.
- `M29` to `M31` are technical hardening and architecture review after the product surface is more mature.

Audit milestones are intentionally not Haiku-led by default. Where external research is needed, the milestone file includes a human-run prompt so results from ChatGPT, Claude, Grok, or another provider can be pasted back into the repo workflow.

### More ideas

Mobile UX has been converted into M32. Items below are not yet milestones.

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
