import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const rafId = useRef<number>()
  const lastScrollY = useRef(0)
  const shouldReduceMotion = useReducedMotion()

  // Throttled scroll handler using requestAnimationFrame
  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    
    setProgress(scrollProgress)
    setIsVisible(scrollTop > 100)
    lastScrollY.current = scrollTop
    rafId.current = undefined
  }, [])

  const handleScroll = useCallback(() => {
    if (rafId.current) return
    rafId.current = requestAnimationFrame(updateProgress)
  }, [updateProgress])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initial update
    updateProgress()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [handleScroll, updateProgress])

  if (shouldReduceMotion) {
    return (
      <div
        className="fixed top-0 left-0 right-0 z-[100] h-0.5"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <div
          className="h-full bg-brand-primary"
          style={{ width: `${progress}%` }}
        />
      </div>
    )
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Main progress bar */}
      <motion.div
        className="h-full origin-left"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #6d28d9 0%, #8b5cf6 50%, #a78bfa 100%)',
        }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />
      {/* Subtle glow effect */}
      <motion.div
        className="absolute top-0 h-full origin-left opacity-40 blur-[2px]"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #6d28d9 0%, #8b5cf6 50%, #a78bfa 100%)',
        }}
      />
      {/* Leading edge glow */}
      <motion.div
        className="absolute top-0 w-8 h-full"
        style={{
          left: `${Math.max(0, progress - 2)}%`,
          opacity: progress > 2 ? 1 : 0,
          background: 'linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.6), transparent)',
          filter: 'blur(4px)',
        }}
      />
    </motion.div>
  )
}
