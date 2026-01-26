# CLAUDE.md - Chirpwood

## What is this?
Chirpwood is a simple social media app inspired by X/Twitter, with a Lord of the Rings theme. Users log in with Google (Firebase Auth) and can post "chirps" to a real-time feed (Firestore).

## Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Authentication + Firestore)

## Project Structure
```
chirp-wood/
├── src/
│   └── app/        # Next.js App Router pages/components
├── public/         # Static assets
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

## Commands
```bash
npm run dev        # Development server (localhost:3000)
npm run build      # Production build
npm run start      # Run production build
npm run lint       # ESLint
```

## Features
- Google authentication via Firebase
- Create, edit, delete chirps
- Real-time feed updates (Firestore listeners)
- Shire-inspired LOTR theme
- Account info and theme customization pages
- Responsive design

## Code Conventions
- Next.js App Router patterns (app/ directory)
- TypeScript throughout
- Tailwind CSS for styling (no CSS files)
- Firebase SDK v9+ modular syntax
- Server Components where possible

## Environment
Firebase config required in environment variables:
- `NEXT_PUBLIC_FIREBASE_*` keys

## Future Ideas
See README.md for planned features (likes, comments, follows, notifications, etc.)
