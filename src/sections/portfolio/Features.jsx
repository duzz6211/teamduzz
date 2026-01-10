import React from 'react'
import './Features.css'

const Features = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) return null
  return (
    <section className="section portfolio-features">
      <div className="container">
        <h2 className="portfolio-features__title">Features</h2>
        <ul className="portfolio-features__list">
          {data.map((f, idx) => (
            <li key={idx} className="portfolio-features__item">
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Features

