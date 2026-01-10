import { useEffect, useRef } from 'react'

/**
 * 입력:
 * - onLoadMore: () => void
 * - hasMore: boolean
 * - loading: boolean
 * 출력:
 * - sentinelRef
 */
const useInfiniteScroll = ({ onLoadMore, hasMore, loading }) => {
  const sentinelRef = useRef(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    if (!hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting) return
        if (loading) return
        onLoadMore?.()
      },
      { root: null, rootMargin: '300px 0px', threshold: 0 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [onLoadMore, hasMore, loading])

  return { sentinelRef }
}

export default useInfiniteScroll

