import { useEffect, useState } from "react"
import { BlurFadeTextDemo } from "@/components/magic-blur-use"

interface AboutSectionProps {
  visible: boolean
}

export function AboutSection({ visible }: AboutSectionProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setAnimate(true), 50)
      return () => clearTimeout(t)
    }
  }, [visible])

  return (
    <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
      animate ? "max-w-[600px] opacity-100" : "max-w-0 opacity-0"
    }`}>
      <div className="w-[600px] p-8 border border-neutral-800 rounded-lg">
        <BlurFadeTextDemo />
      </div>
    </div>
  )
}