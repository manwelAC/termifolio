# John Manuel Cuerdo — TermiPortfolio

A retro-modern developer portfolio featuring two experiences: an interactive Terminal CLI workspace and a visual glassmorphic Bento Grid showcase.

**Live Demo**: [termifolio-seven.vercel.app](https://termifolio-seven.vercel.app/)

## Prerequisites

- Node.js 20 or later
- npm (included with Node.js)
- A Cloudinary account if you want to use image uploads or Cloudinary-hosted images

Before starting, copy the environment template and add your own Cloudinary credentials:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Never commit `.env.local` or share `CLOUDINARY_API_SECRET`. If you do not need image uploads, remove the Cloudinary-dependent features or replace them with your own image storage.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Replace the profile content, links, images, and blog posts in `app/`, `components/`, and `content/` with your own information before deploying.

---

## 🛠️ The Experience Modes

1. **Terminal Workspace (`/terminal`)**
   - Retro command-line experience where users can query, view, and interact with the developer profile.
   - Command triggers like `about`, `projects`, `skills`, `contact`, and a fun `whoami` one-liner generator.
   - Toggle to GUI mode seamlessly by typing `gui` or `bento`.

2. **Bento Grid Showcase (`/bento`)**
   - Modern Bento layout (`grid-cols-3`) displaying profile metadata, live local time clock (Manila timezone), project modals, visual progress indicators, and structured technical stack lists at a glance.
   - Integrates smooth scroll progress indicators and pulsing availability badges.

---

## ⚙️ Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS v4 & custom glassmorphism
- **Animations**: Framer Motion (`motion/react`)
- **Assets**: Cloudinary (via `next-cloudinary`)
- **Icons**: Lucide React & React Icons
