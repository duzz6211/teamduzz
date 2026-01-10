import React from 'react'
import './Links.css'

const Links = ({ data }) => {
  if (!data) return null
  return (
    <section className="section section--gray portfolio-links">
      <div className="container">
        <h2 className="portfolio-links__title">Links</h2>
        <div className="portfolio-links__grid">
          {data.live && (
            <a className="portfolio-links__item" href={data.live} target="_blank" rel="noreferrer">
              Live Site
              <span className="portfolio-links__sub">{data.live}</span>
            </a>
          )}
          {data.github && (
            <a className="portfolio-links__item" href={data.github} target="_blank" rel="noreferrer">
              GitHub
              <span className="portfolio-links__sub">{data.github}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

export default Links

