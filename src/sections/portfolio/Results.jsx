import React from 'react'
import './Results.css'

const Results = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) return null
  return (
    <section className="section section--gray portfolio-results">
      <div className="container">
        <h2 className="portfolio-results__title">Results</h2>
        <div className="portfolio-results__grid">
          {data.map((r, idx) => (
            <div key={idx} className="portfolio-results__card">
              <div className="portfolio-results__label">{r.label}</div>
              <div className="portfolio-results__value">{r.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Results

