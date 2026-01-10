import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Services.css'

const services = [
  {
    id: 1,
    title: '웹 개발',
    description: '비즈니스 요구에 맞는 웹 애플리케이션 개발',
    bullets: ['React, Vue 등 모던 프레임워크', '백엔드 API 연동'],
  },
  {
    id: 2,
    title: '홈페이지 제작',
    description: '브랜드를 담은 반응형 웹사이트 제작',
    bullets: ['맞춤형 디자인 & 퍼블리싱', '모바일 최적화'],
  },
  {
    id: 3,
    title: '웹사이트 유지보수',
    description: '안정적인 운영을 위한 지속적인 관리',
    bullets: ['정기 업데이트 및 보안 점검', '콘텐츠 수정 및 기능 개선'],
  },
  {
    id: 4,
    title: '관리자 페이지/기능 개발',
    description: '효율적인 운영을 위한 어드민 시스템 구축',
    bullets: ['대시보드 및 통계 기능', '콘텐츠 관리 시스템(CMS)'],
  },
]

const Services = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section className="section section--gray services" ref={ref}>
      <div className="container">
        <header className={`services__header services__animate ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="services__label">Services</h2>
          <p className="services__title">제공 서비스</p>
        </header>
        <div className="services__grid">
          {services.map((s, idx) => (
            <div
              key={s.id}
              className={`services__card services__animate ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${0.1 + idx * 0.1}s` }}
            >
              <h3 className="services__card-title">{s.title}</h3>
              <p className="services__card-desc">{s.description}</p>
              <ul className="services__card-list">
                {s.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

