# AGENTS.md - Chirpwood

## Project Summary
X/Twitter clone with Lord of the Rings theme. Google auth via Firebase, real-time Firestore feed.

## Tech Stack
| Component | Technology |
|-----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth | Firebase Authentication (Google) |
| Database | Firestore |

## Directory Structure
```
chirp-wood/
├── src/app/       # Next.js pages/components
├── public/        # Static assets
├── tailwind.config.ts
└── package.json
```

## Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |

## Features
- Google sign-in
- Post/edit/delete chirps
- Real-time feed updates
- LOTR/Shire theme
- Responsive design

## Code Conventions
1. Next.js App Router patterns
2. TypeScript strict
3. Tailwind for styling
4. Firebase SDK v9+ modular imports
5. Small, focused components

## Environment
Requires Firebase config:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- etc.
