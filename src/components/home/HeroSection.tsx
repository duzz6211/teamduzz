import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Button from '../ui/Button'
import { useInView } from '../../hooks/useInView'
import { useCountUp } from '../../hooks/useCountUp'
import { heroVariants, parallaxConfig, easing, duration } from '../../utils/motionTokens'

// ========== Liquid Blob 설정 ==========

interface BlobConfig {
  id: number
  x: string
  y: string
  size: number
}

const BLOB_CONFIGS: BlobConfig[] = [
  { id: 1, x: '12%', y: '18%', size: 140 },
  { id: 2, x: '78%', y: '12%', size: 180 },
  { id: 3, x: '88%', y: '55%', size: 120 },
  { id: 4, x: '8%', y: '72%', size: 160 },
  { id: 5, x: '55%', y: '82%', size: 100 },
  { id: 6, x: '32%', y: '28%', size: 90 },
  { id: 7, x: '65%', y: '38%', size: 110 },
]

// 반응 임계 거리
const HOVER_THRESHOLD = 180
const TOUCH_THRESHOLD = 120 // 모바일은 더 민감하게

// 연보라 색상
const BLOB_COLOR = 'rgba(167, 139, 250, 1)'
const BLOB_STROKE_COLOR = 'rgba(139, 92, 246, 0.3)'

// ========== 유틸리티 ==========

function isTouchDevice() {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

// ========== Floating Blob ==========

interface FloatingBlobProps {
  config: BlobConfig
  isHovered: boolean
}

function FloatingBlob({ config, isHovered }: FloatingBlobProps) {
  const getOrganicRadius = () => {
    if (!isHovered) return '50%'
    return '47% 53% 51% 49% / 51% 49% 53% 47%'
  }

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: config.x,
        top: config.y,
        width: config.size,
        height: config.size,
        transform: `translate(-50%, -50%) scale(${isHovered ? 1.12 : 1})`,
        backgroundColor: BLOB_COLOR,
        opacity: isHovered ? 0.26 : 0.2,
        borderRadius: getOrganicRadius(),
        filter: 'blur(2px)',
        boxShadow: `0 0 0 1px ${BLOB_STROKE_COLOR}, 0 0 30px 5px rgba(167, 139, 250, 0.15)`,
        transition: isHovered
          ? 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms ease-out, border-radius 800ms cubic-bezier(0.25, 1, 0.5, 1)'
          : 'transform 900ms cubic-bezier(0.4, 0, 0.2, 1), opacity 600ms ease-in, border-radius 1000ms cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform, opacity, border-radius',
      }}
    />
  )
}

// ========== Halo Cursor (데스크톱 only) ==========

interface HaloCursorProps {
  x: number
  y: number
  isNearBlob: boolean
}

function HaloCursor({ x, y, isNearBlob }: HaloCursorProps) {
  return (
    <div
      className="fixed pointer-events-none"
      style={{
        left: x,
        top: y,
        width: isNearBlob ? 48 : 40,
        height: isNearBlob ? 48 : 40,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        backgroundColor: 'rgba(139, 92, 246, 0.12)',
        border: `1.5px solid rgba(167, 139, 250, ${isNearBlob ? 0.5 : 0.35})`,
        boxShadow: isNearBlob
          ? '0 0 20px 4px rgba(139, 92, 246, 0.2)'
          : '0 0 12px 2px rgba(139, 92, 246, 0.1)',
        transition: 'width 300ms ease-out, height 300ms ease-out, border-color 300ms ease-out, box-shadow 300ms ease-out',
        zIndex: 9990,
        willChange: 'transform, width, height',
      }}
    />
  )
}

// ========== Stat Item ==========

interface StatItemProps {
  value: number
  suffix: string
  label: string
  decimals?: number
  enabled: boolean
  index: number
}

function StatItem({ value, suffix, label, decimals = 0, enabled, index }: StatItemProps) {
  const count = useCountUp({
    end: value,
    duration: 2500,
    decimals,
    enabled,
  })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="text-center"
      variants={heroVariants.stat}
      custom={index}
      style={{
        transitionDelay: shouldReduceMotion ? '0ms' : `${index * 100}ms`,
      }}
    >
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
        {count}
        <span className="text-brand-muted">{suffix}</span>
      </div>
      <div className="text-white/70 text-sm md:text-base">{label}</div>
    </motion.div>
  )
}

// ========== Hero Section ==========

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const blobContainerRef = useRef<HTMLDivElement>(null)
  const { ref: statsRef, isInView: statsInView } = useInView<HTMLDivElement>({ threshold: 0.5 })
  const [hasAnimated, setHasAnimated] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // 터치 디바이스 여부
  const [isTouch, setIsTouch] = useState(false)

  // 마우스/터치 위치
  const [pointerPos, setPointerPos] = useState({ x: -1000, y: -1000 })
  // Halo 위치 (lerp)
  const [haloPos, setHaloPos] = useState({ x: -1000, y: -1000 })
  // 근접 여부
  const [isNearBlob, setIsNearBlob] = useState(false)
  // 호버된 blob
  const [hoveredBlobId, setHoveredBlobId] = useState<number | null>(null)
  // 컨테이너
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const bgY1 = useTransform(scrollYProgress, [0, 1], ['0%', `${parallaxConfig.slow * 100}%`])
  const bgY2 = useTransform(scrollYProgress, [0, 1], ['0%', `${parallaxConfig.medium * 100}%`])
  const bgY3 = useTransform(scrollYProgress, [0, 1], ['0%', `${parallaxConfig.fast * 100}%`])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // 터치 디바이스 감지
  useEffect(() => {
    setIsTouch(isTouchDevice())
  }, [])

  // Lerp
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }

  // Halo lerp 애니메이션 (데스크톱에서만)
  useEffect(() => {
    if (isTouch || shouldReduceMotion) return

    let animationId: number
    const animate = () => {
      setHaloPos((prev) => ({
        x: lerp(prev.x, pointerPos.x, 0.15),
        y: lerp(prev.y, pointerPos.y, 0.15),
      }))
      animationId = requestAnimationFrame(animate)
    }
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [pointerPos, isTouch, shouldReduceMotion])

  // 포인터 위치로 가장 가까운 blob 찾기
  const findClosestBlob = useCallback((clientX: number, clientY: number, threshold: number) => {
    if (!blobContainerRef.current) return null

    const rect = blobContainerRef.current.getBoundingClientRect()
    setContainerRect(rect)

    const localX = clientX - rect.left
    const localY = clientY - rect.top

    let minDistance = Infinity
    let closestId: number | null = null

    BLOB_CONFIGS.forEach((config) => {
      const blobX = (parseFloat(config.x) / 100) * rect.width
      const blobY = (parseFloat(config.y) / 100) * rect.height
      const distance = Math.sqrt(Math.pow(localX - blobX, 2) + Math.pow(localY - blobY, 2))

      if (distance < minDistance && distance < threshold) {
        minDistance = distance
        closestId = config.id
      }
    })

    return closestId
  }, [])

  // 마우스 이동 핸들러 (데스크톱)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isTouch) return

    setPointerPos({ x: e.clientX, y: e.clientY })
    const closestId = findClosestBlob(e.clientX, e.clientY, HOVER_THRESHOLD)
    setHoveredBlobId(closestId)
    setIsNearBlob(closestId !== null)
  }, [isTouch, findClosestBlob])

  // 마우스 벗어남
  const handleMouseLeave = useCallback(() => {
    if (isTouch) return
    setPointerPos({ x: -1000, y: -1000 })
    setHoveredBlobId(null)
    setIsNearBlob(false)
  }, [isTouch])

  // 터치 시작/이동 (모바일)
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isTouch) return

    const touch = e.touches[0]
    if (!touch) return

    const closestId = findClosestBlob(touch.clientX, touch.clientY, TOUCH_THRESHOLD)
    setHoveredBlobId(closestId)
  }, [isTouch, findClosestBlob])

  // 터치 종료
  const handleTouchEnd = useCallback(() => {
    // 약간의 딜레이 후 복원 (더 자연스러운 느낌)
    setTimeout(() => {
      setHoveredBlobId(null)
    }, 150)
  }, [])

  // 이벤트 리스너
  useEffect(() => {
    if (shouldReduceMotion) return

    const container = blobContainerRef.current
    if (!container) return

    if (isTouch) {
      // 모바일: 터치 이벤트
      container.addEventListener('touchmove', handleTouchMove, { passive: true })
      container.addEventListener('touchend', handleTouchEnd)
      container.addEventListener('touchcancel', handleTouchEnd)
    } else {
      // 데스크톱: 마우스 이벤트
      document.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (isTouch) {
        container.removeEventListener('touchmove', handleTouchMove)
        container.removeEventListener('touchend', handleTouchEnd)
        container.removeEventListener('touchcancel', handleTouchEnd)
      } else {
        document.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [isTouch, shouldReduceMotion, handleMouseMove, handleMouseLeave, handleTouchMove, handleTouchEnd])

  useEffect(() => {
    if (statsInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [statsInView, hasAnimated])

  const stats = [
    { value: 100, suffix: '+', label: '완료 프로젝트', decimals: 0 },
    { value: 5.0, suffix: '', label: '고객 만족도 ★★★★★', decimals: 1 },
    { value: 5, suffix: '년차', label: '운영 연차', decimals: 0 },
  ]

  const containerVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : heroVariants.container

  const itemVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : heroVariants.item

  const badgeVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : heroVariants.badge

  // Halo 표시 조건 (데스크톱 + Hero 영역 내)
  const showHalo = !isTouch && !shouldReduceMotion && containerRect &&
    haloPos.x >= containerRect.left &&
    haloPos.x <= containerRect.right &&
    haloPos.y >= containerRect.top &&
    haloPos.y <= containerRect.bottom

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Liquid Floating Blobs */}
      <div 
        ref={blobContainerRef}
        className="absolute inset-0 overflow-hidden"
        style={{ zIndex: 1, touchAction: 'pan-y' }}
      >
        {BLOB_CONFIGS.map((config) => (
          <FloatingBlob
            key={config.id}
            config={config}
            isHovered={hoveredBlobId === config.id}
          />
        ))}
      </div>

      {/* Halo Cursor (데스크톱 only) */}
      {showHalo && (
        <HaloCursor x={haloPos.x} y={haloPos.y} isNearBlob={isNearBlob} />
      )}

      {/* Parallax decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-[60%] h-[60%] rounded-full"
          style={{
            y: shouldReduceMotion ? 0 : bgY1,
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 w-[50%] h-[50%] rounded-full"
          style={{
            y: shouldReduceMotion ? 0 : bgY2,
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40%] h-[40%] rounded-full"
          style={{
            y: shouldReduceMotion ? 0 : bgY3,
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.12) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />
        
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="container-custom relative z-10 py-32 md:py-40"
        style={{ opacity: shouldReduceMotion ? 1 : contentOpacity }}
      >
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={badgeVariants} className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium border border-white/10">
              역할 기반 전문 개발팀
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
          >
            신뢰로 완성되는 웹,
            <br />
            <span className="text-brand-muted">Team Duzz</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            기획부터 유지보수까지 책임지는 역할 기반 전문 개발팀.
            <br className="hidden md:block" />
            홈페이지 제작, 랜딩페이지, 기업 웹사이트를 신뢰로 완성합니다.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button href="/contact" size="lg">
              프로젝트 문의하기
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <Button 
              href="/services" 
              variant="secondary" 
              size="lg" 
              className="!border-white/40 !text-white hover:!bg-white hover:!text-brand-primary hover:!border-white"
            >
              서비스 살펴보기
            </Button>
          </motion.div>

          <motion.div
            ref={statsRef}
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 md:gap-12 max-w-2xl mx-auto pt-8 border-t border-white/10"
          >
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                decimals={stat.decimals}
                enabled={hasAnimated}
                index={index}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: duration.slow, ease: easing.smooth }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-3 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
