import React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { getPortfolioList } from '../data/portfolio'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import PortfolioCard from '../components/PortfolioCard'
import './Portfolio.css'

const PAGE_SIZE = 12

const Portfolio = () => {
  const all = useMemo(() => getPortfolioList(), [])
  const [page, setPage] = useState(1)
  const [displayed, setDisplayed] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const initial = all.slice(0, PAGE_SIZE)
    setDisplayed(initial)
    setHasMore(all.length > PAGE_SIZE)
    setPage(1)
  }, [all])

  const onLoadMore = () => {
    if (loading || !hasMore) return
    setLoading(true)

    const nextPage = page + 1
    const nextItems = all.slice(page * PAGE_SIZE, nextPage * PAGE_SIZE)
    setDisplayed((prev) => [...prev, ...nextItems])
    setPage(nextPage)
    setHasMore(nextPage * PAGE_SIZE < all.length)
    setLoading(false)
  }

  const { sentinelRef } = useInfiniteScroll({ onLoadMore, hasMore, loading })

  return (
    <div className="portfolio-page">
      <Helmet>
        <title>포트폴리오 | TeamDuzz</title>
        <meta name="description" content="TeamDuzz 포트폴리오 목록입니다." />
        <meta name="keywords" content="개발 외주, 웹 개발, 홈페이지 제작, 웹사이트 유지보수, 포트폴리오" />
      </Helmet>

      <div className="container">
        <header className="portfolio-list__header">
          <h1 className="portfolio-list__title">Portfolio</h1>
          <p className="portfolio-list__desc">프로젝트 사례를 확인해보세요.</p>
        </header>

        <div className="portfolio-list__grid">
          {displayed.map((p) => (
            <PortfolioCard key={p.id} {...p} />
          ))}
        </div>

        <div ref={sentinelRef} className="portfolio-list__sentinel" />

        {loading && <p className="portfolio-list__status">불러오는 중…</p>}
        {!hasMore && <p className="portfolio-list__status">모든 프로젝트를 확인했습니다.</p>}
      </div>
    </div>
  )
}

export default Portfolio

