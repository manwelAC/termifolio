"use client"

import { useState } from "react"
import Image from "next/image";
import TerminalDemo from "@/components/terminal-demo";
import { MagicCard } from "@/components/ui/magic-card";
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { MagicCardDemo } from "@/components/ui/magic-card-demo"
import { CommandList } from "@/components/command-list"
import { AboutSection } from "@/components/sections/AboutSection"
import { ProjectSection } from "@/components/sections/ProjectSection"
import { SkillsSection } from "@/components/sections/SkillsSection"
import { About2Section } from "@/components/sections/About2Section"
import { About3Section } from "@/components/sections/About3Section"
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
      <main className="min-h-screen bg-background flex flex-col items-center">
        {/* Navigation Header for Terminal View */}
        <div className="w-full max-w-6xl flex justify-between items-center px-4 pt-12">
          <button
            onClick={() => setViewMode("onboarding")}
            className="flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-neutral-100 transition-colors py-2 px-4 rounded-lg border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900/60"
          >
            <ArrowLeft className="h-4 w-4" />
            Change Experience
          </button>
          <button
            onClick={() => setViewMode("bento")}
            className="flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-neutral-100 transition-colors py-2 px-4 rounded-lg border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900/60"
          >
            <LayoutGrid className="h-4 w-4" />
            Bento Showcase
          </button>
        </div>

        <div className="flex items-start gap-6 justify-center py-16 w-full">
          <div className="w-64 shrink-0">
            <CommandList />
          </div>
          <div className="w-[600px] shrink-0">
            <TerminalDemo
              onCommand={handleCommand}
              onClear={() => {
                setSections({ about: false, projects: false, skills: false, "about-2": false, "about-3": false })
                setSectionOrder([])
                setContactOpen(false)
              }}
            />
          </div>
          <div className="w-64 shrink-0">
            <MagicCardDemo />
          </div>
        </div>

        <div className="flex flex-col gap-6 pb-16">
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

      </main>
    </>
  );
}
