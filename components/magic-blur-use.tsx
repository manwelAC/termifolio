import { BlurFade } from "@/components/ui/blur-fade"

export function BlurFadeTextDemo() {
  return (
    <section id="header" className="max-w-2xl space-y-6 py-12">

      <BlurFade delay={0.25} inView>
        <p className="text-sm uppercase tracking-widest text-white/50 font-sans">
          Caloocan City, Philippines
        </p>
      </BlurFade>

      <BlurFade delay={0.25 * 2} inView>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl xl:text-6xl font-lora">
          Hi, I'm John Manuel Cuerdo.
        </h1>
      </BlurFade>

      <BlurFade delay={0.25 * 3} inView>
        <h2 className="text-xl font-semibold text-white/80 sm:text-2xl font-lora italic">
          Junior Fullstack Developer — building systems that make work simpler and smarter.
        </h2>
      </BlurFade>

      <BlurFade delay={0.25 * 4} inView>
        <p className="text-base leading-relaxed text-white/70 font-sans">
          My journey started at <span className="text-white font-medium">Intracode IT Solutions</span>, 
          where I refactored and redesigned {" "} an Enterprise Booking System for an Aesthetic Company, improving performance and user experience. 
        </p>
      </BlurFade>

      <BlurFade delay={0.25 * 4.5} inView>
        <p className="text-base leading-relaxed text-white/70 font-sans">
         I transitioned into a <span className="text-white font-medium">Junior Fullstack Developer</span>, deploying and supporting <span className="text-white font-medium">10+ live Custom Web System and Payroll Solutions</span> that help businesses run smoothly.
        </p>
      </BlurFade>

   <BlurFade delay={0.25 * 5} inView>
  <p className="text-base leading-relaxed text-white/70 font-sans">
    Lately, I've been deepening my focus on{" "}
    <span className="text-white font-medium">System Architecture</span> and{" "}
    <span className="text-white font-medium">Database Design</span> — not just to write
    better backend code, but to build systems that are structured well enough for{" "}
    <span className="text-white font-medium">AI to reason about effectively</span>.
    The better the architecture, the more I can leverage AI as a real development tool —
    not just for boilerplate, but for meaningful problem-solving across the stack.
  </p>
</BlurFade>

      <BlurFade delay={0.25 * 6} inView>
        <p className="text-base leading-relaxed text-white/60 font-sans italic border-l-2 border-white/20 pl-4">
          At the heart of my work is curiosity — constantly learning, refining, and pushing
          myself to design systems that are not only functional but also user‑friendly.
        </p>
      </BlurFade>

    </section>
  )
}