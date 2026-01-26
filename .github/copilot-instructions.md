# GitHub Copilot Instructions for Chirpwood

## Project Overview
Chirpwood is a simple X/Twitter clone with a Lord of the Rings theme. Users authenticate via Google/Firebase and can post, edit, and delete "chirps."

## Tech Stack
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth/Database**: Firebase (Auth + Firestore)

## Project Structure
```
chirp-wood/
├── src/
│   └── app/        # Next.js App Router
├── public/         # Static assets
├── tailwind.config.ts
└── package.json
```

## Commands
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## Features
- Google authentication (Firebase)
- Post, edit, delete chirps
- Real-time feed updates (Firestore)
- Shire-inspired theme
- Responsive design

## Code Conventions
- Use Next.js App Router conventions
- TypeScript strict mode
- Tailwind for all styling
- Firebase SDK for auth and database
- Keep components small and focused
