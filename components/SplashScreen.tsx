"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const phrases = ["Manuel Cuerdo", "Fullstack Developer", "termiportfolio."];

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (index < phrases.length - 1) {
      const t = setTimeout(() => setIndex((i) => i + 1), 3000);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDone(true);
        setTimeout(onComplete, 800);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [index]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-950"
        >
          <div className="text-center space-y-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-neutral-100"
                style={{
                  fontFamily: index === 0 ? "Lora, serif" : "monospace",
                  fontSize: index === 0 ? "2rem" : "0.875rem",
                  fontStyle: index === 1 ? "italic" : "normal",
                  letterSpacing: index === 2 ? "0.2em" : "normal",
                  color: index === 2 ? "#a3a3a3" : undefined,
                }}
              >
                {phrases[index]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}