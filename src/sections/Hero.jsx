import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui'
import './Hero.css'

const Hero = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className={`hero ${loaded ? 'hero--loaded' : ''}`}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-gradient" />
        <div className="hero__bg-grid" />
      </div>

      <div className="container">
        <div className="hero__inner">
          <div className="hero__badge hero__animate hero__animate--1">
            <span className="hero__badge-dot" />
            <span>Available for new projects</span>
          </div>

          <h1 className="hero__title">
            <span className="hero__title-line hero__animate hero__animate--2">신뢰할 수 있는</span>
            <span className="hero__title-line hero__title-line--accent hero__animate hero__animate--3">
              개발 외주 파트너
            </span>
          </h1>

          <p className="hero__subtitle hero__animate hero__animate--4">
            웹 개발부터 홈페이지 제작, 웹사이트 유지보수까지.
            <br />
            비즈니스에 맞는 최적의 솔루션을 제공합니다.
          </p>

          <div className="hero__actions hero__animate hero__animate--5">
            <Button as={Link} to="/contact" size="lg">
              프로젝트 문의하기
            </Button>
            <Button as={Link} to="/portfolio" variant="outline" size="lg">
              포트폴리오 보기
            </Button>
          </div>

          <div className="hero__services hero__animate hero__animate--6">
            <span className="hero__service-tag">웹 개발</span>
            <span className="hero__service-divider">·</span>
            <span className="hero__service-tag">홈페이지 제작</span>
            <span className="hero__service-divider">·</span>
            <span className="hero__service-tag">웹사이트 유지보수</span>
            <span className="hero__service-divider">·</span>
            <span className="hero__service-tag">관리자 페이지</span>
          </div>
        </div>
      </div>

      <div className="hero__scroll hero__animate hero__animate--7" aria-hidden="true">
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}

export default Hero

