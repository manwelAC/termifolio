"use client";

import React from "react";
import { motion } from "motion/react";
import { CldImage } from "next-cloudinary";

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
    title: "Balitaan",
    tagline: "presyo sa malapit.",
    year: "2026",
    stack: ["PHP", "Laravel", "PostgreSQL", "NextJs", "React", "Expo Go"],
    src: "fortermifolio-balitaan_fioh6i",
    content: () => (
      <p>
        Balitaan is a crowdsourced local price checker for Filipinos. It helps people answer: "What does this cost near me right now?" Users publish local price reports, browse nearby or personalized updates, and add community context through votes and comments.
      </p>
    ),
  },
  {
    title: "Imajica - Booking System",
    tagline: "An Enterprise Web-based booking system for Aesthetic Company.",
    year: "2025",
    stack: ["PHP", "Laravel", "MySQL", "Javascript", "Bootstrap"],
    src: "imajica_yuot3h",
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
    src: "injap_oudaiu",
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
    src: "delibites_a1rqc1",
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
        Wingman is a personal management tool designed for game boosters (pilots) to organize and track their boosting work in one place. Instead of managing everything manually, pilots can log their jobs, track progress, manage their customer list, and set their own pricing - all from a mobile app.
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
  },
];

export default function ExpandableCardDemo() {
  return (
    <div className="border-y border-neutral-800">
      <div className="flex items-center justify-between border-b border-neutral-800 py-3 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
        <span>Project index</span>
        <span>{String(projects.length).padStart(2, "0")} entries</span>
      </div>

      <div className="divide-y divide-neutral-800">
        {projects.map((project, index) => {
          const imageOnRight = index % 2 !== 0;

          return (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="group grid gap-6 py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-10"
            >
              <div className={imageOnRight ? "md:order-2" : undefined}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
                  <CldImage
                    src={project.src}
                    alt={`${project.title} project preview`}
                    fill
                    sizes="(min-width: 768px) 42vw, 100vw"
                    className="object-cover object-top grayscale-[35%] transition duration-500 group-hover:scale-[1.02] group-hover:grayscale-0"
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
                  <div className="absolute left-3 top-3 flex items-center gap-2 rounded bg-neutral-950/85 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-emerald-300 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    Project {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>

              <div className={imageOnRight ? "md:order-1" : undefined}>
                <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest">
                  <span className="text-purple-300">{project.year}</span>
                  <span className="h-px flex-1 bg-neutral-800" />
                </div>

                <h3
                  className="text-2xl font-normal leading-tight text-neutral-100 sm:text-3xl"
                  style={{ fontFamily: "Lora, serif" }}
                >
                  {project.title}
                </h3>
                <p
                  className="mt-1 text-sm italic text-neutral-400"
                  style={{ fontFamily: "Lora, serif" }}
                >
                  {project.tagline}
                </p>

                <div
                  className="mt-5 text-sm leading-relaxed text-neutral-400 [&_p]:m-0"
                  style={{ fontFamily: "Lora, serif" }}
                >
                  {project.content()}
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-neutral-800 bg-neutral-950 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-neutral-400 transition-colors group-hover:border-emerald-500/20 group-hover:text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
