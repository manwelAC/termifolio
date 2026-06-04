"use client";
import { useRef } from "react";
import { Terminal, TerminalRef } from "@/components/ui/terminal";

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

const sudoHireMe = [
  "Verifying credentials...",
  "Identity confirmed: recruiter detected.",
  "Checking Manuel's availability... he's free.",
  "Sending request... just kidding, use 'contact' instead 😄",
]


const commandMap: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  about      → Who I am",
    "  projects   → What I've built",
    "  skills     → What I work with",
    "  contact    → Get in touch",
    "  close [section] → Remove a section",
    "  clear      → Clear terminal",
    "  whoami     → Fun one-liner",
    "  sudo hire me → 👀",
  ],
  about: ["✔ Loading about section..."],
  projects: ["✔ Loading projects section..."],
  skills: ["✔ Loading skills section..."],
  contact: ["✔ Loading contact section..."],
  "sudo hire me": ["✔ Request sent. Expect a call. 😄"],
};

export default function TerminalDemo({
  onCommand,
  onClear,
}: {
  onCommand?: (cmd: string) => void;
  onClear?: () => void;
}) {
  const terminalRef = useRef<TerminalRef>(null);
  const handleCommand = (cmd: string): string[] => {
    const lower = cmd.toLowerCase().trim();

    if (lower.startsWith("close ")) {
      const section = lower.replace("close ", "");
      onCommand?.(`close:${section}`);
      return [`✔ Closed ${section} section.`];
    }

    if (lower === "sudo hire me") {
      sudoHireMe.forEach((line, i) => {
        setTimeout(() => {
          terminalRef.current?.addLine(line)
        }, i * 700)
      })
      return []
    }

    if (lower === "whoami") {
      return [whoamiLines[Math.floor(Math.random() * whoamiLines.length)]]
    }

    if (commandMap[lower]) {
      onCommand?.(lower);
      return commandMap[lower];
    }

    return [`command not found: ${cmd}. Type 'help' for available commands.`];
  };

  return (
<Terminal ref={terminalRef} username="manuel-portfolio" onCommand={handleCommand} onClear={onClear} enableSound={true} />
  );
}