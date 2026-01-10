import React from 'react'
import './Overview.css'

const Overview = ({ data }) => {
  if (!data) return null
  return (
    <section className="section portfolio-overview">
      <div className="container">
        <h2 className="portfolio-overview__title">Overview</h2>
        <div className="portfolio-overview__grid">
          <div className="portfolio-overview__item">
            <span className="portfolio-overview__label">Client</span>
            <span className="portfolio-overview__value">{data.client}</span>
          </div>
          <div className="portfolio-overview__item">
            <span className="portfolio-overview__label">Duration</span>
            <span className="portfolio-overview__value">{data.duration}</span>
          </div>
          <div className="portfolio-overview__item portfolio-overview__item--full">
            <span className="portfolio-overview__label">Description</span>
            <span className="portfolio-overview__value">{data.description}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Overview

