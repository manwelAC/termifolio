"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { CldImage } from 'next-cloudinary';

export type Project = {
  title: string;
  tagline: string;
  year: string;
  stack: string[];
  src: string;

  content: () => React.ReactNode;
};

const projects: Project[] = [
  {
    title: "Imajica - Booking System",
    tagline: "An Enterprise Web-based booking system for Aesthetic Company.",
    year: "2025",
    stack: ["PHP", "Laravel", "MySQL", "Javascript", "Bootstrap"],
    src: "imajica_ho8tqk",

    content: () => (
      <p>
        Imajica is an enterprise web-based booking system for an aesthetic company. It streamlines appointment scheduling, client management, and service tracking, providing a seamless experience for both staff and clients. Built with a focus on efficiency, security, and user-friendly design.
      </p>
    ),
  },
  {
    title: "Injap ",
    tagline: "call for unity",
    year: "2025",
    stack: ["PHP", "Laravel", "MySQL", "Javascript", "Bootstrap"],
    src: "injap_enm1wc",

    content: () => (
      <p>
        A Membership website for an organization, and streamlines selling of products inside their web system.
      </p>
    ),
  },
  {
    title: "Delibites",
    tagline: "A web-based HRIS - Payroll System for a food products company",
    year: "2026",
    stack: ["PHP", "Laravel", "MySQL", "Javascript", "Bootstrap"],
    src: "delibites_up2l62",

    content: () => (
      <p>
        Delibites Payroll System is a web-based Human Resource Information System (HRIS) designed for a food products company. It streamlines employee management, attendance tracking, and payroll processing, ensuring accurate and efficient handling of HR tasks while enhancing overall organizational productivity.
      </p>
    ),
  },
  {
    title: "Wingman - Personal Project",
    tagline: "Pilot Management Mobile Application",
    year: "2026",
    stack: ["React Native", "TypeScript", "Laravel", "RESTful API", "PostgreSQL"],
    src: "wingman_wiqbwo",

    content: () => (
      <p>
Wingman is a personal management tool designed for game boosters (pilots) to organize and track their boosting work in one place. Instead of managing everything manually, pilots can log their jobs, track progress, manage their customer list, and set their own pricing — all from a mobile app.
      </p>
    ),
  },

  {
    title: "Cuisining - School Project",
    tagline: "A Web Cooking Simulator with Learning Modules for Culinary Students",
    year: "2024",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    src: "cuisining_yawivu",
 
    content: () => (
      <p>
        Cuisining is a web-based cooking simulator designed for culinary students. It provides interactive learning modules that allow students to practice cooking techniques, experiment with recipes, and enhance their culinary skills in a virtual environment.
      </p>
    ),
  },

  {
    title: "RiCement - Thesis Project",
    tagline: "an IoT-Based Mobile Application built with React Native Expo",
    year: "2026",
    stack: ["React Native", "Expo", "Firebase", "Gemini Ai"],
    src: "ricement_jrxj7i",

    content: () => (
      <p>
        an IoT-Based Rice Husk Ash Production System with Mobile App Control for Sustainable Cement Additive Manufacturing with Gemini AI Integration. This project focuses on creating a sustainable solution for cement production by utilizing rice husk ash, an agricultural waste product, as an additive. The system includes IoT sensors to monitor the production process and a React Native Expo mobile application for real-time control and monitoring. Additionally, Gemini AI is integrated to optimize the production process and enhance efficiency.
      </p>
    ),
  }

];

export default function ExpandableCardDemo() {
  const [active, setActive] = useState<Project | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () => setActive(null));

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Expanded card */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-50 p-4">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[560px] bg-neutral-950 border border-neutral-700 rounded-xl overflow-hidden"
            >
              {/* Image */}
              <motion.div layoutId={`image-${active.title}-${id}`} className="relative">
              <CldImage
                src={active.src}
                alt={active.title}
                width={560}
                height={256}
                className="w-full h-64 object-cover object-top"
              />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent" />

                {/* Close button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActive(null)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                >
                  <CloseIcon />
                </motion.button>

                {/* Year badge over image */}
                <div className="absolute bottom-3 left-4">
                  <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                    {active.year}
                  </span>
                </div>
              </motion.div>

              {/* Body */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="text-2xl text-foreground font-normal leading-snug"
                      style={{ fontFamily: "Lora, serif" }}
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`tagline-${active.title}-${id}`}
                      className="text-sm italic text-muted-foreground mt-0.5"
                      style={{ fontFamily: "Lora, serif" }}
                    >
                      {active.tagline}
                    </motion.p>
                  </div>

                </div>

                {/* Stack pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {active.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded border border-neutral-800 text-neutral-500 bg-neutral-900"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="w-full h-px bg-neutral-800 mb-5" />

                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-muted-foreground leading-relaxed"
                  style={{ fontFamily: "Lora, serif" }}
                >
                  {active.content()}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <motion.div
            layoutId={`card-${project.title}-${id}`}
            key={project.title}
            onClick={() => setActive(project)}
            className="group relative border border-neutral-800 bg-neutral-900 rounded-lg overflow-hidden cursor-pointer hover:border-neutral-600 transition-all duration-300"
          >
            {/* Thumbnail */}
            <motion.div layoutId={`image-${project.title}-${id}`}>
            <CldImage
              src={project.src}
              alt={project.title}
              width={560}
              height={176}
              className="w-full h-44 object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            </motion.div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

            {/* Text at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-end justify-between">
                <div>
                  <motion.h3
                    layoutId={`title-${project.title}-${id}`}
                    className="text-base font-normal text-foreground leading-tight"
                    style={{ fontFamily: "Lora, serif" }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`tagline-${project.title}-${id}`}
                    className="text-xs italic text-muted-foreground mt-0.5"
                    style={{ fontFamily: "Lora, serif" }}
                  >
                    {project.tagline}
                  </motion.p>
                </div>
                <span className="font-mono text-[10px] text-neutral-600 group-hover:text-neutral-400 transition-colors">
                  {project.year}
                </span>
              </div>

              {/* Stack pills — shown on hover */}
              <div className="flex flex-wrap gap-1 mt-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[9px] tracking-wider uppercase px-1.5 py-0.5 rounded border border-neutral-700 text-neutral-500 bg-neutral-900/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

const CloseIcon = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.05 } }}
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);