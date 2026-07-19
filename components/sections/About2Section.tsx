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
    <div className={`w-full self-stretch overflow-hidden transition-all duration-700 ease-in-out ${
      animate ? "max-w-full opacity-100 lg:max-w-[400px]" : "max-w-0 opacity-0"
    }`}>
      <div className="h-full w-full overflow-y-auto rounded-lg border border-neutral-800 p-4 sm:p-6 lg:p-8">
        <Timeline />
      </div>
    </div>
  )
}
