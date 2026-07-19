"use client"

import { useEffect, useState } from "react"
import ExpandableCardDemo from "@/components/expandable-card-demo-grid"

interface ProjectSectionProps {
  visible: boolean
}

export function ProjectSection({ visible }: ProjectSectionProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setAnimate(true), 50)
      return () => clearTimeout(t)
    }
  }, [visible])

  return (
    <div
      className={`w-full overflow-hidden transition-all duration-700 ease-in-out ${
        animate ? "max-w-[1200px] opacity-100" : "max-w-0 opacity-0"
      }`}
    >
      <div className="w-full rounded-lg border border-neutral-800 p-4 sm:p-6 lg:p-8">

        {/* Header — matches ContactDrawer header rhythm */}
        <div className="mb-8">
          <p className="text-xs font-mono text-muted-foreground mb-3 tracking-widest uppercase">
            selected work
          </p>
          <h2
            className="text-2xl font-normal text-foreground leading-snug sm:text-3xl"
            style={{ fontFamily: "Lora, serif" }}
          >
            Things I&apos;ve built
            <br />
            <span className="italic text-muted-foreground">with care.</span>
          </h2>
          <p
            className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-md"
            style={{ fontFamily: "Lora, serif" }}
          >
            A handful of projects that kept me up late — for the right reasons.
          </p>
        </div>

        <div className="w-full h-px bg-neutral-800 mb-8" />

        <ExpandableCardDemo />

        <p
          className="mt-8 text-xs text-neutral-600 text-center"
          style={{ fontFamily: "Lora, serif" }}
        >
          More on GitHub.
        </p>

      </div>
    </div>
  )
}
