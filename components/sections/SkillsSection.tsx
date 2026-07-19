"use client"

import { useEffect, useState } from "react"

const skills = {
  Languages: ["PHP", "JavaScript", "TypeScript"],
  Frontend: ["React", "React Native", "Next.js", "Bootstrap", "Angular"],
  Backend: ["Laravel", "Node.js"],
  Database: ["MySQL", "PostgreSQL", "Firebase"],
  "DevOps & Tools": ["Vercel", "Bitbucket", "GitHub", "Laravel Cloud", "Jira"],
}

interface SkillsSectionProps {
  visible: boolean
}

export function SkillsSection({ visible }: SkillsSectionProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setAnimate(true), 50)
      return () => clearTimeout(t)
    }
  }, [visible])

  return (
    <div className={`w-full overflow-hidden transition-all duration-700 ease-in-out ${
      animate ? "max-w-[1200px] opacity-100" : "max-w-0 opacity-0"
    }`}>
      <div className="w-full space-y-6 rounded-lg border border-neutral-800 p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <div className="border-b border-neutral-800 pb-4">
          <p className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-1">Stack</p>
          <h2 className="text-2xl text-foreground font-normal" style={{ fontFamily: "Lora, serif" }}>
            Things I build <span className="italic">with.</span>
          </h2>
        </div>

        {/* Skill groups */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <p className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-3">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[11px] tracking-wider uppercase px-2.5 py-1 rounded border border-neutral-800 text-neutral-400 bg-neutral-900 hover:border-neutral-600 hover:text-neutral-200 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
