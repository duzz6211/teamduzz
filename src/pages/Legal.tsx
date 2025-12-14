import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

export default function Legal() {
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()

  // Handle anchor scroll on page load
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [location])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.1 : 0.5 }
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              약관 및 개인정보 처리방침
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.6, delay: 0.1 }}
              className="text-lg text-white/80"
            >
              Team Duzz 서비스 이용에 관한 안내입니다.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-6 bg-neutral-50 border-b border-neutral-200 sticky top-16 md:top-20 z-40">
        <div className="container-custom">
          <nav className="flex flex-wrap gap-4" aria-label="약관 바로가기">
            <a
              href="#privacy"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-soft text-neutral-700 hover:text-brand-primary hover:shadow-card transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              개인정보 처리방침
            </a>
            <a
              href="#terms"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-soft text-neutral-700 hover:text-brand-primary hover:shadow-card transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              이용약관
            </a>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Privacy Policy */}
            <motion.article
              id="privacy"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeIn}
              className="scroll-mt-40"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center text-brand-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                  개인정보 처리방침
                </h2>
              </div>

              <div className="prose prose-neutral max-w-none">
                <p className="text-neutral-600 leading-relaxed mb-8">
                  Team Duzz(이하 "팀")는 이용자의 개인정보를 소중히 여기며, 
                  관련 법령에 따라 개인정보를 안전하게 관리하고 있습니다. 
                  본 개인정보 처리방침은 팀이 제공하는 웹사이트 및 서비스에 적용됩니다.
                </p>

                {/* Section 1 */}
                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-sm flex items-center justify-center">1</span>
                    수집하는 개인정보 항목
                  </h3>
                  <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100">
                    <p className="text-neutral-600 mb-3">
                      팀은 프로젝트 상담 및 문의 응대를 위해 다음의 개인정보를 수집합니다.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-neutral-700">
                        <svg className="w-4 h-4 text-brand-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        이름
                      </li>
                      <li className="flex items-center gap-2 text-neutral-700">
                        <svg className="w-4 h-4 text-brand-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        이메일 주소
                      </li>
                      <li className="flex items-center gap-2 text-neutral-700">
                        <svg className="w-4 h-4 text-brand-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        문의 내용
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-sm flex items-center justify-center">2</span>
                    개인정보 수집 목적
                  </h3>
                  <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100">
                    <p className="text-neutral-600 mb-3">
                      수집한 개인정보는 다음의 목적으로만 사용됩니다.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-neutral-700">
                        <svg className="w-4 h-4 text-brand-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>문의에 대한 응대 및 답변 발송</span>
                      </li>
                      <li className="flex items-start gap-2 text-neutral-700">
                        <svg className="w-4 h-4 text-brand-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>견적 산정 및 프로젝트 상담</span>
                      </li>
                      <li className="flex items-start gap-2 text-neutral-700">
                        <svg className="w-4 h-4 text-brand-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>서비스 관련 공지사항 전달 (필요 시)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-sm flex items-center justify-center">3</span>
                    개인정보 보유 및 이용 기간
                  </h3>
                  <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100">
                    <p className="text-neutral-600 leading-relaxed">
                      수집된 개인정보는 문의 처리 완료 후 <strong className="text-neutral-900">1년간 보관</strong>되며, 
                      이후 지체 없이 파기됩니다. 다만, 관련 법령에 따라 보존이 필요한 경우 
                      해당 기간 동안 보관할 수 있습니다.
                    </p>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-sm flex items-center justify-center">4</span>
                    개인정보 제3자 제공
                  </h3>
                  <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100">
                    <p className="text-neutral-600 leading-relaxed">
                      팀은 이용자의 개인정보를 <strong className="text-neutral-900">제3자에게 제공하지 않습니다.</strong> 
                      다만, 법령에 의해 요구되는 경우에는 예외로 합니다.
                    </p>
                  </div>
                </div>

                {/* Section 5 */}
                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-sm flex items-center justify-center">5</span>
                    개인정보 보호 책임자
                  </h3>
                  <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100">
                    <p className="text-neutral-600 mb-4">
                      개인정보 처리에 관한 문의사항이 있으시면 아래로 연락 주시기 바랍니다.
                    </p>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-neutral-500 text-sm w-16">담당</span>
                        <span className="text-neutral-900 font-medium">Team Duzz</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-neutral-500 text-sm w-16">이메일</span>
                        <a 
                          href="mailto:teamduzzforyou@gmail.com" 
                          className="text-brand-primary hover:underline font-medium"
                        >
                          teamduzzforyou@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 6 */}
                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-sm flex items-center justify-center">6</span>
                    개인정보의 안전성 확보 조치
                  </h3>
                  <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100">
                    <p className="text-neutral-600 leading-relaxed">
                      팀은 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
                    </p>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-start gap-2 text-neutral-700">
                        <svg className="w-4 h-4 text-brand-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>개인정보 접근 권한 최소화</span>
                      </li>
                      <li className="flex items-start gap-2 text-neutral-700">
                        <svg className="w-4 h-4 text-brand-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>보안 프로그램 설치 및 주기적 점검</span>
                      </li>
                      <li className="flex items-start gap-2 text-neutral-700">
                        <svg className="w-4 h-4 text-brand-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>개인정보 암호화 전송 (HTTPS)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Divider */}
            <div className="my-16 flex items-center gap-4">
              <div className="flex-1 h-px bg-neutral-200" />
              <div className="w-2 h-2 rounded-full bg-brand-primary" />
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            {/* Terms of Service */}
            <motion.article
              id="terms"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeIn}
              className="scroll-mt-40"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center text-brand-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                  이용약관
                </h2>
              </div>

              <div className="prose prose-neutral max-w-none">
                <p className="text-neutral-600 leading-relaxed mb-8">
                  본 이용약관은 Team Duzz(이하 "팀")가 운영하는 웹사이트 및 관련 서비스의 
                  이용에 관한 기본적인 사항을 규정합니다.
                </p>

                {/* Section 1 */}
                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-sm flex items-center justify-center">1</span>
                    서비스의 목적
                  </h3>
                  <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100">
                    <p className="text-neutral-600 leading-relaxed">
                      본 웹사이트는 웹 개발, 퍼블리싱, 프로그램 개발 등 외주 서비스에 대한 
                      <strong className="text-neutral-900"> 정보 제공 및 상담 목적</strong>으로 운영됩니다. 
                      실제 프로젝트 계약은 별도의 상담 및 합의를 통해 진행됩니다.
                    </p>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-sm flex items-center justify-center">2</span>
                    서비스 이용
                  </h3>
                  <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-neutral-700">
                        <svg className="w-4 h-4 text-brand-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>이용자는 본 웹사이트를 통해 서비스 정보를 확인하고 문의를 제출할 수 있습니다.</span>
                      </li>
                      <li className="flex items-start gap-2 text-neutral-700">
                        <svg className="w-4 h-4 text-brand-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>문의 내용을 통해 전달된 정보는 상담 및 견적 산정에 활용됩니다.</span>
                      </li>
                      <li className="flex items-start gap-2 text-neutral-700">
                        <svg className="w-4 h-4 text-brand-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>웹사이트의 정상적인 운영을 방해하는 행위는 금지됩니다.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-sm flex items-center justify-center">3</span>
                    책임의 범위
                  </h3>
                  <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-neutral-700">
                        <svg className="w-4 h-4 text-brand-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>본 웹사이트는 정보 제공 목적으로 운영되며, 게시된 내용의 정확성을 보장하기 위해 노력합니다.</span>
                      </li>
                      <li className="flex items-start gap-2 text-neutral-700">
                        <svg className="w-4 h-4 text-brand-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>실제 프로젝트 계약 및 서비스 제공에 관한 사항은 별도의 계약서를 통해 명시되며, 해당 계약 내용이 우선합니다.</span>
                      </li>
                      <li className="flex items-start gap-2 text-neutral-700">
                        <svg className="w-4 h-4 text-brand-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>팀은 천재지변, 시스템 장애 등 불가항력적 사유로 인한 서비스 중단에 대해 책임지지 않습니다.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-sm flex items-center justify-center">4</span>
                    저작권
                  </h3>
                  <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100">
                    <p className="text-neutral-600 leading-relaxed">
                      본 웹사이트에 게시된 모든 콘텐츠(텍스트, 이미지, 디자인, 코드 등)의 
                      저작권은 <strong className="text-neutral-900">Team Duzz</strong>에 있습니다. 
                      무단 복제, 배포, 수정은 저작권법에 의해 금지됩니다.
                    </p>
                  </div>
                </div>

                {/* Section 5 */}
                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-sm flex items-center justify-center">5</span>
                    약관의 변경
                  </h3>
                  <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100">
                    <p className="text-neutral-600 leading-relaxed">
                      팀은 필요한 경우 본 약관을 변경할 수 있으며, 변경된 약관은 웹사이트에 
                      게시함으로써 효력이 발생합니다. 중요한 변경 사항이 있을 경우 
                      웹사이트를 통해 공지합니다.
                    </p>
                  </div>
                </div>

                {/* Section 6 */}
                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-primary text-white text-sm flex items-center justify-center">6</span>
                    문의
                  </h3>
                  <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100">
                    <p className="text-neutral-600 mb-4">
                      본 약관에 관한 문의사항이 있으시면 아래로 연락 주시기 바랍니다.
                    </p>
                    <a 
                      href="mailto:teamduzzforyou@gmail.com" 
                      className="inline-flex items-center gap-2 text-brand-primary hover:underline font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      teamduzzforyou@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Last Updated */}
            <div className="mt-16 pt-8 border-t border-neutral-200 text-center">
              <p className="text-sm text-neutral-500">
                최종 수정일: 2025년 1월 1일
              </p>
            </div>

            {/* Back to Home */}
            <div className="mt-8 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-brand-primary font-medium hover:gap-3 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                홈으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


