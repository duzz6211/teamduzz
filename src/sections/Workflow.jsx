import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Workflow.css'

const steps = [
  { id: 1, title: '상담 및 요구사항 정리', description: '프로젝트 목표와 범위를 파악합니다' },
  { id: 2, title: '구조/일정 설계', description: '기능 정의와 현실적인 일정을 수립합니다' },
  { id: 3, title: '개발', description: '설계에 따라 단계별로 구현합니다' },
  { id: 4, title: '피드백/수정', description: '검토 후 피드백을 반영합니다' },
  { id: 5, title: '납품 및 유지관리', description: '최종 납품 후 지속적으로 지원합니다' },
]

const Workflow = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section className="section section--gray workflow" ref={ref}>
      <div className="container">
        <header className={`workflow__header workflow__animate ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="workflow__label">Workflow</h2>
          <p className="workflow__title">프로젝트 진행 과정</p>
        </header>

        <div className="workflow__steps">
          {steps.map((s, idx) => (
            <div
              key={s.id}
              className={`workflow__step workflow__animate ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${0.1 + idx * 0.1}s` }}
            >
              <div className="workflow__step-header">
                <span className="workflow__number">{String(s.id).padStart(2, '0')}</span>
                {idx < steps.length - 1 && <div className="workflow__line" />}
              </div>
              <h3 className="workflow__step-title">{s.title}</h3>
              <p className="workflow__step-desc">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Workflow

