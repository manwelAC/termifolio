"use client"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MagicCard } from "@/components/ui/magic-card"

const commands = [
  { cmd: "about", desc: "Who I am" },
  { cmd: "projects", desc: "What I've built" },
  { cmd: "skills", desc: "What I work with" },
  { cmd: "contact", desc: "Get in touch" },
  { cmd: "close [section]", desc: "Remove a section" },
  { cmd: "clear", desc: "Clear everything" },
  { cmd: "whoami", desc: "Fun one-liner" },
  { cmd: "sudo hire me", desc: "👀" },
  { cmd: "gui", desc: "Switch to Bento view" },
]

export function CommandList() {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted
    ? (theme === "system" ? systemTheme : theme) === "dark"
    : true

  return (
    <Card className="w-full max-w-sm border-none rounded-xl p-0 shadow-none">
      <MagicCard
        mode="orb"
        glowFrom={isDark ? "#ee4f27" : "#E9D5FF"}
        glowTo={isDark ? "#6b21ef" : "#FBCFE8"}
        className="p-0"
      >
        <CardHeader className="border-border border-b p-4">
          <CardTitle className="font-mono text-sm">Available Commands</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            {commands.map((item) => (
              <div key={item.cmd} className="flex items-start gap-3">
                <span className="font-mono text-xs text-emerald-400 min-w-fit">{item.cmd}</span>
                <span className="text-xs text-neutral-400">{item.desc}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </MagicCard>
    </Card>
  )
}