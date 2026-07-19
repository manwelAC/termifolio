"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Grid3X3, Sparkles, Terminal } from "lucide-react";

interface OnboardingProps {
  onSelect: (mode: "terminal" | "bento") => void;
}

const bootLines = [
  "$ whoami",
  "manuel cuerdo",
  "$ stack --focus",
  "laravel  next.js  react-native  sql",
  "$ open portfolio",
  "ready",
];

const skills = ["API", "UI", "DB", "IoT"];

export function Onboarding({ onSelect }: OnboardingProps) {
  const [activeMode, setActiveMode] = useState<"terminal" | "bento">("bento");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "1") {
        setActiveMode("terminal");
        onSelect("terminal");
      }

      if (event.key === "2") {
        setActiveMode("bento");
        onSelect("bento");
      }

      if (event.key === "Enter") {
        onSelect(activeMode);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMode, onSelect]);

  return (
    <main className="fixed inset-0 z-[9990] overflow-hidden bg-neutral-950 text-neutral-100">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-emerald-400/10 via-emerald-400/4 to-transparent"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center gap-8 px-4 py-8 sm:px-6 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-md border border-emerald-400/20 bg-emerald-400/5 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-emerald-300">
            portfolio initialized
          </div>

          <div className="space-y-4">
            <h1
              className="max-w-2xl text-4xl font-normal leading-[1.05] text-neutral-100 sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "Lora, serif" }}
            >
              Pick a path.
              <span className="block italic text-neutral-400">I&apos;ll make it quick.</span>
            </h1>
            <p className="max-w-md text-sm leading-6 text-neutral-400">
              Start with a command-line playground or jump straight into the visual portfolio.
            </p>
          </div>

          <div className="grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onMouseEnter={() => setActiveMode("terminal")}
              onFocus={() => setActiveMode("terminal")}
              onClick={() => onSelect("terminal")}
              className="group flex min-h-24 items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900/60 p-4 text-left transition-all duration-300 hover:border-emerald-400/60 hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
            >
              <span>
                <span className="flex items-center gap-2 font-mono text-xs text-neutral-100">
                  <Terminal className="h-4 w-4 text-emerald-300" />
                  Terminal
                </span>
                <span className="mt-2 block font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  type, trigger, explore
                </span>
              </span>
              <ArrowRight className="h-4 w-4 text-neutral-600 transition-transform group-hover:translate-x-1 group-hover:text-emerald-300" />
            </button>

            <button
              type="button"
              onMouseEnter={() => setActiveMode("bento")}
              onFocus={() => setActiveMode("bento")}
              onClick={() => onSelect("bento")}
              className="group flex min-h-24 items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900/60 p-4 text-left transition-all duration-300 hover:border-purple-400/60 hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
            >
              <span>
                <span className="flex items-center gap-2 font-mono text-xs text-neutral-100">
                  <Grid3X3 className="h-4 w-4 text-purple-300" />
                  Bento
                </span>
                <span className="mt-2 block font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  scan, click, connect
                </span>
              </span>
              <ArrowRight className="h-4 w-4 text-neutral-600 transition-transform group-hover:translate-x-1 group-hover:text-purple-300" />
            </button>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
            Press 1 for terminal, 2 for bento, or Enter to launch {activeMode}.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
          className="relative min-h-[380px] rounded-lg border border-neutral-800 bg-neutral-950/90 p-3 shadow-2xl shadow-black/40"
        >
          <div className="flex items-center gap-2 border-b border-neutral-800 px-2 pb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-neutral-600">
              {activeMode}.preview
            </span>
          </div>

          <div className="grid min-h-[330px] grid-cols-1 gap-3 pt-3 md:grid-cols-[1fr_0.9fr]">
            <motion.div
              animate={{
                opacity: activeMode === "terminal" ? 1 : 0.55,
                scale: activeMode === "terminal" ? 1 : 0.98,
              }}
              transition={{ duration: 0.25 }}
              className="rounded-md border border-neutral-800 bg-neutral-900/70 p-4 font-mono text-xs"
            >
              <div className="space-y-2">
                {bootLines.map((line, index) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.18 + index * 0.1 }}
                    className={line.startsWith("$") ? "text-emerald-300" : "text-neutral-400"}
                  >
                    {line}
                    {index === bootLines.length - 1 && (
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="ml-1 inline-block h-3 w-1.5 bg-neutral-300 align-middle"
                      />
                    )}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            <motion.div
              animate={{
                opacity: activeMode === "bento" ? 1 : 0.55,
                scale: activeMode === "bento" ? 1 : 0.98,
              }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 gap-3"
            >
              <div className="col-span-2 rounded-md border border-neutral-800 bg-neutral-900/70 p-4">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-11 w-11 rounded-md border border-neutral-700 bg-gradient-to-br from-neutral-700 to-neutral-950" />
                  <div className="space-y-2">
                    <div className="h-2 w-28 rounded-full bg-neutral-300" />
                    <div className="h-2 w-20 rounded-full bg-neutral-700" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-neutral-700" />
                  <div className="h-2 w-4/5 rounded-full bg-neutral-800" />
                </div>
              </div>

              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.35 + index * 0.08 }}
                  className="rounded-md border border-neutral-800 bg-neutral-900/70 p-4"
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                    {skill}
                  </p>
                  <div className="mt-4 h-1.5 rounded-full bg-neutral-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${55 + index * 12}%` }}
                      transition={{ duration: 0.8, delay: 0.45 + index * 0.08 }}
                      className={index % 2 === 0 ? "h-full rounded-full bg-emerald-400" : "h-full rounded-full bg-purple-400"}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
