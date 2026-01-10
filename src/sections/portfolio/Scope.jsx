import React from 'react'
import './Scope.css'

const Scope = ({ data }) => {
  if (!data) return null
  return (
    <section className="section section--gray portfolio-scope">
      <div className="container">
        <h2 className="portfolio-scope__title">Scope</h2>
        <div className="portfolio-scope__grid">
          <div className="portfolio-scope__card">
            <h3>Problem</h3>
            <p>{data.problem}</p>
          </div>
          <div className="portfolio-scope__card">
            <h3>Solution</h3>
            <p>{data.solution}</p>
          </div>
          {Array.isArray(data.role) && (
            <div className="portfolio-scope__card portfolio-scope__card--full">
              <h3>Role</h3>
              <ul>
                {data.role.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Scope

