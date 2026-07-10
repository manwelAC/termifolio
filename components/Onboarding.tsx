"use client";

import { motion } from "motion/react";
import { Terminal, LayoutGrid } from "lucide-react";

interface OnboardingProps {
  onSelect: (mode: "terminal" | "bento") => void;
}

export function Onboarding({ onSelect }: OnboardingProps) {
  return (
    <div className="fixed inset-0 z-[9990] flex flex-col items-center justify-center bg-neutral-950 px-4">
      {/* Title block */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12 max-w-xl"
      >
        <p className="font-mono text-xs tracking-widest text-neutral-500 uppercase mb-3">
          welcome to my portfolio
        </p>
        <h1
          className="text-4xl sm:text-5xl font-normal text-neutral-100 tracking-tight"
          style={{ fontFamily: "Lora, serif" }}
        >
          Choose your <span className="italic text-neutral-400">experience.</span>
        </h1>
        <p className="mt-4 font-mono text-xs text-neutral-500 leading-relaxed">
          Select how you want to explore my projects, background, and skills.
        </p>
      </motion.div>

      {/* Choice grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Terminal Option */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          onClick={() => onSelect("terminal")}
          className="group relative cursor-pointer overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40 p-8 transition-all duration-300 hover:border-neutral-500 hover:bg-neutral-900/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]"
        >
          <div className="absolute inset-0 bg-radial-gradient from-neutral-800/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          <div className="relative flex flex-col h-full justify-between gap-8">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-400 group-hover:text-neutral-200 transition-colors">
                <Terminal className="h-6 w-6" />
              </div>
              <h2
                className="text-2xl font-normal text-neutral-100"
                style={{ fontFamily: "Lora, serif" }}
              >
                Terminal Workspace
              </h2>
              <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                An interactive CLI interface where you type command keywords to trigger section overlays, view status logs, and execute queries.
              </p>
            </div>
            
            <div className="font-mono text-[10px] tracking-wider text-neutral-500 group-hover:text-neutral-300 transition-colors uppercase pt-4 border-t border-neutral-900">
              best for: developers & keyboard users &gt;_
            </div>
          </div>
        </motion.div>

        {/* Bento Grid Option */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          onClick={() => onSelect("bento")}
          className="group relative cursor-pointer overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40 p-8 transition-all duration-300 hover:border-neutral-500 hover:bg-neutral-900/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]"
        >
          <div className="absolute inset-0 bg-radial-gradient from-neutral-800/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative flex flex-col h-full justify-between gap-8">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-400 group-hover:text-neutral-200 transition-colors">
                <LayoutGrid className="h-6 w-6" />
              </div>
              <h2
                className="text-2xl font-normal text-neutral-100"
                style={{ fontFamily: "Lora, serif" }}
              >
                Bento Grid Showcase
              </h2>
              <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                A modern visual layout displaying all information at a glance. Features rich, interactive project cards, skills list, and a clean timeline.
              </p>
            </div>

            <div className="font-mono text-[10px] tracking-wider text-neutral-500 group-hover:text-neutral-300 transition-colors uppercase pt-4 border-t border-neutral-900">
              best for: visual & quick reading view
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-6 font-mono text-[10px] tracking-widest text-neutral-500 uppercase"
      >
        designed by manuel cuerdo
      </motion.p>
    </div>
  );
}
