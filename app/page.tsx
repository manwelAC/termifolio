"use client"

import { useState } from "react"
import { motion } from "motion/react"
import TerminalDemo from "@/components/terminal-demo";
import { MagicCardDemo } from "@/components/ui/magic-card-demo"
import { CommandList } from "@/components/command-list"
import { AboutSection } from "@/components/sections/AboutSection"
import { ProjectSection } from "@/components/sections/ProjectSection"
import { SkillsSection } from "@/components/sections/SkillsSection"
import { About2Section } from "@/components/sections/About2Section"
import { ContactDrawer } from "@/components/sections/ContactDrawer"
import { SplashScreen } from "@/components/SplashScreen"
import { Onboarding } from "@/components/Onboarding"
import { BentoPortfolio } from "@/components/BentoPortfolio"
import { ArrowLeft, LayoutGrid } from "lucide-react"



type SectionKey = "about" | "about-2" | "about-3" | "projects" | "skills"  // ← removed contact

export default function Home() {

  const [showSplash, setShowSplash] = useState(true)
  const [viewMode, setViewMode] = useState<"onboarding" | "terminal" | "bento">("onboarding")

  const [sections, setSections] = useState<Record<SectionKey, boolean>>({
    about: false,
    "about-2": false,
    "about-3": false,
    projects: false,
    skills: false,
    // ← no more contact here
  })

  const [sectionOrder, setSectionOrder] = useState<SectionKey[]>([])
  const [contactOpen, setContactOpen] = useState(false)  // ← new

  const whoamiLines = [
  "a fullstack dev who turns coffee into code.",
  "building things that actually work — mostly.",
  "laravel by day, react native by night.",
  "somewhere between a backend purist and a frontend perfectionist.",
  "the guy who reads docs for fun.",
  "currently obsessed with clean UI and dirty SQL.",
  "a developer who cares too much about font choices.",
  "shipping projects before they're perfect. always.",
  "IoT, mobile, web — if it runs code, I'm interested.",
  "manuel. fullstack. termiportfolio.",
]

  const handleCommand = (cmd: string): string[] => {
    if (cmd === "gui" || cmd === "bento") {
      setViewMode("bento")
      return []
    }

    if (cmd === "onboarding" || cmd === "menu") {
      setViewMode("onboarding")
      return []
    }

    if (cmd === "contact") {
      setContactOpen(true)
      return []
    }

    if (cmd === "close:contact") {
      setContactOpen(false)
      return []
    }

    if (cmd === "about") {
      setSections((prev) => ({ ...prev, about: true, "about-2": true, "about-3": true }))
      setSectionOrder((prev) => {
        const toAdd = (["about", "about-2", "about-3"] as SectionKey[]).filter(k => !prev.includes(k))
        return [...prev, ...toAdd]
      })
      return []
    }

    if (cmd in sections) {
      const key = cmd as SectionKey
      if (!sections[key]) {
        setSections((prev) => ({ ...prev, [key]: true }))
        setSectionOrder((prev) => [...prev, key])
      }
      return []
    }

    if (cmd.startsWith("close:")) {
      const section = cmd.replace("close:", "")
      const keysToClose: SectionKey[] = section === "about"
        ? ["about", "about-2", "about-3"]
        : [section as SectionKey]
      setSections((prev) => {
        const next = { ...prev }
        keysToClose.forEach((k) => { next[k] = false })
        return next
      })
      setSectionOrder((prev) => prev.filter((s) => !keysToClose.includes(s)))
      return []
    }

    if (cmd === "clear") {
      setSections({ about: false, "about-2": false, "about-3": false, projects: false, skills: false })
      setSectionOrder([])
      return []
    }

    if (cmd === "whoami") {
      return [whoamiLines[Math.floor(Math.random() * whoamiLines.length)]]
    }

    return ["command not found: " + cmd + ". Type 'help' for available commands."]
  }

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (viewMode === "onboarding") {
    return <Onboarding onSelect={setViewMode} />;
  }

  if (viewMode === "bento") {
    return (
      <>
        <BentoPortfolio
          onBackToOnboarding={() => setViewMode("onboarding")}
          onOpenContact={() => setContactOpen(true)}
          onSwitchToTerminal={() => setViewMode("terminal")}
        />
        <ContactDrawer open={contactOpen} onOpenChange={setContactOpen} />
      </>
    );
  }

  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 10, scale: 0.995 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(52,211,153,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(52,211,153,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-full max-w-6xl -translate-x-1/2 border-x border-neutral-900" />
        <motion.div
          aria-hidden="true"
          initial={{ y: "0vh", opacity: 0 }}
          animate={{ y: "100vh", opacity: [0, 0.12, 0.12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-emerald-300"
        />
        {/* Navigation Header for Terminal View */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="relative z-10 w-full max-w-6xl flex justify-between items-center px-4 pt-10"
        >
          <button
            onClick={() => setViewMode("onboarding")}
            className="flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-neutral-100 transition-colors py-2 px-4 rounded-lg border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900/60"
          >
            <ArrowLeft className="h-4 w-4" />
            Change Experience
          </button>
          <div className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-neutral-500 md:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Terminal workspace
            <span className="text-neutral-700">//</span>
            Session active
          </div>
          <button
            onClick={() => setViewMode("bento")}
            className="flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-neutral-100 transition-colors py-2 px-4 rounded-lg border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900/60"
          >
            <LayoutGrid className="h-4 w-4" />
            Bento Showcase
          </button>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
          }}
          className="relative z-10 grid w-full max-w-6xl grid-cols-1 items-start gap-4 px-4 py-12 lg:grid-cols-[210px_minmax(0,1fr)_220px]"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, x: -14 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <CommandList />
          </motion.div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="order-1 min-w-0 lg:order-2"
          >
            <TerminalDemo
              onCommand={handleCommand}
              onClear={() => {
                setSections({ about: false, projects: false, skills: false, "about-2": false, "about-3": false })
                setSectionOrder([])
                setContactOpen(false)
              }}
            />
          </motion.div>
          <motion.div
            variants={{ hidden: { opacity: 0, x: 14 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="order-3"
          >
            <MagicCardDemo />
          </motion.div>
        </motion.div>

        <div className="relative z-10 flex w-full flex-col items-center gap-6 overflow-x-auto px-4 pb-16">
          {(sections["about-2"] || sections.about || sections["about-3"]) && (
            <div className="flex flex-row gap-6">
              {sections["about-2"] && <About2Section visible={sections["about-2"]} />}
              {sections.about && <AboutSection visible={sections.about} />}
            </div>
          )}

          {sectionOrder
            .filter(k => !["about", "about-2", "about-3"].includes(k))
            .map((key) => {
              if (key === "projects") return <ProjectSection key={key} visible={sections.projects} />
              if (key === "skills") return <SkillsSection key={key} visible={sections.skills} />
            })}
        </div>

        <ContactDrawer open={contactOpen} onOpenChange={setContactOpen} />

      </motion.main>
    </>
  );
}
