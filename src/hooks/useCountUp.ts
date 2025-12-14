import { useEffect, useState } from 'react'

interface UseCountUpOptions {
  start?: number
  end: number
  duration?: number
  decimals?: number
  suffix?: string
  prefix?: string
  enabled?: boolean
}

export function useCountUp({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
  suffix = '',
  prefix = '',
  enabled = true,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    if (!enabled) {
      setCount(start)
      return
    }

    let startTime: number | null = null
    let animationFrameId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function (easeOutExpo)
      const easeOutExpo = 1 - Math.pow(2, -10 * progress)
      const currentValue = start + (end - start) * easeOutExpo
      
      setCount(Number(currentValue.toFixed(decimals)))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [start, end, duration, decimals, enabled])

  return `${prefix}${count}${suffix}`
}



