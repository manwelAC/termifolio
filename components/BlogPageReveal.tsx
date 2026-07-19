"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

export function BlogPageReveal({ children, className }: { children: ReactNode; className: string }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.main>
  );
}
