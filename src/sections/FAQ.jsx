import React from 'react'
import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './FAQ.css'

const faqs = [
  {
    id: 1,
    question: '프로젝트 비용은 어떻게 산정되나요?',
    answer: '프로젝트 범위, 기능 복잡도, 일정에 따라 견적이 달라집니다. 상담을 통해 요구사항을 파악한 후 상세 견적서를 제공해 드립니다.',
  },
  {
    id: 2,
    question: '개발 기간은 보통 얼마나 걸리나요?',
    answer: '단순 홈페이지는 2~4주, 기능이 포함된 웹 애플리케이션은 4~8주 정도 소요됩니다. 프로젝트 규모에 따라 달라질 수 있습니다.',
  },
  {
    id: 3,
    question: '기획이나 디자인 없이 개발만 의뢰할 수 있나요?',
    answer: '네, 가능합니다. 기획서나 디자인 시안이 준비되어 있다면 개발만 진행할 수 있습니다. 기획/디자인이 없는 경우에도 함께 진행 가능합니다.',
  },
  {
    id: 4,
    question: '진행 중 요구사항 변경이 가능한가요?',
    answer: '초기 단계에서는 유연하게 대응 가능합니다. 개발 진행 이후 큰 변경은 일정/비용에 영향을 줄 수 있어 사전 협의가 필요합니다.',
  },
  {
    id: 5,
    question: '결제는 어떻게 진행되나요?',
    answer: '일반적으로 계약금(착수금), 중도금, 잔금의 3단계로 진행됩니다. 소규모 프로젝트는 2단계로 진행하기도 합니다.',
  },
  {
    id: 6,
    question: '프로젝트 완료 후 수정 요청이 가능한가요?',
    answer: '납품 후 일정 기간 무상 수정 기간을 제공합니다. 이후 추가 수정/기능 변경은 별도 협의를 통해 진행됩니다.',
  },
  {
    id: 7,
    question: '유지보수 계약은 필수인가요?',
    answer: '필수는 아닙니다. 다만 안정적인 운영과 보안 업데이트를 위해 유지보수 계약을 권장드립니다.',
  },
  {
    id: 8,
    question: '소스 코드를 받을 수 있나요?',
    answer: '네, 프로젝트 완료 후 소스 코드 전체를 제공해 드립니다. 유지보수 인계를 위한 문서화도 함께 제공합니다.',
  },
]

const FAQ = () => {
  const [openId, setOpenId] = useState(null)
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section className="section faq" ref={ref}>
      <div className="container">
        <header className={`faq__header faq__animate ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="faq__label">FAQ</h2>
          <p className="faq__title">자주 묻는 질문</p>
        </header>

        <div className="faq__list">
          {faqs.map((f, idx) => (
            <div
              key={f.id}
              className={`faq__item faq__animate ${openId === f.id ? 'faq__item--open' : ''} ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${0.05 + idx * 0.05}s` }}
            >
              <button
                className="faq__question"
                onClick={() => setOpenId(openId === f.id ? null : f.id)}
                aria-expanded={openId === f.id}
              >
                <span>{f.question}</span>
                <span className="faq__icon">{openId === f.id ? '−' : '+'}</span>
              </button>
              <div className="faq__answer">
                <p>{f.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ

