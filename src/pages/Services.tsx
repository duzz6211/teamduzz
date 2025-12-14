import { motion } from 'framer-motion'
import SectionHeader from '../components/ui/SectionHeader'
import Button from '../components/ui/Button'
import { staggerContainer, staggerItem } from '../utils/animations'

const services = [
  {
    id: 'homepage',
    title: '홈페이지 제작',
    description: '브랜드 아이덴티티를 담은 기업 홈페이지를 제작합니다. 방문자에게 신뢰감을 주는 전문적인 웹사이트를 구축합니다.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    features: [
      '반응형 웹 디자인 (모바일/태블릿/PC)',
      'SEO 최적화 설계',
      '관리자 페이지 (선택)',
      '문의 폼 / 뉴스레터 연동',
      '분석 도구 연동 (GA4 등)',
    ],
    process: ['요구사항 분석', '구조 설계', '디자인 시안', '퍼블리싱', '개발', '테스트 배포', '최종 납품'],
    priceFrom: '150만원대',
  },
  {
    id: 'landing',
    title: '랜딩페이지 제작',
    description: '마케팅 캠페인, 제품 출시, 이벤트 등을 위한 고전환 랜딩페이지를 제작합니다. 전환율 최적화에 초점을 맞춥니다.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
    features: [
      '단일 페이지 집중 설계',
      '빠른 로딩 속도 최적화',
      'CTA 버튼 최적화',
      '문의 폼 / 리드 수집',
      'A/B 테스트 가능 구조',
    ],
    process: ['목표 설정', '카피라이팅', '디자인', '퍼블리싱', '테스트', '배포'],
    priceFrom: '50만원대',
  },
  {
    id: 'corporate',
    title: '기업/기관 웹사이트',
    description: '공공기관, 대학교, 대기업 등 공식적인 웹사이트를 제작합니다. 웹 접근성과 보안을 최우선으로 합니다.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    features: [
      '웹 접근성(WCAG) 준수',
      '보안 강화 설계',
      '다국어 지원 가능',
      'CMS(콘텐츠 관리 시스템)',
      '조직도 / 연혁 등 기업 정보 구성',
    ],
    process: ['요구사항 정의', '정보 구조 설계', '웹 접근성 검토', '디자인', '개발', '보안 점검', '납품'],
    priceFrom: '200만원대',
  },
  {
    id: 'maintenance',
    title: '웹 유지보수',
    description: '기존 웹사이트의 안정적인 운영을 위한 유지보수 서비스입니다. 정기 점검부터 긴급 대응까지 책임집니다.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    features: [
      '정기 콘텐츠 업데이트',
      '보안 패치 및 업데이트',
      '성능 모니터링',
      '백업 관리',
      '긴급 대응 (장애 복구)',
    ],
    process: ['현황 분석', '유지보수 범위 협의', '계약', '정기 점검', '월별 리포트'],
    priceFrom: '월 단위 협의',
  },
  {
    id: 'program',
    title: '프로그램 개발',
    description: '업무 자동화 도구, 내부 관리 시스템 등 맞춤형 프로그램을 개발합니다. 반복 업무를 줄이고 효율을 높입니다.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    features: [
      '업무 자동화 스크립트',
      '데이터 처리 / 분석 도구',
      '내부 관리 시스템',
      'API 연동 / 크롤링',
      '맞춤형 솔루션 개발',
    ],
    process: ['요구사항 상담', '기능 정의', '설계', '개발', '테스트', '배포/교육'],
    priceFrom: '협의',
  },
]

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6"
            >
              Services
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              웹 개발의 모든 것,
              <br />
              <span className="text-brand-muted">Team Duzz</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/80 leading-relaxed"
            >
              홈페이지 제작부터 유지보수, 맞춤형 프로그램 개발까지.
              <br />
              디지털 프로덕트의 전 과정을 책임집니다.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Info */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-light to-purple-100 flex items-center justify-center text-brand-primary mb-6">
                    {service.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-neutral-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-neutral-900 mb-3">주요 항목</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-neutral-600">
                          <svg className="w-5 h-5 text-brand-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm text-neutral-500">비용</span>
                    <span className="text-xl font-bold text-brand-primary">{service.priceFrom}~</span>
                  </div>

                  <Button href="/contact">
                    견적 요청하기
                  </Button>
                </div>

                {/* Process Card */}
                <div className={`bg-neutral-50 rounded-2xl p-6 md:p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h4 className="font-semibold text-neutral-900 mb-6">진행 프로세스</h4>
                  <div className="space-y-4">
                    {service.process.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div className="flex-1 h-px bg-neutral-200" />
                        <span className="text-neutral-700 font-medium">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionHeader
            badge="Additional"
            title="그 외 문의"
            subtitle="위 서비스 외에도 다양한 웹 개발 관련 문의를 받고 있습니다."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { title: '기존 웹사이트 리뉴얼', desc: '오래된 웹사이트를 최신 기술로 새롭게' },
              { title: '웹앱 기능 추가', desc: '기존 서비스에 새로운 기능 개발' },
              { title: '기술 컨설팅', desc: '프로젝트 방향성 및 기술 스택 조언' },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="card text-center"
              >
                <h3 className="font-semibold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-hero-gradient">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                어떤 서비스가 필요하신가요?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                프로젝트에 대해 간단히 알려주시면,
                <br />
                최적의 방향을 함께 찾아드립니다.
              </p>
              <Button
                href="/contact"
                size="lg"
                className="bg-white text-brand-primary hover:bg-neutral-100"
              >
                프로젝트 문의하기
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

