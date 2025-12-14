import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useInView } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'
import { easing, duration } from '../../utils/motionTokens'

const steps = [
  {
    number: '01',
    title: '문의 접수',
    description: '프로젝트에 대한 문의를 접수합니다. 간단한 요구사항만 알려주셔도 됩니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: '요구사항 정리',
    description: '핵심 목표, 필수 기능, 희망 일정을 함께 정리합니다. 명확한 방향을 잡아드립니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: '03',
    title: '견적 및 일정 제안',
    description: '요구사항을 바탕으로 견적과 예상 일정을 제안드립니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: '제작 진행',
    description: '기획-퍼블리싱-개발 단계로 체계적으로 진행됩니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: '05',
    title: '테스트 도메인 배포',
    description: '실제 배포 전, 테스트 도메인을 통해 실시간으로 확인하실 수 있습니다. 피드백을 즉시 반영합니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    highlight: true,
  },
  {
    number: '06',
    title: '최종 배포/납품',
    description: '검수 완료 후 최종 배포 및 납품을 진행합니다. 모든 산출물을 정리해드립니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: '07',
    title: '유지보수 (선택)',
    description: '지속적인 관리와 기능 추가가 필요하시면 유지보수 계약을 진행합니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
]

interface WorkflowStepProps {
  step: typeof steps[0]
  index: number
  isLeft: boolean
  shouldReduceMotion: boolean | null
}

function WorkflowStep({ step, index, isLeft, shouldReduceMotion }: WorkflowStepProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -30 : 30 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : duration.slow,
        delay: shouldReduceMotion ? 0 : index * 0.08,
        ease: easing.smooth,
      }}
      className={`relative flex items-start gap-6 md:gap-12 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Number circle */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={isInView ? { scale: 1 } : { scale: 0.8 }}
          transition={{
            duration: shouldReduceMotion ? 0.1 : duration.normal,
            delay: shouldReduceMotion ? 0 : index * 0.08 + 0.1,
            ease: easing.smooth,
          }}
          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
            step.highlight
              ? 'bg-brand-primary text-white shadow-purple'
              : isInView
              ? 'bg-brand-primary text-white'
              : 'bg-white text-brand-primary border-2 border-brand-primary'
          }`}
        >
          {step.number}
        </motion.div>
      </div>

      {/* Content - 항상 왼쪽 정렬 */}
      <div className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: shouldReduceMotion ? 0.1 : duration.normal,
            delay: shouldReduceMotion ? 0 : index * 0.08 + 0.15,
            ease: easing.smooth,
          }}
          className={`bg-white rounded-2xl p-6 shadow-card transition-all duration-300 ${
            step.highlight ? 'border-2 border-brand-primary/30 shadow-purple' : 'border border-neutral-100'
          } ${isInView ? 'hover:shadow-card-hover' : ''}`}
        >
          {/* 아이콘 + 제목: 항상 왼쪽 정렬 */}
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
              step.highlight ? 'bg-brand-primary text-white' : 'bg-brand-light text-brand-primary'
            }`}>
              {step.icon}
            </div>
            <h3 className="text-lg font-bold text-neutral-900">{step.title}</h3>
          </div>
          {/* 설명: 항상 왼쪽 정렬, 적절한 줄 길이 */}
          <p className="text-neutral-600 leading-relaxed max-w-md">{step.description}</p>
          {step.highlight && (
            <div className="mt-4 p-3 rounded-lg bg-brand-primary/10 text-brand-primary text-sm font-medium text-left">
              의뢰자가 실시간으로 확인하고 피드백을 주실 수 있습니다
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function WorkflowSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="section-padding bg-neutral-50 overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          badge="Process"
          title="진행 방식"
          subtitle="체계적인 프로세스로 프로젝트를 진행합니다. 각 단계에서 충분한 소통을 보장합니다."
        />

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Background line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 transform md:-translate-x-1/2">
            {/* Animated progress line */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-brand-primary via-brand-secondary to-brand-accent origin-top"
              style={{ height: shouldReduceMotion ? '100%' : lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-8 md:space-y-12">
            {steps.map((step, index) => (
              <WorkflowStep
                key={index}
                step={step}
                index={index}
                isLeft={index % 2 === 0}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
