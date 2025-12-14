import { useEffect, useState, useRef } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementHeight = rect.height

      // Calculate progress from when element enters viewport to when it leaves
      const startPoint = windowHeight // Element starts entering
      const endPoint = -elementHeight // Element finishes leaving

      const currentPosition = rect.top
      const totalDistance = startPoint - endPoint
      const currentProgress = (startPoint - currentPosition) / totalDistance

      setProgress(Math.max(0, Math.min(1, currentProgress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { ref, progress }
}



