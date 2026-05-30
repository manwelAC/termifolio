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
          My journey started with ERP and payroll solutions, and I've since deployed and
          supported <span className="text-white font-medium">10 live systems</span> that
          help businesses run more efficiently.
        </p>
      </BlurFade>

      <BlurFade delay={0.25 * 5} inView>
        <p className="text-base leading-relaxed text-white/70 font-sans">
          I specialize in{" "}
          <span className="text-white font-medium">RESTful API development</span>,{" "}
          <span className="text-white font-medium">database design</span>, and{" "}
          <span className="text-white font-medium">ERP architecture</span> — always
          connecting solid backend logic with clean, intuitive frontends. Whether it's
          automating payroll workflows or experimenting with mobile development using
          React Native, I enjoy building solutions that balance performance with usability.
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