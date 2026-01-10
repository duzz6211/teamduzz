import React from 'react'
import { useState, useEffect } from 'react'
import './FloatingButtons.css'

const FloatingButtons = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const KAKAO_CHANNEL_URL = 'http://pf.kakao.com/_kJxbQn'
  const EMAIL = 'support@teamduzz.com'

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`floating-buttons ${isVisible ? 'floating-buttons--visible' : ''}`}>
      {/* 메뉴 아이템들 */}
      <div className={`floating-buttons__menu ${isOpen ? 'floating-buttons__menu--open' : ''}`}>
        <button
          className="floating-buttons__item floating-buttons__item--kakao"
          onClick={() => window.open(KAKAO_CHANNEL_URL, '_blank')}
          aria-label="카카오톡 채널 문의"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
            <path d="M12 3c5.514 0 10 3.592 10 8.007 0 4.416-4.486 8.007-10 8.007-.513 0-1.016-.03-1.507-.088L6.4 21.8a.5.5 0 01-.757-.429l.246-3.073C3.383 16.707 2 14.493 2 11.007 2 6.592 6.486 3 12 3z"/>
          </svg>
        </button>

        <button
          className="floating-buttons__item floating-buttons__item--email"
          onClick={() => (window.location.href = `mailto:${EMAIL}`)}
          aria-label="이메일 문의"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 6l-10 7L2 6" />
          </svg>
        </button>
      </div>

      {/* 메인 토글 버튼 */}
      <button
        className={`floating-buttons__toggle ${isOpen ? 'floating-buttons__toggle--open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="문의하기"
        type="button"
      >
        <svg className="floating-buttons__icon floating-buttons__icon--chat" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
          <circle cx="8" cy="10" r="1.2"/>
          <circle cx="12" cy="10" r="1.2"/>
          <circle cx="16" cy="10" r="1.2"/>
        </svg>
        <svg className="floating-buttons__icon floating-buttons__icon--close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24" aria-hidden="true">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  )
}

export default FloatingButtons
