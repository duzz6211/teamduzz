import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 카카오톡 채널 URL
const KAKAO_CHANNEL_URL = 'http://pf.kakao.com/_kJxbQn'
const EMAIL_ADDRESS = 'teamduzzforyou@gmail.com'

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Show button after initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close panel on ESC key
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  const toggleOpen = () => setIsOpen(!isOpen)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20,
      transition: { duration: 0.2 }
    }
  }

  const panelVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 10,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      y: 10,
      transition: { duration: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.2 }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8"
        >
          {/* Action Panel */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute bottom-16 right-0 mb-3"
                role="menu"
                aria-label="문의 방법 선택"
              >
                <div className="bg-white rounded-2xl shadow-card-hover border border-neutral-100 p-2 min-w-[200px]">
                  {/* 카카오톡 문의 */}
                  <motion.a
                    variants={itemVariants}
                    href={KAKAO_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-700 hover:bg-brand-light hover:text-brand-primary transition-all duration-200 group"
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#FEE500] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <svg className="w-5 h-5 text-[#3C1E1E]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.757 1.834 5.179 4.59 6.544-.158.586-.51 2.12-.583 2.451-.094.42.155.414.326.301.134-.088 2.136-1.453 3.004-2.037.868.123 1.765.188 2.663.188 5.523 0 10-3.463 10-7.447C22 6.463 17.523 3 12 3z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">카카오톡 문의</p>
                      <p className="text-xs text-neutral-500 group-hover:text-brand-primary/70">실시간 채팅 상담</p>
                    </div>
                    <svg className="w-4 h-4 text-neutral-400 group-hover:text-brand-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.a>

                  {/* 구분선 */}
                  <div className="mx-4 my-1 h-px bg-neutral-100" />

                  {/* 이메일 문의 */}
                  <motion.a
                    variants={itemVariants}
                    href={`mailto:${EMAIL_ADDRESS}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-700 hover:bg-brand-light hover:text-brand-primary transition-all duration-200 group"
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                      <svg className="w-5 h-5 text-brand-primary group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">이메일 문의</p>
                      <p className="text-xs text-neutral-500 group-hover:text-brand-primary/70">상세 내용 전달</p>
                    </div>
                    <svg className="w-4 h-4 text-neutral-400 group-hover:text-brand-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                </div>

                {/* Panel arrow */}
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-neutral-100 transform rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Floating Button */}
          <motion.button
            onClick={toggleOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
            style={{
              background: isOpen 
                ? 'linear-gradient(135deg, #5b21b6 0%, #6d28d9 100%)'
                : 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)',
              boxShadow: isOpen
                ? '0 4px 20px rgba(109, 40, 217, 0.4)'
                : '0 4px 15px rgba(109, 40, 217, 0.3)',
            }}
            aria-label={isOpen ? '문의 메뉴 닫기' : '문의하기'}
            aria-expanded={isOpen}
            aria-haspopup="menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? (
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              )}
            </motion.div>

            {/* Subtle pulse animation when closed */}
            {!isOpen && (
              <span 
                className="absolute inset-0 rounded-full animate-ping opacity-20" 
                style={{ 
                  background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)',
                  animationDuration: '3s' 
                }} 
              />
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

