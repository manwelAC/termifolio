# John Manuel Cuerdo — TermiPortfolio

A retro-modern developer portfolio featuring two experiences: an interactive Terminal CLI workspace and a visual glassmorphic Bento Grid showcase.

**Live Demo**: [termifolio-seven.vercel.app](https://termifolio-seven.vercel.app/)

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

