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

## Backlog (post-v0)

| Item | Description |
|------|-------------|
| SEO audit | Add structured metadata (`<meta>` tags, Open Graph, JSON-LD), keyword research for matrona/partera Valencia, and a clear pattern for updating SEO fields without touching HTML (driven from `content/site.json`) |
| English | Add English as a fully supported language alongside Spanish. Requires: populating english fields in all content JSON, a functional language switcher in the nav (replace visual-only toggle), and per-language `<html lang>` management |
| i18n — Valenciano | Add Valencian (`ca`) as a fully supported language alongside Spanish and English. Requires: populating `ca` fields in all content JSON, a functional language switcher in the nav (replace visual-only toggle), and per-language `<html lang>` management |
| Add "education" | The goal is to provide in another section or page a more detailed list about the official masters, degrees, courses, trainings that the
the team has done. This should provide confidence in the professionality of the team |
| Review the language of cookies | When we deploy the webpage, audit what cookies are we really using or not. Its a super simple webpage and maybe we 
really dont need to stress out about cookies |
| Review the language of privacy | When we deploy the webpage, audit the language. We are not a corporate world and will not have databases of users, so
we can't commit to ultra GDPR compliance etc. In other words, what can we live with without shooting ourselves in the foot. |
| Add a blog/resources | Section or page to capture material that the midwifes recommend - from books, to associations, podcasts, etc |
| Audit if we need to go multi-page instead of infinite scroll | Based on the content that will exist, what's the expert opinion of this? |
| Audit the webpage with personas | Come up with a group of personas that we can always re-run an audit against the current or future versions of the page |
| Audit external pages for best practices | Audit with agents how do other midwifery pages have their website, or similar community independent practice groups have their websites |
| Simplification refactoring | When all milestones have been complete, audit the codebase for a refactor targeting simplicity and best practices of web development for html, css and js |
| Unit tests | When refactoring has been succesful, secure the codebase with relevant unit tests for html, css, and js |
| Audit react | Run an audit to understand if we need to migrate to React instead of html + css + js |
| Review if we can add whatsapp or telegram | Is there a way to create a free business account in Whatsapp and/or Telegram? If so, can we open from the page
a chat directly? |
| Review the content of services | It feels that we can do a better job at explaining what each service is? To provide the mum and family a better view of
what it entails? |

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
