<!--
SYNC IMPACT REPORT - Constitution v1.0.0
Generated: 2026-01-23

VERSION CHANGE: Initial → 1.0.0 (MINOR - new constitution established)

PRINCIPLES ADDED:
- Type Safety & Correctness (Principle I)
- Payload CMS Schema Integrity (Principle II)
- Internationalization Consistency (Principle III)
- Performance & Build Efficiency (Principle IV)
- Component Architecture & Reusability (Principle V)

SECTIONS ADDED:
- Code Quality Standards
- Development Workflow & Quality Gates

TEMPLATES STATUS:
✅ plan-template.md - Updated constitution check section
✅ spec-template.md - Aligned with type safety and i18n requirements
✅ tasks-template.md - Integrated schema generation and validation tasks

FOLLOW-UP TODOS:
- None - all placeholders filled
-->

# Company Website Project Constitution

## Core Principles

### I. Type Safety & Correctness (NON-NEGOTIABLE)

**Rule:** TypeScript strict mode MUST be enforced across all code. All functions, components, and API boundaries MUST have explicit type annotations.

**Requirements:**

- No `any` types unless explicitly justified with a comment explaining why
- All Payload CMS collections MUST regenerate types (`payload-types.ts`) after schema changes
- All imports MUST use configured path aliases (`@/*`, `@payload-config`)
- Next.js 16 async params pattern MUST be followed: `const { locale } = await params;`

**Rationale:** Type safety prevents runtime errors, improves IDE support, enables confident refactoring, and serves as inline documentation. In a multilingual CMS-driven site, type mismatches can cause data corruption or display issues across locales.

### II. Payload CMS Schema Integrity (NON-NEGOTIABLE)

**Rule:** Collection schema changes MUST follow a mandatory generation workflow. Auto-generated files in `app/(payload)/` MUST NOT be manually edited.

**Workflow (ALWAYS execute in this order):**

1. Modify collection schema in `collections/*.ts`
2. Run `npx payload generate:db-schema` (generates SQLite schema)
3. Run `npx payload generate:types` (generates TypeScript types)
4. Verify `payload-types.ts` and `payload-generated-schema.ts` are updated
5. Restart dev server to apply changes

**Forbidden Actions:**

- Direct edits to `app/(payload)/layout.tsx`, `app/(payload)/admin/importMap.js`
- Committing code without running both generate commands after collection changes
- Skipping schema generation "because it still works"

**Rationale:** Payload CMS auto-generates critical files. Manual edits get overwritten, causing loss of work. Skipping generation causes type mismatches between code and database, leading to runtime failures or data loss.

### III. Internationalization Consistency

**Rule:** All user-facing text MUST be externalized to `i18n/messages/{locale}.json`. Both Vietnamese (`vi`) and English (`en`) translations MUST be provided for every text key.

**Requirements:**

- Use `useTranslations()` hook for all UI text (no hardcoded strings)
- Payload CMS collection labels MUST include both `en` and `vi` properties
- Content fields requiring translation MUST set `localized: true`
- Route structure MUST follow `app/(app)/[locale]/` pattern for i18n pages

**Anti-patterns:**

- Hardcoded strings: `<h1>Welcome</h1>` → Use: `<h1>{t('welcome')}</h1>`
- Missing translation keys (causes runtime errors in locale switching)
- Mixing Payload localization with next-intl localization (they serve different purposes)

**Rationale:** The project serves Vietnamese and English-speaking markets. Incomplete translations damage user experience. Hardcoded text is non-translatable and creates maintenance debt.

### IV. Performance & Build Efficiency

**Rule:** Build and development processes MUST complete successfully with documented, reproducible steps. Performance-critical operations MUST meet defined thresholds.

**Build Requirements:**

- `pnpm install` MUST complete before any build/dev operation (dependency integrity)
- `pnpm lint` MUST pass (only known warning in `payload-generated-schema.ts` allowed)
- Production builds (`pnpm build`) MUST complete without TypeScript errors
- Development server (`pnpm dev`) MUST start and hot-reload correctly

**Performance Thresholds:**

- Page load time: < 3 seconds (First Contentful Paint)
- Image optimization: Use Next.js Image component, not raw `<img>` tags
- Tailwind CSS purging: Verify unused classes removed in production build
- Database queries: No N+1 queries in Payload collections (use `populate` correctly)

**Rationale:** Slow builds waste developer time. Performance issues in a marketing site directly impact SEO, user engagement, and conversion rates. Clear thresholds enable objective validation.

### V. Component Architecture & Reusability

**Rule:** UI components MUST follow shadcn/ui patterns. Components MUST be Server Components by default, using Client Components (`'use client'`) only when necessary.

**Architecture Patterns:**

- Shared components → `components/` (reusable across features)
- shadcn/ui components → `components/ui/` (installed via `pnpm dlx shadcn@latest add`)
- Page-specific components → `app/(app)/[locale]/[page]/components/`
- Use `cn()` utility for conditional class merging (from `@/lib/utils`)

**Server vs Client Components:**

- **Server (default):** Data fetching, static content, SEO-critical content
- **Client (explicit):** Interactive UI, event handlers, browser APIs, React hooks (useState, useEffect)

**Styling Standards:**

- Use Tailwind CSS classes (not inline styles or CSS modules)
- Follow New York variant conventions (as configured in `components.json`)
- Use `class-variance-authority` for component variants

**Rationale:** Consistent architecture reduces cognitive load, enables parallel development, and improves maintainability. Server Components improve performance and SEO. shadcn/ui provides battle-tested, accessible components.

## Code Quality Standards

### TypeScript Configuration

- **Strict mode:** Enabled (non-negotiable)
- **Path aliases:** `@/*` (root), `@payload-config` (Payload config import)
- **Target:** ES2017 (Node 22 compatibility)

### Linting & Formatting

- **ESLint:** Flat config with Next.js rules (`eslint-config-next`)
- **Auto-fix:** Run `pnpm lint --fix` before committing
- **Ignored paths:** `.next/`, `out/`, `build/`, `next-env.d.ts`, `node_modules/`

### Environment Management

- **Required variables:** `PAYLOAD_SECRET`, `DATABASE_URL` (see `.env.example`)
- **Validation:** `.env` file MUST exist before running dev/build commands
- **Security:** Never commit `.env` (only `.env.example`)

### Dependency Management

- **Package manager:** pnpm 10.28.1 (MUST use pnpm, not npm/yarn)
- **Node version:** v22.17.1 (verify with `node --version`)
- **Workspace config:** `pnpm-workspace.yaml` ignores `sharp`, `unrs-resolver` (Payload CMS native deps)

## Development Workflow & Quality Gates

### Pre-Development Checklist

1. Verify `.env` file exists with required variables
2. Run `pnpm install` (fresh install or after pulling changes)
3. If collections changed: Run schema generation commands
4. Start dev server: `pnpm dev`

### Pre-Commit Quality Gates

1. **Linting:** `pnpm lint` passes (1 known warning allowed)
2. **Type checking:** No TypeScript errors in editor/IDE
3. **Schema sync:** If collections modified, verify both generate commands ran
4. **Dev server test:** `pnpm dev` starts without errors
5. **Translation completeness:** Both `en.json` and `vi.json` have matching keys

### Code Review Checklist

- [ ] Type annotations present (no implicit `any`)
- [ ] Internationalization applied (no hardcoded UI text)
- [ ] Server/Client component usage justified
- [ ] Payload schema changes followed generation workflow
- [ ] Path aliases used correctly (`@/*`, `@payload-config`)
- [ ] Tailwind classes used (no inline styles)
- [ ] Performance considerations addressed (images optimized, queries efficient)

### Common Issues & Resolutions

| Issue                                | Resolution                                                        |
| ------------------------------------ | ----------------------------------------------------------------- |
| "Database not found"                 | Verify `DATABASE_URL` in `.env` points to `file:./data/sqlite.db` |
| "PAYLOAD_SECRET not set"             | Create `.env` file with secret (see `.env.example`)               |
| Type errors after collection changes | Run `npx payload generate:db-schema` then `generate:types`        |
| Import errors for `@payload-config`  | Check `tsconfig.json` paths configuration                         |
| Missing translations                 | Add keys to both `i18n/messages/en.json` and `vi.json`            |

## Governance

This constitution supersedes all conflicting practices or documentation. All code changes, pull requests, and architectural decisions MUST comply with these principles.

### Amendment Process

1. Propose amendment with justification (via issue/PR discussion)
2. Document impact on existing code and templates
3. Update affected templates in `.specify/templates/`
4. Increment version according to semantic versioning (see below)
5. Update `Last Amended` date

### Version Semantics

- **MAJOR (X.0.0):** Principle removal, redefinition, or backward-incompatible governance change
- **MINOR (0.X.0):** New principle added, section materially expanded, new quality gate
- **PATCH (0.0.X):** Clarifications, typo fixes, wording improvements (no semantic change)

### Compliance Verification

- All PRs MUST pass quality gates defined in "Development Workflow & Quality Gates"
- Constitution violations MUST be justified with a comment linking to this document
- Agents/developers MUST reference `.github/copilot-instructions.md` for runtime guidance

### Related Documentation

- **Runtime Guidance:** `.github/copilot-instructions.md` (detailed how-to for daily development)
- **Spec Templates:** `.specify/templates/spec-template.md` (feature requirements)
- **Plan Templates:** `.specify/templates/plan-template.md` (implementation plans)
- **Task Templates:** `.specify/templates/tasks-template.md` (task breakdown)

**Version**: 1.0.0 | **Ratified**: 2026-01-23 | **Last Amended**: 2026-01-23
