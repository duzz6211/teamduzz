import React from 'react'
import { Link } from 'react-router-dom'
import { withBase } from '../utils/asset'
import './PortfolioCard.css'

const PortfolioCard = ({ id, title, category, year, thumbnail, summary }) => {
  return (
    <Link to={`/portfolio/${encodeURIComponent(id)}`} className="portfolio-card">
      <div className="portfolio-card__thumb">
        {thumbnail ? (
          <img
            src={withBase(thumbnail)}
            alt={title}
            loading="lazy"
            decoding="async"
            width="400"
            height="250"
          />
        ) : (
          <div className="portfolio-card__placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="portfolio-card__content">
        <div className="portfolio-card__meta">
          <span>{category}</span>
          <span>{year}</span>
        </div>
        <h3 className="portfolio-card__title">{title}</h3>
        <p className="portfolio-card__summary">{summary}</p>
      </div>
    </Link>
  )
}

export default PortfolioCard

