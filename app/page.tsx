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
import { ContactSection } from "@/components/sections/ContactSection"
import { About2Section } from "@/components/sections/About2Section"
import { About3Section } from "@/components/sections/About3Section"

type SectionKey = "about" | "about-2" | "about-3" | "projects" | "skills" | "contact"


export default function Home() {
    const [sections, setSections] = useState<Record<SectionKey, boolean>>({
    about: false,
    "about-2": false,
    "about-3": false,
    projects: false,
    skills: false,
    contact: false,
  })

const [sectionOrder, setSectionOrder] = useState<SectionKey[]>([])

const handleCommand = (cmd: string) => {
  // Handle "about" — opens all three at once
  if (cmd === "about") {
    setSections((prev) => ({ ...prev, about: true, "about-2": true, "about-3": true }))
    setSectionOrder((prev) => {
      const toAdd = (["about", "about-2", "about-3"] as SectionKey[]).filter(k => !prev.includes(k))
      return [...prev, ...toAdd]
    })
    return
  }

  // Handle all other individual section commands
  if (cmd in sections) {
    const key = cmd as SectionKey
    if (!sections[key]) {
      setSections((prev) => ({ ...prev, [key]: true }))
      setSectionOrder((prev) => [...prev, key])
    }
    return
  }

  if (cmd.startsWith("close:")) {
    const section = cmd.replace("close:", "") as SectionKey
    setSections((prev) => ({ ...prev, [section]: false }))
    setSectionOrder((prev) => prev.filter((s) => s !== section))
    return
  }

  if (cmd === "clear") {
    setSections({ about: false, "about-2": false, "about-3": false, projects: false, skills: false, contact: false })
    setSectionOrder([])
  }
}

  return (
    <main className="min-h-screen bg-background flex flex-col items-center">
      <div className="flex items-start gap-6 justify-center py-16 w-full">
        <div className="w-64 shrink-0">
          <CommandList />
        </div>
        <div className="w-[600px] shrink-0">
          <TerminalDemo   
            onCommand={handleCommand} 
            onClear={() => {
              setSections({ about: false, projects: false, skills: false, contact: false, "about-2": false, "about-3": false })
              setSectionOrder([])
            }} 
          />
        </div>
        <div className="w-64 shrink-0">
          <MagicCardDemo />
        </div>
      </div>


    <div className="flex flex-col gap-6 pb-16">

      {/* About sections — side by side */}
      {( sections["about-2"] || sections.about || sections["about-3"]) && (
        <div className="flex flex-row gap-6">
          
          {sections["about-2"] && <About2Section visible={sections["about-2"]} />}
          {sections.about && <AboutSection visible={sections.about} />}
          {/* {sections["about-3"] && <About3Section visible={sections["about-3"]} />} */}
        </div>
      )}

      {/* Other sections — stacked */}
      {sectionOrder
        .filter(k => !["about", "about-2", "about-3"].includes(k))
        .map((key) => {
          if (key === "projects") return <ProjectSection key={key} visible={sections.projects} />
          if (key === "skills") return <SkillsSection key={key} visible={sections.skills} />
          if (key === "contact") return <ContactSection key={key} visible={sections.contact} />
        })}

    </div>


    </main>
  )
}
