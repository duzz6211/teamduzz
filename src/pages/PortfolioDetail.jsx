import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getPortfolioById } from '../data/portfolio'
import { Button } from '../components/ui'
import {
  DevicePreview,
  Overview,
  Scope,
  Features,
  Results,
  Gallery,
  Links,
} from '../sections/portfolio'
import './PortfolioDetail.css'

const PortfolioDetail = () => {
  const { id } = useParams()
  const decodedId = id ? decodeURIComponent(id) : ''
  const project = getPortfolioById(decodedId)

  if (!project) {
    return (
      <div className="portfolio-notfound">
        <div className="container">
          <div className="portfolio-notfound__content">
            <h1>프로젝트를 찾을 수 없습니다</h1>
            <p>요청하신 프로젝트가 존재하지 않거나 삭제되었습니다.</p>
            <Button as={Link} to="/portfolio">
              포트폴리오 목록으로
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="portfolio-detail">
      <Helmet>
        <title>{project.title} | TeamDuzz 포트폴리오</title>
        <meta name="description" content={`${project.summary} - TeamDuzz의 ${project.category} 프로젝트 사례입니다.`} />
      </Helmet>

      <section className="portfolio-detail__hero">
        <div className="container">
          <Link to="/portfolio" className="portfolio-detail__back">
            ← 목록으로
          </Link>
          <div className="portfolio-detail__meta">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <h1 className="portfolio-detail__title">{project.title}</h1>
          <p className="portfolio-detail__summary">{project.summary}</p>
        </div>
      </section>

      <DevicePreview data={project.images} title={project.title} />
      <Overview data={project.overview} />
      <Scope data={project.scope} />
      <Features data={project.features} />
      <Results data={project.results} />
      <Gallery data={project.gallery} />
      <Links data={project.links} />

      <section className="section section--gray portfolio-detail__cta">
        <div className="container">
          <div className="portfolio-detail__cta-content">
            <p>비슷한 프로젝트를 계획 중이신가요?</p>
            <Button as={Link} to="/contact" size="lg">
              프로젝트 문의하기
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PortfolioDetail

