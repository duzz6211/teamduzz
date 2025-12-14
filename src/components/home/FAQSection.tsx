import { useState, useCallback, KeyboardEvent } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'
import { accordionVariants, easing, duration } from '../../utils/motionTokens'

const faqs = [
  {
    question: '진행 방식은 어떻게 되나요?',
    answer: '문의 접수 → 요구사항 정리 → 견적/일정 제안 → 제작 → 테스트 도메인 배포 → 최종 납품 순으로 진행됩니다. 각 단계에서 충분한 소통을 진행하며, 테스트 도메인을 통해 실시간으로 결과물을 확인하실 수 있습니다.',
  },
  {
    question: '소규모 팀인데 일정/품질 괜찮나요?',
    answer: '오히려 소규모 팀이기에 빠른 의사결정과 유연한 대응이 가능합니다. 각 역할에 전문성을 갖춘 체계적인 프로세스로 진행되며, 불필요한 커뮤니케이션 비용을 줄여 효율적으로 높은 품질을 유지합니다. 100건 이상의 프로젝트 경험을 바탕으로 안정적인 결과물을 제공합니다.',
  },
  {
    question: '수정은 몇 회까지 가능한가요?',
    answer: '기본 수정 횟수는 견적에 포함되어 있으며, 프로젝트 규모에 따라 다릅니다. 일반적으로 랜딩페이지는 1회, 기업 소개형은 2회 정도 포함됩니다. 추가 수정은 협의 후 진행 가능합니다.',
  },
  {
    question: '유지보수는 어떤 방식인가요?',
    answer: '월 단위 정기 유지보수 또는 건별 유지보수 중 선택 가능합니다. 정기 유지보수는 월 1~2회 콘텐츠 수정, 보안 업데이트, 모니터링 등을 포함합니다. 건별 유지보수는 필요할 때마다 요청하시면 됩니다.',
  },
  {
    question: '결제/계약은 어떻게 하나요?',
    answer: '견적 확정 후 계약서 작성 → 계약금(50%) 입금 → 제작 진행 → 최종 검수 → 잔금(50%) 입금 → 납품 순으로 진행됩니다. 세금계산서 발행이 가능하며, 계약서에 명시된 내용에 따라 진행됩니다.',
  },
  {
    question: '포트폴리오를 볼 수 있나요?',
    answer: '보안 및 저작권 문제로 공개 포트폴리오는 운영하지 않습니다. 대신 문의 시 프로젝트 성격에 맞는 레퍼런스를 별도로 안내드릴 수 있습니다.',
  },
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
  const shouldReduceMotion = useReducedMotion()

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onToggle()
    }
  }, [onToggle])

  const contentVariants = shouldReduceMotion
    ? {
        hidden: { height: 0, opacity: 0 },
        visible: { height: 'auto', opacity: 1, transition: { duration: 0.1 } },
        exit: { height: 0, opacity: 0, transition: { duration: 0.1 } },
      }
    : accordionVariants.content

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: shouldReduceMotion ? 0.1 : duration.normal,
        delay: shouldReduceMotion ? 0 : index * 0.06,
        ease: easing.smooth,
      }}
      className="border-b border-neutral-200 last:border-b-0"
    >
      <button
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={`faq-content-${index}`}
        id={`faq-button-${index}`}
        className="w-full py-5 flex items-center justify-between text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-lg"
      >
        <span className="font-semibold text-neutral-900 group-hover:text-brand-primary transition-colors duration-300 pr-4">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : duration.fast, ease: easing.smooth }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
            isOpen
              ? 'bg-brand-primary text-white'
              : 'bg-neutral-100 text-neutral-600 group-hover:bg-brand-light group-hover:text-brand-primary'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-content-${index}`}
            role="region"
            aria-labelledby={`faq-button-${index}`}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <motion.p
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.1 : duration.fast, ease: easing.smooth }}
              className="pb-5 text-neutral-600 leading-relaxed"
            >
              {answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = useCallback((index: number) => {
    setOpenIndex(prev => prev === index ? null : index)
  }, [])

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-custom">
        <SectionHeader
          badge="FAQ"
          title="자주 묻는 질문"
          subtitle="프로젝트 진행에 대해 궁금하신 점을 확인해보세요."
        />

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
