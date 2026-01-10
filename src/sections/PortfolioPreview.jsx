import React from 'react'
import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Button } from '../components/ui'
import portfolioData from '../data/portfolioData.json'
import { withBase } from '../utils/asset'
import './PortfolioPreview.css'

const PortfolioPreview = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  const featured = portfolioData.filter((p) => p.thumbnail).slice(0, 2)

  return (
    <section className="section section--dark portfolio-preview" ref={ref}>
      <div className="container">
        <header className={`portfolio-preview__header portfolio-preview__animate ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="portfolio-preview__label">Recent Work</h2>
          <p className="portfolio-preview__title">최근 프로젝트</p>
        </header>

        <div className="portfolio-preview__grid">
          {featured.map((p, idx) => (
            <Link
              key={p.id}
              to={`/portfolio/${encodeURIComponent(p.id)}`}
              className={`preview-card portfolio-preview__animate ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${0.15 + idx * 0.1}s` }}
            >
              <div className="preview-card__image">
                <img src={withBase(p.thumbnail)} alt={p.title} loading="lazy" decoding="async" />
              </div>
              <div className="preview-card__content">
                <span className="preview-card__category">{p.category}</span>
                <h3 className="preview-card__title">{p.title}</h3>
                <p className="preview-card__summary">{p.summary}</p>
                <div className="preview-card__meta">
                  <span>{p.overview?.client}</span>
                  <span>·</span>
                  <span>{p.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={`portfolio-preview__action portfolio-preview__animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
          <Button as={Link} to="/portfolio" variant="outline" className="btn--outline-light">
            모든 프로젝트 보기
          </Button>
        </div>
      </div>
    </section>
  )
}

export default PortfolioPreview

