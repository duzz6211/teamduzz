import { useState, useEffect, useCallback } from 'react'

/**
 * Full Page Scroll Hook
 * 
 * CSS scroll-snap을 활용한 자연스러운 섹션 스크롤
 * - 휠 스크롤: CSS scroll-snap이 자동으로 섹션 경계에서 스냅
 * - 키보드/클릭: JS로 섹션 이동
 * - 모바일: 스냅 비활성화, 기본 스크롤
 * 
 * @param {Object} options
 * @param {string[]} options.sectionIds - 섹션 ID 배열 ['hero', 'services', ...]
 * @param {number} options.mobileBreakpoint - 모바일 분기점 (기본 768)
 */
export const useFullPageScroll = ({
  sectionIds = [],
  mobileBreakpoint = 768,
} = {}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // 모바일 체크
  const checkMobile = useCallback(() => {
    return window.innerWidth <= mobileBreakpoint
  }, [mobileBreakpoint])

  // reduced-motion 체크
  const checkReducedMotion = useCallback(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // 특정 섹션으로 스크롤 (인디케이터 클릭, 키보드 등)
  const scrollToSection = useCallback((index) => {
    if (index < 0 || index >= sectionIds.length) return

    const sectionId = sectionIds[index]
    const section = document.getElementById(sectionId)
    if (!section) return

    setCurrentIndex(index)

    // URL 해시 업데이트
    if (window.location.hash !== `#${sectionId}`) {
      history.replaceState(null, '', `#${sectionId}`)
    }

    // 부드러운 스크롤 (CSS scroll-behavior: smooth와 연동)
    section.scrollIntoView({ 
      behavior: prefersReducedMotion ? 'auto' : 'smooth', 
      block: 'start' 
    })
  }, [sectionIds, prefersReducedMotion])

  // 다음/이전 섹션
  const scrollToNext = useCallback(() => {
    if (currentIndex < sectionIds.length - 1) {
      scrollToSection(currentIndex + 1)
    }
  }, [currentIndex, sectionIds.length, scrollToSection])

  const scrollToPrev = useCallback(() => {
    if (currentIndex > 0) {
      scrollToSection(currentIndex - 1)
    }
  }, [currentIndex, scrollToSection])

  // 휠 이벤트는 CSS scroll-snap에 맡김 (자연스러운 스크롤 + 섹션 스냅)
  // JS로 강제 이동하지 않음

  // 키보드 이벤트 핸들러
  useEffect(() => {
    if (isMobile) return

    const handleKeydown = (e) => {
      // input/textarea 에서는 무시
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault()
          scrollToNext()
          break
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          scrollToPrev()
          break
        case 'Home':
          e.preventDefault()
          scrollToSection(0)
          break
        case 'End':
          e.preventDefault()
          scrollToSection(sectionIds.length - 1)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [isMobile, scrollToNext, scrollToPrev, scrollToSection, sectionIds.length])

  // 리사이즈 핸들러
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkMobile())
    }

    handleResize() // 초기 실행
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [checkMobile])

  // reduced-motion 감지
  useEffect(() => {
    setPrefersReducedMotion(checkReducedMotion())

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [checkReducedMotion])

  // 초기 해시 처리
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      const index = sectionIds.indexOf(hash)
      if (index !== -1) {
        // 약간의 딜레이 후 해당 섹션으로 이동
        setTimeout(() => scrollToSection(index), 100)
      }
    }
  }, [sectionIds, scrollToSection])

  // IntersectionObserver로 현재 섹션 감지 (데스크톱/모바일 공통)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // 화면 중앙에 있을 때 감지
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          const index = sectionIds.indexOf(sectionId)
          
          if (index !== -1 && index !== currentIndex) {
            setCurrentIndex(index)
            
            // 해시 업데이트
            if (window.location.hash !== `#${sectionId}`) {
              history.replaceState(null, '', `#${sectionId}`)
            }
          }
        }
      })
    }, observerOptions)

    // 모든 섹션 관찰
    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) {
        observer.observe(section)
      }
    })

    return () => observer.disconnect()
  }, [sectionIds, currentIndex])

  return {
    currentIndex,
    currentSectionId: sectionIds[currentIndex],
    isMobile,
    scrollToSection,
    scrollToNext,
    scrollToPrev,
    totalSections: sectionIds.length,
  }
}

export default useFullPageScroll

