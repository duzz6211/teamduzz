import { motion, useReducedMotion } from 'framer-motion'
import Button from '../ui/Button'
import { heroVariants } from '../../utils/motionTokens'

export default function CTASection() {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : heroVariants.container

  const itemVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : heroVariants.item

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={shouldReduceMotion ? {} : {
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl transform translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          animate={shouldReduceMotion ? {} : {
            scale: [1.1, 1, 1.1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/5 blur-3xl transform -translate-x-1/2 translate-y-1/2"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6"
          >
            프로젝트 문의
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            프로젝트를 시작할 준비가
            <br />
            되셨나요?
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-white/80 mb-10 max-w-xl mx-auto"
          >
            간단한 문의부터 시작하세요. 요구사항을 정리해드리고, 
            최적의 방향을 함께 찾아드립니다.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              href="/contact"
              size="lg"
              variant="secondary"
              className="!bg-transparent !border-2 !border-white !text-white hover:!bg-white hover:!text-brand-primary"
            >
              프로젝트 문의하기
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <Button
              href="mailto:teamduzzforyou@gmail.com"
              external
              size="lg"
              variant="secondary"
              className="!border-white/40 !text-white hover:!bg-white/10 hover:!border-white/60"
            >
              이메일로 문의
            </Button>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-8 text-white/60 text-sm"
          >
            평균 응답 시간: 24시간 이내
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
