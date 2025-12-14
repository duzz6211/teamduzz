import { motion, useReducedMotion } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'
import { sectionVariants, cardVariants, easing, duration } from '../../utils/motionTokens'

const roles = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: '기획',
    description: '요구사항 분석부터 구조 설계까지, 프로젝트의 방향을 명확하게 잡습니다.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: '퍼블리싱',
    description: '디자인을 완벽히 구현하고, 반응형 웹 표준을 준수합니다.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: '개발',
    description: '견고한 코드와 최적화된 성능으로 기능을 구현합니다.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: '유지보수',
    description: '지속적인 관리와 업데이트로 안정적인 운영을 지원합니다.',
  },
]

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : sectionVariants.content

  const itemVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : cardVariants

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-custom">
        <SectionHeader
          badge="Team Duzz"
          title="역할 중심으로 움직이는 팀"
          subtitle="Team Duzz는 4개의 전문 역할로 운영되는 소규모 개발팀입니다. 각 프로젝트는 기획부터 유지보수까지 체계적으로 진행됩니다."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {roles.map((role, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              transition={{ duration: duration.fast, ease: easing.smooth }}
              className="card group hover:border-brand-primary/20"
            >
              <div className="w-14 h-14 rounded-xl bg-brand-light flex items-center justify-center text-brand-primary mb-5 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                {role.icon}
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">{role.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{role.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow, delay: 0.3, ease: easing.smooth }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-soft text-neutral-700">
            <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-medium">
              소규모 팀이기에 빠른 소통과 유연한 대응이 가능합니다
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
