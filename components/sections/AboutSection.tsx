import { useEffect, useState } from "react"
import { BlurFadeTextDemo } from "@/components/magic-blur-use"

interface AboutSectionProps {
  visible: boolean
}

export function AboutSection({ visible }: AboutSectionProps) {
  const [, setAnimate] = useState(false)

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setAnimate(true), 50)
      return () => clearTimeout(t)
    }
  }, [visible])

  return (
<div className="w-full min-w-0 flex-1">
  <div className="h-full rounded-lg border border-neutral-800 p-4 sm:p-6 lg:p-8">
    <BlurFadeTextDemo />
  </div>
</div>
  )
}
