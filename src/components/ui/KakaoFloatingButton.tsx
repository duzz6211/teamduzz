import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 카카오톡 채널 URL을 여기에 입력하세요
const KAKAO_CHANNEL_URL = 'https://pf.kakao.com/_xnxnxnx' // placeholder - 실제 채널 URL로 교체 필요

export default function KakaoFloatingButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Show button after initial page load
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
              >
                <div className="bg-neutral-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg">
                  카카오톡 문의
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-neutral-900" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.a
            href={KAKAO_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full shadow-purple-lg transition-shadow hover:shadow-xl cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 50%, #8b5cf6 100%)',
            }}
            aria-label="카카오톡 채널로 문의하기"
          >
            {/* Kakao Icon */}
            <svg 
              className="w-7 h-7 md:w-8 md:h-8 text-white transition-transform group-hover:scale-110" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.757 1.834 5.179 4.59 6.544-.158.586-.51 2.12-.583 2.451-.094.42.155.414.326.301.134-.088 2.136-1.453 3.004-2.037.868.123 1.765.188 2.663.188 5.523 0 10-3.463 10-7.447C22 6.463 17.523 3 12 3z"/>
            </svg>

            {/* Pulse animation ring */}
            <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-brand-primary" style={{ animationDuration: '2s' }} />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}



