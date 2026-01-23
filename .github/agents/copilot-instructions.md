# my-app Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-01-23

**Constitution Reference:** See `.specify/memory/constitution.md` for core principles

## Active Technologies

- TypeScript 5.x with Next.js 16.1.4 (React 19.2.3), Node.js v22.17.1 + Payload CMS 3.72.0, next-intl 4.7.0, Tailwind CSS 4.x, shadcn/ui, Lexical editor (001-corporate-website)

**Required Versions:**

- Node.js: v22.17.1
- pnpm: 10.28.1
- Next.js: 16.1.4
- TypeScript: Strict mode enabled

## Project Structure

```text
backend/
frontend/
tests/
```

## Commands

npm test; npm run lint

**Critical Commands (run in order):**

1. `pnpm install` - Always run first
2. `npx payload generate:db-schema` - After collection changes
3. `npx payload generate:types` - After collection changes
4. `pnpm dev` - Start development server
5. `pnpm lint` - Verify code quality

## Code Style

TypeScript 5.x with Next.js 16.1.4 (React 19.2.3), Node.js v22.17.1: Follow standard conventions

**Constitution-Required Patterns:**

- TypeScript strict mode (no implicit `any`)
- Path aliases: `@/*` and `@payload-config`
- Internationalization: `useTranslations()` hook for all UI text
- Server Components by default, Client Components only when needed
- Tailwind CSS classes (no inline styles)

## Recent Changes

- 001-corporate-website: Added TypeScript 5.x with Next.js 16.1.4 (React 19.2.3), Node.js v22.17.1 + Payload CMS 3.72.0, next-intl 4.7.0, Tailwind CSS 4.x, shadcn/ui, Lexical editor

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
