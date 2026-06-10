# PRD: Alumbra Comares v0 Website

## 1. Document Purpose

This PRD defines the first website iteration for **Alumbra Comares**.

The purpose of the v0 site is to:

- give the founders a concrete website they can review
- present the group clearly to prospective families
- provide a first public contact path
- validate content, tone, structure, and visual direction
- create a base for later iterations and a possible React/Vercel rebuild

This is not the final production PRD. It is a practical first product definition for a static review-ready release.

## 2. Product Summary

Alumbra Comares is a private midwife working group serving Valencia city and the surrounding metropolitan area.

The first site should position them as:

- warm
- calm
- community-led
- Mediterranean in feel
- human before clinical

The site should help pregnant families understand:

- who they are
- what they offer
- how they work
- how to contact them

## 3. Goals

### Primary Goal

Help prospective families learn about Alumbra Comares and contact the group.

### Secondary Goals

- establish an initial public-facing brand presence
- test structure and messaging with the founders
- create a credible and welcoming first impression
- leave space for future services, events, testimonials, and downloadable assets
- prepare content in a format that can be iterated quickly

## 4. Non-Goals

- advanced booking flows
- CRM or database setup
- production-grade event management
- final SEO implementation
- analytics maturity
- final legal/compliance setup
- fully approved final copy
- complete translation rollout in all languages

## 5. Primary Audience

### Core Audience

Pregnant families in Valencia and nearby metropolitan areas, including:

- first-time parents
- second-time and later parents
- people looking for more personal and community-oriented accompaniment

### Secondary Audience

- people interested in prenatal or postnatal group sessions
- referrals from trusted contacts
- families comparing care approaches

## 6. Geographic Scope

- Valencia city
- Valencia metropolitan area
- Spain

This should be reflected in messaging, event references, and contact expectations.

## 7. Brand And Experience Direction

### Desired Feel

- warm
- calm
- Mediterranean
- human
- close and trustworthy

### Directional Principles

- prioritize emotional clarity over corporate polish
- feel welcoming, not sterile
- use soft but intentional calls to action
- preserve a sense of care, not sales pressure
- take visual inspiration from the reference JPG materials

### Open Brand Work

The visual system should later be documented more explicitly, including:

- palette extracted from reference materials
- typography recommendations
- spacing and layout mood
- iconography/motif direction
- how to describe the brand style in words

## 8. Source Material

Current source material lives in [`assets/reference-docs`](/Users/joseparreno/Documents/GitHub/alumbra-comares/assets/reference-docs).

The current extracted text reference lives in [`assets/reference-docs/reference-content-in-text.md`](/Users/joseparreno/Documents/GitHub/alumbra-comares/assets/reference-docs/reference-content-in-text.md).

These image files should be treated as:

- inspiration
- partial content source
- early visual references

The extracted Markdown reference should be treated as:

- the primary working transcript of the JPG materials
- a convenient source for early copy modeling and content structuring
- a derived artifact that may still need stakeholder confirmation against the original images

They are not final approved source of truth.

## 9. Content Strategy

### Confirmed Content Principles

- start with what exists in the image references
- adapt content for web, not document layout
- use placeholders when details are still unconfirmed
- distinguish approved copy from draft copy

### Required Content Areas

1. Hero / introduction
2. Group philosophy
3. Why Alumbra / differentiators
4. Meet the 3 midwives
5. Services overview
6. Pricing placeholders
7. Events / circles / group sessions
8. Testimonials placeholder
9. Contact section
10. Downloadable brochure/resources placeholder
11. Footer with legal/privacy links

### Future Content Areas

- FAQ
- step-by-step “how to begin”
- trust signals such as credentials or affiliations
- downloadable PDFs
- richer resource library

## 10. Information Architecture

### Recommended v0 Structure

A `single-page` website with anchored sections.

Reasoning:

- fastest path to a polished reviewable prototype
- easier to browse on mobile
- lower content overhead
- simpler to host on GitHub Pages

### Alternative To Revisit Later

A small multi-page static site if content volume grows or if services/events need deeper separation.

## 11. Functional Requirements

### FR1. Static Website

The site must be buildable as a static site using:

- HTML
- CSS
- JavaScript

### FR2. GitHub Pages Deployment

The site must be deployable via GitHub Pages for easy remote review.

### FR3. Content Model

The site should store editable content in `JSON` where practical so copy can be updated without restructuring templates.

### FR4. Core Sections

The site must include scaffolded sections for:

- philosophy
- team
- services
- pricing
- events
- contact

### FR5. Team Profiles

Each of the 3 midwives must have a profile area with:

- name
- role/title if available
- draft biography derived from reference material
- placeholder image slot

### FR6. Services And Pricing

The site must support:

- service titles
- short descriptions
- pricing placeholders
- future expansion for confirmed prices

### FR7. Contact Form

The contact form should initially capture:

- name
- email
- phone or WhatsApp
- service interest
- preferred language

The form should avoid explicitly asking for health-related information.

### FR8. Contact Channels

The site must visibly support:

- email
- phone
- WhatsApp
- Instagram

### FR9. Form Backend

The initial form flow may use a lightweight tool such as Formspree or equivalent.

For v0, submissions can go to a temporary personal email inbox.

### FR10. Events

The site should support event cards with these fields:

- title
- date
- time
- location
- capacity
- price
- registration link
- language

### FR11. Event Mode

Initial events may be:

- sample/provisional
- manually edited
- in-person only

### FR12. Testimonials Placeholder

The site should include a placeholder location for future testimonials.

### FR13. Brochure / Resources Placeholder

The site should include a placeholder for:

- downloadable PDF brochure
- Canva/public link
- future resource downloads

### FR14. Language Readiness

The content and layout must be designed so Spanish, English, and Valenciano/Catalan can be supported.

Launch assumptions:

- Spanish at launch
- English next
- Valenciano/Catalan later

### FR15. Privacy And Cookie Pages

The project should include placeholders or simple first-pass versions for:

- privacy policy
- cookie notice

These may begin as lightweight draft documents.

## 12. Non-Functional Requirements

- mobile-friendly
- desktop-friendly
- fast to review and iterate
- easy to host statically
- easy to update copy
- visually aligned with reference direction
- not dependent on a backend

## 13. UX Requirements

### Contact Experience

The site should feel low-friction and conversational.

### CTA Style

Calls to action should be repeated, but gentle and human.

### Trust Strategy

Trust should come first from:

- clarity
- warmth
- specificity
- team presence

Formal trust signals such as legal entity details can come later.

## 14. Language Strategy

### Launch Strategy

- default language: Spanish
- next language: English
- later language: Valenciano/Catalan

### Content Architecture Requirement

Do not hardcode the project in a way that makes later translation painful.

Translation should be treated as a core content architecture requirement even if not fully implemented in the first release.

## 15. Open Product Questions

These should remain visible in future iterations:

- final single-page vs multi-page decision
- exact tone of the contact flow
- approved service list
- approved pricing
- final events strategy
- whether event interest goes via form, external link, email, or all
- exact brochure format
- what legal text must exist at launch
- what trust signals should be added once the legal entity exists

## 16. Risks And Constraints

### Risks

- source content is incomplete and partly image-based
- pricing and service details are not yet final
- brand assets are not fully exported yet
- multilingual scope can expand quickly
- legal/privacy needs may grow later

### Constraints

- static tech stack for v0
- GitHub Pages hosting
- no heavy backend work
- emphasis on speed and reviewability

## 17. Research Requirements

This PRD includes future research as a requirement, but does not perform it yet.

### Required Research Track

1. Competitor/reference audit of midwife private group websites
2. Common information architecture patterns in this category
3. Common trust-building elements
4. Typical services and packaging presentation
5. Best practices for multilingual small-practice websites

## 18. Content Extraction And Tooling Requirements

We should create a future task for tooling that can help transcribe and structure image-based source material.

Possible approaches may include:

- a Codex or Claude-oriented skill
- OCR/transcription helper scripts
- bash-driven utilities where appropriate

The purpose of this tooling would be to:

- extract text from JPG source materials
- produce structured content drafts
- support translation workflows
- preserve a text-based archive of brand and content source assets

## 19. Delivery Phases

### Phase 0. Project Definition

- draft AGENTS and PRD
- document assumptions
- define content areas
- identify placeholders

### Phase 1. Source Capture

- extract and transcribe image-based content
- summarize visual direction
- prepare draft structured content

### Phase 2. Static v0 Build

- implement the first static website scaffold
- add JSON-based content
- create realistic placeholders
- deploy to GitHub Pages

### Phase 3. Founder Review Loop

- review wording
- review design direction
- review service and pricing assumptions
- collect requested changes

### Phase 4. Improved Static Release

- revise copy
- refine layouts
- add confirmed assets
- stabilize contact flow

### Phase 5. Future Rebuild

- consider React/Vercel migration
- improve SEO
- improve multilingual flow
- evaluate richer structured content systems

## 20. Definition Of Success

v0 is successful when:

- the founders can review it comfortably on phone and desktop
- the site clearly explains who Alumbra Comares are
- visitors understand the general service offer
- there is an obvious way to contact the group
- the design feels aligned enough to trigger meaningful feedback
- the implementation remains lightweight and easy to change

## 21. Immediate Next Steps

1. Create a content inventory from the reference JPGs
2. Capture a first written style summary from the visual references
3. Define the JSON content structure for the site
4. Decide the initial static page sections
5. Build the first HTML/CSS/JS scaffold
