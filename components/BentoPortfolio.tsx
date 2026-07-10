"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Terminal, 
  Mail, 
  ArrowLeft, 
  ExternalLink, 
  Code2, 
  Database, 
  Globe, 
  Cpu, 
  FileText 
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Timeline } from "@/components/sections/timeline";
import ExpandableCardDemo from "@/components/expandable-card-demo-grid";
import { CldImage } from "next-cloudinary";

const skills = {
  Languages: ["PHP", "JavaScript", "TypeScript"],
  Frontend: ["React", "React Native", "Next.js", "Bootstrap", "Angular"],
  Backend: ["Laravel", "Node.js"],
  Database: ["MySQL", "PostgreSQL", "Firebase"],
  "DevOps & Tools": ["Vercel", "Bitbucket", "GitHub", "Laravel Cloud", "Jira"],
};

interface BentoPortfolioProps {
  onBackToOnboarding: () => void;
  onOpenContact: () => void;
  onSwitchToTerminal: () => void;
}

export function BentoPortfolio({ onBackToOnboarding, onOpenContact, onSwitchToTerminal }: BentoPortfolioProps) {
  const [localTime, setLocalTime] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Update local time for Caloocan City (UTC+8)
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Manila",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };
      setLocalTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-emerald-500 to-purple-500 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />
      {/* Background Dot Matrix Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Ambient Radial Color Blobs */}
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[150px] pointer-events-none" />

      {/* Navigation Header */}
      <div className="relative z-10 w-full max-w-6xl flex justify-between items-center mb-12">
        <button
          onClick={onBackToOnboarding}
          className="flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-neutral-100 transition-all py-2 px-4 rounded-lg border border-neutral-800 bg-neutral-950/80 hover:bg-neutral-900 hover:border-neutral-700 backdrop-blur"
        >
          <ArrowLeft className="h-4 w-4" />
          Change Experience
        </button>

        <button
          onClick={onSwitchToTerminal}
          className="flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-neutral-100 transition-all py-2 px-4 rounded-lg border border-neutral-800 bg-neutral-950/80 hover:bg-neutral-900 hover:border-neutral-700 backdrop-blur"
        >
          <Terminal className="h-4 w-4" />
          Terminal Mode
        </button>
      </div>

      {/* Bento Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        
        {/* Profile Card (2 columns wide) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-2 rounded-2xl border border-neutral-800 bg-neutral-900/10 backdrop-blur-md p-8 flex flex-col md:flex-row gap-8 items-start hover:border-neutral-600/50 hover:bg-neutral-900/20 hover:shadow-[0_0_50px_-12px_rgba(255,255,255,0.02)] transition-all duration-300 group"
        >
          {/* Avatar Container */}
          <div className="relative h-24 w-24 shrink-0 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 transition-transform duration-300 group-hover:scale-105 group-hover:border-neutral-700">
            <CldImage
              src="avatar_ukkhkw"
              alt="Manuel Cuerdo"
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>

          {/* Intro Text */}
          <div className="space-y-4 w-full">
            <div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest mb-2">
                <span className="text-emerald-500/80">📍 Caloocan City, PH</span>
                <span className="text-neutral-600">•</span>
                <span className="text-neutral-400 font-medium">{localTime || "11:50 AM"}</span>
                <span className="text-neutral-600">•</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available
                </span>
              </div>
              <h1 
                className="text-3xl sm:text-4xl font-normal text-neutral-100 leading-tight"
                style={{ fontFamily: "Lora, serif" }}
              >
                John Manuel Cuerdo
              </h1>
              <p 
                className="text-lg text-neutral-400 font-normal mt-1 italic"
                style={{ fontFamily: "Lora, serif" }}
              >
                Junior Fullstack Developer & System Architect
              </p>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed font-sans">
              I build systems that make work simpler and smarter. Experienced in refactoring enterprise aesthetic systems, creating custom payroll solutions, and deploying web systems that businesses rely on. Focused on database design, system architecture, and robust clean APIs.
            </p>
          </div>
        </motion.div>

        {/* Contact/Connect Quick Card (1 column wide) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-neutral-800 bg-neutral-900/10 backdrop-blur-md p-8 flex flex-col justify-between hover:border-emerald-500/20 hover:bg-neutral-900/20 hover:shadow-[0_0_50px_-12px_rgba(16,185,129,0.1)] transition-all duration-300"
        >
          <div className="space-y-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-500/80">
              Get in touch
            </p>
            <h3 
              className="text-2xl font-normal text-neutral-100"
              style={{ fontFamily: "Lora, serif" }}
            >
              Let&apos;s build something <span className="italic text-neutral-400">great.</span>
            </h3>
            <p className="text-xs font-mono text-neutral-400 leading-relaxed">
              Open for fullstack roles, database design consulting, or collaborations.
            </p>
          </div>

          <div className="space-y-3 pt-6">
            <button
              onClick={onOpenContact}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-mono text-xs text-neutral-950 bg-neutral-100 hover:bg-neutral-200 transition-all font-semibold hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <Mail className="h-4 w-4" />
              Contact Drawer
            </button>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://github.com/manwelAC"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 hover:border-neutral-700 transition-colors font-mono text-xs text-neutral-400 hover:text-neutral-100"
              >
                <FaGithub className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 hover:border-neutral-700 transition-colors font-mono text-xs text-neutral-400 hover:text-neutral-100"
              >
                <ExternalLink className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>

        {/* Skills Grid Card (2 columns wide) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="md:col-span-2 rounded-2xl border border-neutral-800 bg-neutral-900/10 backdrop-blur-md p-8 space-y-6 hover:border-neutral-600/50 hover:bg-neutral-900/20 hover:shadow-[0_0_50px_-12px_rgba(255,255,255,0.02)] transition-all duration-300"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-1">
              technical stack
            </p>
            <h2 
              className="text-2xl font-normal text-neutral-100"
              style={{ fontFamily: "Lora, serif" }}
            >
              Things I build <span className="italic text-neutral-400">with.</span>
            </h2>
          </div>

          <div className="w-full h-px bg-neutral-800" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="space-y-3">
                <p className="font-mono text-[10px] tracking-widest text-emerald-500/80 uppercase flex items-center gap-1.5">
                  {category === "Languages" && <Code2 className="h-3 w-3" />}
                  {category === "Frontend" && <Globe className="h-3 w-3" />}
                  {category === "Backend" && <Cpu className="h-3 w-3" />}
                  {category === "Database" && <Database className="h-3 w-3" />}
                  {category === "DevOps & Tools" && <FileText className="h-3 w-3" />}
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[11px] tracking-wider uppercase px-2.5 py-1 rounded border border-neutral-800 text-neutral-400 bg-neutral-950/60 hover:border-emerald-500/30 hover:text-neutral-100 transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Experience Timeline (1 column wide) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-2xl border border-neutral-800 bg-neutral-900/10 backdrop-blur-md p-8 space-y-6 hover:border-purple-500/20 hover:bg-neutral-900/20 hover:shadow-[0_0_50px_-12px_rgba(168,85,247,0.1)] transition-all duration-300"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-1">
              journey
            </p>
            <h2 
              className="text-2xl font-normal text-neutral-100"
              style={{ fontFamily: "Lora, serif" }}
            >
              Timeline
            </h2>
          </div>

          <div className="w-full h-px bg-neutral-800" />

          <div className="h-[380px] overflow-y-auto pr-2 custom-scrollbar">
            <Timeline />
          </div>
        </motion.div>

        {/* Selected Work / Projects (3 columns wide) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="md:col-span-3 rounded-2xl border border-neutral-800 bg-neutral-900/10 backdrop-blur-md p-8 space-y-6 hover:border-purple-500/20 hover:bg-neutral-900/20 hover:shadow-[0_0_50px_-12px_rgba(168,85,247,0.1)] transition-all duration-300"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-1">
              portfolio
            </p>
            <h2 
              className="text-3xl font-normal text-neutral-100"
              style={{ fontFamily: "Lora, serif" }}
            >
              Selected Work <span className="italic text-neutral-400">with care.</span>
            </h2>
            <p className="text-sm font-sans text-neutral-400 mt-2">
              Click any project card to view stack details and summary write-ups.
            </p>
          </div>

          <div className="w-full h-px bg-neutral-800" />
          
          <ExpandableCardDemo />
        </motion.div>
      </div>
    </div>
  );
}
