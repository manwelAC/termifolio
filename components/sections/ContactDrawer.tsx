"use client"

import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription
} from "@/components/ui/drawer"
import { FaGithub, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa"
import { SiGmail } from "react-icons/si"
import { IconType } from "react-icons"
import { useState } from "react"
import { CldImage } from 'next-cloudinary';

interface ContactDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type Social = {
  label: string
  handle: string
  href: string
  icon: IconType
  color: string
  preview: string | null
}

const socials: Social[] = [
  {
    label: "GitHub",
    handle: "@manwelAC",
    href: "https://github.com/manwelAC",
    icon: FaGithub,
    color: "hover:text-white",
    preview: "github-preview_uympbr",
  },
  {
    label: "LinkedIn",
    handle: "John Manuel A. Cuerdo",
    href: "https://linkedin.com/in/manwelAC",
    icon: FaLinkedin,
    color: "hover:text-sky-400",
    preview: "linkedin-preview_qga1rf",
  },
  {
    label: "Instagram",
    handle: "@manwel.ac",
    href: "https://instagram.com/manwel.ac",
    icon: FaInstagram,
    color: "hover:text-pink-400",
    preview: "instagram-preview_a9ygrw",
  },
  {
    label: "TikTok",
    handle: "@manwel.ac",
    href: "https://tiktok.com/@manwel.ac",
    icon: FaTiktok,
    color: "hover:text-white",
    preview: "tiktok-preview_iirhii",
  },
  {
    label: "Gmail",
    handle: "johnmanuelcuerdo@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=johnmanuelcuerdo@gmail.com&su=Let's%20Connect&body=Hi%20John,%0A%0AI'd%20like%20to%20discuss%20a%20potential%20project%20or%20collaboration.%0A%0ALooking%20forward%20to%20hearing%20from%20you!",
    icon: SiGmail,
    color: "hover:text-red-400",
    preview: null,
  },
]

export function ContactDrawer({ open, onOpenChange }: ContactDrawerProps) {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null)

  const socialsWithPreview = socials.filter((s): s is Social & { preview: string } => s.preview !== null)
  const hoveredSocial = socialsWithPreview.find((s) => s.label === hoveredLabel)

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
              <CldImage
                src={hoveredSocial.preview}
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

          {socials.map(({ label, handle, href, icon: Icon, color }) => (
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