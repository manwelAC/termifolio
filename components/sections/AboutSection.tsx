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
<div className="flex-1 min-w-0">
  <div className="h-full p-8 border border-neutral-800 rounded-lg">
    <BlurFadeTextDemo />
  </div>
</div>
  )
}