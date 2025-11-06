# GitHub Copilot / AI Assistant Instructions

Purpose: This repository is a personalized evolution of the original `developerFolio` template. The goal is to express a differentiated personal IP (个人IP) rather than an AI-era homogenized portfolio. Every automated change MUST preserve uniqueness, sectional focus, and narrative intent.

---
## Core Principles
1. Personal IP First: Do NOT genericize wording, colors, or layouts into bland defaults.
2. Sectional Identity: Each topic (Game Dev, Video, Photography, Writing) uses distinct visual + structural language; keep that separation while ensuring overall harmony.
3. Configuration Driven: Content lives in `src/portfolio.js` + a few section-local config objects (e.g. WritingShowcase). Prefer extending config objects over hardcoding.
4. Minimal Coupling: New features/components should not tightly couple unrelated sections. Cross-section utilities belong in `src/utils.js` or a new `src/hooks/` file.
5. Progressive Enhancement: Add capabilities without breaking current placeholder or fallback flows.

---
## High-Level Architecture
- Entry: `src/index.js` mounts `App.js` → `Main.js` orchestrates sections conditionally via config display flags.
- Global Styles: `_globalColor.scss` holds sharable color tokens. Only introduce new tokens if reused ≥2 places.
- Components vs Containers: "containers" manage section layout and composition; "components" are smaller reusable elements.
- New Personalized Sections Added:
  - `GameDevShowcase` (game development progress & timeline)
  - `VideoPortfolio` (award-winning videos + badges)
  - `Photography` (categorised gallery + lightbox)
  - `WritingShowcase` (purple gradient brand; bilingual titles; storytelling emphasis)
- Placeholder Assets: Centralized in `src/placeholderImages.js`. Swap in real assets later without touching logic.

---
## Key Files & Their Roles
| File | Purpose |
|------|---------|
| `src/portfolio.js` | Master configuration object for legacy + some new sections (toggle via `display: true/false`). |
| `src/placeholderImages.js` | Declarative mapping for placeholder image URLs. |
| `src/_globalColor.scss` | Color tokens; includes added `goldColor` and social-specific tokens. |
| `src/containers/*` | Section-level container components. |
| `src/components/*` | Reusable presentational components (cards, buttons, etc.). |
| `src/containers/writingShowcase/*` | Writing section with custom gradient; treat as identity-critical. |
| `public/index.html` | Meta & SEO; keep personalized keywords intact when updating. |

---
## Styling & Theming Guidelines
- Use SCSS nesting sparingly; keep selectors ≤3 levels deep.
- Preserve WritingShowcase gradient from 667eea to 764ba2 (hex codes). If extending, use analogous hues—do not replace outright.
- GameDevShowcase: Focus on progress timeline clarity; avoid heavy animation bloat.
- VideoPortfolio: Badge colors must remain semantically distinct (Gold/Silver/Special). Consider adding accessibility labels.
- Photography: Maintain lightbox keyboard accessibility (Esc to close, arrow navigation – add if absent).

---
## Adding / Modifying Sections
1. Create directory under `src/containers/<NewSection>` with `.js` + `.scss`.
2. Export component; import & render inside `Main.js` behind a feature flag.
3. Add config object either:
   - Into `src/portfolio.js` (preferred if simple data form), or
   - Local config file if data is complex (like writing categories) to preserve separation of concerns.
4. Extend navigation: Update `src/components/header/Header.js` with new view flag & nav item.
5. Keep `display` boolean toggles consistent naming (`displayXSection: true`).

---
## Placeholder Image Replacement Workflow
1. Add real files under `src/assets/images/<category>` following naming pattern `kebab-case`.
2. Update `placeholderImages.js` mapping OR replace direct usages in config objects.
3. NEVER hardcode remote CDN links inline unless necessary; prefer mapping indirection.
4. Verify dimensions (landscape vs portrait) to avoid layout shift.

---
## Content Integrity & Narrative
- Writing Section: Preserve bilingual structure. If summarizing, keep both language forms or supply translator notes.
- Game Dev: Keep feature timeline; when updating status, append new milestone—do not delete historical phases.
- Video Portfolio: Awards list is authoritative; add new entries chronologically.
- Photography: Categories are curated brand facets (urban, portrait, nature). Add new categories only with distinct stylistic rationale.

---
## Performance & Optimization Guidelines
- Avoid large inline JSON; externalize if > ~5KB.
- Defer heavy components with dynamic `import()` if future expansion grows size (e.g., large gallery sets).
- Minimize re-renders: Pass primitive props; memoize derived arrays if expensive.
- Image optimization: Suggest using next-gen formats later (WebP/AVIF) served via Vercel.

---
## Accessibility Checklist (Enhance Gradually)
- Alt text: Provide meaningful alt for all images and thumbnails.
- Color contrast: Ensure badges & gradients meet WCAG AA (test before changing colors).
- Keyboard navigation: Lightbox & menus must be focus-traversable.
- Semantics: Use `<section>` landmarks for major containers.

---
## Testing Guidelines
- Use React Testing Library if introduced (currently Enzyme installed; consider migration before React upgrade).
- Snapshot tests acceptable for stable presentational components.
- Add minimal tests when altering core config shape (e.g. ensure `display` flags respected).

---
## Dependency & Version Notes
- React 16.10.2 with Enzyme adapter; DO NOT bump React major without updating testing strategy.
- `react-scripts@5.0.1` currently supports Node 14–18. Stay within LTS (Node 18 in GitHub Actions).
- Keep SCSS to presentational logic; avoid introducing CSS-in-JS unless compelling reason documented.

---
## Build & Deployment
- Local: `npm install` → `npm start` (runs `fetch.js` pre-start).
- Production Build: `npm run build` (injects GitHub/Medium data if env vars set).
- Deployment Targets:
  - GitHub Pages via workflow (`deploy.yml`) currently watches `master`. NOTE: If default branch is `main`, update workflow triggers.
  - Vercel: Automatic on push (ensure Vercel project linked); avoid adding server-only code.

Branch Mismatch Warning: `deploy.yml` triggers on `master`. If repository uses `main`, adjust:
```yaml
on:
  push:
    branches: [ main ]
```

---
## Environment Variables
| Variable | Purpose | Notes |
|----------|---------|-------|
| `REACT_APP_GITHUB_TOKEN` | Fetch GitHub pinned repos | Classic PAT; no scopes needed. |
| `GITHUB_USERNAME` | GitHub profile queries | Synced via Actions env. |
| `USE_GITHUB_DATA` | Toggle dynamic GitHub fetch | "true"/"false" string. |
| `MEDIUM_USERNAME` | Medium blog fetch | Set if using blog section. |

Never commit real tokens; use `.env` locally and rely on `secrets.GITHUB_TOKEN` in workflows.

---
## Commit Message Conventions
Prefix with type:
- `feat:` new section/component or config capability
- `style:` purely visual change (SCSS adjustments)
- `content:` updates to portfolio data (text, images)
- `fix:` bug fix
- `docs:` changes to markdown guides or this file
- `chore:` build or dependency maintenance

Examples:
```
feat(game-dev): add milestone for AI enemy pathfinding
content(writing): publish bilingual essay on creative prototyping
style(photography): refine lightbox overlay contrast
```

---
## Safe Refactors
Allowed:
- Converting repeated badge markup into a small `<AwardBadge>` component.
- Extracting lightbox logic into a hook `useLightbox` if reused.
- Introducing ESLint rule tweaks (ensure no override of CRA defaults unless justified).

Not Allowed Without Approval (document rationale in PR first):
- Major color palette overhaul removing signature gradients.
- Replacing SCSS with an alternate styling paradigm.
- Removing placeholder indirection strategy.

---
## Internationalization (Optional Future)
- Maintain bilingual patterns where they already exist.
- If adding i18n, prefer lightweight key/value JSON and a tiny context provider; avoid large libraries unless scaling demands.

---
## Potential Next Steps (For Future AI Agents)
1. Add accessibility enhancements (ARIA roles for lightbox, focus trapping).
2. Implement lazy loading for gallery images.
3. Add microdata/JSON-LD for richer SEO (e.g. `Person`, `CreativeWork`).
4. Provide dark mode variant that preserves section identity (don’t invert gradients blindly).
5. Migrate tests from Enzyme to React Testing Library for future React upgrades.

---
## Quality Gate Expectations
Before merging automated changes:
- Build must pass (`npm run build`).
- Formatting check passes (`npm run check-format`).
- Added/updated tests green (`npm test`).
- No removal of personal branding elements unless explicitly instructed.

---
## Quick Review Checklist for AI Changes
[ ] Preserved sectional uniqueness (colors/layout/voice).  
[ ] No generic filler replacing personal narratives.  
[ ] Config updated instead of hardcoding values.  
[ ] Placeholder strategy intact (or upgraded with real assets).  
[ ] Build + format + tests pass.  
[ ] Commit message follows convention.  

---
## Escalation Rules
If a requested change would homogenize identity or remove narrative richness, pause and request clarification rather than proceeding.

---
## Final Note
The portfolio’s differentiator is STORY + MULTI-MEDIA CRAFT. All automation should amplify—not dilute—this identity.

Be intentional. Avoid sameness.
