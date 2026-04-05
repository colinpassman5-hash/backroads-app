# Backroads App

Adventure-first GPS and drive sharing app built with Next.js.

## Current Product Scope

- Account creation with Supabase-ready auth wiring
- Preferences-based route planning
- AI guide prompt slot (`/api/backroads/guide`)
- Native discovery toolkit (`/api/backroads/discover`)
- Social drive sharing with safety obfuscation (5-10 mile buffer)
- Drive comments in community feed
- Year recap endpoint (`/api/backroads/recap`)

## Main Routes

- `/` Backroads app experience
- `/api/backroads/accounts`
- `/api/backroads/trips`
- `/api/backroads/guide`
- `/api/backroads/discover`
- `/api/backroads/social/posts`
- `/api/backroads/social/comments`
- `/api/backroads/recap`

## Environment

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-side write path)

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```
