import { BlurFade } from "@/components/ui/blur-fade"

const timeline = [
  {
    date: "Aug 2022",
    title: "Hello, World.",
    subtitle: "University of Caloocan City",

  },
  {
    date: "May 2025 – Aug 2025",
    title: "Junior Fullstack Developer",
    subtitle: "Intracode IT Solutions · Internship",

  },
  {
    date: "Apr 27, 2026",
    title: "BS Computer Science",
    subtitle: "University of Caloocan City · Graduated",

  },
  {
    date: "Sept 2025 – June 2026",
    title: "Junior Fullstack Developer",
    subtitle: "Intracode IT Solutions · Full-time",
  },
  {
    date: "June 2026 – Present",
    title: "Junior System Developer",
    subtitle: "Ascendens Asia",
  }
]

export function Timeline() {
  return (
    <div className="relative pl-4">
      <div className="absolute left-0 top-2 h-full w-px bg-white/10" />
      <div className="space-y-6">
        {timeline.map((item, i) => (
          <BlurFade key={i} delay={0.25 + i * 0.15} inView>
            <div className="relative pl-4">
              <div className="absolute left-[-4.5px] top-[6px] h-2.5 w-2.5 rounded-full border border-white/30 bg-black" />
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-sans mb-0.5">
                {item.date}
              </p>
              <h3 className="text-sm font-bold text-white font-lora leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-white/50 font-sans mb-1">
                {item.subtitle}
              </p>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  )
}