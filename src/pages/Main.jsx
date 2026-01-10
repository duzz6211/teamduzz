import React from 'react'
import { Helmet } from 'react-helmet-async'
import { withBase } from '../utils/asset'
import {
  Hero,
  Services,
  PortfolioPreview,
  WhyUs,
  Workflow,
  FAQ,
  FinalCTA,
} from '../sections'

const Main = () => {
  return (
    <>
      <Helmet>
        <title>TeamDuzz | 개발 외주 전문 - 웹 개발, 홈페이지 제작, 유지보수</title>
        <meta
          name="description"
          content="신뢰할 수 있는 개발 외주 파트너 TeamDuzz. 웹 개발, 홈페이지 제작, 웹사이트 유지보수까지 비즈니스에 맞는 최적의 솔루션을 제공합니다."
        />
        <meta name="keywords" content="개발 외주, 웹 개발, 홈페이지 제작, 웹사이트 유지보수, 웹 에이전시" />
      </Helmet>

      {/* 숨김 이미지: 웹에서 직접 URL로 접근 가능하되 화면에는 노출되지 않음 */}
      <img
        src={withBase('images/duzz_signature.png')}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      />

      <Hero />
      <Services />
      <PortfolioPreview />
      <WhyUs />
      <Workflow />
      <FAQ />
      <FinalCTA />
    </>
  )
}

export default Main

