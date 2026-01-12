import React from 'react'
import './SectionIndicator.css'

/**
 * 풀페이지 스크롤용 우측 도트 인디케이터
 * 
 * @param {Object} props
 * @param {string[]} props.sections - 섹션 정보 배열 [{id, label}, ...]
 * @param {number} props.currentIndex - 현재 활성 섹션 인덱스
 * @param {function} props.onDotClick - 도트 클릭 시 콜백 (index) => void
 */
const SectionIndicator = ({ sections = [], currentIndex = 0, onDotClick }) => {
  return (
    <nav className="section-indicator" aria-label="섹션 네비게이션">
      <ul className="section-indicator__list">
        {sections.map((section, index) => (
          <li key={section.id}>
            <button
              className={`section-indicator__dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => onDotClick?.(index)}
              aria-label={`${section.label || section.id} 섹션으로 이동`}
              aria-current={index === currentIndex ? 'true' : undefined}
            >
              <span className="section-indicator__tooltip">{section.label || section.id}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SectionIndicator

