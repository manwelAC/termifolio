"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { getCldImageUrl } from "next-cloudinary";

export function MagicCardDemo() {
  return (
    <aside className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
          Operator
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Online
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3">
          <AvatarCircles
            avatarUrls={[
              {
                imageUrl: getCldImageUrl({ src: "avatar_ukkhkw" }),
                profileUrl: "https://github.com/manwelAC",
              },
            ]}
          />
          <div className="min-w-0">
            <h2 className="truncate text-sm font-medium text-neutral-100">Manuel Cuerdo</h2>
            <p className="mt-0.5 font-mono text-[10px] text-purple-300">Fullstack Developer</p>
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-neutral-400">
          Building reliable systems that solve practical business problems.
        </p>

        <div className="mt-4 flex items-center gap-1.5 border-t border-neutral-800 pt-3 font-mono text-[9px] uppercase tracking-wider text-neutral-500">
          <MapPin className="h-3 w-3 text-emerald-400/70" />
          Caloocan City, PH
        </div>

        <Link
          href="https://github.com/manwelAC"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2.5 font-mono text-[10px] text-neutral-300 transition-colors hover:border-emerald-500/30 hover:text-emerald-300"
        >
          <FaGithub className="h-3.5 w-3.5" />
          View GitHub
        </Link>
      </div>
    </aside>
  );
}
