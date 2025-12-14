import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeader from '../ui/SectionHeader'
import { sectionVariants, cardVariants, easing, duration } from '../../utils/motionTokens'

const pricingItems = [
  {
    title: '랜딩페이지',
    description: '마케팅/프로모션용 단일 페이지',
    price: '50만원대',
    unit: '부터',
    features: [
      '반응형 디자인',
      '기본 애니메이션',
      '문의 폼 연동',
      '1회 수정 포함',
    ],
    popular: false,
  },
  {
    title: '기업 소개형',
    description: '회사/브랜드 홈페이지',
    price: '150만원대',
    unit: '부터',
    features: [
      '5~10페이지 구성',
      '반응형 디자인',
      'SEO 최적화',
      '관리자 페이지(선택)',
      '2회 수정 포함',
    ],
    popular: true,
  },
  {
    title: '유지보수',
    description: '기존 웹사이트 관리',
    price: '협의',
    unit: '월 단위 / 건별',
    features: [
      '정기 업데이트',
      '보안 패치',
      '콘텐츠 수정',
      '긴급 대응',
    ],
    popular: false,
  },
]

export default function PricingSection() {
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
          badge="Pricing"
          title="비용 안내"
          subtitle="프로젝트 범위와 난이도에 따라 견적이 달라집니다. 정확한 견적은 문의 후 안내드립니다."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {pricingItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              transition={{ duration: duration.fast, ease: easing.smooth }}
              className={`relative bg-white rounded-2xl p-6 md:p-8 transition-all duration-300 ${
                item.popular
                  ? 'border-2 border-brand-primary shadow-purple-lg'
                  : 'border border-neutral-100 shadow-card hover:shadow-card-hover hover:border-brand-primary/20'
              }`}
            >
              {item.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-brand-primary text-white text-sm font-medium rounded-full">
                    인기
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-sm">{item.description}</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-3xl md:text-4xl font-bold text-brand-primary">
                  {item.price}
                </span>
                <span className="text-neutral-500 text-sm ml-1">{item.unit}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-neutral-600">
                    <svg
                      className="w-5 h-5 text-brand-primary flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`block w-full text-center py-3.5 rounded-full font-semibold transition-all duration-300 ${
                  item.popular
                    ? 'bg-brand-primary text-white hover:-translate-y-0.5'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-brand-light hover:text-brand-primary hover:-translate-y-0.5'
                }`}
                style={item.popular ? {
                  background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)',
                  boxShadow: '0 2px 8px rgba(109, 40, 217, 0.2)',
                } : {}}
              >
                견적 요청하기
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow, delay: 0.4, ease: easing.smooth }}
          className="text-center text-neutral-500 text-sm mt-8"
        >
          * 위 금액은 기본 범위 기준이며, 요구사항에 따라 달라질 수 있습니다.
          <br />
          정확한 견적은 문의 후 상담을 통해 안내드립니다.
        </motion.p>
      </div>
    </section>
  )
}
