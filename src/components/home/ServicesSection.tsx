import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeader from '../ui/SectionHeader'
import { sectionVariants, cardVariants, easing, duration } from '../../utils/motionTokens'

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: '홈페이지 제작',
    description: '브랜드 아이덴티티를 담은 기업 홈페이지를 제작합니다. 반응형 웹 디자인과 SEO 최적화를 기본으로 합니다.',
    features: ['반응형 디자인', 'SEO 최적화', '관리자 페이지'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
    title: '랜딩페이지 제작',
    description: '전환율 높은 랜딩페이지를 제작합니다. 마케팅 목표에 맞춘 설계와 A/B 테스트 가능한 구조를 제공합니다.',
    features: ['전환 최적화', '빠른 로딩 속도', '분석 도구 연동'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: '기업/기관 웹사이트',
    description: '공공기관, 대학교, 기업 소개 페이지 등 공식적인 웹사이트를 제작합니다. 접근성과 보안을 중시합니다.',
    features: ['웹 접근성 준수', '보안 강화', '다국어 지원'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: '웹 유지보수',
    description: '기존 웹사이트의 유지보수와 기능 개선을 담당합니다. 정기 점검과 긴급 대응을 포함합니다.',
    features: ['정기 업데이트', '보안 패치', '성능 모니터링'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: '프로그램 개발',
    description: '업무 자동화 도구, 내부 관리 시스템 등 맞춤형 프로그램을 개발합니다.',
    features: ['업무 자동화', '데이터 처리', '맞춤형 솔루션'],
  },
]

export default function ServicesSection() {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : sectionVariants.content

  const itemVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : cardVariants

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          badge="Services"
          title="전문 분야"
          subtitle="웹 개발 외주부터 유지보수까지, 디지털 프로덕트의 전 과정을 책임집니다."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              transition={{ duration: duration.fast, ease: easing.smooth }}
              className="card group cursor-pointer border-2 border-transparent hover:border-brand-primary/20"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-light to-purple-100 flex items-center justify-center text-brand-primary mb-5">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-brand-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-neutral-600 mb-5 leading-relaxed">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full bg-neutral-100 text-neutral-600 group-hover:bg-brand-light/50 group-hover:text-brand-primary transition-colors duration-300"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow, delay: 0.3, ease: easing.smooth }}
          className="text-center mt-12"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:gap-3 transition-all duration-300"
          >
            전체 서비스 보기
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
