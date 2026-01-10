import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './WhyUs.css'

const reasons = [
  {
    id: 1,
    title: '명확한 커뮤니케이션',
    description: '진행 상황을 투명하게 공유하고, 피드백을 빠르게 반영합니다. 기술 용어 없이 이해하기 쉽게 설명해 드립니다.',
  },
  {
    id: 2,
    title: '합리적인 견적',
    description: '불필요한 기능을 권하지 않습니다. 예산에 맞춰 최적의 결과물을 제안합니다.',
  },
  {
    id: 3,
    title: '일정 준수',
    description: '약속한 일정을 지킵니다. 프로젝트 시작 전 현실적인 일정을 함께 조율합니다.',
  },
  {
    id: 4,
    title: '사후 지원',
    description: '프로젝트 완료 후에도 유지보수와 기능 추가를 지원합니다. 장기적인 파트너십을 지향합니다.',
  },
]

const WhyUs = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section className="section why-us" ref={ref}>
      <div className="container">
        <header className={`why-us__header why-us__animate ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="why-us__label">Why Us</h2>
          <p className="why-us__title">우리를 선택해야 하는 이유</p>
        </header>

        <div className="why-us__grid">
          {reasons.map((r, idx) => (
            <div
              key={r.id}
              className={`why-us__item why-us__animate ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${0.1 + idx * 0.1}s` }}
            >
              <span className="why-us__number">{String(r.id).padStart(2, '0')}</span>
              <div className="why-us__content">
                <h3 className="why-us__item-title">{r.title}</h3>
                <p className="why-us__item-desc">{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs

