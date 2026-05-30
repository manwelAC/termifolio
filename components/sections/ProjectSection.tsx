"use client"

import { useEffect, useState } from "react"


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
    <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
      animate ? "max-w-[992px] opacity-100" : "max-w-0 opacity-0"
    }`}>
      <div className="w-[992px] p-8 border border-neutral-800 rounded-lg">
        <h2 className="text-xl font-bold text-foreground mb-4 font-mono">projects</h2>
        <p className="text-muted-foreground font-sans">Project section placeholder</p>
      </div>
    </div>
  )
}