"use client";
import { Terminal } from "@/components/ui/terminal";

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
  whoami: ["Just a dev who makes things that shouldn't work, work."],
  "sudo hire me": ["✔ Request sent. Expect a call. 😄"],
};

export default function TerminalDemo({
  onCommand,
  onClear,
}: {
  onCommand?: (cmd: string) => void;
  onClear?: () => void;
}) {
  const handleCommand = (cmd: string): string[] => {
    const lower = cmd.toLowerCase().trim();

    if (lower.startsWith("close ")) {
      const section = lower.replace("close ", "");
      onCommand?.(`close:${section}`);
      return [`✔ Closed ${section} section.`];
    }

    if (commandMap[lower]) {
      onCommand?.(lower);
      return commandMap[lower];
    }

    return [`command not found: ${cmd}. Type 'help' for available commands.`];
  };

  return (
    <Terminal
      username="manuel-portfolio"
      onCommand={handleCommand}
      onClear={onClear}
      enableSound={true}
    />
  );
}