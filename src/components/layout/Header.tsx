import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// 문의 탭 제거 - CTA 버튼으로 대체
const navLinks = [
  { name: '홈', path: '/' },
  { name: '소개', path: '/about' },
  { name: '서비스', path: '/services' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-brand-primary flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-lg md:text-xl">D</span>
            </div>
            <span className={`font-bold text-lg md:text-xl transition-colors ${
              isScrolled ? 'text-neutral-900' : 'text-white'
            }`}>
              Team Duzz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors relative ${
                  isScrolled
                    ? 'text-neutral-700 hover:text-brand-primary'
                    : 'text-white/90 hover:text-white'
                } ${location.pathname === link.path ? 'text-brand-primary' : ''}`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-primary rounded-full"
                  />
                )}
              </Link>
            ))}
            {/* CTA Button - 강조된 스타일 */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)',
                boxShadow: '0 2px 8px rgba(109, 40, 217, 0.25)',
              }}
            >
              프로젝트 문의
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg"
            aria-label="메뉴 열기"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 rounded-full transition-all duration-300 ${
                  isScrolled ? 'bg-neutral-800' : 'bg-white'
                } ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`w-full h-0.5 rounded-full transition-all duration-300 ${
                  isScrolled ? 'bg-neutral-800' : 'bg-white'
                } ${isMobileMenuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`w-full h-0.5 rounded-full transition-all duration-300 ${
                  isScrolled ? 'bg-neutral-800' : 'bg-white'
                } ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-white rounded-2xl mt-2 shadow-card"
            >
              <div className="py-4 px-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'bg-brand-light text-brand-primary'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-3">
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold text-white transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)',
                    }}
                  >
                    프로젝트 문의
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
