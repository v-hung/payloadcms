# [PROJECT NAME] Development Guidelines

Auto-generated from all feature plans. Last updated: [DATE]

**Constitution Reference:** See `.specify/memory/constitution.md` for core principles

## Active Technologies

[EXTRACTED FROM ALL PLAN.MD FILES]

**Required Versions:**

- Node.js: v22.17.1
- pnpm: 10.28.1
- Next.js: 16.1.4
- TypeScript: Strict mode enabled

## Project Structure

```text
[ACTUAL STRUCTURE FROM PLANS]
```

## Commands

[ONLY COMMANDS FOR ACTIVE TECHNOLOGIES]

**Critical Commands (run in order):**

1. `pnpm install` - Always run first
2. `npx payload generate:db-schema` - After collection changes
3. `npx payload generate:types` - After collection changes
4. `pnpm dev` - Start development server
5. `pnpm lint` - Verify code quality

## Code Style

[LANGUAGE-SPECIFIC, ONLY FOR LANGUAGES IN USE]

**Constitution-Required Patterns:**

- TypeScript strict mode (no implicit `any`)
- Path aliases: `@/*` and `@payload-config`
- Internationalization: `useTranslations()` hook for all UI text
- Server Components by default, Client Components only when needed
- Tailwind CSS classes (no inline styles)

## Recent Changes

[LAST 3 FEATURES AND WHAT THEY ADDED]

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
