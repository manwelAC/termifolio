import { useEffect, useState } from "react"
import { Timeline } from "@/components/sections/timeline"

interface About2SectionProps {
  visible: boolean
}

export function About2Section({ visible }: About2SectionProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setAnimate(true), 50)
      return () => clearTimeout(t)
    }
  }, [visible])

  return (
    <div className={`self-stretch overflow-hidden transition-all duration-700 ease-in-out ${
      animate ? "max-w-[400px] opacity-100" : "max-w-0 opacity-0"
    }`}>
      <div className="w-[400px] h-full p-8 border border-neutral-800 rounded-lg overflow-y-auto">
        <Timeline />
      </div>
    </div>
  )
}