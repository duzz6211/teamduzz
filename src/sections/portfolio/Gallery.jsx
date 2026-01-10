import React from 'react'
import './Gallery.css'

const Gallery = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) return null
  return (
    <section className="section portfolio-gallery">
      <div className="container">
        <h2 className="portfolio-gallery__title">Gallery</h2>
        <div className="portfolio-gallery__grid">
          {data.map((img, idx) => (
            <div key={idx} className="portfolio-gallery__item">
              <img src={img} alt={`gallery ${idx + 1}`} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery

