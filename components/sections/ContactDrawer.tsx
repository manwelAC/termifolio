"use client"

import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription
} from "@/components/ui/drawer"
import { FaGithub, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa"
import { SiGmail } from "react-icons/si"
import Image from "next/image"
import { useState } from "react"

interface ContactDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const socials = [
  {
    label: "GitHub",
    handle: "@manwelAC",
    href: "https://github.com/manwelAC",
    icon: FaGithub,
    color: "hover:text-white",
    preview: "/previews/github-preview.png",
  },
  {
    label: "LinkedIn",
    handle: "John Manuel A. Cuerdo",
    href: "https://linkedin.com/in/manwelAC",
    icon: FaLinkedin,
    color: "hover:text-sky-400",
    preview: "/previews/linkedin-preview.png",
  },
  {
    label: "Instagram",
    handle: "@manwel.ac",
    href: "https://instagram.com/manwel.ac",
    icon: FaInstagram,
    color: "hover:text-pink-400",
    preview: "/previews/instagram-preview.png",
  },
  {
    label: "TikTok",
    handle: "@manwel.ac",
    href: "https://tiktok.com/@manwel.ac",
    icon: FaTiktok,
    color: "hover:text-white",
    preview: "/previews/tiktok-preview.png",
  },
  {
    label: "Gmail",
    handle: "johnmanuelcuerdo@gmail.com",
    href: "mailto:johnmanuelcuerdo@gmail.com",
    icon: SiGmail,
    color: "hover:text-red-400",
    preview: null, // no preview
  },
]

export function ContactDrawer({ open, onOpenChange }: ContactDrawerProps) {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null)

  const socialsWithPreview = socials.filter((s) => s.preview !== null)
  const hoveredSocial = socials.find((s) => s.label === hoveredLabel && s.preview)

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="flex flex-col h-full px-6 py-8 overflow-visible">

        <DrawerHeader className="p-0 mb-8">
          <p className="text-xs font-mono text-muted-foreground mb-3 tracking-widest uppercase">
            get in touch
          </p>
          <DrawerTitle
            className="text-3xl font-normal text-foreground leading-snug"
            style={{ fontFamily: "Lora, serif" }}
          >
            {"Let's build something"}
            <br />
            <span className="italic text-muted-foreground">worth remembering.</span>
          </DrawerTitle>
          <DrawerDescription
            className="mt-4 text-sm text-muted-foreground leading-relaxed"
            style={{ fontFamily: "Lora, serif" }}
          >
            {"Whether it's a project, a collaboration, or just a hello — I'm always open to a good conversation. Pick your platform."}
          </DrawerDescription>
        </DrawerHeader>

        <div className="w-full h-px bg-neutral-800 mb-8" />

        <div className="relative flex flex-col gap-3">

          {/* Floating preview */}
          <div
            className={`pointer-events-none absolute -left-72 w-64 rounded-xl border border-neutral-700 bg-neutral-900 shadow-2xl overflow-hidden transition-all duration-200 ${
              hoveredSocial ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
            }`}
            style={{
              top: hoveredSocial
                ? `${socialsWithPreview.indexOf(hoveredSocial) * 72}px`
                : "0px",
              transition: "opacity 150ms ease, top 200ms ease",
            }}
          >
            {hoveredSocial && (
              <Image
                src={hoveredSocial.preview!}
                alt={`${hoveredSocial.label} preview`}
                width={256}
                height={180}
                className="w-full object-cover"
              />
            )}
            <p className="text-[10px] font-mono text-neutral-500 text-center py-1.5">
              {hoveredSocial?.label}
            </p>
          </div>

          {socials.map(({ label, handle, href, icon: Icon, color, preview }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredLabel(label)}
              onMouseLeave={() => setHoveredLabel(null)}
              className={`group flex items-center gap-4 p-4 rounded-lg border border-neutral-800 bg-neutral-900 transition-all duration-200 hover:border-neutral-600 hover:bg-neutral-800 ${color}`}
            >
              <Icon className="w-5 h-5 text-neutral-400 transition-colors duration-200 group-hover:text-inherit" />
              <div className="flex flex-col">
                <span className="text-sm font-mono text-foreground">{label}</span>
                <span className="text-xs text-muted-foreground">{handle}</span>
              </div>
              <span className="ml-auto text-neutral-600 text-xs font-mono group-hover:text-neutral-400 transition-colors">
                ↗
              </span>
            </a>
          ))}
        </div>

        <p
          className="mt-auto pt-8 text-xs text-neutral-600 text-center"
          style={{ fontFamily: "Lora, serif" }}
        >
          Usually responds within a day.
        </p>

      </DrawerContent>
    </Drawer>
  )
}