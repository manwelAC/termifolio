"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const phrases = ["Manuel Cuerdo", "Fullstack Developer", "termiportfolio."];
const bootLabels = ["loading profile", "mounting workspace", "portfolio ready"];
const PHRASE_MS = 850;
const EXIT_MS = 500;

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (index < phrases.length - 1) {
      const t = setTimeout(() => setIndex((i) => i + 1), PHRASE_MS);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDone(true);
        setTimeout(onComplete, EXIT_MS);
      }, PHRASE_MS);
      return () => clearTimeout(t);
    }
  }, [index, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_MS / 1000, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-neutral-950 px-5"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(52,211,153,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.08)_1px,transparent_1px)] [background-size:40px_40px]"
          />

          <motion.div
            aria-hidden="true"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.9, 1.08, 0.9], opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-72 w-72 rounded-full border border-emerald-400/30"
          />
          <motion.div
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute h-56 w-56 rounded-full border border-dashed border-purple-400/25"
          />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative w-full max-w-md overflow-hidden rounded-lg border border-neutral-700 bg-neutral-900/95 shadow-2xl shadow-emerald-950/40 backdrop-blur"
          >
            <div className="flex h-10 items-center gap-2 border-b border-neutral-800 px-4">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-auto font-mono text-[10px] text-neutral-500">
                ~/termifolio
              </span>
            </div>

            <div className="p-5 font-mono sm:p-6">
              <div className="mb-7 flex items-center text-xs sm:text-sm">
                <span className="text-emerald-400">manuel@portfolio</span>
                <span className="text-neutral-500">:</span>
                <span className="text-purple-300">~</span>
                <span className="ml-2 text-neutral-200">./start</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  className="ml-1 h-4 w-1.5 bg-emerald-400"
                />
              </div>

              <div className="min-h-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <div className="mb-2 flex items-center gap-2 text-[10px] uppercase text-neutral-500">
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                      />
                      {bootLabels[index]}
                    </div>
                    <p
                      className="text-xl text-neutral-100 sm:text-2xl"
                      style={{ fontFamily: index === 0 ? "Lora, serif" : "monospace" }}
                    >
                      {phrases[index]}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-neutral-800">
                  <motion.div
                    animate={{ width: `${((index + 1) / phrases.length) * 100}%` }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="h-full rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.65)]"
                  />
                </div>
                <span className="w-8 text-right text-[10px] tabular-nums text-neutral-500">
                  {Math.round(((index + 1) / phrases.length) * 100)}%
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
