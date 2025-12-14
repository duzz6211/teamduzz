import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const shouldReduceMotion = useReducedMotion()

  // Use refs for smooth lerp animation
  const mousePos = useRef({ x: -100, y: -100 })
  const cursorPos = useRef({ x: -100, y: -100 })
  const dotRef = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)
  const rafId = useRef<number>()

  // Lerp function for smooth interpolation
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }

  // Check if device is mobile/touch
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 1024
      setIsMobile(isTouchDevice || isSmallScreen)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Animation loop with lerp
  const animate = useCallback(() => {
    // Lerp factor - lower = smoother but slower
    const dotLerp = 0.15
    const haloLerp = 0.08

    // Update cursor positions with lerp
    cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, dotLerp)
    cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, dotLerp)

    // Apply to dot
    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`
    }

    // Halo follows with more delay
    if (haloRef.current) {
      const haloX = lerp(parseFloat(haloRef.current.dataset.x || '-100'), mousePos.current.x, haloLerp)
      const haloY = lerp(parseFloat(haloRef.current.dataset.y || '-100'), mousePos.current.y, haloLerp)
      haloRef.current.dataset.x = String(haloX)
      haloRef.current.dataset.y = String(haloY)
      haloRef.current.style.transform = `translate3d(${haloX}px, ${haloY}px, 0) translate(-50%, -50%)`
    }

    rafId.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (isMobile || shouldReduceMotion) return

    rafId.current = requestAnimationFrame(animate)

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [isMobile, shouldReduceMotion, animate])

  const onMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY }
    if (!isVisible) setIsVisible(true)
  }, [isVisible])

  const onMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  const onMouseEnter = useCallback(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (isMobile || shouldReduceMotion) return

    // Add hover detection for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')

      setIsHovering(!!isInteractive)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [isMobile, shouldReduceMotion, onMouseMove, onMouseLeave, onMouseEnter])

  // Don't render on mobile/touch devices or if reduced motion is preferred
  if (isMobile || shouldReduceMotion) return null

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 0.5 : 1,
          }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-2 h-2 rounded-full bg-brand-primary"
          style={{
            boxShadow: isHovering
              ? '0 0 20px rgba(109, 40, 217, 0.6)'
              : '0 0 10px rgba(109, 40, 217, 0.4)',
          }}
        />
      </div>

      {/* Outer halo/ring */}
      <div
        ref={haloRef}
        data-x="-100"
        data-y="-100"
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform"
        style={{
          opacity: isVisible ? (isHovering ? 0.9 : 0.5) : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.5 : 1,
            borderWidth: isHovering ? '2px' : '1.5px',
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="w-8 h-8 rounded-full border-brand-primary/60"
          style={{
            borderStyle: 'solid',
            background: isHovering 
              ? 'radial-gradient(circle, rgba(109, 40, 217, 0.12) 0%, transparent 70%)'
              : 'transparent',
          }}
        />
      </div>
    </>
  )
}
