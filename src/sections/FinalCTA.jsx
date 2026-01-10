import React from 'react'
import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Button } from '../components/ui'
import './FinalCTA.css'

const FinalCTA = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })

  return (
    <section className="section final-cta" ref={ref}>
      <div className="container">
        <div className={`final-cta__content final-cta__animate ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="final-cta__title">지금 프로젝트를 시작할 준비가 되셨나요?</h2>
          <p className="final-cta__desc">웹 개발 · 홈페이지 제작 · 웹사이트 유지보수 상담을 도와드립니다.</p>
          <div className="final-cta__actions">
            <Button as={Link} to="/contact" size="lg">
              문의하기
            </Button>
            <Button as={Link} to="/portfolio" variant="outline" size="lg">
              포트폴리오
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA

